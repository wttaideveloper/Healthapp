import { getDatabase, initDatabase } from './database';
import { HealthReport, Group, HealthMetrics } from './types';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { generateCSV } from './csvGenerator';

// Function to add a health report
export const addReport = async (
  userId: string,
  userName: string,
  userEmail: string,
  title: string,
  answers: { questionId: number; text: string; points: number }[],
  reportData: HealthMetrics,
  groupIds?: string[]
): Promise<string> => {
  const db = getDatabase();
  try {
    const reportId = 'report_' + Math.random().toString(36).substr(2, 9);// Generate a unique report ID
    const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    
    await db.runAsync(
      `INSERT INTO reports 
      (id, user_id, user_name, user_email, title, answers, report_data, date) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      reportId,
      userId,
      userName,
      userEmail,
      title,
      JSON.stringify(answers),
      JSON.stringify(reportData),
      currentDate
    );
    
    // Add to groups if specified
    if (groupIds && groupIds.length > 0) {
      for (const groupId of groupIds) {
        await db.runAsync(
          `INSERT INTO report_groups (report_id, group_id) VALUES (?, ?)`,
          reportId,
          groupId
        );
      }
    }
    
    return reportId;
  } catch (error) {
    console.error('Error adding report:', error);
    throw error;
  }
};


// function to get report count

export const getTodayReportCount = async (): Promise<number> => {
  try {
    const db = getDatabase();
    const todayDate = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
    
    const result = await db.getFirstAsync<{
      count: number;
    }>(
      `SELECT COUNT(*) as count FROM reports WHERE date = ?`,
      todayDate
    );
    
    return result?.count || 0;
  } catch (error) {
    // await initDatabase();
    console.error('Error fetching today\'s report count:', error);
    throw error;
  }
};


// Function to get all reports
export const getAllReports = async (
  filters: { name?: string; fromDate?: string; toDate?: string; gender?: string } = {},
  limit: number = 10,
  offset: number = 0
) => {
  const db = getDatabase();
  try {
    let query = `SELECT * FROM reports WHERE 1=1`;
    const queryParams: any[] = [];

    // Filtering
    if (filters.name) {
      query += ` AND user_name LIKE ?`;
      queryParams.push(`%${filters.name}%`);
    }

    if (filters.fromDate) {
      query += ` AND date >= ?`;
      queryParams.push(filters.fromDate);
    }

    if (filters.toDate) {
      query += ` AND date <= ?`;
      queryParams.push(filters.toDate);
    }

    if (filters.gender) {
       query += ` AND json_extract(report_data, '$.gender') = ?`;
      queryParams.push(filters.gender);
    }

    // Pagination & Sorting: Latest first
    query += ` ORDER BY created_at DESC LIMIT ? OFFSET ?`;
    queryParams.push(limit, offset);
    // Debug log (optional)
    // console.log("Final SQL Query:", query);
    // console.log("Params:", queryParams);

    const reports = await db.getAllAsync(query, ...queryParams);

    // Get group IDs for each report
    const reportsWithGroups = await Promise.all(
      reports.map(async report => {
        const groups = await db.getAllAsync(
          'SELECT group_id FROM report_groups WHERE report_id = ?',
          report.id
        );
        return {
          ...report,
          groupIds: groups.map(g => g.group_id),
        };
      })
    );

    return reportsWithGroups;
  } catch (error) {
    console.error('Error getting all reports:', error);
    throw error;
  }
};


// Function to delete a report
export const deleteReports = async (reportIds: string[]): Promise<void> => {
  const db = getDatabase();
  try {
    if (reportIds.length === 0) {
      console.log("No reports to delete.");
      return;
    }

    console.log(reportIds, "Report IDs to delete");

    // Create a placeholder string for the query (e.g., "?, ?, ?")
    const placeholders = reportIds.map(() => "?").join(", ");
    const query = `DELETE FROM reports WHERE id IN (${placeholders})`;

    const result = await db.runAsync(query, reportIds);
    console.log(result, "Result after deletion");

    if (result.changes === 0) {
      throw new Error("No reports were found for deletion");
    }
  } catch (error) {
    console.error("Error deleting reports:", error);
    throw error;
  }
};

// Function to create a group with a unique ID
export const createGroup = async (name: string, description?: string): Promise<string> => {
  const db = getDatabase();
  try {
    const groupId = 'group_' + Math.random().toString(36).substr(2, 9); // Generate a unique group ID
    await db.runAsync(
      `INSERT INTO groups (id, name, description) VALUES (?, ?, ?)`,
      groupId,
      name,
      description || ''
    );
    return groupId;
  } catch (error) {
    console.error('Error creating group:', error);
    throw error;
  }
};

// Function to add multiple reports to a group
export const addReportsToGroup = async (groupId: string, reportIds: string[]): Promise<void> => {
  const db = getDatabase();
  try {
    for (const reportId of reportIds) {
      const existingReport = await db.getFirstAsync(
        `SELECT 1 FROM report_groups WHERE report_id = ? AND group_id = ?`,
        reportId,
        groupId
      );
      
      if (existingReport) {
        console.warn(`Report ${reportId} already exists in group ${groupId}`);
        continue;
      }
      
      await db.runAsync(
        `INSERT INTO report_groups (report_id, group_id) VALUES (?, ?)`,
        reportId,
        groupId
      );
    }
  } catch (error) {
    console.error('Error adding reports to group:', error);
    throw error;
  }
};

// Function to get all reports from a specific group


export const getReportsByGroup = async (
  groupId: string,
  filters: { name?: string; fromDate?: string; toDate?: string; gender?: string } = {}
) => {
  const db = getDatabase();
  try {
    let query = `
      SELECT r.* FROM reports r
      INNER JOIN report_groups rg ON r.id = rg.report_id
      WHERE rg.group_id = ?
    `;
    const queryParams: any[] = [groupId];

    if (filters.name) {
      query += ` AND r.user_name LIKE ?`;
      queryParams.push(`%${filters.name}%`);
    }

    if (filters.fromDate) {
      query += ` AND r.date >= ?`;
      queryParams.push(filters.fromDate);
    }

    if (filters.toDate) {
      query += ` AND r.date <= ?`;
      queryParams.push(filters.toDate);
    }

    if (filters.gender) {
       query += ` AND json_extract(report_data, '$.gender') = ?`;
      queryParams.push(filters.gender);
    }

    query += ` ORDER BY r.date DESC`;

    const reports = await db.getAllAsync(query, ...queryParams);
    return reports;
  } catch (error) {
    console.error('Error getting reports by group with filters:', error);
    throw error;
  }
};

// Function to delete multiple reports from a specific group
export const deleteReportsFromGroup = async (groupId: string, reportIds: string[]): Promise<void> => {
  const db = getDatabase();
  try {
    await db.execAsync('BEGIN TRANSACTION');
    
    for (const reportId of reportIds) {
      await db.runAsync(
        `DELETE FROM report_groups WHERE group_id = ? AND report_id = ?`,
        groupId,
        reportId
      );
    }

    await db.execAsync('COMMIT');
    console.log(`Successfully deleted ${reportIds.length} reports from group ${groupId}`);
  } catch (error) {
    await db.execAsync('ROLLBACK');
    console.error('Error deleting reports from group:', error);
    throw error;
  }
};


// Function to get the count of reports in a group
export const getReportCountByGroup = async (groupId: string): Promise<number> => {
  const db = getDatabase();
  try {
    const result = await db.getFirstAsync(
      `SELECT COUNT(report_id) as count FROM report_groups WHERE group_id = ?`,
      groupId
    );
    return result?.count || 0;
  } catch (error) {
    console.error('Error getting report count by group:', error);
    throw error;
  }
};

// Function to get all groups with report counts
export const getAllGroups = async () => {
  const db = getDatabase();
  try {
    const groups = await db.getAllAsync(
      `SELECT g.*, (
        SELECT COUNT(rg.report_id) FROM report_groups rg WHERE rg.group_id = g.id
      ) as report_count,
      strftime('%Y-%m-%d', g.created_at) as created_at
      FROM groups g ORDER BY g.created_at DESC`
    );
    return groups;
  } catch (error) {
    console.error('Error getting all groups:', error);
    throw error;
  }
};

// Function to delete multiple groups
export const deleteGroups = async (groupIds: string[]): Promise<void> => {
  const db = getDatabase();
  try {
    if (groupIds.length === 0) {
      console.log("No groups to delete.");
      return;
    }

    // Create a placeholder string for the query (e.g., "?, ?, ?")
    const placeholders = groupIds.map(() => "?").join(", ");
    const query = `DELETE FROM groups WHERE id IN (${placeholders})`;
    await db.runAsync(query, groupIds);

    // Remove all report associations with these groups
    const reportGroupQuery = `DELETE FROM report_groups WHERE group_id IN (${placeholders})`;
    await db.runAsync(reportGroupQuery, groupIds);
  } catch (error) {
    console.error("Error deleting groups:", error);
    throw error;
  }
};

export const saveSettings = async (
  phoneNumber: string,
  address: string,
  image?: string
) => {
  const db = getDatabase();
  try {
    await db.runAsync(
      `UPDATE settings 
       SET image = ?, phone_number = ?, address = ?
       WHERE id = 1`,
      [image || null, phoneNumber, address]
    );
    return true;
  } catch (error) {
    console.error("Error saving settings:", error);
    return false;
  }
};

// Get current settings
export const getSettings = async () => {
  const db = getDatabase();
  try {

    return await db.getFirstAsync(
      `SELECT image, phone_number as phoneNumber, address 
       FROM settings WHERE id = 1`
    );
  } catch (error) {
    console.error("Error getting settings:", error);
    return null;
  }
};

// Update just the image
export const updateImage = async (image: string) => {
  const db = getDatabase();
  await db.runAsync(`UPDATE settings SET image = ? WHERE id = 1`, [image]);
};

// Update just the phone number
export const updatePhoneNumber = async (phoneNumber: string) => {
  const db = getDatabase();
  await db.runAsync(
    `UPDATE settings SET phone_number = ? WHERE id = 1`, 
    [phoneNumber]
  );
};

// Update just the address
export const updateAddress = async (address: string) => {
  const db = getDatabase();
  await db.runAsync(`UPDATE settings SET address = ? WHERE id = 1`, [address]);
};

interface ReportData {
  id: string;
  user_name: string;
  user_email?: string;
  title: string;
  date: string;
  report_data: string;
}

export const exportGroupReportsToCSV = async (groupId: string, groupName: string): Promise<string> => {
  try {
    const db = getDatabase();
    // 1. Fetch reports
    const reports = await db.getAllAsync<ReportData>(`
      SELECT r.* FROM reports r
      JOIN report_groups rg ON r.id = rg.report_id
      WHERE rg.group_id = ?
      ORDER BY r.date DESC
    `, groupId);

    if (!reports.length) {
      throw new Error('No reports found in this group');
    }

    // 2. Format data
    const formattedData = reports.map(report => {
      const metrics = JSON.parse(report.report_data);
      return {
        'Report ID': report.id,
        'User Name': report.user_name,
        'User Email': report.user_email || '',
        'Report Title': report.title,
        'Date': report.date,
        ...metrics, // Spread health metrics
      };
    });

    // 3. Generate CSV
    const csvContent = generateCSV(formattedData);

    // 4. Save file
    const fileName = `${groupName.replace(/[^a-z0-9]/gi, '_')}_Reports_${new Date().toISOString().split('T')[0]}.csv`;
    const fileUri = `${FileSystem.documentDirectory}${fileName}`;
    
    await FileSystem.writeAsStringAsync(fileUri, csvContent, {
      encoding: FileSystem.EncodingType.UTF8,
    });

    // 5. Share file
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(fileUri, {
        mimeType: 'text/csv',
        dialogTitle: `Export ${groupName} Reports`,
      });
    }

    return fileUri;
  } catch (error) {
    console.error('Export failed:', error);
    throw error;
  }
};


export const getTotalReportCount = async () => {
  try {
    const db =  getDatabase();
    const result = await db.getFirstAsync(`SELECT COUNT(*) as count FROM reports`);
    return result?.count || 0;
  } catch (error) {
    console.error('Error getting total report count:', error);
    throw error;
  }
};