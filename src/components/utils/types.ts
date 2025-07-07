export interface HealthReport {
  id: string;
  userName: string;
  userEmail?: string;
  title: string;
  reportData: string;
  date: string;
  createdAt?: string;
  groupIds?: string[];
}

export interface Group {
  id: string;
  name: string;
  description?: string;
  createdAt?: string;
  reports?: HealthReport[];
}

// Interface for the health metrics data structure
export interface HealthMetrics {
  name: string;
  height: string;
  age: string;
  healthAge: string;
  potentialAge: string;
  gender: string;
  weight: string;
  bloodGlucose: string;
  bloodPressure: string;
  fasting: boolean;
  bloodPressureSys: string;
  bloodPressureDia: string;
  bloodGlucose_mg: string;
  bloodGlucose_mmol: string;
  blood_glucose_mmol_points: string;
  selectedGlucoseUnit: string;
  selectedWeightUnit: string;
  selectedHeightUnit: string;
  heightValue: string;
  weightValue: string;
}
