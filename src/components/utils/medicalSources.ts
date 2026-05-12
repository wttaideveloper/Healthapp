export type MedicalSource = {
  title: string;
  description: string;
  url: string;
};

export const CORE_MEDICAL_SOURCES: MedicalSource[] = [
  {
    title: "Alameda County Study and lifestyle habits",
    description: "Background research connecting lifestyle habits with longevity and mortality risk.",
    url: "https://pubmed.ncbi.nlm.nih.gov/3097736/",
  },
  {
    title: "Adventist Health Study longevity findings",
    description: "Research summary on smoking, body weight, exercise, diet, nuts, and life expectancy.",
    url: "https://adventisthealthstudy.org/studies/AHS-1/findings-longevity",
  },
  {
    title: "CDC adult BMI categories",
    description: "BMI formula, adult BMI ranges, and CDC reminder that BMI is a screening measure.",
    url: "https://www.cdc.gov/bmi/adult-calculator/bmi-categories.html",
  },
  {
    title: "American Heart Association blood pressure categories",
    description: "Adult blood pressure categories and guidance to confirm results with a clinician.",
    url: "https://www.heart.org/en/health-topics/high-blood-pressure/understanding-blood-pressure-readings",
  },
  {
    title: "CDC diabetes testing",
    description: "Fasting glucose and glucose tolerance ranges used for diabetes and prediabetes screening.",
    url: "https://www.cdc.gov/diabetes/diabetes-testing/index.html",
  },
  {
    title: "CDC blood sugar targets",
    description: "Typical blood sugar targets and guidance to personalize targets with a care team.",
    url: "https://www.cdc.gov/diabetes/treatment/index.html",
  },
];

export const REPORT_SOURCE_BY_TOPIC = {
  breakfast: "https://www.cdc.gov/healthy-weight-growth/be-sugar-smart/index.html",
  snacking: "https://pubmed.ncbi.nlm.nih.gov/34144310/",
  fruitsVegetables: "https://www.cdc.gov/nutrition/features/eat-more-fruits-vegetables.html",
  wholeGrains: "https://www.myplate.gov/eat-healthy/grains",
  nuts: "https://adventisthealthstudy.org/studies/AHS-1/findings-nuts",
  redMeat: "https://www.who.int/news-room/questions-and-answers/item/cancer-carcinogenicity-of-the-consumption-of-red-meat-and-processed-meat",
  exercise: "https://health.gov/our-work/nutrition-physical-activity/physical-activity-guidelines",
  weight: "https://www.cdc.gov/bmi/adult-calculator/bmi-categories.html",
  sleep: "https://www.nhlbi.nih.gov/health/sleep/why-sleep-important",
  tobacco: "https://www.cdc.gov/tobacco/about/benefits-of-quitting.html",
  alcohol: "https://www.who.int/news/item/04-01-2023-no-level-of-alcohol-consumption-is-safe-for-our-health",
  spirituality: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3671693/",
  bloodGlucose: "https://www.cdc.gov/diabetes/diabetes-testing/index.html",
  bloodPressure: "https://www.heart.org/en/health-topics/high-blood-pressure/understanding-blood-pressure-readings",
};
