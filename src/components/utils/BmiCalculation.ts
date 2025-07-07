export const calculateBMI = (
  weight: string,
  weightUnit: string,
  height: string,
  heightUnit: string
) => {
  if (!weight || !height) return null;
  console.log(weight, height, "this is weight height for bmi calculating ", weightUnit, heightUnit, "units for bmi");

  // Convert weight to kg if it's in pounds
  const weightInKg = weightUnit === "Lb" ? weight * 0.453592 : weight;

  // Convert height to meters
  let heightInMeters;
  if (heightUnit === "cm") {
    heightInMeters = Number(height) / 100; // Ensure height is a number
  } else {
    // Handle feet and inches (input like 5.10 means 5 feet 10 inches)
    const [feetStr, inchesStr] = height.toString().split(".");
const feet = parseInt(feetStr, 10);
const inches = inchesStr ? parseInt(inchesStr, 10) : 0;
heightInMeters = (feet * 12 + inches) * 0.0254;
  }

  // Calculate BMI
  const bmi = weightInKg / (heightInMeters * heightInMeters);

  // Determine BMI category
  if (bmi < 18.5) return { text: "underweight", points: 0 };
  if (bmi >= 18.5 && bmi < 24.9) return { text: "healthyWeight", points: 1 };
  if (bmi >= 25 && bmi < 29.9) return { text: "moderatelyOverweight", points: 0 };
  return { text: "severelyOverweight", points: 0 };
};

export const calculateBMIValues = (
  weight: number,
  weightUnit: string,
  height: string,
  heightUnit: string
): number | null => {
  if (!weight || !height) return null;
  console.log(weight, height, "this is weight height for bmi number", weightUnit, heightUnit, "units for bmi");
  // Convert weight to kg if it's in pounds
  const weightInKg = weightUnit === "Lb" ? weight * 0.453592 : weight;

  // Convert height to meters
  let heightInMeters: number;
  if (heightUnit === "cm") {
    heightInMeters = Number(height) / 100;
  } else {
    // height is a string like "5.10" (5 feet 10 inches)
    const [feetStr, inchesStr] = height.toString().split(".");
    const feet = parseInt(feetStr, 10);
    const inches = inchesStr ? parseInt(inchesStr, 10) : 0;
    heightInMeters = (feet * 12 + inches) * 0.0254;
  }

  // Calculate and return BMI rounded to 1 decimal place
  const bmi = weightInKg / (heightInMeters * heightInMeters);
  return parseFloat(bmi.toFixed(1));
};
