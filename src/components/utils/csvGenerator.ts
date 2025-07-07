export const generateCSV = (data: Record<string, any>[]): string => {
    if (!data.length) return '';
    
    // Get headers from first object's keys
    const headers = Object.keys(data[0]);
    
    // Create CSV content
    const rows = data.map(obj => 
      headers.map(header => {
        // Escape quotes and wrap in quotes if contains comma
        const value = String(obj[header] ?? '').replace(/"/g, '""');
        return value.includes(',') ? `"${value}"` : value;
      }).join(',')
    );
  
    return [headers.join(','), ...rows].join('\n');
  };