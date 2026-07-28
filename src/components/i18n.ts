import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Define translations locally
const resources = {
  en: {
    translation: {
      welcome: "Welcome",
      chooseLanguage: "Choose Language",
      introduction: "Introduction",
      howItWorks: "How it works",
      benefits: "Benefits",
      discoverHealthAge: "Discover Your Health Age!",
      lifestyleAffectsHealth:
        "Your lifestyle affects your health more than you think. Let’s find out how young you really are!",
      simpleScienceBacked: "Simple & Science Backed",
      answerQuestions:
        "Answer a few questions about your habits, and we’ll calculate your Health Age based on real health insights.",
      getPersonalizedTips: "Get Personalized Health Tips",
      improveLifestyle:
        "Improve your lifestyle with customized recommendations to reach your best health potential.",
      // HomeScreen.tsx
      helpCalculateHealthAge: "I can help you calculate your health age.",
      startAssessment: "Start your assessment now",
      home: "Home",
      purchases: "Purchases",
      history: "History",
      dailyLimit: "Daily Limit",

      // healthAgeTest.tsx
      getStarted:
        "Let’s get started. Your health age is based on your lifestyle and habits.",
      whatIsYourName: "What is your name?",
      enterName: "Enter Name",
      next: "Next",
      whatIsYourAge: "What is your age?",
      age: "Age",
      whatIsYourGender: "What is your gender?",
      gender: "Gender",
      male: "Male",
      female: "Female",
      whatIsYourHeight: "What is your height?",
      height: "Height",
      whatIsYourWeight: "What is your weight?",
      weight: "Weight",
      whatIsYourWaistCircumference: "What is your waist circumference?",
      waistCircumference: "Waist circumference",
      whatIsYourBloodPressure: "What is your blood pressure?",
      bloodPressure: "Blood pressure",
      whatIsYourBloodGlucose: "What is your blood glucose level?",
      fasting: "Fasting",
      postMeals: "Post meals",
      bloodGlucoseLevel: "Blood glucose level",

      // QuestionScreen.tsx
      newAssessment: "New Assessment",
      howOftenEatBreakfast: "How often do you eat a good breakfast?",
      breakfastNote:
        "(Emphasizing whole grains, fruits or vegetables, and nuts)",
      lessThan2Days: "Less than 2 days per week",
      twoToFourDays: "2-4 days per week",
      fiveToSixDays: "5-6 days per week",
      everyday: "Every day",
      howOftenSnack: "How often do you snack?",
      severalTimesDay: "Several times a day",
      onceDay: "Once a day",
      fewTimesWeek: "A few times per week",
      rarelyNever: "Rarely or never",
      howManyFruitsVeggies:
        "How many servings of fruits and vegetables do you eat per day?",
      fruitsVeggiesNote:
        "(1 serving = 1 med. piece, 1 C fresh, 1/2 C cooked, or 6 oz 100% juice)",
      howManyWholeGrains:
        "How many servings of whole grains do you eat per day?",
      wholeGrainsNote:
        "(1 serving = 1 slice bread, 1/2 C brown rice or oatmeal, 2/3 C dry cereal)",
      none: "None",
      back: "Back",
      howManyNutsSeeds:
        "How many servings of nuts and seeds do you eat per week?",
      nutsSeedsNote: "(1 serving = 1 oz nuts or seeds, 2 T nut butter)",
      howOftenRedMeat: "How often do you eat red meat?",
      threeOrMoreTimesWeek: "3 or more times per week",
      onceTwiceMonth: "Once or twice per month",
      never: "Never",
      howOftenExercise:
        "How often do you get 20-30 minutes of moderate to vigorous exercise?",
      rarely: "Rarely",
      oneTwoDaysWeek: "1-2 days per week",
      threeFourDaysWeek: "3-4 days per week",
      fiveMoreDaysWeek: "5 or more days per week",
      howIsWeight: "How is your weight?",
      severelyOverweight: "Severely overweight",
      moderatelyOverweight: "Moderately overweight",
      underweight: "Underweight",
      healthyWeight: "Healthy weight",
      howOftenSleep: "How often do you get 7-8 hours of sleep?",
      twoOrFewerDays: "2 or fewer days per week",
      threeFourDays: "3-4 days per week",
      fiveSixDays: "5-6 days per week",
      whatIsTobaccoHistory: "What is your history with tobacco?",
      currentlyUse: "Currently use",
      quitLessThanTwoYears: "Quit less than 2 years ago",
      quitOverTwoYears: "Quit over 2 years ago",
      neverUsed: "Never used",
      howManyAlcohol: "How many servings of alcohol do you consume per week?",
      alcoholNote: "(12 oz beer, 8 oz malt liquor, 5 oz wine, 1.5 oz shot)",
      excessiveAlcohol: "15+ (men) or 8+ (women)",
      howRateSpirituality: "How would you rate your spirituality?",
      noInterest: "No interest",
      moderatelySpiritual: "Moderately spiritual",
      deeplySpiritual: "Deeply spiritual",

      // interestScreen

      Is_Interests: "Interests",
      Is_TellYourInterest:
        "Tell us what you're interested in to customize your experience.",
      Is_WeightManagement: "Weight Management",
      Is_FitAndExercise: "Fitness and Exercise",
      Is_StopSmoking: "Stop Smoking",
      Is_HealthyCooking: "Healthy Cooking",
      Is_StressReduction: "Stress Reduction",
      Is_PreventHeartDisease: "Heart Disease Prevention",
      Is_DepressionRecovery: "Depression Recovery",
      Is_ReversingDiabetes: "Reversing Diabetes",
      Is_NaturalRemedies: "Natural Remedies",
      Is_SpiritualHealth: "Spiritual Health",
      Is_ImprovingMentalPerformance: "Improving Mental Performance",
      Is_Other: "Other",
      Is_Name: "Name",
      Is_Email: "Email",
      Is_Address: "Address",
      Is_Phone: "Phone",
      Is_Zip: "Zip",
      Is_ShowReport: "Show Report",

      // reportScreen

      Rs_Report: "Report",
      Rs_CustomizedReport: "Customized Report for :",
      Rs_YourHealthAge: "Your health age is",
      Rs_YourActualAge: "Your actual age of",
      Rs_CurrentAge: "Current Age",
      Rs_HealthAge: "Health Age",
      Rs_PotentialAge: "Potential Age",
      Rs_HealthyHabitsParagraph:
        "Several large research studies, including the well-known Alameda County Study and the Adventist Health Studies reveal a strong correlation between the health habits listed below and one’s risk of disease/death. Individuals practicing all of these healthy habits may influence their longevity by nearly 30 years.",
      Rs_MedicalDisclaimerTitle: "Medical Disclaimer",
      Rs_MedicalDisclaimerText:
        "Health Age is intended for informational and educational purposes only. It is not a medical diagnosis and should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare professional before making any medical decisions or changes to your healthcare.",
      Rs_MedicalSources: "Medical Sources",
      Rs_Source: "Source",
      Rs_Recommendations: "Recommendations",
      Rs_1_title: "Eat a good breakfast daily",
      Rs_1_desc:
        "Breakfast boosts metabolism, helps with concentration, and improves performance at school and work. It also aids in maintaining a healthy weight.",
      Rs_2_title: "Avoid snacking",
      Rs_2_desc:
        "Snacking can add an average of 580 calories per day, impair digestion, disrupt blood sugar control, and contribute to weight gain.",
      Rs_3_title: "Enjoy more fruits and vegetables",
      Rs_3_desc:
        "Fruits and vegetables are rich in phytochemicals, vitamins, and fiber while being lower in calories.",
      Rs_4_title: "Increase whole grain intake",
      Rs_4_desc:
        "Whole grains contain fiber, B vitamins, and essential minerals that support overall health.",
      Rs_5_title: "Eat more nuts",
      Rs_5_desc:
        "Nuts are an excellent source of protein and healthy fats, and they help regulate blood sugar levels.",
      Rs_6_title: "Avoid red meat",
      Rs_6_desc:
        "Eating red meat has been linked to type 2 diabetes, heart disease, stroke, and certain cancers.",
      Rs_7_title: "Exercise regularly",
      Rs_7_desc:
        "Exercise boosts energy, improves mood and cholesterol levels, lowers blood pressure, enhances sleep, strengthens immunity, and helps control blood sugar.",
      Rs_8_title: "Achieve a healthy weight",
      Rs_8_desc:
        "Maintain a BMI between 18.5 - 24.9 and a healthy waist circumference (less than 40 in for men, 35 in for women).",
      Rs_9_title: "Get 7-8 hours of good sleep each night",
      Rs_9_desc:
        "Adequate sleep supports memory, learning, metabolism, and immune function.",
      Rs_10_title: "Stop smoking",
      Rs_10_desc:
        "Smoking harms every organ in the body, increasing the risk of cancers, heart disease, COPD, asthma, and dental issues.",
      Rs_11_title: "Do not drink alcohol",
      Rs_11_desc:
        "Alcohol use can cause neurological, cardiovascular, and psychiatric issues, as well as increase the risk of cancer and liver disease.",
      Rs_12_title: "Increase spirituality",
      Rs_12_desc:
        "Faith in God may improve mental health and strengthen immune function.",
      Rs_SavePdf: "Save pdf",
      Rs_ShareReport: "Share Report",

      // history screen

      Hs_List: "List",
      Hs_Group: "Group",
      Hs_View: "View",
      Hs_Filter: "Filter",
      Hs_Options: "Options",
      Hs_Export: "Export",
      Hs_Delete: "Delete",
      Hs_Search: "Search",
      Hs_ExportAsCSV: "Export as CSV",
      Hs_Confirmation: "Are you sure want to delete ?",
      Hs_Success: "Item Deleted",
      Hs_Cancel: "Cancel",
      Hs_ItemsSelected: "Items Selected",
      Hs_SelectAll: "Select all",
      Hs_NewGroup: "New Group",
      Hs_ExistingGroup: "Existing Group",
      Hs_Create: "Create",
      Hs_GroupName: "Group Name",
      Hs_EnterGroupName: "Enter group name",
      Hs_Reports: "Reports",
      Hs_save: "Save",
      Hs_Nothing: "Nothing here yet!",
      Hs_NothingDesc:
        "Your health age reports will appear here once you complete assessment.",
      Hs_Download: "Download",

      Hs_LanguageChanged: "Language changed Successfully",
      Hs_Change: "Change",

      // Filter Screen
      Fs_Filter: "Filter by",
      Fs_Close: "Close",
      Fs_Date: "Date",
      Fs_From: "From",
      Fs_To: "To",
      Fs_ClearAll: "Clear all",
      Fs_ShowResults: "Show results",

      // others

      select: "Select",
      total: "Total",
      purchase: "Purchase",
      aboutProgramme: "About the Programme",
      reports: "Reports",
      PrintQuestion: "Print Questionnaire",
      PrintReport: "Print Blank Report",
      reportSetting: "Report Settings",
      changeLanguage: "Change Language",
      uploadLogo: "Upload your logo",
      upload: "Upload",
      contactDetails: "Contact Details",
      enterAddress: "Enter Address",
      enterPhone: "Enter Phone Number",
      createGroup: "Create Group",

      // blood pressure and glucose

      normalBp: "Your blood pressure is normal",
      MaintainBp: "Please maintain your blood pressure",
      bpRange: "Normal range is 90-119/60-79 mmHg.",
      normalGlucoseLevel: "Your blood glucose level is normal",
      maintainGlucoseLevel: "Please maintain your blood glucose level",
      normalRangeGlucose: "Normal range is",
      for: "for",
      postMeal: "post-meal",
      test: "test",
      maintainBloodGlucose: "Maintain Your blood glucose levels",
      maintainLowBloodGlucoseDesc:
        "Your blood glucose levels are Low, Stable blood glucose prevents complications, boosts energy, and supports overall health. Balanced eating and exercise help keep it in check!",
      maintainHighBloodGlucoseDesc:
        "Your Blood glucose levels are High, Stable blood glucose prevents complications, boosts energy, and supports overall health. Balanced eating and exercise help keep it in check!",
      maintainBloodPressure: "Keep blood pressure Under Control",
      maintainBloodPressureDesc:
        "Maintaining healthy blood pressure reduces risks of heart disease, strokes, and kidney problems. Regular exercise and a balanced diet can make all the difference!",
      maintainLowBloodPressureDesc:
        "Your blood pressure levels are Low , Maintaining healthy blood pressure reduces risks of heart disease, strokes, and kidney problems. Regular exercise and a balanced diet can make all the difference!",
      maintainHighBloodPressureDesc:
        "Your blood pressure levels are High , Maintaining healthy blood pressure reduces risks of heart disease, strokes, and kidney problems. Regular exercise and a balanced diet can make all the difference!",
      // messages

      downloadSuccess: "Downloaded Successfully",
      goBackConfirmation: "Are you sure you want to go back ?",
      pleaseWait: "Please wait!",

      // purchase Screen

      goBeyond: "Go beyond the basics!",

      JoinPro:
        "Join our Pro Members and take your health journey to the next level",

      WhyJoinPro: "Why Join Pro ?",

      UnlimitedReports: "Unlimited Reports",

      FullReportHistory: "Full Report History",

      PrintYourQuestionnaire: "Print Questionnaire with your logo",

      printYourReport: "Print Blank Reports with your logo",

      upgrade: "Upgrade",

      yearlyPurchase: "Yearly purchase",

      thisOneForPro: "Oops! This One’s for PRO Members.",

      proMembersDesc:
        "This feature is reserved for our Pro Members. Want in? Upgrade now and enjoy exclusive benefits tailored just for you!",

      UpgradeComplete: "Upgrade Complete!",

      NowAProMember: "You're Now a Pro Member!",

      UpgradeTo: "Upgrade To",

      SubscriptionCancelledSuccess: "Subscription Cancelled Successfully!",

      ConfirmSubCancel: "Are you sure you want to cancel Subscription ?",

      SubDaysRemaining: "Remaining Days of Subscription :",

      RenewSub: "Renew Subscription",

      cancelSub: "Cancel Subscription",

      renewSubConfirmation:
        "If you choose to renew now, a new billing cycle will start from today, and the remaining duration of your current subscription will no longer be valid. Are you sure you want to proceed with the renewal?",

      renew: "Renew",

      BloodPressure: "Blood Pressure",

      BloodGlucose: "Blood Glucose",

      BMI: "BMI",

      PDFDonwload: "PDF has been downloaded !",

      PDFShared: "PDF has been shared !",

      Error: "Something went wrong !",

      aboutTheApp: "About the app",

      GetStarted: "Get Started",
      systolic: "Systolic",
      diastolic: "Diastolic",
      start: "Start",
      enterRequiredFields: "Please enter all the required fields !",
      enterThisFields: "This field is required !",

      // Remaining
      exit: "Exit",
      exitApp: "Exit App",
      appExitConfirmation: "Do you want to exit the app ?",
      leavePage: "Exit Assessment ?",
      leavePageConfirmation:
        "Once you leave this page your entered data will be lost",

      downloadOptions: "Download Options",
      a4Size: "A4 size",
      usLetter: "US letter",
      pdfDownloaded: "PDF downloaded !",
      addedToGroup: "Added to group successfully !",
      success: "Success",
      exportedTo: "Exported to",

      aboutTheAppDesc:
        "This app helps to determine the “health age” of one's body according to an individual’s lifestyle practices. This app combines information from both the well-known Alameda County longevity studies and the new Adventist Health Studies. This app helps participants understand the strong correlation between one’s health habits and their risk of death. It provides an excellent basis for health counseling.",
      aboutTheAppTitle: "About the App",
    },
  },
  hi: {
    translation: {
      welcome: "स्वागत है",
      chooseLanguage: "भाषा चुनें",
      introduction: "परिचय",
      howItWorks: "यह कैसे काम करता है",
      benefits: "लाभ",
      lifestyleAffectsHealth:
        "आपकी जीवनशैली आपके स्वास्थ्य को आपकी सोच से अधिक प्रभावित करती है। आइए जानें कि आप वास्तव में कितने युवा हैं!",
      simpleScienceBacked: "सरल और विज्ञान समर्थित",
      answerQuestions:
        "अपनी आदतों के बारे में कुछ सवालों के जवाब दें, और हम वास्तविक स्वास्थ्य अंतर्दृष्टि के आधार पर आपकी स्वास्थ्य आयु की गणना करेंगे।",
      getPersonalizedTips: "व्यक्तिगत स्वास्थ्य सुझाव प्राप्त करें",
      improveLifestyle:
        "अपनी सर्वोत्तम स्वास्थ्य क्षमता तक पहुंचने के लिए अनुकूलित अनुशंसाओं के साथ अपनी जीवनशैली में सुधार करें।",

      // HomeScreen.tsx
      helpCalculateHealthAge:
        "मैं आपकी स्वास्थ्य आयु की गणना करने में आपकी मदद कर सकता हूँ।",
      startAssessment: "अपना आकलन अभी शुरू करें",
      home: "होम",
      purchases: "खरीदारियां",
      history: "इतिहास",
      dailyLimit: "दैनिक सीमा",

      // healthAgeTest.tsx
      getStarted:
        "चलिए शुरू करते हैं। आपकी स्वास्थ्य आयु आपकी जीवनशैली और आदतों पर आधारित है।",
      whatIsYourName: "आपका नाम क्या है?",
      enterName: "नाम दर्ज करें",
      next: "अगला",
      whatIsYourAge: "आपकी आयु क्या है?",
      age: "आयु",
      whatIsYourGender: "आपका लिंग क्या है?",
      gender: "लिंग",
      male: "पुरुष",
      female: "महिला",
      whatIsYourHeight: "आपकी ऊंचाई क्या है?",
      height: "ऊंचाई",
      whatIsYourWeight: "आपका वजन क्या है?",
      weight: "वजन",
      whatIsYourWaistCircumference: "आपकी कमर का घेरा क्या है?",
      waistCircumference: "कमर का घेरा",
      whatIsYourBloodPressure: "आपका रक्तचाप क्या है?",
      bloodPressure: "रक्तचाप",
      whatIsYourBloodGlucose: "आपका रक्त शर्करा स्तर क्या है?",
      fasting: "उपवास",
      postMeals: "भोजन के बाद",
      bloodGlucoseLevel: "रक्त शर्करा स्तर",

      // QuestionScreen.tsx
      newAssessment: "नया आकलन",
      howOftenEatBreakfast: "आप कितनी बार अच्छा नाश्ता करते हैं?",
      breakfastNote: "(साबुत अनाज, फल या सब्जियां, और नट्स पर जोर देते हुए)",
      lessThan2Days: "प्रति सप्ताह 2 दिन से कम",
      twoToFourDays: "प्रति सप्ताह 2-4 दिन",
      fiveToSixDays: "प्रति सप्ताह 5-6 दिन",
      everyday: "हर दिन",
      howOftenSnack: "आप कितनी बार स्नैक्स खाते हैं?",
      severalTimesDay: "दिन में कई बार",
      onceDay: "दिन में एक बार",
      fewTimesWeek: "सप्ताह में कुछ बार",
      rarelyNever: "शायद ही कभी या कभी नहीं",
      howManyFruitsVeggies: "आप प्रतिदिन कितने फल और सब्जियां खाते हैं?",
      fruitsVeggiesNote:
        "(1 सर्विंग = 1 मध्यम टुकड़ा, 1 कप ताजा, 1/2 कप पका हुआ, या 6 औंस 100% रस)",
      howManyWholeGrains: "आप प्रतिदिन कितने साबुत अनाज खाते हैं?",
      wholeGrainsNote:
        "(1 सर्विंग = 1 स्लाइस ब्रेड, 1/2 कप ब्राउन राइस या ओटमील, 2/3 कप सूखा अनाज)",
      none: "कोई नहीं",
      back: "वापस",
      howManyNutsSeeds: "आप प्रति सप्ताह कितने नट्स और बीज खाते हैं?",
      nutsSeedsNote: "(1 सर्विंग = 1 औंस नट्स या बीज, 2 टी नट बटर)",
      howOftenRedMeat: "आप कितनी बार लाल मांस खाते हैं?",
      threeOrMoreTimesWeek: "प्रति सप्ताह 3 या अधिक बार",
      onceTwiceMonth: "महीने में एक या दो बार",
      never: "कभी नहीं",
      howOftenExercise:
        "आप कितनी बार 20-30 मिनट का मध्यम से जोरदार व्यायाम करते हैं?",
      rarely: "शायद ही कभी",
      oneTwoDaysWeek: "प्रति सप्ताह 1-2 दिन",
      threeFourDaysWeek: "प्रति सप्ताह 3-4 दिन",
      fiveMoreDaysWeek: "प्रति सप्ताह 5 या अधिक दिन",
      howIsWeight: "आपका वजन कैसा है?",
      severelyOverweight: "गंभीर रूप से अधिक वजन",
      moderatelyOverweight: "मध्यम रूप से अधिक वजन",
      underweight: "कम वजन",
      healthyWeight: "स्वस्थ वजन",
      howOftenSleep: "आप कितनी बार 7-8 घंटे की नींद लेते हैं?",
      twoOrFewerDays: "प्रति सप्ताह 2 या उससे कम दिन",
      threeFourDays: "प्रति सप्ताह 3-4 दिन",
      fiveSixDays: "प्रति सप्ताह 5-6 दिन",
      whatIsTobaccoHistory: "तंबाकू के साथ आपका इतिहास क्या है?",
      currentlyUse: "वर्तमान में उपयोग करें",
      quitLessThanTwoYears: "2 साल से कम पहले छोड़ दिया",
      quitOverTwoYears: "2 साल से अधिक पहले छोड़ दिया",
      neverUsed: "कभी उपयोग नहीं किया",
      howManyAlcohol: "आप प्रति सप्ताह शराब की कितनी सर्विंग का सेवन करते हैं?",
      alcoholNote: "(12 औंस बीयर, 8 औंस माल्ट शराब, 5 औंस वाइन, 1.5 औंस शॉट)",
      excessiveAlcohol: "15+ (पुरुष) या 8+ (महिला)",
      howRateSpirituality: "आप अपनी आध्यात्मिकता को कैसे रेट करेंगे?",
      noInterest: "कोई दिलचस्पी नहीं",
      moderatelySpiritual: "मध्यम रूप से आध्यात्मिक",
      deeplySpiritual: "गहराई से आध्यात्मिक",

      // interestScreen

      Is_Interests: "रुचियाँ",
      Is_TellYourInterest:
        "अपने अनुभव को अनुकूलित करने के लिए हमें बताएं कि आपकी किसमें रुचि है।",
      Is_WeightManagement: "वजन प्रबंधन",
      Is_FitAndExercise: "फिटनेस और व्यायाम",
      Is_StopSmoking: "धूम्रपान बंद करें",
      Is_HealthyCooking: "स्वस्थ खाना बनाना",
      Is_StressReduction: "तनाव में कमी",
      Is_PreventHeartDisease: "हृदय रोग की रोकथाम",
      Is_DepressionRecovery: "अवसाद से उबरना",
      Is_ReversingDiabetes: "मधुमेह को उलटना",
      Is_NaturalRemedies: "प्राकृतिक उपचार",
      Is_SpiritualHealth: "आध्यात्मिक स्वास्थ्य",
      Is_ImprovingMentalPerformance: "मानसिक प्रदर्शन में सुधार",
      Is_Other: "अन्य",
      Is_Name: "नाम",
      Is_Email: "ईमेल",
      Is_Address: "पता",
      Is_Phone: "फ़ोन",
      Is_Zip: "ज़िप",
      Is_ShowReport: "रिपोर्ट दिखाएं",

      // reportScreen

      Rs_Report: "रिपोर्ट",
      Rs_CustomizedReport: "इसके लिए अनुकूलित रिपोर्ट:",
      Rs_YourHealthAge: "आपकी स्वास्थ्य आयु है",
      Rs_YourActualAge: "आपकी वास्तविक आयु",
      Rs_CurrentAge: "वर्तमान आयु",
      Rs_HealthAge: "स्वास्थ्य आयु",
      Rs_PotentialAge: "संभावित आयु",
      Rs_HealthyHabitsParagraph:
        "कई बड़े शोध अध्ययनों, जिनमें प्रसिद्ध अलामेडा काउंटी अध्ययन और एडवेंटिस्ट स्वास्थ्य अध्ययन शामिल हैं, नीचे सूचीबद्ध स्वास्थ्य आदतों और किसी व्यक्ति के रोग/मृत्यु के जोखिम के बीच एक मजबूत संबंध प्रकट करते हैं। इन सभी स्वस्थ आदतों का अभ्यास करने वाले व्यक्ति अपनी दीर्घायु को लगभग 30 वर्षों तक प्रभावित कर सकते हैं।",
      Rs_MedicalDisclaimerTitle: "चिकित्सा अस्वीकरण",
      Rs_MedicalDisclaimerText:
        "हेल्थ एज केवल सूचनात्मक और शैक्षिक उद्देश्यों के लिए है। यह चिकित्सा निदान नहीं है और पेशेवर चिकित्सा सलाह, निदान या उपचार के विकल्प के रूप में उपयोग नहीं किया जाना चाहिए। अपने स्वास्थ्य देखभाल में कोई भी चिकित्सा निर्णय या परिवर्तन करने से पहले हमेशा एक योग्य स्वास्थ्य देखभाल पेशेवर से परामर्श करें।",
      Rs_MedicalSources: "चिकित्सा स्रोत",
      Rs_Source: "स्रोत",
      Rs_Recommendations: "सिफारिशें",
      Rs_1_title: "प्रतिदिन अच्छा नाश्ता करें",
      Rs_1_desc:
        "नाश्ता चयापचय को बढ़ाता है, एकाग्रता में मदद करता है, और स्कूल और काम पर प्रदर्शन में सुधार करता है। यह स्वस्थ वजन बनाए रखने में भी सहायता करता है।",
      Rs_2_title: "स्नैकिंग से बचें",
      Rs_2_desc:
        "स्नैकिंग से औसतन 580 कैलोरी प्रति दिन बढ़ सकती है, पाचन क्रिया खराब हो सकती है, रक्त शर्करा नियंत्रण बाधित हो सकता है और वजन बढ़ सकता है।",
      Rs_3_title: "अधिक फलों और सब्जियों का आनंद लें",
      Rs_3_desc:
        "फल और सब्जियां फाइटोकेमिकल्स, विटामिन और फाइबर से भरपूर होती हैं जबकि कैलोरी में कम होती हैं।",
      Rs_4_title: "साबुत अनाज का सेवन बढ़ाएँ",
      Rs_4_desc:
        "साबुत अनाज में फाइबर, बी विटामिन और आवश्यक खनिज होते हैं जो समग्र स्वास्थ्य का समर्थन करते हैं।",
      Rs_5_title: "अधिक नट्स खाएं",
      Rs_5_desc:
        "नट्स प्रोटीन और स्वस्थ वसा का एक उत्कृष्ट स्रोत हैं, और वे रक्त शर्करा के स्तर को नियंत्रित करने में मदद करते हैं।",
      Rs_6_title: "लाल मांस से बचें",
      Rs_6_desc:
        "लाल मांस खाने से टाइप 2 मधुमेह, हृदय रोग, स्ट्रोक और कुछ कैंसर का खतरा बढ़ जाता है।",
      Rs_7_title: "नियमित रूप से व्यायाम करें",
      Rs_7_desc:
        "व्यायाम ऊर्जा को बढ़ाता है, मनोदशा और कोलेस्ट्रॉल के स्तर में सुधार करता है, रक्तचाप को कम करता है, नींद को बढ़ाता है, प्रतिरक्षा को मजबूत करता है और रक्त शर्करा को नियंत्रित करने में मदद करता है।",
      Rs_8_title: "स्वस्थ वजन प्राप्त करें",
      Rs_8_desc:
        "18.5 - 24.9 के बीच बीएमआई और स्वस्थ कमर का घेरा बनाए रखें (पुरुषों के लिए 40 इंच से कम, महिलाओं के लिए 35 इंच)।",
      Rs_9_title: "प्रत्येक रात 7-8 घंटे की अच्छी नींद लें",
      Rs_9_desc:
        "पर्याप्त नींद याददाश्त, सीखने, चयापचय और प्रतिरक्षा कार्य का समर्थन करती है।",
      Rs_10_title: "धूम्रपान बंद करें",
      Rs_10_desc:
        "धूम्रपान शरीर के हर अंग को नुकसान पहुंचाता है, कैंसर, हृदय रोग, सीओपीडी, अस्थमा और दंत समस्याओं के खतरे को बढ़ाता है।",
      Rs_11_title: "शराब न पिएं",
      Rs_11_desc:
        "शराब के उपयोग से तंत्रिका संबंधी, हृदय संबंधी और मनोरोग संबंधी समस्याएं हो सकती हैं, साथ ही कैंसर और यकृत रोग का खतरा भी बढ़ सकता है।",
      Rs_12_title: "आध्यात्मिकता बढ़ाएँ",
      Rs_12_desc:
        "भगवान में विश्वास मानसिक स्वास्थ्य में सुधार कर सकता है और प्रतिरक्षा कार्य को मजबूत कर सकता है।",
      Rs_SavePdf: "पीडीएफ सहेजें",
      Rs_ShareReport: "रिपोर्ट साझा करें",

      // history screen

      Hs_List: "सूची",
      Hs_Group: "समूह",
      Hs_View: "देखें",
      Hs_Filter: "फ़िल्टर",
      Hs_Options: "विकल्प",
      Hs_Export: "निर्यात करें",
      Hs_Delete: "हटाएं",
      Hs_Search: "खोजें",
      Hs_ExportAsCSV: "CSV के रूप में निर्यात करें",
      Hs_Confirmation: "क्या आप वाकई हटाना चाहते हैं?",
      Hs_Success: "आइटम हटाया गया",
      Hs_Cancel: "रद्द करें",
      Hs_ItemsSelected: "चयनित आइटम",
      Hs_SelectAll: "सभी चुनें",
      Hs_NewGroup: "नया समूह",
      Hs_ExistingGroup: "मौजूदा समूह",
      Hs_Create: "बनाएं",
      Hs_GroupName: "समूह का नाम",
      Hs_EnterGroupName: "समूह का नाम दर्ज करें",
      Hs_Reports: "रिपोर्ट्स",
      Hs_save: "सहेजें",
      Hs_Nothing: "यहां अभी कुछ नहीं है!",
      Hs_NothingDesc:
        "आकलन पूरा करने के बाद आपकी स्वास्थ्य आयु रिपोर्ट यहां दिखाई देगी।",
      Hs_Download: "डाउनलोड करें",
      Hs_LanguageChanged: "भाषा सफलतापूर्वक बदली गई",
      Hs_Change: "बदलें",

      // Filter Screen
      Fs_Filter: "इसके द्वारा फ़िल्टर करें",
      Fs_Close: "बंद करें",
      Fs_Date: "तारीख",
      Fs_From: "से",
      Fs_To: "तक",
      Fs_ClearAll: "सभी साफ़ करें",
      Fs_ShowResults: "परिणाम दिखाएं",

      // others

      select: "चुनें",
      total: "कुल",
      purchase: "खरीदें",
      aboutProgramme: "कार्यक्रम के बारे में",
      reports: "रिपोर्ट्स",
      PrintQuestion: "प्रश्नावली प्रिंट करें",
      PrintReport: "खाली रिपोर्ट प्रिंट करें",
      reportSetting: "रिपोर्ट सेटिंग्स",
      changeLanguage: "भाषा बदलें",
      uploadLogo: "अपना लोगो अपलोड करें",
      upload: "अपलोड करें",
      contactDetails: "संपर्क विवरण",
      enterAddress: "पता दर्ज करें",
      enterPhone: "फ़ोन नंबर दर्ज करें",
      createGroup: "समूह बनाएं",

      // blood

      normalBp: "आपका रक्तचाप सामान्य है।",
      MaintainBp: "कृपया अपने रक्तचाप को बनाए रखें।",
      bpRange: "सामान्य सीमा 90-119/60-79 mmHg है।",
      normalGlucoseLevel: "आपका रक्त ग्लूकोज स्तर सामान्य है।",
      maintainGlucoseLevel: "कृपया अपने रक्त ग्लूकोज स्तर को बनाए रखें।",
      normalRangeGlucose: "सामान्य सीमा है",
      for: "के लिए",
      postMeal: "भोजन के बाद",
      test: "जांच",
      maintainBloodGlucose: "अपने रक्त शर्करा स्तर को बनाए रखें",
      maintainLowBloodGlucoseDesc:
        "आपका रक्त शर्करा स्तर कम है, स्थिर रक्त शर्करा जटिलताओं को रोकता है, ऊर्जा बढ़ाता है, और समग्र स्वास्थ्य को समर्थन देता है। संतुलित भोजन और व्यायाम इसे नियंत्रण में रखने में मदद करते हैं!",
      maintainHighBloodGlucoseDesc:
        "आपका रक्त शर्करा स्तर अधिक है, स्थिर रक्त शर्करा जटिलताओं को रोकता है, ऊर्जा बढ़ाता है, और समग्र स्वास्थ्य को समर्थन देता है। संतुलित भोजन और व्यायाम इसे नियंत्रण में रखने में मदद करते हैं!",

      maintainBloodPressure: "रक्तचाप को नियंत्रण में रखें",
      maintainBloodPressureDesc:
        "स्वस्थ रक्तचाप बनाए रखना हृदय रोग, स्ट्रोक और किडनी की समस्याओं के जोखिम को कम करता है। नियमित व्यायाम और संतुलित आहार से बड़ा फर्क पड़ सकता है!",
      maintainLowBloodPressureDesc:
        "आपका रक्तचाप स्तर कम है, स्वस्थ रक्तचाप बनाए रखना हृदय रोग, स्ट्रोक और किडनी की समस्याओं के जोखिम को कम करता है। नियमित व्यायाम और संतुलित आहार से बड़ा फर्क पड़ सकता है!",
      maintainHighBloodPressureDesc:
        "आपका रक्तचाप स्तर अधिक है, स्वस्थ रक्तचाप बनाए रखना हृदय रोग, स्ट्रोक और किडनी की समस्याओं के जोखिम को कम करता है। नियमित व्यायाम और संतुलित आहार से बड़ा फर्क पड़ सकता है!",
      discoverHealthAge: "अपनी स्वास्थ्य आयु का पता लगाएं!",
      downloadSuccess: "सफलतापूर्वक डाउनलोड किया गया",
      goBackConfirmation: "क्या आप वाकई वापस जाना चाहते हैं?",
      pleaseWait: "कृपया प्रतीक्षा करें!",

      // Purchase Screen

      goBeyond: "बुनियादी बातों से आगे बढ़ें!",

      JoinPro:
        "हमारे प्रो सदस्यों में शामिल हों और अपनी स्वास्थ्य यात्रा को अगले स्तर पर ले जाएं",

      WhyJoinPro: "प्रो में क्यों शामिल हों?",

      UnlimitedReports: "असीमित रिपोर्ट",

      FullReportHistory: "पूरी रिपोर्ट का इतिहास",

      PrintYourQuestionnaire: "अपने लोगो के साथ प्रश्नावली प्रिंट करें",

      printYourReport: "अपने लोगो के साथ खाली रिपोर्ट प्रिंट करें",

      upgrade: "अपग्रेड करें",

      yearlyPurchase: "वार्षिक खरीद",

      thisOneForPro: "ऊप्स! यह प्रो सदस्यों के लिए है।",

      proMembersDesc:
        "यह सुविधा हमारे प्रो सदस्यों के लिए आरक्षित है। शामिल होना चाहते हैं? अभी अपग्रेड करें और विशेष लाभों का आनंद लें जो विशेष रूप से आपके लिए तैयार किए गए हैं!",

      UpgradeComplete: "अपग्रेड पूरा हुआ!",

      NowAProMember: "अब आप एक प्रो सदस्य हैं!",

      UpgradeTo: "अपग्रेड करें",

      SubscriptionCancelledSuccess: "सदस्यता सफलतापूर्वक रद्द की गई!",

      ConfirmSubCancel: "क्या आप वाकई सदस्यता रद्द करना चाहते हैं?",

      SubDaysRemaining: "सदस्यता के शेष दिन :",

      RenewSub: "सदस्यता नवीनीकरण करें",

      cancelSub: "सदस्यता रद्द करें",

      renewSubConfirmation:
        "यदि आप अभी नवीनीकरण करना चुनते हैं, तो आज से एक नया बिलिंग चक्र शुरू हो जाएगा, और आपकी वर्तमान सदस्यता की शेष अवधि अब मान्य नहीं रहेगी। क्या आप वाकई नवीनीकरण जारी रखना चाहते हैं?",

      renew: "नवीनीकरण करें",

      BloodPressure: "रक्तचाप",

      BloodGlucose: "रक्त ग्लूकोज़",

      BMI: "बीएमआई",

      PDFDonwload: "पीडीएफ़ डाउनलोड कर लिया गया है!",

      PDFShared: "पीडीएफ़ साझा कर दिया गया है!",

      Error: "कुछ गलत हो गया!",

      aboutTheApp: "एप्लिकेशन के बारे में",
      GetStarted: "शुरू करें",
      systolic: "सिस्टोलिक",
      diastolic: "डायस्टोलिक",
      start: "प्रारंभ करें",
      enterRequiredFields: "कृपया सभी आवश्यक फ़ील्ड भरें!",
      enterThisFields: "यह फ़ील्ड आवश्यक है!",

      exit: "बाहर निकलें",
      exitApp: "ऐप से बाहर निकलें",
      appExitConfirmation: "क्या आप ऐप से बाहर निकलना चाहते हैं?",
      leavePage: "आकलन से बाहर निकलें?",
      leavePageConfirmation:
        "एक बार इस पेज से बाहर जाने पर आपकी डाली गई जानकारी खो जाएगी",

      downloadOptions: "डाउनलोड विकल्प",
      a4Size: "ए4 आकार",
      usLetter: "यूएस लेटर",
      pdfDownloaded: "PDF डाउनलोड हो गया!",
      addedToGroup: "समूह में सफलतापूर्वक जोड़ा गया!",
      success: "सफलता",
      exportedTo: "निर्यात किया गया:",
      "aboutTheAppDesc": "यह ऐप किसी व्यक्ति की जीवनशैली की आदतों के अनुसार उसके शरीर की \"स्वास्थ्य आयु\" निर्धारित करने में मदद करता है। यह ऐप प्रसिद्ध अल्मेडा काउंटी दीर्घायु अध्ययनों और नए एडवेंटिस्ट स्वास्थ्य अध्ययनों दोनों से जानकारी को जोड़ता है। यह ऐप प्रतिभागियों को किसी की स्वास्थ्य आदतों और मृत्यु के जोखिम के बीच मजबूत संबंध को समझने में मदद करता है। यह स्वास्थ्य परामर्श के लिए एक उत्कृष्ट आधार प्रदान करता है।",
    "aboutTheAppTitle": "ऐप के बारे में"
    },
  },
  es: {
    translation: {
      welcome: "Bienvenido",
      chooseLanguage: "Elige el Idioma",
      introduction: "Introducción",
      howItWorks: "Cómo funciona",
      benefits: "Beneficios",
      lifestyleAffectsHealth:
        "Tu estilo de vida afecta tu salud más de lo que piensas. ¡Descubramos cuán joven eres realmente!",
      simpleScienceBacked: "Simple y Basado en la Ciencia",
      answerQuestions:
        "Responde unas pocas preguntas sobre tus hábitos y calcularemos tu Edad de Salud basada en información de salud real.",
      getPersonalizedTips: "Obtén Consejos de Salud Personalizados",
      improveLifestyle:
        "Mejora tu estilo de vida con recomendaciones personalizadas para alcanzar tu mejor potencial de salud.",
      helpCalculateHealthAge: "Puedo ayudarte a calcular tu edad de salud.",
      startAssessment: "Comienza tu evaluación ahora",
      home: "Inicio",
      purchases: "Compras",
      history: "Historial",
      dailyLimit: "Límite Diario",
      getStarted:
        "Comencemos. Tu edad de salud se basa en tu estilo de vida y hábitos.",
      whatIsYourName: "¿Cuál es tu nombre?",
      enterName: "Ingresa el Nombre",
      next: "Siguiente",
      whatIsYourAge: "¿Cuál es tu edad?",
      age: "Edad",
      whatIsYourGender: "¿Cuál es tu género?",
      gender: "Género",
      male: "Masculino",
      female: "Femenino",
      whatIsYourHeight: "¿Cuál es tu altura?",
      height: "Altura",
      whatIsYourWeight: "¿Cuál es tu peso?",
      weight: "Peso",
      whatIsYourWaistCircumference: "¿Cuál es tu circunferencia de cintura?",
      waistCircumference: "Circunferencia de cintura",
      whatIsYourBloodPressure: "¿Cuál es tu presión arterial?",
      bloodPressure: "Presión arterial",
      whatIsYourBloodGlucose: "¿Cuál es tu nivel de glucosa en sangre?",
      fasting: "En ayunas",
      postMeals: "Después de las comidas",
      bloodGlucoseLevel: "Nivel de glucosa en sangre",
      newAssessment: "Nueva Evaluación",
      howOftenEatBreakfast: "¿Con qué frecuencia tomas un buen desayuno?",
      breakfastNote: "(Enfatizando granos enteros, frutas o verduras y nueces)",
      lessThan2Days: "Menos de 2 días por semana",
      twoToFourDays: "2-4 días por semana",
      fiveToSixDays: "5-6 días por semana",
      everyday: "Todos los días",
      howOftenSnack: "¿Con qué frecuencia comes entre horas?",
      severalTimesDay: "Varias veces al día",
      onceDay: "Una vez al día",
      fewTimesWeek: "Unas pocas veces por semana",
      rarelyNever: "Rara vez o nunca",
      howManyFruitsVeggies:
        "¿Cuántas porciones de frutas y verduras comes al día?",
      fruitsVeggiesNote:
        "(1 porción = 1 pieza mediana, 1 taza fresca, 1/2 taza cocida o 6 oz de jugo 100%)",
      howManyWholeGrains: "¿Cuántas porciones de granos enteros comes al día?",
      wholeGrainsNote:
        "(1 porción = 1 rebanada de pan, 1/2 taza de arroz integral o avena, 2/3 taza de cereal seco)",
      none: "Ninguna",
      back: "Atrás",
      howManyNutsSeeds:
        "¿Cuántas porciones de nueces y semillas comes a la semana?",
      nutsSeedsNote:
        "(1 porción = 1 oz de nueces o semillas, 2 cucharadas de mantequilla de nueces)",
      howOftenRedMeat: "¿Con qué frecuencia comes carne roja?",
      threeOrMoreTimesWeek: "3 o más veces por semana",
      onceTwiceMonth: "Una o dos veces al mes",
      never: "Nunca",
      howOftenExercise:
        "¿Con qué frecuencia haces 20-30 minutos de ejercicio moderado a vigoroso?",
      rarely: "Rara vez",
      oneTwoDaysWeek: "1-2 días por semana",
      threeFourDaysWeek: "3-4 días por semana",
      fiveMoreDaysWeek: "5 o más días por semana",
      howIsWeight: "¿Cómo está tu peso?",
      severelyOverweight: "Severamente con sobrepeso",
      moderatelyOverweight: "Moderadamente con sobrepeso",
      underweight: "Bajo peso",
      healthyWeight: "Peso saludable",
      howOftenSleep: "¿Con qué frecuencia duermes 7-8 horas?",
      twoOrFewerDays: "2 o menos días por semana",
      threeFourDays: "3-4 días por semana",
      fiveSixDays: "5-6 días por semana",
      whatIsTobaccoHistory: "¿Cuál es tu historial con el tabaco?",
      currentlyUse: "Uso actual",
      quitLessThanTwoYears: "Dejé hace menos de 2 años",
      quitOverTwoYears: "Dejé hace más de 2 años",
      neverUsed: "Nunca usé",
      howManyAlcohol: "¿Cuántas porciones de alcohol consumes a la semana?",
      alcoholNote:
        "(cerveza de 12 oz, licor de malta de 8 oz, vino de 5 oz, trago de 1.5 oz)",
      excessiveAlcohol: "15+ (hombres) u 8+ (mujeres)",
      howRateSpirituality: "¿Cómo calificarías tu espiritualidad?",
      noInterest: "Sin interés",
      moderatelySpiritual: "Moderadamente espiritual",
      deeplySpiritual: "Profundamente espiritual",
      Is_Interests: "Intereses",
      Is_TellYourInterest:
        "Dinos qué te interesa para personalizar tu experiencia.",
      Is_WeightManagement: "Control de Peso",
      Is_FitAndExercise: "Fitness y Ejercicio",
      Is_StopSmoking: "Dejar de Fumar",
      Is_HealthyCooking: "Cocina Saludable",
      Is_StressReduction: "Reducción del Estrés",
      Is_PreventHeartDisease: "Prevención de Enfermedades Cardíacas",
      Is_DepressionRecovery: "Recuperación de la Depresión",
      Is_ReversingDiabetes: "Reversión de la Diabetes",
      Is_NaturalRemedies: "Remedios Naturales",
      Is_SpiritualHealth: "Salud Espiritual",
      Is_ImprovingMentalPerformance: "Mejora del Rendimiento Mental",
      Is_Other: "Otro",
      Is_Name: "Nombre",
      Is_Email: "Correo Electrónico",
      Is_Address: "Dirección",
      Is_Phone: "Teléfono",
      Is_Zip: "Código Postal",
      Is_ShowReport: "Mostrar Informe",
      Rs_Report: "Informe",
      Rs_CustomizedReport: "Informe Personalizado para:",
      Rs_YourHealthAge: "Tu edad de salud es",
      Rs_YourActualAge: "Tu edad real de",
      Rs_CurrentAge: "Edad Actual",
      Rs_HealthAge: "Edad de Salud",
      Rs_PotentialAge: "Edad Potencial",
      Rs_HealthyHabitsParagraph:
        "Varios grandes estudios de investigación, incluido el conocido Estudio del Condado de Alameda y los Estudios de Salud Adventista, revelan una fuerte correlación entre los hábitos de salud enumerados a continuación y el riesgo de enfermedad/muerte. Las personas que practican todos estos hábitos saludables pueden influir en su longevidad en casi 30 años.",
      Rs_MedicalDisclaimerTitle: "Descargo de responsabilidad médica",
      Rs_MedicalDisclaimerText:
        "Health Age está destinado únicamente a fines informativos y educativos. No es un diagnóstico médico y no debe utilizarse como sustituto del asesoramiento, diagnóstico o tratamiento médico profesional. Siempre consulte a un profesional de la salud calificado antes de tomar decisiones médicas o realizar cambios en su atención médica.",
      Rs_MedicalSources: "Fuentes médicas",
      Rs_Source: "Fuente",
      Rs_Recommendations: "Recomendaciones",
      Rs_1_title: "Come un buen desayuno diariamente",
      Rs_1_desc:
        "El desayuno impulsa el metabolismo, ayuda con la concentración y mejora el rendimiento en la escuela y el trabajo. También ayuda a mantener un peso saludable.",
      Rs_2_title: "Evita comer entre horas",
      Rs_2_desc:
        "Comer entre horas puede agregar un promedio de 580 calorías por día, perjudicar la digestión, interrumpir el control del azúcar en sangre y contribuir al aumento de peso.",
      Rs_3_title: "Disfruta más frutas y verduras",
      Rs_3_desc:
        "Las frutas y verduras son ricas en fitoquímicos, vitaminas y fibra, y a la vez bajas en calorías.",
      Rs_4_title: "Aumenta la ingesta de granos enteros",
      Rs_4_desc:
        "Los granos enteros contienen fibra, vitaminas B y minerales esenciales que apoyan la salud general.",
      Rs_5_title: "Come más nueces",
      Rs_5_desc:
        "Las nueces son una excelente fuente de proteínas y grasas saludables, y ayudan a regular los niveles de azúcar en sangre.",
      Rs_6_title: "Evita la carne roja",
      Rs_6_desc:
        "Comer carne roja se ha relacionado con la diabetes tipo 2, enfermedades cardíacas, accidentes cerebrovasculares y ciertos tipos de cáncer.",
      Rs_7_title: "Haz ejercicio regularmente",
      Rs_7_desc:
        "El ejercicio aumenta la energía, mejora el estado de ánimo y los niveles de colesterol, reduce la presión arterial, mejora el sueño, fortalece la inmunidad y ayuda a controlar el azúcar en sangre.",
      Rs_8_title: "Alcanza un peso saludable",
      Rs_8_desc:
        "Mantén un IMC entre 18.5 y 24.9 y una circunferencia de cintura saludable (menos de 40 pulgadas para hombres, 35 pulgadas para mujeres).",
      Rs_9_title: "Duerme 7-8 horas de buen sueño cada noche",
      Rs_9_desc:
        "El sueño adecuado apoya la memoria, el aprendizaje, el metabolismo y la función inmunológica.",
      Rs_10_title: "Deja de fumar",
      Rs_10_desc:
        "Fumar daña todos los órganos del cuerpo, aumentando el riesgo de cánceres, enfermedades cardíacas, EPOC, asma y problemas dentales.",
      Rs_11_title: "No bebas alcohol",
      Rs_11_desc:
        "El consumo de alcohol puede causar problemas neurológicos, cardiovasculares y psiquiátricos, además de aumentar el riesgo de cáncer y enfermedades hepáticas.",
      Rs_12_title: "Aumenta la espiritualidad",
      Rs_12_desc:
        "La fe en Dios puede mejorar la salud mental y fortalecer la función inmunológica.",
      Rs_SavePdf: "Guardar pdf",
      Rs_ShareReport: "Compartir Informe",
      Hs_List: "Lista",
      Hs_Group: "Grupo",
      Hs_View: "Ver",
      Hs_Filter: "Filtrar",
      Hs_Options: "Opciones",
      Hs_Export: "Exportar",
      Hs_Delete: "Eliminar",
      Hs_Search: "Buscar",
      Hs_ExportAsCSV: "Exportar como CSV",
      Hs_Confirmation: "¿Estás seguro de que quieres eliminar?",
      Hs_Success: "Elemento Eliminado",
      Hs_Cancel: "Cancelar",
      Hs_ItemsSelected: "Elementos Seleccionados",
      Hs_SelectAll: "Seleccionar todo",
      Hs_NewGroup: "Nuevo Grupo",
      Hs_ExistingGroup: "Grupo Existente",
      Hs_Create: "Crear",
      Hs_GroupName: "Nombre del Grupo",
      Hs_EnterGroupName: "Ingresa el nombre del grupo",
      Hs_Reports: "Informes",
      Hs_save: "Guardar",
      Hs_Nothing: "¡Nada aquí todavía!",
      Hs_NothingDesc:
        "Tus informes de edad de salud aparecerán aquí una vez que completes la evaluación.",
      Hs_Download: "Descargar",
      Hs_LanguageChanged: "Idioma cambiado con éxito",
      Hs_Change: "Cambiar",
      Fs_Filter: "Filtrar por",
      Fs_Close: "Cerrar",
      Fs_Date: "Fecha",
      Fs_From: "Desde",
      Fs_To: "Hasta",
      Fs_ClearAll: "Limpiar todo",
      Fs_ShowResults: "Mostrar resultados",

      //others

      select: "Seleccionar",
      total: "Total",
      purchase: "Compra",
      aboutProgramme: "Sobre el Programa",
      reports: "Informes",
      PrintQuestion: "Imprimir Cuestionario",
      PrintReport: "Imprimir Informe en Blanco",
      reportSetting: "Configuración del Informe",
      changeLanguage: "Cambiar Idioma",
      uploadLogo: "Subir su logo",
      upload: "Subir",
      contactDetails: "Detalles de Contacto",
      enterAddress: "Introducir Dirección",
      enterPhone: "Introducir Número de Teléfono",
      createGroup: "Crear Grupo",

      // blood

      normalBp: "Su presión arterial es normal",
      MaintainBp: "Por favor, mantenga su presión arterial",
      bpRange: "El rango normal es 90-119/60-79 mmHg.",
      normalGlucoseLevel: "Su nivel de glucosa en sangre es normal",
      maintainGlucoseLevel: "Por favor, mantenga su nivel de glucosa en sangre",
      normalRangeGlucose: "El rango normal es",
      for: "para",
      postMeal: "después de comer",
      test: "prueba",
      maintainBloodGlucose: "Mantén tus niveles de glucosa en sangre",
      maintainLowBloodGlucoseDesc:
        "Tus niveles de glucosa en sangre son bajos. Mantener una glucosa estable previene complicaciones, aumenta la energía y apoya la salud en general. ¡Una alimentación equilibrada y el ejercicio ayudan a mantenerla bajo control!",
      maintainHighBloodGlucoseDesc:
        "Tus niveles de glucosa en sangre son altos. Mantener una glucosa estable previene complicaciones, aumenta la energía y apoya la salud en general. ¡Una alimentación equilibrada y el ejercicio ayudan a mantenerla bajo control!",
      maintainBloodPressure: "Mantén la presión arterial bajo control",
      maintainBloodPressureDesc:
        "Mantener una presión arterial saludable reduce el riesgo de enfermedades cardíacas, accidentes cerebrovasculares y problemas renales. ¡El ejercicio regular y una dieta equilibrada pueden marcar la diferencia!",
      maintainLowBloodPressureDesc:
        "Tus niveles de presión arterial son bajos. Mantener una presión arterial saludable reduce el riesgo de enfermedades cardíacas, accidentes cerebrovasculares y problemas renales. ¡El ejercicio regular y una dieta equilibrada pueden marcar la diferencia!",
      maintainHighBloodPressureDesc:
        "Tus niveles de presión arterial son altos. Mantener una presión arterial saludable reduce el riesgo de enfermedades cardíacas, accidentes cerebrovasculares y problemas renales. ¡El ejercicio regular y una dieta equilibrada pueden marcar la diferencia!",
      discoverHealthAge: "¡Descubre tu Edad de Salud!",
      downloadSuccess: "Descarga Exitosa",
      goBackConfirmation: "¿Estás seguro de que quieres regresar?",
      pleaseWait: "¡Por favor, espera!",

      goBeyond: "¡Ve más allá de lo básico!",

      JoinPro:
        "Únete a nuestros Miembros Pro y lleva tu viaje de salud al siguiente nivel",

      WhyJoinPro: "¿Por qué unirse a Pro?",

      UnlimitedReports: "Informes Ilimitados",

      FullReportHistory: "Historial Completo de Informes",

      PrintYourQuestionnaire: "Imprime el Cuestionario con tu logo",

      printYourReport: "Imprime Informes en Blanco con tu logo",

      upgrade: "Actualizar",

      yearlyPurchase: "Compra anual",

      thisOneForPro: "¡Ups! Esto es para Miembros PRO.",

      proMembersDesc:
        "Esta función está reservada para nuestros Miembros Pro. ¿Quieres unirte? ¡Actualiza ahora y disfruta de beneficios exclusivos diseñados solo para ti!",

      UpgradeComplete: "¡Actualización Completa!",

      NowAProMember: "¡Ahora eres Miembro Pro!",
      UpgradeTo: "Actualizar a",
      SubscriptionCancelledSuccess: "¡Suscripción cancelada con éxito!",
      ConfirmSubCancel: "¿Estás seguro de que deseas cancelar la suscripción?",
      SubDaysRemaining: "Días restantes de suscripción:",
      RenewSub: "Renovar suscripción",
      cancelSub: "Cancelar suscripción",
      renewSubConfirmation:
        "Si eliges renovar ahora, un nuevo ciclo de facturación comenzará hoy y la duración restante de tu suscripción actual ya no será válida. ¿Estás seguro de que deseas continuar con la renovación?",
      renew: "Renovar",
      BloodPressure: "Presión arterial",
      BloodGlucose: "Glucosa en sangre",
      BMI: "IMC",
      PDFDonwload: "¡El PDF ha sido descargado!",
      PDFShared: "¡El PDF ha sido compartido!",
      Error: "¡Algo salió mal!",
      aboutTheApp: "Sobre la aplicación",
      GetStarted: "Comenzar",
      systolic: "Sistólica",
      diastolic: "Diastólica",
      start: "Iniciar",
      enterRequiredFields: "¡Por favor, completa todos los campos requeridos!",
      enterThisFields: "¡Este campo es obligatorio!",

      exit: "Salir",
      exitApp: "Salir de la aplicación",
      appExitConfirmation: "¿Quieres salir de la aplicación?",
      leavePage: "¿Salir de la evaluación?",
      leavePageConfirmation:
        "Una vez que salgas de esta página, los datos ingresados se perderán",

      downloadOptions: "Opciones de descarga",
      a4Size: "Tamaño A4",
      usLetter: "Carta estadounidense",
      pdfDownloaded: "¡PDF descargado!",
      addedToGroup: "¡Agregado al grupo con éxito!",
      success: "Éxito",
      exportedTo: "Exportado a",
       "aboutTheAppDesc": "Esta aplicación ayuda a determinar la 'edad de salud' del cuerpo de una persona según sus hábitos de estilo de vida. Combina información de los conocidos estudios de longevidad del Condado de Alameda y los nuevos Estudios de Salud Adventistas. Esta aplicación ayuda a los participantes a comprender la fuerte correlación entre los hábitos de salud y el riesgo de muerte. Proporciona una excelente base para el asesoramiento de salud.",
    "aboutTheAppTitle": "Acerca de la aplicación"
    },
  },
  ja: {
    translation: {
      welcome: "ようこそ",
      chooseLanguage: "言語を選択",
      introduction: "はじめに",
      howItWorks: "仕組み",
      benefits: "利点",
      lifestyleAffectsHealth:
        "あなたのライフスタイルは思っている以上に健康に影響を与えます。本当の年齢を調べてみましょう！",
      simpleScienceBacked: "シンプルで科学的根拠に基づいています",
      answerQuestions:
        "あなたの習慣に関するいくつかの質問に答えてください。実際の健康に関する洞察に基づいて健康年齢を計算します。",
      getPersonalizedTips: "パーソナライズされた健康のヒントを入手",
      improveLifestyle:
        "最高の健康状態に到達するためのカスタマイズされた推奨事項でライフスタイルを改善します。",
      helpCalculateHealthAge: "あなたの健康年齢を計算するお手伝いをします。",
      startAssessment: "今すぐ評価を開始",
      home: "ホーム",
      purchases: "購入",
      history: "履歴",
      dailyLimit: "毎日の制限",
      getStarted:
        "始めましょう。あなたの健康年齢は、あなたのライフスタイルと習慣に基づいています。",
      whatIsYourName: "あなたの名前は何ですか？",
      enterName: "名前を入力",
      next: "次へ",
      whatIsYourAge: "あなたの年齢は何歳ですか？",
      age: "年齢",
      whatIsYourGender: "あなたの性別は何ですか？",
      gender: "性別",
      male: "男性",
      female: "女性",
      whatIsYourHeight: "あなたの身長は何センチですか？",
      height: "身長",
      whatIsYourWeight: "あなたの体重は何キロですか？",
      weight: "体重",
      whatIsYourWaistCircumference: "あなたのウエスト周は何センチですか？",
      waistCircumference: "ウエスト周",
      whatIsYourBloodPressure: "あなたの血圧はいくつですか？",
      bloodPressure: "血圧",
      whatIsYourBloodGlucose: "あなたの血糖値はいくつですか？",
      fasting: "空腹時",
      postMeals: "食後",
      bloodGlucoseLevel: "血糖値",
      newAssessment: "新しい評価",
      howOftenEatBreakfast: "良い朝食をどれくらいの頻度で食べますか？",
      breakfastNote: "（全粒穀物、果物や野菜、ナッツを重視）",
      lessThan2Days: "週に2日未満",
      twoToFourDays: "週に2〜4日",
      fiveToSixDays: "週に5〜6日",
      everyday: "毎日",
      howOftenSnack: "どれくらいの頻度で間食しますか？",
      severalTimesDay: "一日に数回",
      onceDay: "一日に一度",
      fewTimesWeek: "週に数回",
      rarelyNever: "めったに、または全くしない",
      howManyFruitsVeggies: "一日にどれくらいの量の果物と野菜を食べますか？",
      fruitsVeggiesNote:
        "（1食分 = 中くらいの果物1個、生1カップ、調理済み1/2カップ、または100％ジュース6オンス）",
      howManyWholeGrains: "一日にどれくらいの量の全粒穀物を食べますか？",
      wholeGrainsNote:
        "（1食分 = パン1枚、玄米またはオートミール1/2カップ、乾燥シリアル2/3カップ）",
      none: "なし",
      back: "戻る",
      howManyNutsSeeds: "週にどれくらいの量のナッツと種を食べますか？",
      nutsSeedsNote: "（1食分 = ナッツまたは種1オンス、ナッツバター大さじ2）",
      howOftenRedMeat: "どれくらいの頻度で赤身肉を食べますか？",
      threeOrMoreTimesWeek: "週に3回以上",
      onceTwiceMonth: "月に1〜2回",
      never: "全く食べない",
      howOftenExercise:
        "20〜30分の中〜高強度の運動をどれくらいの頻度で行いますか？",
      rarely: "めったにしない",
      oneTwoDaysWeek: "週に1〜2日",
      threeFourDaysWeek: "週に3〜4日",
      fiveMoreDaysWeek: "週に5日以上",
      howIsWeight: "あなたの体重はどうですか？",
      severelyOverweight: "重度の過体重",
      moderatelyOverweight: "中程度の過体重",
      underweight: "低体重",
      healthyWeight: "健康的な体重",
      howOftenSleep: "7〜8時間の睡眠をどれくらいの頻度でとりますか？",
      twoOrFewerDays: "週に2日以下",
      threeFourDays: "週に3〜4日",
      fiveSixDays: "週に5〜6日",
      whatIsTobaccoHistory: "あなたの喫煙歴は？",
      currentlyUse: "現在使用中",
      quitLessThanTwoYears: "2年以内に禁煙",
      quitOverTwoYears: "2年以上前に禁煙",
      neverUsed: "使用したことがない",
      howManyAlcohol: "週にどれくらいの量のアルコールを摂取しますか？",
      alcoholNote:
        "（ビール12オンス、麦芽酒8オンス、ワイン5オンス、ショット1.5オンス）",
      excessiveAlcohol: "15+（男性）または8+（女性）",
      howRateSpirituality: "あなたの精神性をどのように評価しますか？",
      noInterest: "関心がない",
      moderatelySpiritual: "適度に精神的",
      deeplySpiritual: "深く精神的",
      Is_Interests: "興味",
      Is_TellYourInterest:
        "あなたの体験をカスタマイズするために、興味のあることを教えてください。",
      Is_WeightManagement: "体重管理",
      Is_FitAndExercise: "フィットネスと運動",
      Is_StopSmoking: "禁煙",
      Is_HealthyCooking: "健康的な料理",
      Is_StressReduction: "ストレス軽減",
      Is_PreventHeartDisease: "心臓病予防",
      Is_DepressionRecovery: "うつ病回復",
      Is_ReversingDiabetes: "糖尿病の改善",
      Is_NaturalRemedies: "自然療法",
      Is_SpiritualHealth: "精神的な健康",
      Is_ImprovingMentalPerformance: "精神的パフォーマンスの向上",
      Is_Other: "その他",
      Is_Name: "名前",
      Is_Email: "メールアドレス",
      Is_Address: "住所",
      Is_Phone: "電話番号",
      Is_Zip: "郵便番号",
      Is_ShowReport: "レポートを表示",
      Rs_Report: "レポート",
      Rs_CustomizedReport: "のカスタマイズされたレポート：",
      Rs_YourHealthAge: "あなたの健康年齢は",
      Rs_YourActualAge: "あなたの実際の年齢は",
      Rs_CurrentAge: "現在の年齢",
      Rs_HealthAge: "健康年齢",
      Rs_PotentialAge: "潜在年齢",
      Rs_HealthyHabitsParagraph:
        "有名なアラメダ郡調査やアドベンチスト健康調査を含むいくつかの大規模な研究は、以下にリストされている健康習慣と病気/死亡のリスクとの間に強い相関関係があることを明らかにしています。これらの健康的な習慣をすべて実践している人は、寿命を約30年延ばす可能性があります。",
      Rs_MedicalDisclaimerTitle: "医療に関する免責事項",
      Rs_MedicalDisclaimerText:
        "ヘルスエイジは情報提供および教育目的のみを意図しています。医療診断ではなく、専門的な医療アドバイス、診断、治療の代わりに使用すべきではありません。医療上の決定や医療の変更を行う前に、必ず資格のある医療専門家にご相談ください。",
      Rs_MedicalSources: "医療情報の出典",
      Rs_Source: "出典",
      Rs_Recommendations: "推奨事項",
      Rs_1_title: "毎日良い朝食を食べる",
      Rs_1_desc:
        "朝食は代謝を高め、集中力を助け、学校や職場でのパフォーマンスを向上させます。また、健康的な体重を維持するのに役立ちます。",
      Rs_2_title: "間食を避ける",
      Rs_2_desc:
        "間食は1日あたり平均580カロリーを追加し、消化を妨げ、血糖コントロールを乱し、体重増加につながる可能性があります。",
      Rs_3_title: "もっと果物と野菜を楽しむ",
      Rs_3_desc:
        "果物と野菜は、カロリーが低い一方で、植物化学物質、ビタミン、繊維が豊富です。",
      Rs_4_title: "全粒穀物の摂取量を増やす",
      Rs_4_desc:
        "全粒穀物には、全体的な健康をサポートする繊維、ビタミンB群、必須ミネラルが含まれています。",
      Rs_5_title: "もっとナッツを食べる",
      Rs_5_desc:
        "ナッツはタンパク質と健康的な脂肪の優れた供給源であり、血糖値を調節するのに役立ちます。",
      Rs_6_title: "赤身肉を避ける",
      Rs_6_desc:
        "赤身肉の摂取は、2型糖尿病、心臓病、脳卒中、および特定のがんに関連しています。",
      Rs_7_title: "定期的に運動する",
      Rs_7_desc:
        "運動はエネルギーを高め、気分とコレステロール値を改善し、血圧を下げ、睡眠を改善し、免疫力を強化し、血糖値をコントロールするのに役立ちます。",
      Rs_8_title: "健康的な体重を達成する",
      Rs_8_desc:
        "BMIを18.5〜24.9、健康的なウエスト周（男性は40インチ未満、女性は35インチ未満）に維持します。",
      Rs_9_title: "毎晩7〜8時間の良い睡眠をとる",
      Rs_9_desc:
        "適切な睡眠は、記憶、学習、代謝、および免疫機能をサポートします。",
      Rs_10_title: "禁煙する",
      Rs_10_desc:
        "喫煙は体のすべての臓器に害を及ぼし、がん、心臓病、COPD、喘息、および歯科の問題のリスクを高めます。",
      Rs_11_title: "アルコールを飲まない",
      Rs_11_desc:
        "アルコール使用は、神経学的、心血管系、および精神医学的問題を引き起こす可能性があり、がんおよび肝疾患のリスクを高めます。",
      Rs_12_title: "精神性を高める",
      Rs_12_desc:
        "神への信仰は、精神的な健康を改善し、免疫機能を強化する可能性があります。",
      Rs_SavePdf: "PDFを保存",
      Rs_ShareReport: "レポートを共有",
      Hs_List: "リスト",
      Hs_Group: "グループ",
      Hs_View: "表示",
      Hs_Filter: "フィルター",
      Hs_Options: "オプション",
      Hs_Export: "エクスポート",
      Hs_Delete: "削除",
      Hs_Search: "検索",
      Hs_ExportAsCSV: "CSVとしてエクスポート",
      Hs_Confirmation: "本当に削除しますか？",
      Hs_Success: "アイテムを削除しました",
      Hs_Cancel: "キャンセル",
      Hs_ItemsSelected: "選択されたアイテム",
      Hs_SelectAll: "すべて選択",
      Hs_NewGroup: "新しいグループ",
      Hs_ExistingGroup: "既存のグループ",
      Hs_Create: "作成",
      Hs_GroupName: "グループ名",
      Hs_EnterGroupName: "グループ名を入力",
      Hs_Reports: "レポート",
      Hs_save: "保存",
      Hs_Nothing: "まだ何もありません！",
      Hs_NothingDesc:
        "評価を完了すると、健康年齢レポートがここに表示されます。",
      Hs_Download: "ダウンロード",
      Hs_LanguageChanged: "言語が正常に変更されました",
      Hs_Change: "変更",
      Fs_Filter: "フィルター条件",
      Fs_Close: "閉じる",
      Fs_Date: "日付",
      Fs_From: "開始日",
      Fs_To: "終了日",
      Fs_ClearAll: "すべてクリア",
      Fs_ShowResults: "結果を表示",

      //others

      select: "選択 (Sentaku)",
      total: "合計 (Gōkei)",
      purchase: "購入 (Kōnyū)",
      aboutProgramme: "プログラムについて (Puroguramu ni tsuite)",
      reports: "レポート (Repōto)",
      PrintQuestion: "質問票を印刷 (Shitsumonhyō o insatsu)",
      PrintReport: "空白のレポートを印刷 (Kūhaku no repōto o insatsu)",
      reportSetting: "レポート設定 (Repōto settei)",
      changeLanguage: "言語を変更 (Gengo o henkō)",
      uploadLogo: "ロゴをアップロード (Logo o appurōdo)",
      upload: "アップロード (Appurōdo)",
      contactDetails: "連絡先の詳細 (Renraku saki no shōsai)",
      enterAddress: "住所を入力 (Jūsho o nyūryoku)",
      enterPhone: "電話番号を入力 (Denwa bangō o nyūryoku)",
      createGroup: "グループを作成 (Gurūpu o sakusei)",

      // blood

      normalBp: "あなたの血圧は正常です。",
      MaintainBp: "血圧を維持してください。",
      bpRange: "正常範囲は90-119/60-79 mmHgです。",
      normalGlucoseLevel: "あなたの血糖値は正常です。",
      maintainGlucoseLevel: "血糖値を維持してください。",
      normalRangeGlucose: "正常範囲は",
      for: "の",
      postMeal: "食後",
      test: "検査",
      maintainBloodGlucose: "血糖値を維持しましょう",
      maintainLowBloodGlucoseDesc:
        "あなたの血糖値は低いです。安定した血糖値は合併症を防ぎ、エネルギーを高め、全体的な健康をサポートします。バランスの取れた食事と運動で血糖値をコントロールしましょう！",
      maintainHighBloodGlucoseDesc:
        "あなたの血糖値は高いです。安定した血糖値は合併症を防ぎ、エネルギーを高め、全体的な健康をサポートします。バランスの取れた食事と運動で血糖値をコントロールしましょう！",
      maintainBloodPressure: "血圧をコントロールしましょう",
      maintainBloodPressureDesc:
        "健康的な血圧を維持することで、心臓病、脳卒中、腎臓の問題のリスクを減らすことができます。定期的な運動とバランスの取れた食事が大切です！",
      maintainLowBloodPressureDesc:
        "あなたの血圧は低いです。健康的な血圧を維持することで、心臓病、脳卒中、腎臓の問題のリスクを減らすことができます。定期的な運動とバランスの取れた食事が大切です！",
      maintainHighBloodPressureDesc:
        "あなたの血圧は高いです。健康的な血圧を維持することで、心臓病、脳卒中、腎臓の問題のリスクを減らすことができます。定期的な運動とバランスの取れた食事が大切です！",
      discoverHealthAge: "あなたの健康年齢を発見しましょう！",
      downloadSuccess: "ダウンロードが成功しました",
      goBackConfirmation: "本当に戻りますか？",
      pleaseWait: "しばらくお待ちください！",

      goBeyond: "基本を超えよう！",

      JoinPro: "Proメンバーに参加して、あなたの健康の旅を次のレベルへ",

      WhyJoinPro: "Proに参加する理由",

      UnlimitedReports: "無制限レポート",

      FullReportHistory: "完全なレポート履歴",

      PrintYourQuestionnaire: "ロゴ付きの質問票を印刷",

      printYourReport: "ロゴ付きの空白レポートを印刷",

      upgrade: "アップグレード",

      yearlyPurchase: "年間購入",

      thisOneForPro: "おっと！こちらはPROメンバー限定です。",

      proMembersDesc:
        "この機能はProメンバー限定です。ご希望ですか？今すぐアップグレードして、あなただけの特別な特典をお楽しみください！",

      UpgradeComplete: "アップグレード完了！",

      NowAProMember: "Proメンバーになりました！",

      UpgradeTo: "アップグレード先",
      SubscriptionCancelledSuccess:
        "サブスクリプションのキャンセルに成功しました！",
      ConfirmSubCancel: "本当にサブスクリプションをキャンセルしますか？",
      SubDaysRemaining: "サブスクリプションの残り日数：",
      RenewSub: "サブスクリプションを更新する",
      cancelSub: "サブスクリプションをキャンセルする",
      renewSubConfirmation:
        "今すぐ更新を選択すると、本日から新しい請求サイクルが開始され、現在のサブスクリプションの残り期間は無効になります。本当に更新を進めますか？",
      renew: "更新する",
      BloodPressure: "血圧",
      BloodGlucose: "血糖値",
      BMI: "BMI",
      PDFDonwload: "PDFがダウンロードされました！",
      PDFShared: "PDFが共有されました！",
      Error: "問題が発生しました！",
      aboutTheApp: "アプリについて",
      GetStarted: "開始する",
      systolic: "収縮期血圧",
      diastolic: "拡張期血圧",
      start: "スタート",
      enterRequiredFields: "すべての必須項目を入力してください！",
      enterThisFields: "この項目は必須です！",

      exit: "終了",
      exitApp: "アプリを終了",
      appExitConfirmation: "アプリを終了しますか？",
      leavePage: "評価から退出しますか？",
      leavePageConfirmation: "このページを離れると、入力したデータは失われます",
      downloadOptions: "ダウンロードオプション",
      a4Size: "A4サイズ",
      usLetter: "USレター",
      pdfDownloaded: "PDFがダウンロードされました！",
      addedToGroup: "グループに正常に追加されました！",
      success: "成功",
      exportedTo: "エクスポート先",
      aboutTheAppDesc:
    "このアプリは、個人のライフスタイルに基づいて体の「健康年齢」を判断するのに役立ちます。このアプリは、有名なアラメダ郡の長寿研究と新しいアドベンティスト健康研究の両方からの情報を組み合わせています。このアプリは、参加者が自身の健康習慣と死亡リスクとの間の強い相関関係を理解するのに役立ちます。健康カウンセリングの優れた基盤となります。",
  aboutTheAppTitle: "アプリについて",
    },
  },
  fr: {
    translation: {
      welcome: "Bienvenue",
      chooseLanguage: "Choisir la langue",
      introduction: "Introduction",
      howItWorks: "Comment ça marche",
      benefits: "Avantages",

      lifestyleAffectsHealth:
        "Votre style de vie affecte votre santé plus que vous ne le pensez. Découvrons à quel point vous êtes réellement jeune !",
      simpleScienceBacked: "Simple et Scientifiquement Fondé",
      answerQuestions:
        "Répondez à quelques questions sur vos habitudes, et nous calculerons votre âge de santé basé sur des informations de santé réelles.",
      getPersonalizedTips: "Obtenez des conseils de santé personnalisés",
      improveLifestyle:
        "Améliorez votre style de vie avec des recommandations personnalisées pour atteindre votre meilleur potentiel de santé.",

      // HomeScreen.tsx
      helpCalculateHealthAge:
        "Je peux vous aider à calculer votre âge de santé.",
      startAssessment: "Commencez votre évaluation maintenant",
      home: "Accueil",
      purchases: "Achats",
      history: "Historique",
      dailyLimit: "Limite quotidienne",

      // healthAgeTest.tsx
      getStarted:
        "Commençons. Votre âge de santé est basé sur votre style de vie et vos habitudes.",
      whatIsYourName: "Quel est votre nom ?",
      enterName: "Entrez le nom",
      next: "Suivant",
      whatIsYourAge: "Quel est votre âge ?",
      age: "Âge",
      whatIsYourGender: "Quel est votre genre ?",
      gender: "Genre",
      male: "Homme",
      female: "Femme",
      whatIsYourHeight: "Quelle est votre taille ?",
      height: "Taille",
      whatIsYourWeight: "Quel est votre poids ?",
      weight: "Poids",
      whatIsYourWaistCircumference: "Quel est votre tour de taille ?",
      waistCircumference: "Tour de taille",
      whatIsYourBloodPressure: "Quelle est votre tension artérielle ?",
      bloodPressure: "Tension artérielle",
      whatIsYourBloodGlucose: "Quel est votre taux de glucose sanguin ?",
      fasting: "À jeun",
      postMeals: "Après les repas",
      bloodGlucoseLevel: "Taux de glucose sanguin",

      // QuestionScreen.tsx
      newAssessment: "Nouvelle évaluation",
      howOftenEatBreakfast:
        "À quelle fréquence prenez-vous un bon petit-déjeuner ?",
      breakfastNote:
        "(En mettant l'accent sur les grains entiers, les fruits ou légumes et les noix)",
      lessThan2Days: "Moins de 2 jours par semaine",
      twoToFourDays: "2-4 jours par semaine",
      fiveToSixDays: "5-6 jours par semaine",
      everyday: "Tous les jours",
      howOftenSnack: "À quelle fréquence grignotez-vous ?",
      severalTimesDay: "Plusieurs fois par jour",
      onceDay: "Une fois par jour",
      fewTimesWeek: "Quelques fois par semaine",
      rarelyNever: "Rarement ou jamais",
      howManyFruitsVeggies:
        "Combien de portions de fruits et légumes mangez-vous par jour ?",
      fruitsVeggiesNote:
        "(1 portion = 1 pièce moyenne, 1 tasse frais, 1/2 tasse cuit ou 180 ml de jus 100 %)",
      howManyWholeGrains:
        "Combien de portions de grains entiers mangez-vous par jour ?",
      wholeGrainsNote:
        "(1 portion = 1 tranche de pain, 1/2 tasse de riz brun ou d'avoine, 2/3 tasse de céréales sèches)",
      none: "Aucun",
      back: "Retour",
      howManyNutsSeeds:
        "Combien de portions de noix et de graines mangez-vous par semaine ?",
      nutsSeedsNote:
        "(1 portion = 30 g de noix ou de graines, 2 cuillères à soupe de beurre de noix)",
      howOftenRedMeat: "À quelle fréquence mangez-vous de la viande rouge ?",
      threeOrMoreTimesWeek: "3 fois ou plus par semaine",
      onceTwiceMonth: "Une ou deux fois par mois",
      never: "Jamais",
      howOftenExercise:
        "À quelle fréquence faites-vous 20-30 minutes d'exercice modéré à vigoureux ?",
      rarely: "Rarement",
      oneTwoDaysWeek: "1-2 jours par semaine",
      threeFourDaysWeek: "3-4 jours par semaine",
      fiveMoreDaysWeek: "5 jours ou plus par semaine",
      howIsWeight: "Comment est votre poids ?",
      severelyOverweight: "Fortement en surpoids",
      moderatelyOverweight: "Modérément en surpoids",
      underweight: "Insuffisance pondérale",
      healthyWeight: "Poids santé",
      howOftenSleep: "À quelle fréquence dormez-vous 7-8 heures ?",
      twoOrFewerDays: "2 jours ou moins par semaine",
      threeFourDays: "3-4 jours par semaine",
      fiveSixDays: "5-6 jours par semaine",
      whatIsTobaccoHistory: "Quel est votre historique avec le tabac ?",
      currentlyUse: "Utilisation actuelle",
      quitLessThanTwoYears: "Arrêté il y a moins de 2 ans",
      quitOverTwoYears: "Arrêté il y a plus de 2 ans",
      neverUsed: "Jamais utilisé",
      howManyAlcohol:
        "Combien de portions d'alcool consommez-vous par semaine ?",
      alcoholNote:
        "(355 ml de bière, 240 ml de liqueur de malt, 150 ml de vin, 45 ml de spiritueux)",
      excessiveAlcohol: "15+ (hommes) ou 8+ (femmes)",
      howRateSpirituality: "Comment évalueriez-vous votre spiritualité ?",
      noInterest: "Aucun intérêt",
      moderatelySpiritual: "Modérément spirituel",
      deeplySpiritual: "Profondément spirituel",

      // interestScreen

      Is_Interests: "Intérêts",
      Is_TellYourInterest:
        "Dites-nous ce qui vous intéresse pour personnaliser votre expérience.",
      Is_WeightManagement: "Gestion du poids",
      Is_FitAndExercise: "Fitness et exercice",
      Is_StopSmoking: "Arrêter de fumer",
      Is_HealthyCooking: "Cuisine saine",
      Is_StressReduction: "Réduction du stress",
      Is_PreventHeartDisease: "Prévention des maladies cardiaques",
      Is_DepressionRecovery: "Rétablissement de la dépression",
      Is_ReversingDiabetes: "Inversion du diabète",
      Is_NaturalRemedies: "Remèdes naturels",
      Is_SpiritualHealth: "Santé spirituelle",
      Is_ImprovingMentalPerformance: "Amélioration des performances mentales",
      Is_Other: "Autre",
      Is_Name: "Nom",
      Is_Email: "Courriel",
      Is_Address: "Adresse",
      Is_Phone: "Téléphone",
      Is_Zip: "Code postal",
      Is_ShowReport: "Afficher le rapport",

      // reportScreen

      Rs_Report: "Rapport",
      Rs_CustomizedReport: "Rapport personnalisé pour :",
      Rs_YourHealthAge: "Votre âge de santé est",
      Rs_YourActualAge: "Votre âge réel de",
      Rs_CurrentAge: "Âge actuel",
      Rs_HealthAge: "Âge de santé",
      Rs_PotentialAge: "Âge potentiel",
      Rs_HealthyHabitsParagraph:
        "Plusieurs grandes études de recherche, y compris la célèbre étude du comté d'Alameda et les études de santé adventistes, révèlent une forte corrélation entre les habitudes de santé énumérées ci-dessous et le risque de maladie/décès. Les individus pratiquant toutes ces habitudes de santé peuvent influencer leur longévité de près de 30 ans.",
      Rs_MedicalDisclaimerTitle: "Avertissement médical",
      Rs_MedicalDisclaimerText:
        "Health Age est destiné uniquement à des fins d'information et d'éducation. Il ne constitue pas un diagnostic médical et ne doit pas être utilisé en remplacement d'un avis, d'un diagnostic ou d'un traitement médical professionnel. Consultez toujours un professionnel de santé qualifié avant de prendre des décisions médicales ou de modifier vos soins de santé.",
      Rs_MedicalSources: "Sources médicales",
      Rs_Source: "Source",
      Rs_Recommendations: "Recommandations",
      Rs_1_title: "Prendre un bon petit-déjeuner quotidiennement",
      Rs_1_desc:
        "Le petit-déjeuner stimule le métabolisme, aide à la concentration et améliore les performances à l'école et au travail. Il aide également à maintenir un poids santé.",
      Rs_2_title: "Éviter de grignoter",
      Rs_2_desc:
        "Le grignotage peut ajouter en moyenne 580 calories par jour, nuire à la digestion, perturber le contrôle de la glycémie et contribuer à la prise de poids.",
      Rs_3_title: "Profiter de plus de fruits et légumes",
      Rs_3_desc:
        "Les fruits et légumes sont riches en composés phytochimiques, en vitamines et en fibres, tout en étant faibles en calories.",
      Rs_4_title: "Augmenter la consommation de grains entiers",
      Rs_4_desc:
        "Les grains entiers contiennent des fibres, des vitamines B et des minéraux essentiels qui soutiennent la santé globale.",
      Rs_5_title: "Manger plus de noix",
      Rs_5_desc:
        "Les noix sont une excellente source de protéines et de graisses saines, et elles aident à réguler la glycémie.",
      Rs_6_title: "Éviter la viande rouge",
      Rs_6_desc:
        "La consommation de viande rouge a été liée au diabète de type 2, aux maladies cardiaques, aux accidents vasculaires cérébraux et à certains cancers.",
      Rs_7_title: "Faire de l'exercice régulièrement",
      Rs_7_desc:
        "L'exercice stimule l'énergie, améliore l'humeur et le taux de cholestérol, abaisse la tension artérielle, améliore le sommeil, renforce l'immunité et aide à contrôler la glycémie.",
      Rs_8_title: "Atteindre un poids santé",
      Rs_8_desc:
        "Maintenir un IMC entre 18,5 et 24,9 et un tour de taille sain (moins de 102 cm pour les hommes, 89 cm pour les femmes).",
      Rs_9_title: "Dormir 7-8 heures de bon sommeil chaque nuit",
      Rs_9_desc:
        "Un sommeil adéquat soutient la mémoire, l'apprentissage, le métabolisme et la fonction immunitaire.",
      Rs_10_title: "Arrêter de fumer",
      Rs_10_desc:
        "Fumer nuit à tous les organes du corps, augmentant le risque de cancers, de maladies cardiaques, de MPOC, d'asthme et de problèmes dentaires.",
      Rs_11_title: "Ne pas boire d'alcool",
      Rs_11_desc:
        "La consommation d'alcool peut causer des problèmes neurologiques, cardiovasculaires et psychiatriques, ainsi qu'augmenter le risque de cancer et de maladie du foie.",
      Rs_12_title: "Augmenter la spiritualité",
      Rs_12_desc:
        "La foi en Dieu peut améliorer la santé mentale et renforcer la fonction immunitaire.",
      Rs_SavePdf: "Enregistrer en PDF",
      Rs_ShareReport: "Partager le rapport",

      // history screen

      Hs_List: "Liste",
      Hs_Group: "Groupe",
      Hs_View: "Voir",
      Hs_Filter: "Filtrer",
      Hs_Options: "Options",
      Hs_Export: "Exporter",
      Hs_Delete: "Supprimer",
      Hs_Search: "Rechercher",
      Hs_ExportAsCSV: "Exporter en CSV",
      Hs_Confirmation: "Êtes-vous sûr de vouloir supprimer ?",
      Hs_Success: "Élément supprimé",
      Hs_Cancel: "Annuler",
      Hs_ItemsSelected: "Éléments sélectionnés",
      Hs_SelectAll: "Tout sélectionner",
      Hs_NewGroup: "Nouveau groupe",
      Hs_ExistingGroup: "Groupe existant",
      Hs_Create: "Créer",
      Hs_GroupName: "Nom du groupe",
      Hs_EnterGroupName: "Entrez le nom du groupe",
      Hs_Reports: "Rapports",
      Hs_save: "Enregistrer",
      Hs_Nothing: "Rien ici pour le moment !",
      Hs_NothingDesc:
        "Vos rapports d'âge de santé apparaîtront ici une fois l'évaluation terminée.",
      Hs_Download: "Télécharger",

      Hs_LanguageChanged: "Langue changée avec succès",
      Hs_Change: "Changer",

      // Filter Screen
      Fs_Filter: "Filtrer par",
      Fs_Close: "Fermer",
      Fs_Date: "Date",
      Fs_From: "De",
      Fs_To: "À",
      Fs_ClearAll: "Tout effacer",
      Fs_ShowResults: "Afficher les résultats",

      // others

      select: "Sélectionner",
      total: "Total",
      purchase: "Achat",
      aboutProgramme: "À propos du Programme",
      reports: "Rapports",
      PrintQuestion: "Imprimer le Questionnaire",
      PrintReport: "Imprimer le Rapport Vierge",
      reportSetting: "Paramètres du Rapport",
      changeLanguage: "Changer la Langue",
      uploadLogo: "Télécharger votre logo",
      upload: "Télécharger",
      contactDetails: "Coordonnées",
      enterAddress: "Entrer l'Adresse",
      enterPhone: "Entrer le Numéro de Téléphone",
      createGroup: "Créer un Groupe",

      // blood

      normalBp: "Votre tension artérielle est normale",
      MaintainBp: "Veuillez maintenir votre tension artérielle",
      bpRange: "La plage normale est de 90-119/60-79 mmHg.",
      normalGlucoseLevel: "Votre taux de glucose sanguin est normal",
      maintainGlucoseLevel: "Veuillez maintenir votre taux de glucose sanguin",
      normalRangeGlucose: "La plage normale est de",
      for: "pour",
      postMeal: "après le repas",
      test: "test",

      maintainBloodGlucose: "Maintenez votre taux de glycémie",
      maintainLowBloodGlucoseDesc:
        "Votre taux de glycémie est bas. Une glycémie stable prévient les complications, augmente l'énergie et soutient la santé globale. Une alimentation équilibrée et de l'exercice aident à le maintenir !",
      maintainHighBloodGlucoseDesc:
        "Votre taux de glycémie est élevé. Une glycémie stable prévient les complications, augmente l'énergie et soutient la santé globale. Une alimentation équilibrée et de l'exercice aident à le maintenir !",
      maintainBloodPressure: "Gardez votre tension artérielle sous contrôle",
      maintainBloodPressureDesc:
        "Maintenir une tension artérielle saine réduit les risques de maladies cardiaques, d'AVC et de problèmes rénaux. L'exercice régulier et une alimentation équilibrée font toute la différence !",
      maintainLowBloodPressureDesc:
        "Votre tension artérielle est basse. Maintenir une tension artérielle saine réduit les risques de maladies cardiaques, d'AVC et de problèmes rénaux. L'exercice régulier et une alimentation équilibrée font toute la différence !",
      maintainHighBloodPressureDesc:
        "Votre tension artérielle est élevée. Maintenir une tension artérielle saine réduit les risques de maladies cardiaques, d'AVC et de problèmes rénaux. L'exercice régulier et une alimentation équilibrée font toute la différence !",
      discoverHealthAge: "Découvrez votre âge de santé !",
      downloadSuccess: "Téléchargement réussi",
      goBackConfirmation: "Êtes-vous sûr(e) de vouloir revenir en arrière ?",
      pleaseWait: "Veuillez patienter !",

      goBeyond: "Allez au-delà des bases !",

      JoinPro:
        "Rejoignez nos Membres Pro et faites passer votre parcours de santé au niveau supérieur",

      WhyJoinPro: "Pourquoi rejoindre Pro ?",

      UnlimitedReports: "Rapports Illimités",

      FullReportHistory: "Historique Complet des Rapports",

      PrintYourQuestionnaire: "Imprimez le Questionnaire avec votre logo",

      printYourReport: "Imprimez des Rapports Vides avec votre logo",

      upgrade: "Mettre à niveau",

      yearlyPurchase: "Achat annuel",

      thisOneForPro: "Oups ! Ceci est réservé aux Membres PRO.",

      proMembersDesc:
        "Cette fonctionnalité est réservée à nos Membres Pro. Vous voulez en faire partie ? Mettez à niveau maintenant et profitez d'avantages exclusifs conçus spécialement pour vous !",

      UpgradeComplete: "Mise à niveau terminée !",

      NowAProMember: "Vous êtes désormais Membre Pro !",
      UpgradeTo: "Passer à",

      SubscriptionCancelledSuccess: "Abonnement annulé avec succès !",

      ConfirmSubCancel: "Êtes-vous sûr de vouloir annuler l'abonnement ?",

      SubDaysRemaining: "Jours restants de l'abonnement :",

      RenewSub: "Renouveler l'abonnement",

      cancelSub: "Annuler l'abonnement",

      renewSubConfirmation:
        "Si vous choisissez de renouveler maintenant, un nouveau cycle de facturation commencera aujourd'hui, et la durée restante de votre abonnement actuel ne sera plus valable. Êtes-vous sûr de vouloir continuer le renouvellement ?",

      renew: "Renouveler",

      BloodPressure: "Pression artérielle",

      BloodGlucose: "Glycémie",

      BMI: "IMC",

      PDFDonwload: "Le PDF a été téléchargé !",

      PDFShared: "Le PDF a été partagé !",

      Error: "Une erreur s'est produite !",

      aboutTheApp: "À propos de l'application",
      GetStarted: "Commencer",
      systolic: "Systolique",
      diastolic: "Diastolique",
      start: "Démarrer",
      enterRequiredFields: "Veuillez saisir tous les champs obligatoires !",
      enterThisFields: "Ce champ est obligatoire !",

      exit: "Quitter",
      exitApp: "Quitter l'application",
      appExitConfirmation: "Voulez-vous quitter l'application ?",
      leavePage: "Quitter l'évaluation ?",
      leavePageConfirmation:
        "Une fois que vous quittez cette page, vos données saisies seront perdues",

      downloadOptions: "Options de téléchargement",
      a4Size: "Format A4",
      usLetter: "Format Lettre US",
      pdfDownloaded: "PDF téléchargé !",
      addedToGroup: "Ajouté au groupe avec succès !",
      success: "Succès",
      exportedTo: "Exporté vers",

       "aboutTheAppDesc": "Cette application aide à déterminer « l'âge de santé » de son corps en fonction des habitudes de vie d'un individu. Elle combine des informations provenant des célèbres études de longévité du comté d'Alameda et des nouvelles études sur la santé des adventistes. Cette application aide les participants à comprendre la forte corrélation entre leurs habitudes de santé et leur risque de décès. Elle constitue une excellente base pour le conseil en matière de santé.",
  "aboutTheAppTitle": "À propos de l'application"
    },
  },
  zh: {
    translation: {
      welcome: "欢迎",
      chooseLanguage: "选择语言",
      introduction: "简介",
      howItWorks: "如何运作",
      benefits: "益处",

      lifestyleAffectsHealth:
        "您的生活方式对健康的影响比您想象的要大。让我们来看看您到底有多年轻！",
      simpleScienceBacked: "简单且科学支持",
      answerQuestions:
        "回答几个关于您习惯的问题，我们将根据真实的健康见解计算您的健康年龄。",
      getPersonalizedTips: "获取个性化健康建议",
      improveLifestyle:
        "通过定制的建议改善您的生活方式，以达到您的最佳健康潜力。",

      // HomeScreen.tsx
      helpCalculateHealthAge: "我可以帮助您计算您的健康年龄。",
      startAssessment: "立即开始您的评估",
      home: "首页",
      purchases: "购买",
      history: "历史记录",
      dailyLimit: "每日限额",

      // healthAgeTest.tsx
      getStarted: "让我们开始吧。您的健康年龄基于您的生活方式和习惯。",
      whatIsYourName: "您叫什么名字？",
      enterName: "输入姓名",
      next: "下一步",
      whatIsYourAge: "您的年龄是多少？",
      age: "年龄",
      whatIsYourGender: "您的性别是什么？",
      gender: "性别",
      male: "男性",
      female: "女性",
      whatIsYourHeight: "您的身高是多少？",
      height: "身高",
      whatIsYourWeight: "您的体重是多少？",
      weight: "体重",
      whatIsYourWaistCircumference: "您的腰围是多少？",
      waistCircumference: "腰围",
      whatIsYourBloodPressure: "您的血压是多少？",
      bloodPressure: "血压",
      whatIsYourBloodGlucose: "您的血糖水平是多少？",
      fasting: "空腹",
      postMeals: "餐后",
      bloodGlucoseLevel: "血糖水平",

      // QuestionScreen.tsx
      newAssessment: "新评估",
      howOftenEatBreakfast: "您多久吃一次营养早餐？",
      breakfastNote: "（强调全谷物、水果或蔬菜和坚果）",
      lessThan2Days: "每周少于2天",
      twoToFourDays: "每周2-4天",
      fiveToSixDays: "每周5-6天",
      everyday: "每天",
      howOftenSnack: "您多久吃一次零食？",
      severalTimesDay: "每天几次",
      onceDay: "每天一次",
      fewTimesWeek: "每周几次",
      rarelyNever: "很少或从不",
      howManyFruitsVeggies: "您每天吃多少份水果和蔬菜？",
      fruitsVeggiesNote:
        "（1份=1个中等大小的水果，1杯新鲜的，1/2杯煮熟的，或6盎司100%果汁）",
      howManyWholeGrains: "您每天吃多少份全谷物？",
      wholeGrainsNote: "（1份=1片面包，1/2杯糙米或燕麦片，2/3杯干麦片）",
      none: "无",
      back: "返回",
      howManyNutsSeeds: "您每周吃多少份坚果和种子？",
      nutsSeedsNote: "（1份=1盎司坚果或种子，2汤匙坚果酱）",
      howOftenRedMeat: "您多久吃一次红肉？",
      threeOrMoreTimesWeek: "每周3次或更多",
      onceTwiceMonth: "每月一到两次",
      never: "从不",
      howOftenExercise: "您多久进行20-30分钟的中等至剧烈运动？",
      rarely: "很少",
      oneTwoDaysWeek: "每周1-2天",
      threeFourDaysWeek: "每周3-4天",
      fiveMoreDaysWeek: "每周5天或更多",
      howIsWeight: "您的体重如何？",
      severelyOverweight: "严重超重",
      moderatelyOverweight: "中度超重",
      underweight: "体重不足",
      healthyWeight: "健康体重",
      howOftenSleep: "您多久能睡7-8小时？",
      twoOrFewerDays: "每周2天或更少",
      threeFourDays: "每周3-4天",
      fiveSixDays: "每周5-6天",
      whatIsTobaccoHistory: "您的烟草使用史是什么？",
      currentlyUse: "目前使用",
      quitLessThanTwoYears: "戒烟不到2年",
      quitOverTwoYears: "戒烟超过2年",
      neverUsed: "从未使用",
      howManyAlcohol: "您每周饮用多少份酒精？",
      alcoholNote: "（12盎司啤酒，8盎司麦芽酒，5盎司葡萄酒，1.5盎司烈酒）",
      excessiveAlcohol: "15+（男性）或8+（女性）",
      howRateSpirituality: "您如何评价您的灵性？",
      noInterest: "没有兴趣",
      moderatelySpiritual: "中等灵性",
      deeplySpiritual: "深度灵性",

      // interestScreen

      Is_Interests: "兴趣",
      Is_TellYourInterest: "告诉我们您的兴趣，以定制您的体验。",
      Is_WeightManagement: "体重管理",
      Is_FitAndExercise: "健身和运动",
      Is_StopSmoking: "戒烟",
      Is_HealthyCooking: "健康烹饪",
      Is_StressReduction: "减压",
      Is_PreventHeartDisease: "心脏病预防",
      Is_DepressionRecovery: "抑郁症康复",
      Is_ReversingDiabetes: "逆转糖尿病",
      Is_NaturalRemedies: "自然疗法",
      Is_SpiritualHealth: "精神健康",
      Is_ImprovingMentalPerformance: "提高心理表现",
      Is_Other: "其他",
      Is_Name: "姓名",
      Is_Email: "电子邮件",
      Is_Address: "地址",
      Is_Phone: "电话",
      Is_Zip: "邮编",
      Is_ShowReport: "显示报告",

      // reportScreen

      Rs_Report: "报告",
      Rs_CustomizedReport: "为以下人员定制的报告：",
      Rs_YourHealthAge: "您的健康年龄是",
      Rs_YourActualAge: "您的实际年龄是",
      Rs_CurrentAge: "当前年龄",
      Rs_HealthAge: "健康年龄",
      Rs_PotentialAge: "潜在年龄",
      Rs_HealthyHabitsParagraph:
        "几项大型研究，包括著名的阿拉米达县研究和基督复临安息日会健康研究，揭示了以下列出的健康习惯与疾病/死亡风险之间的密切关系。实践所有这些健康习惯的人可能会将寿命延长近30年。",
      Rs_MedicalDisclaimerTitle: "医疗免责声明",
      Rs_MedicalDisclaimerText:
        "健康年龄仅供信息和教育目的使用。它不是医学诊断，不能替代专业医疗建议、诊断或治疗。在做出任何医疗决定或更改医疗保健方案之前，请务必咨询合格的医疗专业人士。",
      Rs_MedicalSources: "医疗来源",
      Rs_Source: "来源",
      Rs_Recommendations: "建议",
      Rs_1_title: "每天吃一顿营养早餐",
      Rs_1_desc:
        "早餐可以促进新陈代谢，有助于集中注意力，提高学习和工作效率。它还有助于保持健康的体重。",
      Rs_2_title: "避免吃零食",
      Rs_2_desc:
        "吃零食平均每天会增加580卡路里，损害消化，扰乱血糖控制，并导致体重增加。",
      Rs_3_title: "多吃水果和蔬菜",
      Rs_3_desc:
        "水果和蔬菜富含植物化学物质、维生素和纤维，同时卡路里含量较低。",
      Rs_4_title: "增加全谷物摄入量",
      Rs_4_desc: "全谷物含有纤维、B族维生素和支持整体健康的必需矿物质。",
      Rs_5_title: "多吃坚果",
      Rs_5_desc: "坚果是蛋白质和健康脂肪的极好来源，有助于调节血糖水平。",
      Rs_6_title: "避免红肉",
      Rs_6_desc: "食用红肉与2型糖尿病、心脏病、中风和某些癌症有关。",
      Rs_7_title: "定期锻炼",
      Rs_7_desc:
        "锻炼可以增加能量，改善情绪和胆固醇水平，降低血压，改善睡眠，增强免疫力，并有助于控制血糖。",
      Rs_8_title: "达到健康的体重",
      Rs_8_desc:
        "保持BMI在18.5-24.9之间，保持健康的腰围（男性小于40英寸，女性小于35英寸）。",
      Rs_9_title: "每晚获得7-8小时的良好睡眠",
      Rs_9_desc: "充足的睡眠支持记忆、学习、新陈代谢和免疫功能。",
      Rs_10_title: "戒烟",
      Rs_10_desc:
        "吸烟会损害身体的每个器官，增加患癌症、心脏病、慢性阻塞性肺病、哮喘和牙齿问题的风险。",
      Rs_11_title: "不要饮酒",
      Rs_11_desc:
        "饮酒会导致神经、心血管和精神问题，并增加患癌症和肝病的风险。",
      Rs_12_title: "增加灵性",
      Rs_12_desc: "对上帝的信仰可以改善心理健康并增强免疫功能。",
      Rs_SavePdf: "保存为PDF",
      Rs_ShareReport: "分享报告",

      // history screen

      Hs_List: "列表",
      Hs_Group: "分组",
      Hs_View: "查看",
      Hs_Filter: "筛选",
      Hs_Options: "选项",
      Hs_Export: "导出",
      Hs_Delete: "删除",
      Hs_Search: "搜索",
      Hs_ExportAsCSV: "导出为CSV",
      Hs_Confirmation: "确定要删除吗？",
      Hs_Success: "项目已删除",
      Hs_Cancel: "取消",
      Hs_ItemsSelected: "已选择项目",
      Hs_SelectAll: "全选",
      Hs_NewGroup: "新建分组",
      Hs_ExistingGroup: "现有分组",
      Hs_Create: "创建",
      Hs_GroupName: "分组名称",
      Hs_EnterGroupName: "输入分组名称",
      Hs_Reports: "报告",
      Hs_save: "保存",
      Hs_Nothing: "这里还没有任何内容！",
      Hs_NothingDesc: "完成评估后，您的健康年龄报告将在此处显示。",
      Hs_Download: "下载",
      Hs_LanguageChanged: "语言已成功更改",
      Hs_Change: "更改",

      // Filter Screen
      Fs_Filter: "按以下内容筛选",
      Fs_Close: "关闭",
      Fs_Date: "日期",
      Fs_From: "从",
      Fs_To: "至",
      Fs_ClearAll: "清除全部",
      Fs_ShowResults: "显示结果",

      // others

      select: "选择",
      total: "总计",
      purchase: "购买",
      aboutProgramme: "关于项目",
      reports: "报告",
      PrintQuestion: "打印问卷",
      PrintReport: "打印空白报告",
      reportSetting: "报告设置",
      changeLanguage: "更改语言",
      uploadLogo: "上传您的标志",
      upload: "上传",
      contactDetails: "联系方式",
      enterAddress: "输入地址",
      enterPhone: "输入电话号码",
      createGroup: "创建组",

      // blood
      normalBp: "您的血压正常",
      MaintainBp: "请保持您的血压",
      bpRange: "正常范围是 90-119/60-79 毫米汞柱。",
      normalGlucoseLevel: "您的血糖水平正常",
      maintainGlucoseLevel: "请保持您的血糖水平",
      normalRangeGlucose: "正常范围是",
      for: "对于",
      postMeal: "餐后",
      test: "测试",

      maintainBloodGlucose: "维持您的血糖水平",
      maintainLowBloodGlucoseDesc:
        "您的血糖水平偏低。稳定的血糖可防止并发症、提高能量并支持整体健康。均衡饮食和锻炼有助于控制血糖！",
      maintainHighBloodGlucoseDesc:
        "您的血糖水平偏高。稳定的血糖可防止并发症、提高能量并支持整体健康。均衡饮食和锻炼有助于控制血糖！",

      maintainBloodPressure: "控制血压",
      maintainBloodPressureDesc:
        "维持健康的血压可以降低心脏病、中风和肾脏问题的风险。规律锻炼和均衡饮食至关重要！",
      maintainLowBloodPressureDesc:
        "您的血压偏低。维持健康的血压可以降低心脏病、中风和肾脏问题的风险。规律锻炼和均衡饮食至关重要！",
      maintainHighBloodPressureDesc:
        "您的血压偏高。维持健康的血压可以降低心脏病、中风和肾脏问题的风险。规律锻炼和均衡饮食至关重要！",
      discoverHealthAge: "发现您的健康年龄！",
      downloadSuccess: "下载成功",
      goBackConfirmation: "您确定要返回吗？",
      pleaseWait: "请稍候！",
      goBeyond: "超越基础！",
      JoinPro: "加入我们的Pro会员，将您的健康之旅提升到新的水平",
      WhyJoinPro: "为什么要加入Pro会员？",
      UnlimitedReports: "无限报告",
      FullReportHistory: "完整报告历史",
      PrintYourQuestionnaire: "打印带有您Logo的问卷",
      printYourReport: "打印带有您Logo的空白报告",
      upgrade: "升级",
      yearlyPurchase: "年度购买",
      thisOneForPro: "哎呀！这是Pro会员专享功能。",
      proMembersDesc:
        "此功能仅限Pro会员使用。想体验吗？立即升级，享受为您量身定制的专属权益！",
      UpgradeComplete: "升级完成！",
      NowAProMember: "您现在是Pro会员了！",

      UpgradeTo: "升级为",
      SubscriptionCancelledSuccess: "订阅已成功取消！",
      ConfirmSubCancel: "您确定要取消订阅吗？",
      SubDaysRemaining: "订阅剩余天数：",
      RenewSub: "续订",
      cancelSub: "取消订阅",
      renewSubConfirmation:
        "如果您现在选择续订，一个新的计费周期将从今天开始，当前订阅剩余的有效期将不再有效。您确定要继续续订吗？",
      renew: "续订",
      BloodPressure: "血压",
      BloodGlucose: "血糖",
      BMI: "身体质量指数（BMI）",
      PDFDonwload: "PDF 已下载！",
      PDFShared: "PDF 已分享！",
      Error: "出了点问题！",
      aboutTheApp: "关于此应用",

      GetStarted: "开始",
      systolic: "收缩压",
      diastolic: "舒张压",
      start: "启动",
      enterRequiredFields: "请输入所有必填字段！",
      enterThisFields: "此字段为必填项！",

      exit: "退出",
      exitApp: "退出应用",
      appExitConfirmation: "您确定要退出应用吗？",
      leavePage: "退出测评？",
      leavePageConfirmation: "一旦您离开此页面，已输入的数据将会丢失",

      downloadOptions: "下载选项",
      a4Size: "A4 纸张",
      usLetter: "美国信纸",
      pdfDownloaded: "PDF 已下载！",
      addedToGroup: "成功添加到群组！",
      success: "成功",
      exportedTo: "已导出至",

      "aboutTheAppDesc": "这款应用程序根据个人的生活习惯来帮助确定身体的“健康年龄”。它结合了著名的阿 lameda 县长寿研究和新的基督复临安息日会健康研究的数据。这款应用程序帮助参与者了解个人健康习惯与死亡风险之间的密切关联，为健康咨询提供了极佳的基础。",
  "aboutTheAppTitle": "关于此应用"
    },
  },
  ar: {
    translation: {
      welcome: "أهلاً وسهلاً",
      chooseLanguage: "اختر اللغة",
      introduction: "مقدمة",
      howItWorks: "كيف يعمل",
      benefits: "الفوائد",
      lifestyleAffectsHealth:
        "يؤثر نمط حياتك على صحتك أكثر مما تتخيل. دعنا نكتشف كم أنت شاب حقًا!",
      simpleScienceBacked: "بسيط ومستند إلى العلم",
      answerQuestions:
        "أجب عن بعض الأسئلة حول عاداتك، وسنحسب عمرك الصحي بناءً على رؤى صحية حقيقية.",
      getPersonalizedTips: "احصل على نصائح صحية مخصصة",
      improveLifestyle:
        "حسّن نمط حياتك بتوصيات مخصصة للوصول إلى أفضل إمكانات صحية لديك.",
      helpCalculateHealthAge: "يمكنني مساعدتك في حساب عمرك الصحي.",
      startAssessment: "ابدأ تقييمك الآن",
      home: "الرئيسية",
      purchases: "المشتريات",
      history: "السجل",
      dailyLimit: "الحد اليومي",
      getStarted: "لنبدأ. يعتمد عمرك الصحي على نمط حياتك وعاداتك.",
      whatIsYourName: "ما اسمك؟",
      enterName: "أدخل الاسم",
      next: "التالي",
      whatIsYourAge: "ما هو عمرك؟",
      age: "العمر",
      whatIsYourGender: "ما هو جنسك؟",
      gender: "الجنس",
      male: "ذكر",
      female: "أنثى",
      whatIsYourHeight: "ما هو طولك؟",
      height: "الطول",
      whatIsYourWeight: "ما هو وزنك؟",
      weight: "الوزن",
      whatIsYourWaistCircumference: "ما هو محيط خصرك؟",
      waistCircumference: "محيط الخصر",
      whatIsYourBloodPressure: "ما هو ضغط دمك؟",
      bloodPressure: "ضغط الدم",
      whatIsYourBloodGlucose: "ما هو مستوى الجلوكوز في الدم لديك؟",
      fasting: "صائم",
      postMeals: "بعد الوجبات",
      bloodGlucoseLevel: "مستوى الجلوكوز في الدم",
      newAssessment: "تقييم جديد",
      howOftenEatBreakfast: "كم مرة تتناول وجبة إفطار جيدة؟",
      breakfastNote:
        "(مع التركيز على الحبوب الكاملة والفواكه أو الخضروات والمكسرات)",
      lessThan2Days: "أقل من يومين في الأسبوع",
      twoToFourDays: "2-4 أيام في الأسبوع",
      fiveToSixDays: "5-6 أيام في الأسبوع",
      everyday: "كل يوم",
      howOftenSnack: "كم مرة تتناول وجبات خفيفة؟",
      severalTimesDay: "عدة مرات في اليوم",
      onceDay: "مرة واحدة في اليوم",
      fewTimesWeek: "بضع مرات في الأسبوع",
      rarelyNever: "نادرًا أو أبدًا",
      howManyFruitsVeggies:
        "كم عدد حصص الفاكهة والخضروات التي تتناولها يوميًا؟",
      fruitsVeggiesNote:
        "(1 حصة = 1 قطعة متوسطة، 1 كوب طازج، 1/2 كوب مطبوخ، أو 6 أونصات عصير 100٪)",
      howManyWholeGrains: "كم عدد حصص الحبوب الكاملة التي تتناولها يوميًا؟",
      wholeGrainsNote:
        "(1 حصة = 1 شريحة خبز، 1/2 كوب أرز بني أو شوفان، 2/3 كوب حبوب جافة)",
      none: "لا شيء",
      back: "رجوع",
      howManyNutsSeeds: "كم عدد حصص المكسرات والبذور التي تتناولها في الأسبوع؟",
      nutsSeedsNote:
        "(1 حصة = 1 أونصة مكسرات أو بذور، 2 ملعقة كبيرة زبدة مكسرات)",
      howOftenRedMeat: "كم مرة تتناول اللحوم الحمراء؟",
      threeOrMoreTimesWeek: "3 مرات أو أكثر في الأسبوع",
      onceTwiceMonth: "مرة أو مرتين في الشهر",
      never: "أبدًا",
      howOftenExercise:
        "كم مرة تمارس 20-30 دقيقة من التمارين المعتدلة إلى الشديدة؟",
      rarely: "نادرًا",
      oneTwoDaysWeek: "1-2 أيام في الأسبوع",
      threeFourDaysWeek: "3-4 أيام في الأسبوع",
      fiveMoreDaysWeek: "5 أيام أو أكثر في الأسبوع",
      howIsWeight: "كيف هو وزنك؟",
      severelyOverweight: "زيادة الوزن الشديدة",
      moderatelyOverweight: "زيادة الوزن المعتدلة",
      underweight: "نقص الوزن",
      healthyWeight: "وزن صحي",
      howOftenSleep: "كم مرة تنام 7-8 ساعات؟",
      twoOrFewerDays: "يومان أو أقل في الأسبوع",
      threeFourDays: "3-4 أيام في الأسبوع",
      fiveSixDays: "5-6 أيام في الأسبوع",
      whatIsTobaccoHistory: "ما هو تاريخك مع التبغ؟",
      currentlyUse: "أستخدم حاليًا",
      quitLessThanTwoYears: "توقفت منذ أقل من عامين",
      quitOverTwoYears: "توقفت منذ أكثر من عامين",
      neverUsed: "لم أستخدم أبدًا",
      howManyAlcohol: "كم عدد حصص الكحول التي تستهلكها في الأسبوع؟",
      alcoholNote:
        "(12 أونصة بيرة، 8 أونصات مشروب شعير، 5 أونصات نبيذ، 1.5 أونصة مشروب كحولي)",
      excessiveAlcohol: "15+ (رجال) أو 8+ (نساء)",
      howRateSpirituality: "كيف تقيم روحانيتك؟",
      noInterest: "لا اهتمام",
      moderatelySpiritual: "روحي معتدل",
      deeplySpiritual: "روحي عميق",
      Is_Interests: "الاهتمامات",
      Is_TellYourInterest: "أخبرنا بما تهتم به لتخصيص تجربتك.",
      Is_WeightManagement: "إدارة الوزن",
      Is_FitAndExercise: "اللياقة والتمارين",
      Is_StopSmoking: "الإقلاع عن التدخين",
      Is_HealthyCooking: "الطبخ الصحي",
      Is_StressReduction: "تقليل التوتر",
      Is_PreventHeartDisease: "الوقاية من أمراض القلب",
      Is_DepressionRecovery: "التعافي من الاكتئاب",
      Is_ReversingDiabetes: "عكس مرض السكري",
      Is_NaturalRemedies: "العلاجات الطبيعية",
      Is_SpiritualHealth: "الصحة الروحية",
      Is_ImprovingMentalPerformance: "تحسين الأداء العقلي",
      Is_Other: "أخرى",
      Is_Name: "الاسم",
      Is_Email: "البريد الإلكتروني",
      Is_Address: "العنوان",
      Is_Phone: "الهاتف",
      Is_Zip: "الرمز البريدي",
      Is_ShowReport: "إظهار التقرير",
      Rs_Report: "تقرير",
      Rs_CustomizedReport: "تقرير مخصص لـ:",
      Rs_YourHealthAge: "عمرك الصحي هو",
      Rs_YourActualAge: "عمرك الفعلي هو",
      Rs_CurrentAge: "العمر الحالي",
      Rs_HealthAge: "العمر الصحي",
      Rs_PotentialAge: "العمر المحتمل",
      Rs_HealthyHabitsParagraph:
        "تكشف العديد من الدراسات البحثية الكبيرة، بما في ذلك دراسة مقاطعة ألاميدا الشهيرة ودراسات صحة الأدventist، عن وجود علاقة قوية بين العادات الصحية المذكورة أدناه وخطر الإصابة بالأمراض/الوفاة. قد يؤثر الأفراد الذين يمارسون كل هذه العادات الصحية على طول أعمارهم بما يقرب من 30 عامًا.",
      Rs_MedicalDisclaimerTitle: "إخلاء المسؤولية الطبية",
      Rs_MedicalDisclaimerText:
        "يُخصص عمر الصحة لأغراض إعلامية وتعليمية فقط. وهو ليس تشخيصًا طبيًا ولا ينبغي استخدامه كبديل للاستشارة الطبية المهنية أو التشخيص أو العلاج. استشر دائمًا متخصصًا في الرعاية الصحية مؤهلًا قبل اتخاذ أي قرارات طبية أو إجراء تغييرات على رعايتك الصحية.",
      Rs_MedicalSources: "المصادر الطبية",
      Rs_Source: "المصدر",
      Rs_Recommendations: "التوصيات",
      Rs_1_title: "تناول وجبة إفطار جيدة يوميًا",
      Rs_1_desc:
        "يعزز الإفطار عملية الأيض، ويساعد على التركيز، ويحسن الأداء في المدرسة والعمل. كما أنه يساعد في الحفاظ على وزن صحي.",
      Rs_2_title: "تجنب الوجبات الخفيفة",
      Rs_2_desc:
        "يمكن أن تضيف الوجبات الخفيفة ما متوسطه 580 سعرة حرارية في اليوم، وتضعف الهضم، وتعطل التحكم في نسبة السكر في الدم، وتساهم في زيادة الوزن.",
      Rs_3_title: "استمتع بالمزيد من الفواكه والخضروات",
      Rs_3_desc:
        "الفواكه والخضروات غنية بالمواد الكيميائية النباتية والفيتامينات والألياف مع كونها أقل في السعرات الحرارية.",
      Rs_4_title: "زيادة تناول الحبوب الكاملة",
      Rs_4_desc:
        "تحتوي الحبوب الكاملة على الألياف وفيتامينات ب والمعادن الأساسية التي تدعم الصحة العامة.",
      Rs_5_title: "تناول المزيد من المكسرات",
      Rs_5_desc:
        "المكسرات مصدر ممتاز للبروتين والدهون الصحية، وتساعد على تنظيم مستويات السكر في الدم.",
      Rs_6_title: "تجنب اللحوم الحمراء",
      Rs_6_desc:
        "تم ربط تناول اللحوم الحمراء بمرض السكري من النوع 2 وأمراض القلب والسكتة الدماغية وأنواع معينة من السرطان.",
      Rs_7_title: "مارس الرياضة بانتظام",
      Rs_7_desc:
        "تعزز التمارين الرياضية الطاقة، وتحسن المزاج ومستويات الكوليسترول، وتخفض ضغط الدم، وتحسن النوم، وتقوي المناعة، وتساعد على التحكم في نسبة السكر في الدم.",
      Rs_8_title: "تحقيق وزن صحي",
      Rs_8_desc:
        "حافظ على مؤشر كتلة الجسم بين 18.5 - 24.9 ومحيط خصر صحي (أقل من 40 بوصة للرجال، 35 بوصة للنساء).",
      Rs_9_title: "احصل على 7-8 ساعات من النوم الجيد كل ليلة",
      Rs_9_desc:
        "يدعم النوم الكافي الذاكرة والتعلم والتمثيل الغذائي ووظيفة المناعة.",
      Rs_10_title: "توقف عن التدخين",
      Rs_10_desc:
        "يضر التدخين بكل عضو في الجسم، مما يزيد من خطر الإصابة بالسرطان وأمراض القلب ومرض الانسداد الرئوي المزمن والربو ومشاكل الأسنان.",
      Rs_11_title: "لا تشرب الكحول",
      Rs_11_desc:
        "يمكن أن يسبب تعاطي الكحول مشاكل عصبية وقلبية وعقلية، فضلاً عن زيادة خطر الإصابة بالسرطان وأمراض الكبد.",
      Rs_12_title: "زيادة الروحانية",
      Rs_12_desc:
        "قد يؤدي الإيمان بالله إلى تحسين الصحة العقلية وتقوية وظيفة المناعة.",
      Rs_SavePdf: "حفظ بصيغة PDF",
      Rs_ShareReport: "مشاركة التقرير",
      Hs_List: "قائمة",
      Hs_Group: "مجموعة",
      Hs_View: "عرض",
      Hs_Filter: "تصفية",
      Hs_Options: "خيارات",
      Hs_Export: "تصدير",
      Hs_Delete: "حذف",
      Hs_Search: "بحث",
      Hs_ExportAsCSV: "تصدير كملف CSV",
      Hs_Confirmation: "هل أنت متأكد من أنك تريد الحذف؟",
      Hs_Success: "تم حذف العنصر",
      Hs_Cancel: "إلغاء",
      Hs_ItemsSelected: "العناصر المحددة",
      Hs_SelectAll: "تحديد الكل",
      Hs_NewGroup: "مجموعة جديدة",
      Hs_ExistingGroup: "مجموعة موجودة",
      Hs_Create: "إنشاء",
      Hs_GroupName: "اسم المجموعة",
      Hs_EnterGroupName: "أدخل اسم المجموعة",
      Hs_Reports: "التقارير",
      Hs_save: "حفظ",
      Hs_Nothing: "لا يوجد شيء هنا حتى الآن!",
      Hs_NothingDesc: "ستظهر تقارير عمرك الصحي هنا بمجرد إكمال التقييم.",
      Hs_Download: "تحميل",
      Hs_LanguageChanged: "تم تغيير اللغة بنجاح",
      Hs_Change: "تغيير",
      Fs_Filter: "تصفية بواسطة",
      Fs_Close: "إغلاق",
      Fs_Date: "التاريخ",
      Fs_From: "من",
      Fs_To: "إلى",
      Fs_ClearAll: "مسح الكل",
      Fs_ShowResults: "إظهار النتائج",

      // others

      select: "اختر",
      total: "المجموع",
      purchase: "شراء",
      aboutProgramme: "حول البرنامج",
      reports: "التقارير",
      PrintQuestion: "طباعة الاستبيان",
      PrintReport: "طباعة تقرير فارغ",
      reportSetting: "إعدادات التقرير",
      changeLanguage: "تغيير اللغة",
      uploadLogo: "تحميل شعارك",
      upload: "تحميل",
      contactDetails: "تفاصيل الاتصال",
      enterAddress: "أدخل العنوان",
      enterPhone: "أدخل رقم الهاتف",
      createGroup: "إنشاء مجموعة",

      // blood

      normalBp: "ضغط دمك طبيعي",
      MaintainBp: "يرجى الحفاظ على ضغط دمك",
      bpRange: "المدى الطبيعي هو 90-119/60-79 مم زئبق.",
      normalGlucoseLevel: "مستوى السكر في الدم طبيعي",
      maintainGlucoseLevel: "يرجى الحفاظ على مستوى السكر في الدم",
      normalRangeGlucose: "المدى الطبيعي هو",
      for: "لـ",
      postMeal: "بعد الوجبة",
      test: "اختبار",
      maintainBloodGlucose: "حافظ على مستويات سكر الدم",
      maintainLowBloodGlucoseDesc:
        "مستويات سكر الدم لديك منخفضة. الحفاظ على استقرار سكر الدم يمنع المضاعفات، ويزيد من الطاقة، ويدعم الصحة العامة. يساعد تناول الطعام المتوازن وممارسة الرياضة في الحفاظ عليه!",
      maintainHighBloodGlucoseDesc:
        "مستويات سكر الدم لديك مرتفعة. الحفاظ على استقرار سكر الدم يمنع المضاعفات، ويزيد من الطاقة، ويدعم الصحة العامة. يساعد تناول الطعام المتوازن وممارسة الرياضة في الحفاظ عليه!",
      maintainBloodPressure: "حافظ على ضغط الدم تحت السيطرة",
      maintainBloodPressureDesc:
        "الحفاظ على ضغط دم صحي يقلل من مخاطر أمراض القلب، والسكتات الدماغية، ومشاكل الكلى. التمارين المنتظمة والنظام الغذائي المتوازن يصنعان فرقًا كبيرًا!",
      maintainLowBloodPressureDesc:
        "مستويات ضغط الدم لديك منخفضة. الحفاظ على ضغط دم صحي يقلل من مخاطر أمراض القلب، والسكتات الدماغية، ومشاكل الكلى. التمارين المنتظمة والنظام الغذائي المتوازن يصنعان فرقًا كبيرًا!",
      maintainHighBloodPressureDesc:
        "مستويات ضغط الدم لديك مرتفعة. الحفاظ على ضغط دم صحي يقلل من مخاطر أمراض القلب، والسكتات الدماغية، ومشاكل الكلى. التمارين المنتظمة والنظام الغذائي المتوازن يصنعان فرقًا كبيرًا!",
      discoverHealthAge: "اكتشف عمرك الصحي!",
      downloadSuccess: "تم التنزيل بنجاح",
      goBackConfirmation: "هل أنت متأكد أنك تريد الرجوع؟",
      pleaseWait: "يرجى الانتظار!",
      // purchase Screen

      goBeyond: "تجاوز الأساسيات!",

      JoinPro:
        "انضم إلى أعضائنا المحترفين وارتقِ برحلتك الصحية إلى المستوى التالي",

      WhyJoinPro: "لماذا تنضم إلى العضوية الاحترافية؟",

      UnlimitedReports: "تقارير غير محدودة",

      FullReportHistory: "تاريخ التقارير الكامل",

      PrintYourQuestionnaire: "اطبع الاستبيان مع شعارك",

      printYourReport: "اطبع تقارير فارغة مع شعارك",

      upgrade: "الترقية",

      yearlyPurchase: "شراء سنوي",

      thisOneForPro: "عذرًا! هذه الميزة مخصصة لأعضاء PRO فقط.",

      proMembersDesc:
        "هذه الميزة مخصصة لأعضاء PRO لدينا. هل ترغب في الانضمام؟ قم بالترقية الآن واستمتع بالمزايا الحصرية المصممة خصيصًا لك!",

      UpgradeComplete: "اكتملت الترقية!",

      NowAProMember: "أنت الآن عضو PRO!",

      UpgradeTo: "الترقية إلى",
      SubscriptionCancelledSuccess: "تم إلغاء الاشتراك بنجاح!",
      ConfirmSubCancel: "هل أنت متأكد أنك تريد إلغاء الاشتراك؟",
      SubDaysRemaining: "الأيام المتبقية من الاشتراك:",
      RenewSub: "تجديد الاشتراك",
      cancelSub: "إلغاء الاشتراك",
      renewSubConfirmation:
        "إذا اخترت التجديد الآن، سيبدأ دورة الفوترة الجديدة من اليوم، ولن تكون المدة المتبقية من اشتراكك الحالي صالحة بعد الآن. هل أنت متأكد أنك تريد المتابعة في التجديد؟",
      renew: "تجديد",
      BloodPressure: "ضغط الدم",
      BloodGlucose: "سكر الدم",
      BMI: "مؤشر كتلة الجسم (BMI)",
      PDFDonwload: "تم تنزيل ملف PDF!",
      PDFShared: "تمت مشاركة ملف PDF!",
      Error: "حدث خطأ ما!",
      aboutTheApp: "حول التطبيق",

        "aboutTheAppDesc": "يساعد هذا التطبيق في تحديد \"العمر الصحي\" لجسم الشخص وفقًا لممارسات نمط حياة الفرد. يجمع هذا التطبيق معلومات من دراسات ألاميدا كاونتي المعروفة لطول العمر ودراسات صحة الأدفنتست الجديدة. يساعد هذا التطبيق المشاركين على فهم العلاقة القوية بين عاداتهم الصحية وخطر وفاتهم. ويوفر أساسًا ممتازًا للاستشارات الصحية.",
  "aboutTheAppTitle": "عن التطبيق"
    },
  },
  it: {
    translation: {
      welcome: "Benvenuto/a",
      chooseLanguage: "Scegli la lingua",
      introduction: "Introduzione",
      howItWorks: "Come funziona",
      benefits: "Benefici",

      lifestyleAffectsHealth:
        "Il tuo stile di vita influisce sulla tua salute più di quanto pensi. Scopriamo quanto sei veramente giovane!",
      simpleScienceBacked: "Semplice e Basato sulla Scienza",
      answerQuestions:
        "Rispondi a poche domande sulle tue abitudini e calcoleremo la tua Età di Salute basandoci su dati di salute reali.",
      getPersonalizedTips: "Ottieni Consigli di Salute Personalizzati",
      improveLifestyle:
        "Migliora il tuo stile di vita con raccomandazioni personalizzate per raggiungere il tuo miglior potenziale di salute.",
      helpCalculateHealthAge:
        "Posso aiutarti a calcolare la tua età di salute.",
      startAssessment: "Inizia ora la tua valutazione",
      home: "Casa",
      purchases: "Acquisti",
      history: "Storico",
      dailyLimit: "Limite giornaliero",
      getStarted:
        "Iniziamo. La tua età di salute si basa sul tuo stile di vita e sulle tue abitudini.",
      whatIsYourName: "Qual è il tuo nome?",
      enterName: "Inserisci il nome",
      next: "Avanti",
      whatIsYourAge: "Qual è la tua età?",
      age: "Età",
      whatIsYourGender: "Qual è il tuo genere?",
      gender: "Genere",
      male: "Maschio",
      female: "Femmina",
      whatIsYourHeight: "Qual è la tua altezza?",
      height: "Altezza",
      whatIsYourWeight: "Qual è il tuo peso?",
      weight: "Peso",
      whatIsYourWaistCircumference: "Qual è la circonferenza della tua vita?",
      waistCircumference: "Circonferenza vita",
      whatIsYourBloodPressure: "Qual è la tua pressione sanguigna?",
      bloodPressure: "Pressione sanguigna",
      whatIsYourBloodGlucose: "Qual è il tuo livello di glucosio nel sangue?",
      fasting: "A digiuno",
      postMeals: "Dopo i pasti",
      bloodGlucoseLevel: "Livello di glucosio nel sangue",
      newAssessment: "Nuova Valutazione",
      howOftenEatBreakfast: "Quanto spesso fai una buona colazione?",
      breakfastNote:
        "(Enfatizzando cereali integrali, frutta o verdura e noci)",
      lessThan2Days: "Meno di 2 giorni a settimana",
      twoToFourDays: "2-4 giorni a settimana",
      fiveToSixDays: "5-6 giorni a settimana",
      everyday: "Ogni giorno",
      howOftenSnack: "Quanto spesso fai spuntini?",
      severalTimesDay: "Diverse volte al giorno",
      onceDay: "Una volta al giorno",
      fewTimesWeek: "Poche volte a settimana",
      rarelyNever: "Raramente o mai",
      howManyFruitsVeggies:
        "Quante porzioni di frutta e verdura mangi al giorno?",
      fruitsVeggiesNote:
        "(1 porzione = 1 frutto medio, 1 tazza di fresco, 1/2 tazza di cotto o 180 ml di succo 100%)",
      howManyWholeGrains:
        "Quante porzioni di cereali integrali mangi al giorno?",
      wholeGrainsNote:
        "(1 porzione = 1 fetta di pane, 1/2 tazza di riso integrale o avena, 2/3 tazza di cereali secchi)",
      none: "Nessuno",
      back: "Indietro",
      howManyNutsSeeds: "Quante porzioni di noci e semi mangi a settimana?",
      nutsSeedsNote:
        "(1 porzione = 30 g di noci o semi, 2 cucchiai di burro di noci)",
      howOftenRedMeat: "Quanto spesso mangi carne rossa?",
      threeOrMoreTimesWeek: "3 o più volte a settimana",
      onceTwiceMonth: "Una o due volte al mese",
      never: "Mai",
      howOftenExercise:
        "Quanto spesso fai 20-30 minuti di esercizio fisico moderato o vigoroso?",
      rarely: "Raramente",
      oneTwoDaysWeek: "1-2 giorni a settimana",
      threeFourDaysWeek: "3-4 giorni a settimana",
      fiveMoreDaysWeek: "5 o più giorni a settimana",
      howIsWeight: "Com'è il tuo peso?",
      severelyOverweight: "Gravemente sovrappeso",
      moderatelyOverweight: "Moderatamente sovrappeso",
      underweight: "Sottopeso",
      healthyWeight: "Peso salutare",
      howOftenSleep: "Quanto spesso dormi 7-8 ore?",
      twoOrFewerDays: "2 o meno giorni a settimana",
      threeFourDays: "3-4 giorni a settimana",
      fiveSixDays: "5-6 giorni a settimana",
      whatIsTobaccoHistory: "Qual è la tua storia con il tabacco?",
      currentlyUse: "Uso corrente",
      quitLessThanTwoYears: "Smetto meno di 2 anni fa",
      quitOverTwoYears: "Smetto più di 2 anni fa",
      neverUsed: "Mai usato",
      howManyAlcohol: "Quante porzioni di alcol consumi a settimana?",
      alcoholNote:
        "(355 ml di birra, 240 ml di liquore di malto, 150 ml di vino, 45 ml di superalcolico)",
      excessiveAlcohol: "15+ (uomini) o 8+ (donne)",
      howRateSpirituality: "Come valuteresti la tua spiritualità?",
      noInterest: "Nessun interesse",
      moderatelySpiritual: "Moderatamente spirituale",
      deeplySpiritual: "Profondamente spirituale",
      Is_Interests: "Interessi",
      Is_TellYourInterest:
        "Dicci a cosa sei interessato per personalizzare la tua esperienza.",
      Is_WeightManagement: "Gestione del Peso",
      Is_FitAndExercise: "Fitness ed Esercizio",
      Is_StopSmoking: "Smettere di Fumare",
      Is_HealthyCooking: "Cucina Sana",
      Is_StressReduction: "Riduzione dello Stress",
      Is_PreventHeartDisease: "Prevenzione delle Malattie Cardiache",
      Is_DepressionRecovery: "Recupero dalla Depressione",
      Is_ReversingDiabetes: "Inversione del Diabete",
      Is_NaturalRemedies: "Rimedi Naturali",
      Is_SpiritualHealth: "Salute Spirituale",
      Is_ImprovingMentalPerformance: "Miglioramento delle Prestazioni Mentali",
      Is_Other: "Altro",
      Is_Name: "Nome",
      Is_Email: "Email",
      Is_Address: "Indirizzo",
      Is_Phone: "Telefono",
      Is_Zip: "CAP",
      Is_ShowReport: "Mostra Rapporto",
      Rs_Report: "Rapporto",
      Rs_CustomizedReport: "Rapporto Personalizzato per :",
      Rs_YourHealthAge: "La tua età di salute è",
      Rs_YourActualAge: "La tua età attuale di",
      Rs_CurrentAge: "Età Attuale",
      Rs_HealthAge: "Età di Salute",
      Rs_PotentialAge: "Età Potenziale",
      Rs_HealthyHabitsParagraph:
        "Diversi studi di ricerca di grandi dimensioni, tra cui il noto Studio della Contea di Alameda e gli Studi sulla Salute degli Avventisti, rivelano una forte correlazione tra le abitudini di salute elencate di seguito e il rischio di malattie/morte. Gli individui che praticano tutte queste abitudini salutari possono influenzare la loro longevità di quasi 30 anni.",
      Rs_MedicalDisclaimerTitle: "Disclaimer medico",
      Rs_MedicalDisclaimerText:
        "Health Age è destinato esclusivamente a scopi informativi ed educativi. Non è una diagnosi medica e non deve essere utilizzato come sostituto di consulenza, diagnosi o trattamento medico professionale. Consultare sempre un professionista sanitario qualificato prima di prendere decisioni mediche o apportare modifiche alla propria assistenza sanitaria.",
      Rs_MedicalSources: "Fonti mediche",
      Rs_Source: "Fonte",
      Rs_Recommendations: "Raccomandazioni",
      Rs_1_title: "Fai una buona colazione ogni giorno",
      Rs_1_desc:
        "La colazione accelera il metabolismo, aiuta la concentrazione e migliora le prestazioni a scuola e al lavoro. Aiuta anche a mantenere un peso salutare.",
      Rs_2_title: "Evita gli spuntini",
      Rs_2_desc:
        "Gli spuntini possono aggiungere una media di 580 calorie al giorno, compromettere la digestione, interrompere il controllo della glicemia e contribuire all'aumento di peso.",
      Rs_3_title: "Goditi più frutta e verdura",
      Rs_3_desc:
        "Frutta e verdura sono ricche di fitochimici, vitamine e fibre, pur essendo a basso contenuto calorico.",
      Rs_4_title: "Aumenta l'assunzione di cereali integrali",
      Rs_4_desc:
        "I cereali integrali contengono fibre, vitamine del gruppo B e minerali essenziali che supportano la salute generale.",
      Rs_5_title: "Mangia più noci",
      Rs_5_desc:
        "Le noci sono un'ottima fonte di proteine e grassi sani e aiutano a regolare i livelli di zucchero nel sangue.",
      Rs_6_title: "Evita la carne rossa",
      Rs_6_desc:
        "Mangiare carne rossa è stato collegato al diabete di tipo 2, alle malattie cardiache, all'ictus e a certi tumori.",
      Rs_7_title: "Fai esercizio fisico regolarmente",
      Rs_7_desc:
        "L'esercizio fisico aumenta l'energia, migliora l'umore e i livelli di colesterolo, abbassa la pressione sanguigna, migliora il sonno, rafforza l'immunità e aiuta a controllare la glicemia.",
      Rs_8_title: "Raggiungi un peso salutare",
      Rs_8_desc:
        "Mantieni un BMI tra 18,5 e 24,9 e una circonferenza vita sana (meno di 102 cm per gli uomini, 89 cm per le donne).",
      Rs_9_title: "Dormi 7-8 ore di buon sonno ogni notte",
      Rs_9_desc:
        "Un sonno adeguato supporta la memoria, l'apprendimento, il metabolismo e la funzione immunitaria.",
      Rs_10_title: "Smetti di fumare",
      Rs_10_desc:
        "Il fumo danneggia ogni organo del corpo, aumentando il rischio di tumori, malattie cardiache, BPCO, asma e problemi dentali.",
      Rs_11_title: "Non bere alcolici",
      Rs_11_desc:
        "L'uso di alcol può causare problemi neurologici, cardiovascolari e psichiatrici, oltre ad aumentare il rischio di cancro e malattie del fegato.",
      Rs_12_title: "Aumenta la spiritualità",
      Rs_12_desc:
        "La fede in Dio può migliorare la salute mentale e rafforzare la funzione immunitaria.",
      Rs_SavePdf: "Salva pdf",
      Rs_ShareReport: "Condividi rapporto",
      Hs_List: "Elenco",
      Hs_Group: "Gruppo",
      Hs_View: "Visualizza",
      Hs_Filter: "Filtra",
      Hs_Options: "Opzioni",
      Hs_Export: "Esporta",
      Hs_Delete: "Elimina",
      Hs_Search: "Cerca",
      Hs_ExportAsCSV: "Esporta come CSV",
      Hs_Confirmation: "Sei sicuro di voler eliminare?",
      Hs_Success: "Elemento eliminato",
      Hs_Cancel: "Annulla",
      Hs_ItemsSelected: "Elementi selezionati",
      Hs_SelectAll: "Seleziona tutto",
      Hs_NewGroup: "Nuovo gruppo",
      Hs_ExistingGroup: "Gruppo esistente",
      Hs_Create: "Crea",
      Hs_GroupName: "NomeGruppo",
      Hs_EnterGroupName: "Inserisci il nome del gruppo",
      Hs_Reports: "Rapporti",
      Hs_save: "Salva",
      Hs_Nothing: "Ancora niente qui!",
      Hs_NothingDesc:
        "I tuoi rapporti sull'età di salute appariranno qui una volta completata la valutazione.",
      Hs_Download: "Scarica",
      Hs_LanguageChanged: "Lingua cambiata con successo",
      Hs_Change: "Cambia",
      Fs_Filter: "Filtra per",
      Fs_Close: "Chiudi",
      Fs_Date: "Data",
      Fs_From: "Da",
      Fs_To: "A",
      Fs_ClearAll: "Cancella tutto",
      Fs_ShowResults: "Mostra risultati",

      // others

      select: "Seleziona",
      total: "Totale",
      purchase: "Acquisto",
      aboutProgramme: "Informazioni sul Programma",
      reports: "Report",
      PrintQuestion: "Stampa Questionario",
      PrintReport: "Stampa Report Vuoto",
      reportSetting: "Impostazioni Report",
      changeLanguage: "Cambia Lingua",
      uploadLogo: "Carica il tuo logo",
      upload: "Carica",
      contactDetails: "Dettagli di Contatto",
      enterAddress: "Inserisci Indirizzo",
      enterPhone: "Inserisci Numero di Telefono",
      createGroup: "Crea Gruppo",

      for: "per",
      postMeal: "post-pasto",
      test: "test",
      maintainBloodGlucose: "Mantieni i tuoi livelli di glucosio nel sangue",
      maintainLowBloodGlucoseDesc:
        "I tuoi livelli di glucosio nel sangue sono bassi. Mantenere stabile il glucosio nel sangue previene complicazioni, aumenta l'energia e supporta la salute generale. Un'alimentazione equilibrata e l'esercizio fisico aiutano a mantenerlo sotto controllo!",
      maintainHighBloodGlucoseDesc:
        "I tuoi livelli di glucosio nel sangue sono alti. Mantenere stabile il glucosio nel sangue previene complicazioni, aumenta l'energia e supporta la salute generale. Un'alimentazione equilibrata e l'esercizio fisico aiutano a mantenerlo sotto controllo!",
      maintainBloodPressure: "Tieni sotto controllo la pressione sanguigna",
      maintainBloodPressureDesc:
        "Mantenere una pressione sanguigna sana riduce i rischi di malattie cardiache, ictus e problemi renali. L'esercizio regolare e una dieta equilibrata possono fare la differenza!",
      maintainLowBloodPressureDesc:
        "I tuoi livelli di pressione sanguigna sono bassi. Mantenere una pressione sanguigna sana riduce i rischi di malattie cardiache, ictus e problemi renali. L'esercizio regolare e una dieta equilibrata possono fare la differenza!",
      maintainHighBloodPressureDesc:
        "I tuoi livelli di pressione sanguigna sono alti. Mantenere una pressione sanguigna sana riduce i rischi di malattie cardiache, ictus e problemi renali. L'esercizio regolare e una dieta equilibrata possono fare la differenza!",
      discoverHealthAge: "Scopri la Tua Età di Salute!",
      downloadSuccess: "Download Effettuato Con Successo",
      goBackConfirmation: "Sei sicuro di voler tornare indietro?",
      pleaseWait: "Attendi, per favore!",
      // purchase Screen

      goBeyond: "Vai oltre le basi!",

      JoinPro:
        "Unisciti ai nostri membri Pro e porta il tuo percorso di salute al livello successivo",

      WhyJoinPro: "Perché unirsi a Pro?",

      UnlimitedReports: "Report Illimitati",

      FullReportHistory: "Cronologia completa dei report",

      PrintYourQuestionnaire: "Stampa il questionario con il tuo logo",

      printYourReport: "Stampa report vuoti con il tuo logo",

      upgrade: "Aggiorna",

      yearlyPurchase: "Acquisto annuale",

      thisOneForPro: "Oops! Questa è solo per i membri PRO.",

      proMembersDesc:
        "Questa funzionalità è riservata ai nostri membri Pro. Vuoi farne parte? Aggiorna ora e goditi vantaggi esclusivi pensati apposta per te!",

      UpgradeComplete: "Aggiornamento completato!",

      NowAProMember: "Ora sei un membro Pro!",

      UpgradeTo: "Aggiorna a",

      SubscriptionCancelledSuccess: "Abbonamento annullato con successo!",

      ConfirmSubCancel: "Sei sicuro di voler annullare l'abbonamento?",

      SubDaysRemaining: "Giorni rimanenti dell'abbonamento:",

      RenewSub: "Rinnova abbonamento",

      cancelSub: "Annulla abbonamento",

      renewSubConfirmation:
        "Se scegli di rinnovare ora, un nuovo ciclo di fatturazione inizierà da oggi e la durata rimanente del tuo abbonamento attuale non sarà più valida. Sei sicuro di voler procedere con il rinnovo?",

      renew: "Rinnova",

      BloodPressure: "Pressione sanguigna",

      BloodGlucose: "Glicemia",

      BMI: "BMI",

      PDFDonwload: "Il PDF è stato scaricato!",

      PDFShared: "Il PDF è stato condiviso!",

      Error: "Qualcosa è andato storto!",

      aboutTheApp: "Informazioni sull'app",

      "aboutTheAppDesc": "Questa app aiuta a determinare l'\"età di salute\" del proprio corpo in base alle pratiche di stile di vita di un individuo. Questa app combina informazioni sia dai ben noti studi sulla longevità della contea di Alameda che dai nuovi studi sulla salute avventista. Questa app aiuta i partecipanti a comprendere la forte correlazione tra le proprie abitudini di salute e il rischio di morte. Fornisce un'ottima base per la consulenza sanitaria.",
    "aboutTheAppTitle": "Informazioni sull'app"
    },
  },
  ko: {
    translation: {
      welcome: "환영합니다",
      chooseLanguage: "언어 선택",
      introduction: "소개",
      howItWorks: "작동 방식",
      benefits: "혜택",
      lifestyleAffectsHealth:
        "당신의 생활 습관은 생각보다 건강에 큰 영향을 미칩니다. 당신이 실제로 얼마나 젊은지 알아봅시다!",
      simpleScienceBacked: "간단하고 과학적인 기반",
      answerQuestions:
        "몇 가지 습관에 대한 질문에 답하면 실제 건강 정보를 기반으로 건강 나이를 계산해 드립니다.",
      getPersonalizedTips: "개인 맞춤형 건강 팁 받기",
      improveLifestyle:
        "최고의 건강 잠재력에 도달할 수 있도록 맞춤형 권장 사항으로 생활 습관을 개선하세요.",
      helpCalculateHealthAge: "건강 나이 계산을 도와드릴 수 있습니다.",
      startAssessment: "지금 평가를 시작하세요",
      home: "홈",
      purchases: "구매",
      history: "기록",
      dailyLimit: "일일 제한",
      getStarted:
        "시작해 봅시다. 당신의 건강 나이는 생활 습관과 습관에 기반합니다.",
      whatIsYourName: "이름이 무엇입니까?",
      enterName: "이름 입력",
      next: "다음",
      whatIsYourAge: "나이가 어떻게 되십니까?",
      age: "나이",
      whatIsYourGender: "성별이 무엇입니까?",
      gender: "성별",
      male: "남성",
      female: "여성",
      whatIsYourHeight: "키가 어떻게 되십니까?",
      height: "키",
      whatIsYourWeight: "몸무게가 어떻게 되십니까?",
      weight: "몸무게",
      whatIsYourWaistCircumference: "허리 둘레가 어떻게 되십니까?",
      waistCircumference: "허리 둘레",
      whatIsYourBloodPressure: "혈압이 어떻게 되십니까?",
      bloodPressure: "혈압",
      whatIsYourBloodGlucose: "혈당 수치가 어떻게 되십니까?",
      fasting: "공복",
      postMeals: "식후",
      bloodGlucoseLevel: "혈당 수치",
      newAssessment: "새로운 평가",
      howOftenEatBreakfast: "아침 식사를 얼마나 자주 드십니까?",
      breakfastNote: "(통곡물, 과일 또는 채소, 견과류 강조)",
      lessThan2Days: "주당 2일 미만",
      twoToFourDays: "주당 2-4일",
      fiveToSixDays: "주당 5-6일",
      everyday: "매일",
      howOftenSnack: "간식을 얼마나 자주 드십니까?",
      severalTimesDay: "하루에 여러 번",
      onceDay: "하루에 한 번",
      fewTimesWeek: "일주일에 몇 번",
      rarelyNever: "거의 또는 전혀 없음",
      howManyFruitsVeggies: "하루에 과일과 채소를 얼마나 드십니까?",
      fruitsVeggiesNote:
        "(1회 제공량 = 중간 크기 1개, 신선한 것 1컵, 익힌 것 1/2컵 또는 100% 주스 6온스)",
      howManyWholeGrains: "하루에 통곡물을 얼마나 드십니까?",
      wholeGrainsNote:
        "(1회 제공량 = 빵 1조각, 현미 또는 오트밀 1/2컵, 건조 시리얼 2/3컵)",
      none: "없음",
      back: "뒤로",
      howManyNutsSeeds: "일주일에 견과류와 씨앗을 얼마나 드십니까?",
      nutsSeedsNote: "(1회 제공량 = 견과류 또는 씨앗 1온스, 견과류 버터 2큰술)",
      howOftenRedMeat: "붉은 고기를 얼마나 자주 드십니까?",
      threeOrMoreTimesWeek: "주당 3회 이상",
      onceTwiceMonth: "한 달에 한두 번",
      never: "전혀 안 먹음",
      howOftenExercise:
        "20-30분 동안 중간 강도에서 격렬한 운동을 얼마나 자주 하십니까?",
      rarely: "거의 안 함",
      oneTwoDaysWeek: "주당 1-2일",
      threeFourDaysWeek: "주당 3-4일",
      fiveMoreDaysWeek: "주당 5일 이상",
      howIsWeight: "체중은 어떻습니까?",
      severelyOverweight: "심각한 과체중",
      moderatelyOverweight: "중간 정도의 과체중",
      underweight: "저체중",
      healthyWeight: "건강한 체중",
      howOftenSleep: "7-8시간 동안 얼마나 자주 잠을 잡니까?",
      twoOrFewerDays: "주당 2일 이하",
      threeFourDays: "주당 3-4일",
      fiveSixDays: "주당 5-6일",
      whatIsTobaccoHistory: "담배 이력은 어떻게 되십니까?",
      currentlyUse: "현재 사용 중",
      quitLessThanTwoYears: "2년 미만 전에 끊음",
      quitOverTwoYears: "2년 이상 전에 끊음",
      neverUsed: "사용한 적 없음",
      howManyAlcohol: "일주일에 술을 얼마나 마십니까?",
      alcoholNote: "(맥주 12온스, 맥아주 8온스, 와인 5온스, 샷 1.5온스)",
      excessiveAlcohol: "15+ (남성) 또는 8+ (여성)",
      howRateSpirituality: "당신의 영성을 어떻게 평가하시겠습니까?",
      noInterest: "관심 없음",
      moderatelySpiritual: "중간 정도의 영성",
      deeplySpiritual: "깊은 영성",
      Is_Interests: "관심사",
      Is_TellYourInterest: "경험을 맞춤 설정하기 위해 관심사를 알려주세요.",
      Is_WeightManagement: "체중 관리",
      Is_FitAndExercise: "건강 및 운동",
      Is_StopSmoking: "금연",
      Is_HealthyCooking: "건강한 요리",
      Is_StressReduction: "스트레스 감소",
      Is_PreventHeartDisease: "심장 질환 예방",
      Is_DepressionRecovery: "우울증 회복",
      Is_ReversingDiabetes: "당뇨병 개선",
      Is_NaturalRemedies: "자연 요법",
      Is_SpiritualHealth: "영적 건강",
      Is_ImprovingMentalPerformance: "정신 능력 향상",
      Is_Other: "기타",
      Is_Name: "이름",
      Is_Email: "이메일",
      Is_Address: "주소",
      Is_Phone: "전화번호",
      Is_Zip: "우편번호",
      Is_ShowReport: "보고서 보기",
      Rs_Report: "보고서",
      Rs_CustomizedReport: "맞춤형 보고서: ",
      Rs_YourHealthAge: "당신의 건강 나이는",
      Rs_YourActualAge: "당신의 실제 나이는",
      Rs_CurrentAge: "현재 나이",
      Rs_HealthAge: "건강 나이",
      Rs_PotentialAge: "잠재적 나이",
      Rs_HealthyHabitsParagraph:
        "유명한 Alameda County 연구 및 Adventist 건강 연구를 포함한 여러 대규모 연구에서 아래 나열된 건강 습관과 질병/사망 위험 사이에 강력한 상관관계가 있음을 보여줍니다. 이러한 건강한 습관을 모두 실천하는 개인은 수명을 거의 30년까지 늘릴 수 있습니다.",
      Rs_MedicalDisclaimerTitle: "의료 면책 조항",
      Rs_MedicalDisclaimerText:
        "헬스 에이지는 정보 및 교육 목적으로만 제공됩니다. 의학적 진단이 아니며 전문적인 의료 조언, 진단 또는 치료를 대체해서는 안 됩니다. 의료 결정을 내리거나 건강 관리를 변경하기 전에 항상 자격을 갖춘 의료 전문가와 상담하십시오.",
      Rs_MedicalSources: "의료 출처",
      Rs_Source: "출처",
      Rs_Recommendations: "권장 사항",
      Rs_1_title: "매일 아침 식사를 잘 챙겨 드세요",
      Rs_1_desc:
        "아침 식사는 신진대사를 촉진하고 집중력을 높이며 학교와 직장에서의 수행 능력을 향상시킵니다. 또한 건강한 체중을 유지하는 데 도움이 됩니다.",
      Rs_2_title: "간식을 피하세요",
      Rs_2_desc:
        "간식은 하루 평균 580칼로리를 추가하고 소화를 방해하며 혈당 조절을 방해하고 체중 증가에 기여할 수 있습니다.",
      Rs_3_title: "과일과 채소를 더 많이 드세요",
      Rs_3_desc:
        "과일과 채소는 칼로리는 낮으면서 식물성 화학 물질, 비타민 및 섬유질이 풍부합니다.",
      Rs_4_title: "통곡물 섭취를 늘리세요",
      Rs_4_desc:
        "통곡물에는 섬유질, 비타민 B, 전반적인 건강을 지원하는 필수 미네랄이 포함되어 있습니다.",
      Rs_5_title: "견과류를 더 많이 드세요",
      Rs_5_desc:
        "견과류는 단백질과 건강한 지방의 훌륭한 공급원이며 혈당 수치를 조절하는 데 도움이 됩니다.",
      Rs_6_title: "붉은 고기를 피하세요",
      Rs_6_desc:
        "붉은 고기 섭취는 제2형 당뇨병, 심장병, 뇌졸중 및 특정 암과 관련이 있습니다.",
      Rs_7_title: "규칙적으로 운동하세요",
      Rs_7_desc:
        "운동은 에너지를 높이고 기분과 콜레스테롤 수치를 개선하며 혈압을 낮추고 수면을 개선하며 면역력을 강화하고 혈당 조절을 돕습니다.",
      Rs_8_title: "건강한 체중을 유지하세요",
      Rs_8_desc:
        "BMI를 18.5 - 24.9 사이로 유지하고 건강한 허리 둘레(남성 40인치 미만, 여성 35인치 미만)를 유지하세요.",
      Rs_9_title: "매일 밤 7-8시간의 숙면을 취하세요",
      Rs_9_desc:
        "적절한 수면은 기억력, 학습, 신진대사 및 면역 기능을 지원합니다.",
      Rs_10_title: "금연하세요",
      Rs_10_desc:
        "흡연은 신체의 모든 기관에 해를 끼치며 암, 심장병, COPD, 천식 및 치과 문제의 위험을 증가시킵니다.",
      Rs_11_title: "술을 마시지 마세요",
      Rs_11_desc:
        "알코올 사용은 신경학적, 심혈관 및 정신과적 문제를 일으킬 수 있으며 암 및 간 질환의 위험을 증가시킬 수 있습니다.",
      Rs_12_title: "영성을 높이세요",
      Rs_12_desc:
        "하나님에 대한 믿음은 정신 건강을 개선하고 면역 기능을 강화할 수 있습니다.",
      Rs_SavePdf: "PDF 저장",
      Rs_ShareReport: "보고서 공유",
      Hs_List: "목록",
      Hs_Group: "그룹",
      Hs_View: "보기",
      Hs_Filter: "필터",
      Hs_Options: "옵션",
      Hs_Export: "내보내기",
      Hs_Delete: "삭제",
      Hs_Search: "검색",
      Hs_ExportAsCSV: "CSV로 내보내기",
      Hs_Confirmation: "정말 삭제하시겠습니까?",
      Hs_Success: "항목 삭제됨",
      Hs_Cancel: "취소",
      Hs_ItemsSelected: "선택된 항목",
      Hs_SelectAll: "전체 선택",
      Hs_NewGroup: "새 그룹",
      Hs_ExistingGroup: "기존 그룹",
      Hs_Create: "생성",
      Hs_GroupName: "그룹 이름",
      Hs_EnterGroupName: "그룹 이름 입력",
      Hs_Reports: "보고서",
      Hs_save: "저장",
      Hs_Nothing: "아직 여기에 아무것도 없습니다!",
      Hs_NothingDesc: "평가를 완료하면 건강 나이 보고서가 여기에 표시됩니다.",
      Hs_Download: "다운로드",
      Hs_LanguageChanged: "언어가 성공적으로 변경되었습니다.",
      Hs_Change: "변경",
      Fs_Filter: "필터 기준",
      Fs_Close: "닫기",
      Fs_Date: "날짜",
      Fs_From: "시작",
      Fs_To: "끝",
      Fs_ClearAll: "전체 지우기",
      Fs_ShowResults: "결과 보기",

      // others

      select: "선택",
      total: "총",
      purchase: "구매",
      aboutProgramme: "프로그램 소개",
      reports: "보고서",
      PrintQuestion: "설문지 인쇄",
      PrintReport: "빈 보고서 인쇄",
      reportSetting: "보고서 설정",
      changeLanguage: "언어 변경",
      uploadLogo: "로고 업로드",
      upload: "업로드",
      contactDetails: "연락처 정보",
      enterAddress: "주소 입력",
      enterPhone: "전화번호 입력",
      createGroup: "그룹 생성",

      // blood

      normalBp: "혈압이 정상입니다.",
      MaintainBp: "혈압을 유지해주세요.",
      bpRange: "정상 범위는 90-119/60-79 mmHg입니다.",
      normalGlucoseLevel: "혈당 수치가 정상입니다.",
      maintainGlucoseLevel: "혈당 수치를 유지해주세요.",
      normalRangeGlucose: "정상 범위는",
      for: "위한",
      postMeal: "식후",
      test: "검사",
      maintainBloodGlucose: "혈당 수치 유지",
      maintainLowBloodGlucoseDesc:
        "혈당 수치가 낮습니다. 안정적인 혈당은 합병증을 예방하고 에너지를 높이며 전반적인 건강을 지원합니다. 균형 잡힌 식사와 운동은 혈당 조절에 도움이 됩니다!",
      maintainHighBloodGlucoseDesc:
        "혈당 수치가 높습니다. 안정적인 혈당은 합병증을 예방하고 에너지를 높이며 전반적인 건강을 지원합니다. 균형 잡힌 식사와 운동은 혈당 조절에 도움이 됩니다!",

      maintainBloodPressure: "혈압 조절 유지",
      maintainBloodPressureDesc:
        "건강한 혈압 유지는 심장병, 뇌졸중, 신장 질환의 위험을 줄여줍니다. 규칙적인 운동과 균형 잡힌 식단이 큰 차이를 만듭니다!",
      maintainLowBloodPressureDesc:
        "혈압 수치가 낮습니다. 건강한 혈압 유지는 심장병, 뇌졸중, 신장 질환의 위험을 줄여줍니다. 규칙적인 운동과 균형 잡힌 식단이 큰 차이를 만듭니다!",
      maintainHighBloodPressureDesc:
        "혈압 수치가 높습니다. 건강한 혈압 유지는 심장병, 뇌졸중, 신장 질환의 위험을 줄여줍니다. 규칙적인 운동과 균형 잡힌 식단이 큰 차이를 만듭니다!",
      discoverHealthAge: "당신의 건강 나이를 알아보세요!",
      downloadSuccess: "성공적으로 다운로드되었습니다",
      goBackConfirmation: "정말로 돌아가시겠습니까?",
      pleaseWait: "잠시만 기다려 주세요!",
      // purchase Screen

      goBeyond: "기본을 넘어서세요!",

      JoinPro: "Pro 멤버가 되어 건강 여정을 한 단계 끌어올리세요",

      WhyJoinPro: "왜 Pro에 가입해야 하나요?",

      UnlimitedReports: "무제한 리포트",

      FullReportHistory: "전체 리포트 기록",

      PrintYourQuestionnaire: "로고가 포함된 설문지를 출력하세요",

      printYourReport: "로고가 포함된 빈 리포트를 출력하세요",

      upgrade: "업그레이드",

      yearlyPurchase: "연간 구독",

      thisOneForPro: "이 기능은 PRO 멤버 전용입니다.",

      proMembersDesc:
        "이 기능은 Pro 멤버 전용입니다. 지금 업그레이드하고 나만을 위한 특별한 혜택을 누리세요!",

      UpgradeComplete: "업그레이드 완료!",

      NowAProMember: "이제 당신은 Pro 멤버입니다!",

      UpgradeTo: "업그레이드 하기",
      SubscriptionCancelledSuccess: "구독이 성공적으로 취소되었습니다!",
      ConfirmSubCancel: "정말로 구독을 취소하시겠습니까?",
      SubDaysRemaining: "남은 구독 기간:",
      RenewSub: "구독 갱신",
      cancelSub: "구독 취소",
      renewSubConfirmation:
        "지금 갱신을 선택하면 오늘부터 새로운 청구 주기가 시작되며 현재 구독의 남은 기간은 더 이상 유효하지 않습니다. 정말로 갱신을 진행하시겠습니까?",
      renew: "갱신",
      BloodPressure: "혈압",
      BloodGlucose: "혈당",
      BMI: "BMI",
      PDFDonwload: "PDF가 다운로드되었습니다!",
      PDFShared: "PDF가 공유되었습니다!",
      Error: "문제가 발생했습니다!",
      aboutTheApp: "앱 소개",
      GetStarted: "시작하기",
      systolic: "수축기 혈압",
      diastolic: "이완기 혈압",
      start: "시작",
      enterRequiredFields: "모든 필수 항목을 입력하세요!",
      enterThisFields: "이 항목은 필수입니다!",

      exit: "종료",
      exitApp: "앱 종료",
      appExitConfirmation: "앱을 종료하시겠습니까?",
      leavePage: "평가를 종료하시겠습니까?",
      leavePageConfirmation: "이 페이지를 나가면 입력한 데이터가 사라집니다",
      downloadOptions: "다운로드 옵션",
      a4Size: "A4 크기",
      usLetter: "US 레터",
      pdfDownloaded: "PDF가 다운로드되었습니다!",
      addedToGroup: "그룹에 성공적으로 추가되었습니다!",
      success: "성공",
      exportedTo: "다음으로 내보냈습니다",


        "aboutTheAppDesc": "이 앱은 개인의 생활 습관에 따라 신체의 '건강 나이'를 측정하는 데 도움을 줍니다. 이 앱은 잘 알려진 알라메다 카운티 장수 연구와 새로운 재림교인 건강 연구의 정보를 결합합니다. 이 앱은 참가자들이 건강 습관과 사망 위험 사이의 강한 상관관계를 이해하도록 돕습니다. 건강 상담을 위한 훌륭한 기반을 제공합니다.",
    "aboutTheAppTitle": "앱 정보"
    },
  },
  ru: {
    translation: {
      welcome: "Добро пожаловать",
      chooseLanguage: "Выберите язык",
      introduction: "Введение",
      howItWorks: "Как это работает",
      benefits: "Преимущества",
      lifestyleAffectsHealth:
        "Ваш образ жизни влияет на ваше здоровье сильнее, чем вы думаете. Давайте узнаем, насколько вы действительно молоды!",
      simpleScienceBacked: "Просто и научно обосновано",
      answerQuestions:
        "Ответьте на несколько вопросов о своих привычках, и мы рассчитаем ваш биологический возраст на основе реальных данных о здоровье.",
      getPersonalizedTips: "Получите персональные советы по здоровью",
      improveLifestyle:
        "Улучшите свой образ жизни с помощью индивидуальных рекомендаций, чтобы достичь вашего наилучшего потенциала здоровья.",

      // HomeScreen.tsx
      helpCalculateHealthAge:
        "Я могу помочь вам рассчитать ваш биологический возраст.",
      startAssessment: "Начать оценку сейчас",
      home: "Главная",
      purchases: "Покупки",
      history: "История",
      dailyLimit: "Дневной лимит",

      // healthAgeTest.tsx
      getStarted:
        "Давайте начнем. Ваш биологический возраст основан на вашем образе жизни и привычках.",
      whatIsYourName: "Как вас зовут?",
      enterName: "Введите имя",
      next: "Далее",
      whatIsYourAge: "Сколько вам лет?",
      age: "Возраст",
      whatIsYourGender: "Ваш пол?",
      gender: "Пол",
      male: "Мужской",
      female: "Женский",
      whatIsYourHeight: "Ваш рост?",
      height: "Рост",
      whatIsYourWeight: "Ваш вес?",
      weight: "Вес",
      whatIsYourWaistCircumference: "Окружность вашей талии?",
      waistCircumference: "Окружность талии",
      whatIsYourBloodPressure: "Ваше кровяное давление?",
      bloodPressure: "Кровяное давление",
      whatIsYourBloodGlucose: "Ваш уровень глюкозы в крови?",
      fasting: "Натощак",
      postMeals: "После еды",
      bloodGlucoseLevel: "Уровень глюкозы в крови",

      // QuestionScreen.tsx
      newAssessment: "Новая оценка",
      howOftenEatBreakfast: "Как часто вы едите хороший завтрак?",
      breakfastNote: "(С акцентом на цельные злаки, фрукты или овощи и орехи)",
      lessThan2Days: "Менее 2 дней в неделю",
      twoToFourDays: "2-4 дня в неделю",
      fiveToSixDays: "5-6 дней в неделю",
      everyday: "Каждый день",
      howOftenSnack: "Как часто вы перекусываете?",
      severalTimesDay: "Несколько раз в день",
      onceDay: "Один раз в день",
      fewTimesWeek: "Несколько раз в неделю",
      rarelyNever: "Редко или никогда",
      howManyFruitsVeggies: "Сколько порций фруктов и овощей вы едите в день?",
      fruitsVeggiesNote:
        "(1 порция = 1 средний фрукт, 1 чашка свежих, 1/2 чашки приготовленных или 180 мл 100% сока)",
      howManyWholeGrains: "Сколько порций цельных злаков вы едите в день?",
      wholeGrainsNote:
        "(1 порция = 1 ломтик хлеба, 1/2 чашки коричневого риса или овсянки, 2/3 чашки сухих хлопьев)",
      none: "Нисколько",
      back: "Назад",
      howManyNutsSeeds: "Сколько порций орехов и семян вы едите в неделю?",
      nutsSeedsNote:
        "(1 порция = 30 г орехов или семян, 2 столовые ложки орехового масла)",
      howOftenRedMeat: "Как часто вы едите красное мясо?",
      threeOrMoreTimesWeek: "3 или более раз в неделю",
      onceTwiceMonth: "Один или два раза в месяц",
      never: "Никогда",
      howOftenExercise:
        "Как часто вы занимаетесь умеренными или интенсивными упражнениями по 20-30 минут?",
      rarely: "Редко",
      oneTwoDaysWeek: "1-2 дня в неделю",
      threeFourDaysWeek: "3-4 дня в неделю",
      fiveMoreDaysWeek: "5 или более дней в неделю",
      howIsWeight: "Какой у вас вес?",
      severelyOverweight: "Значительно избыточный вес",
      moderatelyOverweight: "Умеренно избыточный вес",
      underweight: "Недостаточный вес",
      healthyWeight: "Здоровый вес",
      howOftenSleep: "Как часто вы спите 7-8 часов?",
      twoOrFewerDays: "2 или менее дней в неделю",
      threeFourDays: "3-4 дня в неделю",
      fiveSixDays: "5-6 дней в неделю",
      whatIsTobaccoHistory: "Ваша история употребления табака?",
      currentlyUse: "В настоящее время употребляю",
      quitLessThanTwoYears: "Бросил менее 2 лет назад",
      quitOverTwoYears: "Бросил более 2 лет назад",
      neverUsed: "Никогда не употреблял",
      howManyAlcohol: "Сколько порций алкоголя вы употребляете в неделю?",
      alcoholNote:
        "(350 мл пива, 240 мл солодового ликера, 150 мл вина, 45 мл крепкого напитка)",
      excessiveAlcohol: "15+ (мужчины) или 8+ (женщины)",
      howRateSpirituality: "Как бы вы оценили свою духовность?",
      noInterest: "Нет интереса",
      moderatelySpiritual: "Умеренно духовен",
      deeplySpiritual: "Глубоко духовен",

      // interestScreen

      Is_Interests: "Интересы",
      Is_TellYourInterest:
        "Расскажите нам, что вас интересует, чтобы настроить ваш опыт.",
      Is_WeightManagement: "Управление весом",
      Is_FitAndExercise: "Фитнес и упражнения",
      Is_StopSmoking: "Бросить курить",
      Is_HealthyCooking: "Здоровое питание",
      Is_StressReduction: "Снижение стресса",
      Is_PreventHeartDisease: "Профилактика сердечных заболеваний",
      Is_DepressionRecovery: "Восстановление после депрессии",
      Is_ReversingDiabetes: "Обращение диабета вспять",
      Is_NaturalRemedies: "Натуральные средства",
      Is_SpiritualHealth: "Духовное здоровье",
      Is_ImprovingMentalPerformance: "Улучшение умственной деятельности",
      Is_Other: "Другое",
      Is_Name: "Имя",
      Is_Email: "Электронная почта",
      Is_Address: "Адрес",
      Is_Phone: "Телефон",
      Is_Zip: "Индекс",
      Is_ShowReport: "Показать отчет",

      // reportScreen

      Rs_Report: "Отчет",
      Rs_CustomizedReport: "Индивидуальный отчет для:",
      Rs_YourHealthAge: "Ваш биологический возраст",
      Rs_YourActualAge: "Ваш фактический возраст",
      Rs_CurrentAge: "Текущий возраст",
      Rs_HealthAge: "Биологический возраст",
      Rs_PotentialAge: "Потенциальный возраст",
      Rs_HealthyHabitsParagraph:
        "Несколько крупных исследований, включая известные исследования округа Аламеда и адвентистские исследования здоровья, показывают сильную связь между перечисленными ниже здоровыми привычками и риском заболеваний/смерти. Люди, соблюдающие все эти здоровые привычки, могут повлиять на свою продолжительность жизни почти на 30 лет.",
      Rs_MedicalDisclaimerTitle: "Медицинский отказ от ответственности",
      Rs_MedicalDisclaimerText:
        "Health Age предназначен только для информационных и образовательных целей. Это не медицинский диагноз и не должен использоваться в качестве замены профессиональной медицинской консультации, диагностики или лечения. Всегда консультируйтесь с квалифицированным медицинским специалистом перед принятием медицинских решений или изменением вашего медицинского обслуживания.",
      Rs_MedicalSources: "Медицинские источники",
      Rs_Source: "Источник",
      Rs_Recommendations: "Рекомендации",
      Rs_1_title: "Ешьте хороший завтрак каждый день",
      Rs_1_desc:
        "Завтрак ускоряет обмен веществ, помогает сосредоточиться и улучшает успеваемость в школе и на работе. Он также помогает поддерживать здоровый вес.",
      Rs_2_title: "Избегайте перекусов",
      Rs_2_desc:
        "Перекусы могут добавлять в среднем 580 калорий в день, нарушать пищеварение, нарушать контроль уровня сахара в крови и способствовать увеличению веса.",
      Rs_3_title: "Ешьте больше фруктов и овощей",
      Rs_3_desc:
        "Фрукты и овощи богаты фитохимическими веществами, витаминами и клетчаткой, при этом они содержат меньше калорий.",
      Rs_4_title: "Увеличьте потребление цельных злаков",
      Rs_4_desc:
        "Цельные злаки содержат клетчатку, витамины группы В и необходимые минералы, которые поддерживают общее здоровье.",
      Rs_5_title: "Ешьте больше орехов",
      Rs_5_desc:
        "Орехи — отличный источник белка и полезных жиров, они помогают регулировать уровень сахара в крови.",
      Rs_6_title: "Избегайте красного мяса",
      Rs_6_desc:
        "Употребление красного мяса связано с диабетом 2 типа, сердечными заболеваниями, инсультом и некоторыми видами рака.",
      Rs_7_title: "Регулярно занимайтесь спортом",
      Rs_7_desc:
        "Упражнения повышают энергию, улучшают настроение и уровень холестерина, снижают кровяное давление, улучшают сон, укрепляют иммунитет и помогают контролировать уровень сахара в крови.",
      Rs_8_title: "Достигните здорового веса",
      Rs_8_desc:
        "Поддерживайте ИМТ в пределах 18,5–24,9 и здоровую окружность талии (менее 102 см для мужчин, 89 см для женщин).",
      Rs_9_title: "Спите 7-8 часов каждую ночь",
      Rs_9_desc:
        "Адекватный сон поддерживает память, обучение, обмен веществ и иммунную функцию.",
      Rs_10_title: "Бросьте курить",
      Rs_10_desc:
        "Курение вредит каждому органу тела, увеличивая риск рака, сердечных заболеваний, ХОБЛ, астмы и проблем с зубами.",
      Rs_11_title: "Не употребляйте алкоголь",
      Rs_11_desc:
        "Употребление алкоголя может вызвать неврологические, сердечно-сосудистые и психиатрические проблемы, а также увеличить риск рака и заболеваний печени.",
      Rs_12_title: "Увеличьте духовность",
      Rs_12_desc:
        "Вера в Бога может улучшить психическое здоровье и укрепить иммунную функцию.",
      Rs_SavePdf: "Сохранить PDF",
      Rs_ShareReport: "Поделиться отчетом",

      // history screen

      Hs_List: "Список",
      Hs_Group: "Группа",
      Hs_View: "Просмотр",
      Hs_Filter: "Фильтр",
      Hs_Options: "Параметры",
      Hs_Export: "Экспорт",
      Hs_Delete: "Удалить",
      Hs_Search: "Поиск",
      Hs_ExportAsCSV: "Экспорт в CSV",
      Hs_Confirmation: "Вы уверены, что хотите удалить?",
      Hs_Success: "Элемент удален",
      Hs_Cancel: "Отмена",
      Hs_ItemsSelected: "Выбрано элементов",
      Hs_SelectAll: "Выбрать все",
      Hs_NewGroup: "Новая группа",
      Hs_ExistingGroup: "Существующая группа",
      Hs_Create: "Создать",
      Hs_GroupName: "Название группы",
      Hs_EnterGroupName: "Введите название группы",
      Hs_Reports: "Отчеты",
      Hs_save: "Сохранить",
      Hs_Nothing: "Здесь пока ничего нет!",
      Hs_NothingDesc:
        "Ваши отчеты о биологическом возрасте появятся здесь после завершения оценки.",
      Hs_Download: "Скачать",

      Hs_LanguageChanged: "Язык успешно изменен",
      Hs_Change: "Изменить",

      // Filter Screen
      Fs_Filter: "Фильтровать по",
      Fs_Close: "Закрыть",
      Fs_Date: "Дата",
      Fs_From: "От",
      Fs_To: "До",
      Fs_ClearAll: "Очистить все",
      Fs_ShowResults: "Показать результаты",

      // others

      select: "Выбрать",
      total: "Всего",
      purchase: "Покупка",
      aboutProgramme: "О программе",
      reports: "Отчеты",
      PrintQuestion: "Печать опросника",
      PrintReport: "Печать бланка отчета",
      reportSetting: "Настройки отчета",
      changeLanguage: "Сменить язык",
      uploadLogo: "Загрузить ваш логотип",
      upload: "Загрузить",
      contactDetails: "Контактные данные",
      enterAddress: "Введите адрес",
      enterPhone: "Введите номер телефона",
      createGroup: "Создать группу",

      // blood

      normalBp: "Ваше кровяное давление в норме",
      MaintainBp: "Пожалуйста, поддерживайте ваше кровяное давление",
      bpRange: "Нормальный диапазон: 90-119/60-79 мм рт. ст.",
      normalGlucoseLevel: "Ваш уровень глюкозы в крови в норме",
      maintainGlucoseLevel:
        "Пожалуйста, поддерживайте ваш уровень глюкозы в крови",
      normalRangeGlucose: "Нормальный диапазон:",
      for: "для",
      postMeal: "после еды",
      test: "тест",
      maintainBloodGlucose: "Поддерживайте уровень глюкозы в крови",
      maintainLowBloodGlucoseDesc:
        "Ваш уровень глюкозы в крови низкий. Стабильный уровень глюкозы предотвращает осложнения, повышает энергию и поддерживает общее здоровье. Сбалансированное питание и физическая активность помогают держать его под контролем!",
      maintainHighBloodGlucoseDesc:
        "Ваш уровень глюкозы в крови высокий. Стабильный уровень глюкозы предотвращает осложнения, повышает энергию и поддерживает общее здоровье. Сбалансированное питание и физическая активность помогают держать его под контролем!",
      maintainBloodPressure: "Контролируйте артериальное давление",
      maintainBloodPressureDesc:
        "Поддержание здорового артериального давления снижает риск сердечных заболеваний, инсультов и проблем с почками. Регулярные упражнения и сбалансированная диета имеют огромное значение!",
      maintainLowBloodPressureDesc:
        "Ваш уровень артериального давления низкий. Поддержание здорового артериального давления снижает риск сердечных заболеваний, инсультов и проблем с почками. Регулярные упражнения и сбалансированная диета имеют огромное значение!",
      maintainHighBloodPressureDesc:
        "Ваш уровень артериального давления высокий. Поддержание здорового артериального давления снижает риск сердечных заболеваний, инсультов и проблем с почками. Регулярные упражнения и сбалансированная диета имеют огромное значение!",

      discoverHealthAge: "Узнайте свой биологический возраст!",
      downloadSuccess: "Загружено успешно",
      goBackConfirmation: "Вы уверены, что хотите вернуться?",
      pleaseWait: "Пожалуйста, подождите!",
      // purchase Screen

      goBeyond: "Выходите за рамки основ!",

      JoinPro:
        "Присоединяйтесь к нашим Pro-участникам и поднимите своё здоровье на новый уровень",

      WhyJoinPro: "Почему стоит присоединиться к Pro?",

      UnlimitedReports: "Неограниченные отчёты",

      FullReportHistory: "Полная история отчётов",

      PrintYourQuestionnaire: "Распечатайте анкету с вашим логотипом",

      printYourReport: "Распечатайте пустые отчёты с вашим логотипом",

      upgrade: "Обновить",

      yearlyPurchase: "Годовая подписка",

      thisOneForPro: "Упс! Это только для PRO-участников.",

      proMembersDesc:
        "Эта функция доступна только нашим Pro-участникам. Хотите получить доступ? Обновитесь сейчас и наслаждайтесь эксклюзивными преимуществами, созданными специально для вас!",

      UpgradeComplete: "Обновление завершено!",

      NowAProMember: "Теперь вы Pro-участник!",

      UpgradeTo: "Обновить до",
      SubscriptionCancelledSuccess: "Подписка успешно отменена!",
      ConfirmSubCancel: "Вы уверены, что хотите отменить подписку?",
      SubDaysRemaining: "Оставшиеся дни подписки:",
      RenewSub: "Продлить подписку",
      cancelSub: "Отменить подписку",
      renewSubConfirmation:
        "Если вы выберете продление сейчас, новый цикл оплаты начнется с сегодняшнего дня, и оставшаяся продолжительность вашей текущей подписки станет недействительной. Вы уверены, что хотите продолжить продление?",
      renew: "Продлить",
      BloodPressure: "Кровяное давление",
      BloodGlucose: "Уровень сахара в крови",
      BMI: "ИМТ",
      PDFDonwload: "PDF был загружен!",
      PDFShared: "PDF был отправлен!",
      Error: "Что-то пошло не так!",
      aboutTheApp: "О приложении",
      GetStarted: "Начать",
      systolic: "Систолическое",
      diastolic: "Диастолическое",
      start: "Старт",
      enterRequiredFields: "Пожалуйста, заполните все обязательные поля!",
      enterThisFields: "Это поле обязательно для заполнения!",

      exit: "Выход",
      exitApp: "Выйти из приложения",
      appExitConfirmation: "Вы действительно хотите выйти из приложения?",
      leavePage: "Выйти из оценки?",
      leavePageConfirmation:
        "После выхода с этой страницы введённые данные будут потеряны",

      downloadOptions: "Параметры загрузки",
      a4Size: "Формат A4",
      usLetter: "Формат US Letter",
      pdfDownloaded: "PDF загружен!",
      addedToGroup: "Успешно добавлено в группу!",
      success: "Успешно",
      exportedTo: "Экспортировано в",


       "aboutTheAppDesc": "Это приложение помогает определить «возраст здоровья» тела человека в соответствии с его образом жизни. Приложение объединяет информацию как из известных исследований долголетия округа Аламеда, так и из новых исследований здоровья адвентистов. Это приложение помогает участникам понять тесную взаимосвязь между их привычками здоровья и риском смерти. Оно служит отличной основой для консультаций по вопросам здоровья.",
    "aboutTheAppTitle": "О приложении"
    },
  },
  pt: {
    translation: {
      welcome: "Bem-vindo(a)",
      chooseLanguage: "Escolha o Idioma",
      introduction: "Introdução",
      howItWorks: "Como funciona",
      benefits: "Benefícios",
      discoverHealthAge: "Descubra sua Idade de Saúde!",
      lifestyleAffectsHealth:
        "Seu estilo de vida afeta sua saúde mais do que você imagina. Vamos descobrir quão jovem você realmente é!",
      simpleScienceBacked: "Simples e com Base Científica",
      answerQuestions:
        "Responda a algumas perguntas sobre seus hábitos e calcularemos sua Idade de Saúde com base em informações de saúde reais.",
      getPersonalizedTips: "Receba Dicas de Saúde Personalizadas",
      improveLifestyle:
        "Melhore seu estilo de vida com recomendações personalizadas para atingir seu melhor potencial de saúde.",

      // HomeScreen.tsx
      helpCalculateHealthAge:
        "Posso ajudá-lo(a) a calcular sua idade de saúde.",
      startAssessment: "Comece sua avaliação agora",
      home: "Início",
      purchases: "Compras",
      history: "Histórico",
      dailyLimit: "Limite Diário",

      // healthAgeTest.tsx
      getStarted:
        "Vamos começar. Sua idade de saúde é baseada em seu estilo de vida e hábitos.",
      whatIsYourName: "Qual é o seu nome?",
      enterName: "Digite o Nome",
      next: "Próximo",
      whatIsYourAge: "Qual é a sua idade?",
      age: "Idade",
      whatIsYourGender: "Qual é o seu gênero?",
      gender: "Gênero",
      male: "Masculino",
      female: "Feminino",
      whatIsYourHeight: "Qual é a sua altura?",
      height: "Altura",
      whatIsYourWeight: "Qual é o seu peso?",
      weight: "Peso",
      whatIsYourWaistCircumference: "Qual é a sua circunferência da cintura?",
      waistCircumference: "Circunferência da cintura",
      whatIsYourBloodPressure: "Qual é a sua pressão arterial?",
      bloodPressure: "Pressão arterial",
      whatIsYourBloodGlucose: "Qual é o seu nível de glicose no sangue?",
      fasting: "Jejum",
      postMeals: "Pós-refeições",
      bloodGlucoseLevel: "Nível de glicose no sangue",

      // QuestionScreen.tsx
      newAssessment: "Nova Avaliação",
      howOftenEatBreakfast:
        "Com que frequência você toma um bom café da manhã?",
      breakfastNote:
        "(Enfatizando grãos integrais, frutas ou vegetais e nozes)",
      lessThan2Days: "Menos de 2 dias por semana",
      twoToFourDays: "2-4 dias por semana",
      fiveToSixDays: "5-6 dias por semana",
      everyday: "Todos os dias",
      howOftenSnack: "Com que frequência você faz lanches?",
      severalTimesDay: "Várias vezes ao dia",
      onceDay: "Uma vez por dia",
      fewTimesWeek: "Algumas vezes por semana",
      rarelyNever: "Raramente ou nunca",
      howManyFruitsVeggies:
        "Quantas porções de frutas e vegetais você come por dia?",
      fruitsVeggiesNote:
        "(1 porção = 1 pedaço médio, 1 xícara fresca, 1/2 xícara cozida ou 180 ml de suco 100%)",
      howManyWholeGrains:
        "Quantas porções de grãos integrais você come por dia?",
      wholeGrainsNote:
        "(1 porção = 1 fatia de pão, 1/2 xícara de arroz integral ou aveia, 2/3 xícara de cereal seco)",
      none: "Nenhum",
      back: "Voltar",
      howManyNutsSeeds:
        "Quantas porções de nozes e sementes você come por semana?",
      nutsSeedsNote:
        "(1 porção = 30g de nozes ou sementes, 2 colheres de sopa de manteiga de nozes)",
      howOftenRedMeat: "Com que frequência você come carne vermelha?",
      threeOrMoreTimesWeek: "3 ou mais vezes por semana",
      onceTwiceMonth: "Uma ou duas vezes por mês",
      never: "Nunca",
      howOftenExercise:
        "Com que frequência você faz 20-30 minutos de exercício moderado a vigoroso?",
      rarely: "Raramente",
      oneTwoDaysWeek: "1-2 dias por semana",
      threeFourDaysWeek: "3-4 dias por semana",
      fiveMoreDaysWeek: "5 ou mais dias por semana",
      howIsWeight: "Como está seu peso?",
      severelyOverweight: "Gravemente acima do peso",
      moderatelyOverweight: "Moderadamente acima do peso",
      underweight: "Abaixo do peso",
      healthyWeight: "Peso saudável",
      howOftenSleep: "Com que frequência você dorme 7-8 horas?",
      twoOrFewerDays: "2 ou menos dias por semana",
      threeFourDays: "3-4 dias por semana",
      fiveSixDays: "5-6 dias por semana",
      whatIsTobaccoHistory: "Qual é o seu histórico com tabaco?",
      currentlyUse: "Usa atualmente",
      quitLessThanTwoYears: "Parou há menos de 2 anos",
      quitOverTwoYears: "Parou há mais de 2 anos",
      neverUsed: "Nunca usou",
      howManyAlcohol: "Quantas doses de álcool você consome por semana?",
      alcoholNote:
        "(350 ml de cerveja, 240 ml de licor de malte, 150 ml de vinho, 45 ml de dose)",
      excessiveAlcohol: "15+ (homens) ou 8+ (mulheres)",
      howRateSpirituality: "Como você classificaria sua espiritualidade?",
      noInterest: "Sem interesse",
      moderatelySpiritual: "Moderadamente espiritual",
      deeplySpiritual: "Profundamente espiritual",

      // interestScreen

      Is_Interests: "Interesses",
      Is_TellYourInterest:
        "Diga-nos o que lhe interessa para personalizar sua experiência.",
      Is_WeightManagement: "Controle de Peso",
      Is_FitAndExercise: "Fitness e Exercício",
      Is_StopSmoking: "Parar de Fumar",
      Is_HealthyCooking: "Culinária Saudável",
      Is_StressReduction: "Redução de Estresse",
      Is_PreventHeartDisease: "Prevenção de Doenças Cardíacas",
      Is_DepressionRecovery: "Recuperação da Depressão",
      Is_ReversingDiabetes: "Reversão do Diabetes",
      Is_NaturalRemedies: "Remédios Naturais",
      Is_SpiritualHealth: "Saúde Espiritual",
      Is_ImprovingMentalPerformance: "Melhorando o Desempenho Mental",
      Is_Other: "Outro",
      Is_Name: "Nome",
      Is_Email: "E-mail",
      Is_Address: "Endereço",
      Is_Phone: "Telefone",
      Is_Zip: "CEP",
      Is_ShowReport: "Mostrar Relatório",

      // reportScreen

      Rs_Report: "Relatório",
      Rs_CustomizedReport: "Relatório Personalizado para:",
      Rs_YourHealthAge: "Sua idade de saúde é",
      Rs_YourActualAge: "Sua idade real é",
      Rs_CurrentAge: "Idade Atual",
      Rs_HealthAge: "Idade de Saúde",
      Rs_PotentialAge: "Idade Potencial",
      Rs_HealthyHabitsParagraph:
        "Vários grandes estudos de pesquisa, incluindo o conhecido Estudo do Condado de Alameda e os Estudos de Saúde Adventista, revelam uma forte correlação entre os hábitos de saúde listados abaixo e o risco de doença/morte. Indivíduos que praticam todos esses hábitos saudáveis podem influenciar sua longevidade em quase 30 anos.",
      Rs_MedicalDisclaimerTitle: "Aviso médico",
      Rs_MedicalDisclaimerText:
        "O Health Age destina-se apenas a fins informativos e educacionais. Não é um diagnóstico médico e não deve ser utilizado como substituto de aconselhamento, diagnóstico ou tratamento médico profissional. Consulte sempre um profissional de saúde qualificado antes de tomar decisões médicas ou alterar os seus cuidados de saúde.",
      Rs_MedicalSources: "Fontes médicas",
      Rs_Source: "Fonte",
      Rs_Recommendations: "Recomendações",
      Rs_1_title: "Tome um bom café da manhã diariamente",
      Rs_1_desc:
        "O café da manhã aumenta o metabolismo, ajuda na concentração e melhora o desempenho na escola e no trabalho. Também auxilia na manutenção de um peso saudável.",
      Rs_2_title: "Evite lanches",
      Rs_2_desc:
        "Lanches podem adicionar uma média de 580 calorias por dia, prejudicar a digestão, interromper o controle do açúcar no sangue e contribuir para o ganho de peso.",
      Rs_3_title: "Desfrute de mais frutas e vegetais",
      Rs_3_desc:
        "Frutas e vegetais são ricos em fitoquímicos, vitaminas e fibras, além de serem mais baixos em calorias.",
      Rs_4_title: "Aumente a ingestão de grãos integrais",
      Rs_4_desc:
        "Grãos integrais contêm fibras, vitaminas do complexo B e minerais essenciais que apoiam a saúde geral.",
      Rs_5_title: "Coma mais nozes",
      Rs_5_desc:
        "As nozes são uma excelente fonte de proteínas e gorduras saudáveis e ajudam a regular os níveis de açúcar no sangue.",
      Rs_6_title: "Evite carne vermelha",
      Rs_6_desc:
        "Comer carne vermelha tem sido associado ao diabetes tipo 2, doenças cardíacas, derrame e certos tipos de câncer.",
      Rs_7_title: "Exercite-se regularmente",
      Rs_7_desc:
        "O exercício aumenta a energia, melhora o humor e os níveis de colesterol, diminui a pressão arterial, melhora o sono, fortalece a imunidade e ajuda a controlar o açúcar no sangue.",
      Rs_8_title: "Alcance um peso saudável",
      Rs_8_desc:
        "Mantenha um IMC entre 18,5 e 24,9 e uma circunferência da cintura saudável (menos de 102 cm para homens, 89 cm para mulheres).",
      Rs_9_title: "Durma 7-8 horas de sono bom todas as noites",
      Rs_9_desc:
        "O sono adequado apoia a memória, o aprendizado, o metabolismo e a função imunológica.",
      Rs_10_title: "Pare de fumar",
      Rs_10_desc:
        "Fumar prejudica todos os órgãos do corpo, aumentando o risco de cânceres, doenças cardíacas, DPOC, asma e problemas dentários.",
      Rs_11_title: "Não beba álcool",
      Rs_11_desc:
        "O uso de álcool pode causar problemas neurológicos, cardiovasculares e psiquiátricos, além de aumentar o risco de câncer e doenças hepáticas.",
      Rs_12_title: "Aumente a espiritualidade",
      Rs_12_desc:
        "A fé em Deus pode melhorar a saúde mental e fortalecer a função imunológica.",
      Rs_SavePdf: "Salvar PDF",
      Rs_ShareReport: "Compartilhar Relatório",

      // history screen

      Hs_List: "Lista",
      Hs_Group: "Grupo",
      Hs_View: "Visualizar",
      Hs_Filter: "Filtrar",
      Hs_Options: "Opções",
      Hs_Export: "Exportar",
      Hs_Delete: "Excluir",
      Hs_Search: "Pesquisar",
      Hs_ExportAsCSV: "Exportar como CSV",
      Hs_Confirmation: "Tem certeza de que deseja excluir?",
      Hs_Success: "Item Excluído",
      Hs_Cancel: "Cancelar",
      Hs_ItemsSelected: "Itens Selecionados",
      Hs_SelectAll: "Selecionar tudo",
      Hs_NewGroup: "Novo Grupo",
      Hs_ExistingGroup: "Grupo Existente",
      Hs_Create: "Criar",
      Hs_GroupName: "Nome do Grupo",
      Hs_EnterGroupName: "Digite o nome do grupo",
      Hs_Reports: "Relatórios",
      Hs_save: "Salvar",
      Hs_Nothing: "Nada por aqui ainda!",
      Hs_NothingDesc:
        "Seus relatórios de idade de saúde aparecerão aqui assim que você concluir a avaliação.",
      Hs_Download: "Baixar",

      Hs_LanguageChanged: "Idioma alterado com sucesso",
      Hs_Change: "Mudar",

      // Filter Screen
      Fs_Filter: "Filtrar por",
      Fs_Close: "Fechar",
      Fs_Date: "Data",
      Fs_From: "De",
      Fs_To: "Até",
      Fs_ClearAll: "Limpar tudo",
      Fs_ShowResults: "Mostrar resultados",

      // others

      select: "Selecionar",
      total: "Total",
      purchase: "Compra",
      aboutProgramme: "Sobre o Programa",
      reports: "Relatórios",
      PrintQuestion: "Imprimir Questionário",
      PrintReport: "Imprimir Relatório em Branco",
      reportSetting: "Configurações do Relatório",
      changeLanguage: "Mudar Idioma",
      uploadLogo: "Carregar seu logotipo",
      upload: "Carregar",
      contactDetails: "Detalhes de Contato",
      enterAddress: "Digite o Endereço",
      enterPhone: "Digite o Número de Telefone",
      createGroup: "Criar Grupo",

      // blood pressure and glucose

      normalBp: "Sua pressão arterial está normal",
      MaintainBp: "Por favor, mantenha sua pressão arterial",
      bpRange: "A faixa normal é 90-119/60-79 mmHg.",
      normalGlucoseLevel: "Seu nível de glicose no sangue está normal",
      maintainGlucoseLevel:
        "Por favor, mantenha seu nível de glicose no sangue",
      normalRangeGlucose: "A faixa normal é",
      for: "para",
      postMeal: "pós-refeição",
      test: "teste",
      maintainBloodGlucose: "Mantenha seus níveis de glicose no sangue",
      maintainLowBloodGlucoseDesc:
        "Seus níveis de glicose no sangue estão baixos. A glicose estável evita complicações, aumenta a energia e apoia a saúde geral. Alimentação equilibrada e exercícios ajudam a mantê-la sob controle!",
      maintainHighBloodGlucoseDesc:
        "Seus níveis de glicose no sangue estão altos. A glicose estável evita complicações, aumenta a energia e apoia a saúde geral. Alimentação equilibrada e exercícios ajudam a mantê-la sob controle!",
      maintainBloodPressure: "Mantenha a pressão arterial sob controle",
      maintainBloodPressureDesc:
        "Manter uma pressão arterial saudável reduz os riscos de doenças cardíacas, derrames e problemas renais. Exercícios regulares e uma dieta equilibrada fazem toda a diferença!",
      maintainLowBloodPressureDesc:
        "Seus níveis de pressão arterial estão baixos. Manter uma pressão arterial saudável reduz os riscos de doenças cardíacas, derrames e problemas renais. Exercícios regulares e uma dieta equilibrada fazem toda a diferença!",
      maintainHighBloodPressureDesc:
        "Seus níveis de pressão arterial estão altos. Manter uma pressão arterial saudável reduz os riscos de doenças cardíacas, derrames e problemas renais. Exercícios regulares e uma dieta equilibrada fazem toda a diferença!",

      // messages

      downloadSuccess: "Download Concluído com Sucesso",
      goBackConfirmation: "Tem certeza de que deseja voltar?",
      pleaseWait: "Por favor, espere!",

      // purchase Screen

      goBeyond: "Vá além do básico!",

      JoinPro:
        "Junte-se aos nossos Membros Pro e leve sua jornada de saúde para o próximo nível",

      WhyJoinPro: "Por que se tornar Pro?",

      UnlimitedReports: "Relatórios Ilimitados",

      FullReportHistory: "Histórico Completo de Relatórios",

      PrintYourQuestionnaire: "Imprima o Questionário com seu logotipo",

      printYourReport: "Imprima Relatórios em Branco com seu logotipo",

      upgrade: "Atualizar",

      yearlyPurchase: "Compra Anual",

      thisOneForPro: "Ops! Este é apenas para Membros PRO.",

      proMembersDesc:
        "Este recurso é reservado para nossos Membros Pro. Quer participar? Atualize agora e aproveite benefícios exclusivos feitos só para você!",

      UpgradeComplete: "Atualização Concluída!",

      NowAProMember: "Você agora é um Membro Pro!",

      UpgradeTo: "Atualizar para",

      SubscriptionCancelledSuccess: "Assinatura cancelada com sucesso!",

      ConfirmSubCancel: "Tem certeza de que deseja cancelar a assinatura?",

      SubDaysRemaining: "Dias restantes da assinatura:",

      RenewSub: "Renovar assinatura",

      cancelSub: "Cancelar assinatura",

      renewSubConfirmation:
        "Se você optar por renovar agora, um novo ciclo de cobrança começará hoje e a duração restante da sua assinatura atual deixará de ser válida. Tem certeza de que deseja continuar com a renovação?",

      renew: "Renovar",

      BloodPressure: "Pressão Arterial",

      BloodGlucose: "Glicose no Sangue",

      BMI: "IMC",

      PDFDonwload: "PDF foi baixado!",

      PDFShared: "PDF foi compartilhado!",

      Error: "Algo deu errado!",

      aboutTheApp: "Sobre o aplicativo",
      GetStarted: "Começar",
      systolic: "Sistólica",
      diastolic: "Diastólica",
      start: "Iniciar",
      enterRequiredFields: "Por favor, preencha todos os campos obrigatórios!",
      enterThisFields: "Este campo é obrigatório!",

      exit: "Sair",
      exitApp: "Sair do Aplicativo",
      appExitConfirmation: "Você quer sair do aplicativo?",
      leavePage: "Sair da Avaliação?",
      leavePageConfirmation:
        "Ao sair desta página, os dados inseridos serão perdidos",

      downloadOptions: "Opções de Download",
      a4Size: "Tamanho A4",
      usLetter: "Carta dos EUA",
      pdfDownloaded: "PDF baixado!",
      addedToGroup: "Adicionado ao grupo com sucesso!",
      success: "Sucesso",
      exportedTo: "Exportado para",

        "aboutTheAppDesc": "Este aplicativo ajuda a determinar a “idade da saúde” do corpo de uma pessoa de acordo com as práticas de estilo de vida de um indivíduo. Este aplicativo combina informações dos conhecidos estudos de longevidade do Condado de Alameda e dos novos Estudos de Saúde Adventistas. Este aplicativo ajuda os participantes a entender a forte correlação entre os hábitos de saúde de uma pessoa e o risco de morte. Ele fornece uma excelente base para aconselhamento de saúde.",
    "aboutTheAppTitle": "Sobre o Aplicativo"
    },
  },
  de: {
    translation: {
      welcome: "Willkommen",
      chooseLanguage: "Sprache wählen",
      introduction: "Einführung",
      howItWorks: "Wie es funktioniert",
      benefits: "Vorteile",
      discoverHealthAge: "Entdecken Sie Ihr Gesundheitsalter!",
      lifestyleAffectsHealth:
        "Ihr Lebensstil beeinflusst Ihre Gesundheit mehr, als Sie denken. Finden wir heraus, wie jung Sie wirklich sind!",
      simpleScienceBacked: "Einfach & Wissenschaftlich Fundiert",
      answerQuestions:
        "Beantworten Sie ein paar Fragen zu Ihren Gewohnheiten, und wir berechnen Ihr Gesundheitsalter basierend auf echten Gesundheitserkenntnissen.",
      getPersonalizedTips: "Erhalten Sie personalisierte Gesundheitstipps",
      improveLifestyle:
        "Verbessern Sie Ihren Lebensstil mit maßgeschneiderten Empfehlungen, um Ihr bestes Gesundheitspotenzial zu erreichen.",
      helpCalculateHealthAge:
        "Ich kann Ihnen helfen, Ihr Gesundheitsalter zu berechnen.",
      startAssessment: "Starten Sie jetzt Ihre Bewertung",
      home: "Startseite",
      purchases: "Käufe",
      history: "Verlauf",
      dailyLimit: "Tägliches Limit",
      getStarted:
        "Lassen Sie uns beginnen. Ihr Gesundheitsalter basiert auf Ihrem Lebensstil und Ihren Gewohnheiten.",
      whatIsYourName: "Wie ist Ihr Name?",
      enterName: "Namen eingeben",
      next: "Weiter",
      whatIsYourAge: "Wie alt sind Sie?",
      age: "Alter",
      whatIsYourGender: "Was ist Ihr Geschlecht?",
      gender: "Geschlecht",
      male: "Männlich",
      female: "Weiblich",
      whatIsYourHeight: "Wie groß sind Sie?",
      height: "Größe",
      whatIsYourWeight: "Wie viel wiegen Sie?",
      weight: "Gewicht",
      whatIsYourWaistCircumference: "Was ist Ihr Taillenumfang?",
      waistCircumference: "Taillenumfang",
      whatIsYourBloodPressure: "Was ist Ihr Blutdruck?",
      bloodPressure: "Blutdruck",
      whatIsYourBloodGlucose: "Was ist Ihr Blutzuckerspiegel?",
      fasting: "Nüchtern",
      postMeals: "Nach den Mahlzeiten",
      bloodGlucoseLevel: "Blutzuckerspiegel",
      newAssessment: "Neue Bewertung",
      howOftenEatBreakfast: "Wie oft essen Sie ein gutes Frühstück?",
      breakfastNote:
        "(Mit Betonung auf Vollkornprodukte, Früchte oder Gemüse und Nüsse)",
      lessThan2Days: "Weniger als 2 Tage pro Woche",
      twoToFourDays: "2-4 Tage pro Woche",
      fiveToSixDays: "5-6 Tage pro Woche",
      everyday: "Jeden Tag",
      howOftenSnack: "Wie oft naschen Sie?",
      severalTimesDay: "Mehrmals am Tag",
      onceDay: "Einmal am Tag",
      fewTimesWeek: "Ein paar Mal pro Woche",
      rarelyNever: "Selten oder nie",
      howManyFruitsVeggies:
        "Wie viele Portionen Obst und Gemüse essen Sie pro Tag?",
      fruitsVeggiesNote:
        "(1 Portion = 1 mittelgroßes Stück, 1 Tasse frisch, 1/2 Tasse gekocht oder 180 ml 100% Saft)",
      howManyWholeGrains:
        "Wie viele Portionen Vollkornprodukte essen Sie pro Tag?",
      wholeGrainsNote:
        "(1 Portion = 1 Scheibe Brot, 1/2 Tasse brauner Reis oder Haferflocken, 2/3 Tasse Trockenmüsli)",
      none: "Keine",
      back: "Zurück",
      howManyNutsSeeds:
        "Wie viele Portionen Nüsse und Samen essen Sie pro Woche?",
      nutsSeedsNote: "(1 Portion = 30 g Nüsse oder Samen, 2 EL Nussbutter)",
      howOftenRedMeat: "Wie oft essen Sie rotes Fleisch?",
      threeOrMoreTimesWeek: "3 oder mehr Mal pro Woche",
      onceTwiceMonth: "Ein- oder zweimal im Monat",
      never: "Nie",
      howOftenExercise:
        "Wie oft trainieren Sie 20-30 Minuten lang mäßig bis intensiv?",
      rarely: "Selten",
      oneTwoDaysWeek: "1-2 Tage pro Woche",
      threeFourDaysWeek: "3-4 Tage pro Woche",
      fiveMoreDaysWeek: "5 oder mehr Tage pro Woche",
      howIsWeight: "Wie ist Ihr Gewicht?",
      severelyOverweight: "Stark übergewichtig",
      moderatelyOverweight: "Mäßig übergewichtig",
      underweight: "Untergewichtig",
      healthyWeight: "Gesundes Gewicht",
      howOftenSleep: "Wie oft schlafen Sie 7-8 Stunden?",
      twoOrFewerDays: "2 oder weniger Tage pro Woche",
      threeFourDays: "3-4 Tage pro Woche",
      fiveSixDays: "5-6 Tage pro Woche",
      whatIsTobaccoHistory: "Was ist Ihre Tabakgeschichte?",
      currentlyUse: "Aktuelle Nutzung",
      quitLessThanTwoYears: "Vor weniger als 2 Jahren aufgehört",
      quitOverTwoYears: "Vor über 2 Jahren aufgehört",
      neverUsed: "Nie benutzt",
      howManyAlcohol: "Wie viele Portionen Alkohol konsumieren Sie pro Woche?",
      alcoholNote: "(350 ml Bier, 240 ml Malzbier, 150 ml Wein, 45 ml Schnaps)",
      excessiveAlcohol: "15+ (Männer) oder 8+ (Frauen)",
      howRateSpirituality: "Wie würden Sie Ihre Spiritualität bewerten?",
      noInterest: "Kein Interesse",
      moderatelySpiritual: "Mäßig spirituell",
      deeplySpiritual: "Tief spirituell",
      Is_Interests: "Interessen",
      Is_TellYourInterest:
        "Teilen Sie uns Ihre Interessen mit, um Ihre Erfahrung anzupassen.",
      Is_WeightManagement: "Gewichtsmanagement",
      Is_FitAndExercise: "Fitness und Bewegung",
      Is_StopSmoking: "Rauchstopp",
      Is_HealthyCooking: "Gesundes Kochen",
      Is_StressReduction: "Stressabbau",
      Is_PreventHeartDisease: "Herz-Kreislauf-Erkrankungen vorbeugen",
      Is_DepressionRecovery: "Depressionsbewältigung",
      Is_ReversingDiabetes: "Diabetes umkehren",
      Is_NaturalRemedies: "Natürliche Heilmittel",
      Is_SpiritualHealth: "Spirituelle Gesundheit",
      Is_ImprovingMentalPerformance:
        "Verbesserung der geistigen Leistungsfähigkeit",
      Is_Other: "Andere",
      Is_Name: "Name",
      Is_Email: "E-Mail",
      Is_Address: "Adresse",
      Is_Phone: "Telefon",
      Is_Zip: "PLZ",
      Is_ShowReport: "Bericht anzeigen",
      Rs_Report: "Bericht",
      Rs_CustomizedReport: "Maßgeschneiderter Bericht für:",
      Rs_YourHealthAge: "Ihr Gesundheitsalter beträgt",
      Rs_YourActualAge: "Ihr tatsächliches Alter von",
      Rs_CurrentAge: "Aktuelles Alter",
      Rs_HealthAge: "Gesundheitsalter",
      Rs_PotentialAge: "Potenzielles Alter",
      Rs_HealthyHabitsParagraph:
        "Mehrere große Forschungsstudien, darunter die bekannte Alameda County Study und die Adventist Health Studies, zeigen eine starke Korrelation zwischen den unten aufgeführten Gesundheitsgewohnheiten und dem Krankheits-/Sterberisiko. Personen, die all diese gesunden Gewohnheiten praktizieren, können ihre Langlebigkeit um fast 30 Jahre beeinflussen.",
      Rs_MedicalDisclaimerTitle: "Medizinischer Haftungsausschluss",
      Rs_MedicalDisclaimerText:
        "Health Age dient ausschließlich zu Informations- und Bildungszwecken. Es stellt keine medizinische Diagnose dar und sollte nicht als Ersatz für professionelle medizinische Beratung, Diagnose oder Behandlung verwendet werden. Konsultieren Sie immer einen qualifizierten Gesundheitsfachmann, bevor Sie medizinische Entscheidungen treffen oder Änderungen an Ihrer Gesundheitsversorgung vornehmen.",
      Rs_MedicalSources: "Medizinische Quellen",
      Rs_Source: "Quelle",
      Rs_Recommendations: "Empfehlungen",
      Rs_1_title: "Täglich ein gutes Frühstück essen",
      Rs_1_desc:
        "Das Frühstück kurbelt den Stoffwechsel an, hilft bei der Konzentration und verbessert die Leistung in Schule und Beruf. Es hilft auch, ein gesundes Gewicht zu halten.",
      Rs_2_title: "Naschen vermeiden",
      Rs_2_desc:
        "Naschen kann durchschnittlich 580 Kalorien pro Tag hinzufügen, die Verdauung beeinträchtigen, die Blutzuckerkontrolle stören und zur Gewichtszunahme beitragen.",
      Rs_3_title: "Mehr Obst und Gemüse genießen",
      Rs_3_desc:
        "Obst und Gemüse sind reich an sekundären Pflanzenstoffen, Vitaminen und Ballaststoffen und gleichzeitig kalorienarm.",
      Rs_4_title: "Vollkornzufuhr erhöhen",
      Rs_4_desc:
        "Vollkornprodukte enthalten Ballaststoffe, B-Vitamine und wichtige Mineralien, die die allgemeine Gesundheit unterstützen.",
      Rs_5_title: "Mehr Nüsse essen",
      Rs_5_desc:
        "Nüsse sind eine ausgezeichnete Quelle für Protein und gesunde Fette und helfen, den Blutzuckerspiegel zu regulieren.",
      Rs_6_title: "Rotes Fleisch vermeiden",
      Rs_6_desc:
        "Der Verzehr von rotem Fleisch wurde mit Typ-2-Diabetes, Herzerkrankungen, Schlaganfall und bestimmten Krebsarten in Verbindung gebracht.",
      Rs_7_title: "Regelmäßig trainieren",
      Rs_7_desc:
        "Bewegung steigert die Energie, verbessert die Stimmung und den Cholesterinspiegel, senkt den Blutdruck, verbessert den Schlaf, stärkt die Immunität und hilft, den Blutzucker zu kontrollieren.",
      Rs_8_title: "Ein gesundes Gewicht erreichen",
      Rs_8_desc:
        "Halten Sie einen BMI zwischen 18,5 und 24,9 und einen gesunden Taillenumfang (weniger als 102 cm für Männer, 89 cm für Frauen).",
      Rs_9_title: "Jede Nacht 7-8 Stunden guten Schlaf bekommen",
      Rs_9_desc:
        "Ausreichender Schlaf unterstützt Gedächtnis, Lernen, Stoffwechsel und Immunfunktion.",
      Rs_10_title: "Mit dem Rauchen aufhören",
      Rs_10_desc:
        "Rauchen schädigt jedes Organ im Körper und erhöht das Risiko für Krebs, Herzerkrankungen, COPD, Asthma und Zahnprobleme.",
      Rs_11_title: "Keinen Alkohol trinken",
      Rs_11_desc:
        "Alkoholkonsum kann neurologische, kardiovaskuläre und psychiatrische Probleme verursachen und das Risiko für Krebs und Lebererkrankungen erhöhen.",
      Rs_12_title: "Spiritualität steigern",
      Rs_12_desc:
        "Der Glaube an Gott kann die psychische Gesundheit verbessern und die Immunfunktion stärken.",
      Rs_SavePdf: "PDF speichern",
      Rs_ShareReport: "Bericht teilen",
      Hs_List: "Liste",
      Hs_Group: "Gruppe",
      Hs_View: "Anzeigen",
      Hs_Filter: "Filtern",
      Hs_Options: "Optionen",
      Hs_Export: "Exportieren",
      Hs_Delete: "Löschen",
      Hs_Search: "Suchen",
      Hs_ExportAsCSV: "Als CSV exportieren",
      Hs_Confirmation: "Sind Sie sicher, dass Sie löschen möchten?",
      Hs_Success: "Element gelöscht",
      Hs_Cancel: "Abbrechen",
      Hs_ItemsSelected: "Elemente ausgewählt",
      Hs_SelectAll: "Alle auswählen",
      Hs_NewGroup: "Neue Gruppe",
      Hs_ExistingGroup: "Bestehende Gruppe",
      Hs_Create: "Erstellen",
      Hs_GroupName: "Gruppenname",
      Hs_EnterGroupName: "Gruppennamen eingeben",
      Hs_Reports: "Berichte",
      Hs_save: "Speichern",
      Hs_Nothing: "Noch nichts hier!",
      Hs_NothingDesc:
        "Ihre Gesundheitsalterberichte erscheinen hier, sobald Sie die Bewertung abgeschlossen haben.",
      Hs_Download: "Herunterladen",
      Hs_LanguageChanged: "Sprache erfolgreich geändert",
      Hs_Change: "Ändern",
      Fs_Filter: "Filtern nach",
      Fs_Close: "Schließen",
      Fs_Date: "Datum",
      Fs_From: "Von",
      Fs_To: "Bis",
      Fs_ClearAll: "Alle löschen",
      Fs_ShowResults: "Ergebnisse anzeigen",
      select: "Auswählen",
      total: "Gesamt",
      purchase: "Kaufen",
      aboutProgramme: "Über das Programm",
      reports: "Berichte",
      PrintQuestion: "Fragebogen drucken",
      PrintReport: "Leeren Bericht drucken",
      reportSetting: "Berichtseinstellungen",
      changeLanguage: "Sprache ändern",
      uploadLogo: "Ihr Logo hochladen",
      upload: "Hochladen",
      contactDetails: "Kontaktdaten",
      enterAddress: "Adresse eingeben",
      enterPhone: "Telefonnummer eingeben",
      createGroup: "Gruppe erstellen",
      normalBp: "Ihr Blutdruck ist normal",
      MaintainBp: "Bitte halten Sie Ihren Blutdruck aufrecht",
      bpRange: "Der normale Bereich liegt bei 90-119/60-79 mmHg.",
      normalGlucoseLevel: "Ihr Blutzuckerspiegel ist normal",
      maintainGlucoseLevel: "Bitte halten Sie Ihren Blutzuckerspiegel aufrecht",
      normalRangeGlucose: "Der normale Bereich liegt bei",
      for: "für",
      postMeal: "nach dem Essen",
      test: "Test",
      maintainBloodGlucose: "Halte deinen Blutzuckerspiegel im Gleichgewicht",
      maintainLowBloodGlucoseDesc:
        "Dein Blutzuckerspiegel ist niedrig. Ein stabiler Blutzucker verhindert Komplikationen, steigert die Energie und unterstützt die allgemeine Gesundheit. Ausgewogene Ernährung und Bewegung helfen, ihn im Gleichgewicht zu halten!",
      maintainHighBloodGlucoseDesc:
        "Dein Blutzuckerspiegel ist hoch. Ein stabiler Blutzucker verhindert Komplikationen, steigert die Energie und unterstützt die allgemeine Gesundheit. Ausgewogene Ernährung und Bewegung helfen, ihn im Gleichgewicht zu halten!",

      maintainBloodPressure: "Blutdruck unter Kontrolle halten",
      maintainBloodPressureDesc:
        "Ein gesunder Blutdruck verringert das Risiko von Herzkrankheiten, Schlaganfällen und Nierenproblemen. Regelmäßige Bewegung und eine ausgewogene Ernährung machen den Unterschied!",

      maintainLowBloodPressureDesc:
        "Dein Blutdruck ist niedrig. Ein gesunder Blutdruck verringert das Risiko von Herzkrankheiten, Schlaganfällen und Nierenproblemen. Regelmäßige Bewegung und eine ausgewogene Ernährung machen den Unterschied!",

      maintainHighBloodPressureDesc:
        "Dein Blutdruck ist hoch. Ein gesunder Blutdruck verringert das Risiko von Herzkrankheiten, Schlaganfällen und Nierenproblemen. Regelmäßige Bewegung und eine ausgewogene Ernährung machen den Unterschied!",
      downloadSuccess: "Erfolgreich heruntergeladen",
      goBackConfirmation: "Sind Sie sicher, dass Sie zurückgehen möchten?",
      pleaseWait: "Bitte warten!",

      goBeyond: "Gehe über die Grundlagen hinaus!",

      JoinPro:
        "Werde Pro-Mitglied und bringe deine Gesundheitsreise auf das nächste Level",

      WhyJoinPro: "Warum Pro-Mitglied werden?",

      UnlimitedReports: "Unbegrenzte Berichte",

      FullReportHistory: "Vollständige Berichtshistorie",

      PrintYourQuestionnaire: "Drucke den Fragebogen mit deinem Logo",

      printYourReport: "Drucke leere Berichte mit deinem Logo",

      upgrade: "Upgrade",

      yearlyPurchase: "Jährlicher Kauf",

      thisOneForPro: "Ups! Dieses Feature ist nur für PRO-Mitglieder.",

      proMembersDesc:
        "Diese Funktion ist unseren Pro-Mitgliedern vorbehalten. Willst du dabei sein? Upgrade jetzt und genieße exklusive Vorteile, die nur für dich gemacht sind!",

      UpgradeComplete: "Upgrade abgeschlossen!",

      NowAProMember: "Du bist jetzt ein Pro-Mitglied!",

      UpgradeTo: "Upgrade auf",
      SubscriptionCancelledSuccess: "Abonnement erfolgreich gekündigt!",
      ConfirmSubCancel: "Möchten Sie das Abonnement wirklich kündigen?",
      SubDaysRemaining: "Verbleibende Tage des Abonnements:",
      RenewSub: "Abonnement verlängern",
      cancelSub: "Abonnement kündigen",
      renewSubConfirmation:
        "Wenn Sie sich entscheiden, jetzt zu verlängern, beginnt ein neuer Abrechnungszeitraum ab heute, und die verbleibende Laufzeit Ihres aktuellen Abonnements wird nicht mehr gültig sein. Möchten Sie die Verlängerung wirklich fortsetzen?",
      renew: "Verlängern",
      BloodPressure: "Blutdruck",
      BloodGlucose: "Blutzucker",
      BMI: "BMI",
      PDFDonwload: "PDF wurde heruntergeladen!",
      PDFShared: "PDF wurde geteilt!",
      Error: "Etwas ist schiefgelaufen!",
      aboutTheApp: "Über die App",
      GetStarted: "Loslegen",
      systolic: "Systolisch",
      diastolic: "Diastolisch",
      start: "Starten",
      enterRequiredFields: "Bitte füllen Sie alle erforderlichen Felder aus!",
      enterThisFields: "Dieses Feld ist erforderlich!",

      exit: "Beenden",
      exitApp: "App beenden",
      appExitConfirmation: "Möchten Sie die App wirklich beenden?",
      leavePage: "Bewertung beenden?",
      leavePageConfirmation:
        "Wenn Sie diese Seite verlassen, gehen Ihre eingegebenen Daten verloren.",

      downloadOptions: "Download-Optionen",
      a4Size: "A4-Format",
      usLetter: "US-Briefpapier",
      pdfDownloaded: "PDF heruntergeladen!",
      addedToGroup: "Erfolgreich zur Gruppe hinzugefügt!",
      success: "Erfolg",
      exportedTo: "Exportiert nach",

      aboutTheAppDesc:
    "Diese App hilft dabei, das „Gesundheitsalter“ des eigenen Körpers basierend auf den individuellen Lebensstilpraktiken zu bestimmen. Diese App kombiniert Informationen aus den bekannten Langlebigkeitsstudien von Alameda County und den neuen Adventist Health Studies. Sie hilft den Teilnehmern, den starken Zusammenhang zwischen ihren Gesundheitsgewohnheiten und ihrem Sterberisiko zu verstehen. Sie bietet eine hervorragende Grundlage für die Gesundheitsberatung.",
  aboutTheAppTitle: "Über die App",

    },
  },
  pap: {
    translation: {
      welcome: "Bon bini",
      chooseLanguage: "Skohe Idioma",
      introduction: "Introdukshon",
      howItWorks: "Kon e ta funshoná",
      benefits: "Benefisionan",
      discoverHealthAge: "Deskurbri Bo Edat di Salú!",
      lifestyleAffectsHealth:
        "Bo estilo di bida ta afektá bo salú mas ku bo ta pensa. Laga nos haña sa kon hóben bo ta realmente!",
      simpleScienceBacked: "Simpel i Basá riba Siensia",
      answerQuestions:
        "Kontesta algun pregunta tokante bo kustumbernan, i nos lo kalkulá bo Edat di Salú basá riba perspektivanan di salú real.",
      getPersonalizedTips: "Haña Konsehonan Personalisá di Salú",
      improveLifestyle:
        "Mehorá bo estilo di bida ku rekomendashonnan personalisá pa alkansá bo potensial di salú máksimo.",

      // HomeScreen.tsx
      helpCalculateHealthAge: "Mi por yuda bo kalkulá bo edat di salú.",
      startAssessment: "Kuminsá bo evaluashon awor",
      home: "Kas",
      purchases: "Kompranan",
      history: "Historia",
      dailyLimit: "Límite Diario",

      // healthAgeTest.tsx
      getStarted:
        "Laga nos kuminsá. Bo edat di salú ta basá riba bo estilo di bida i kustumbernan.",
      whatIsYourName: "Kon bo nòmber ta?",
      enterName: "Pone Nòmber",
      next: "Siguiente",
      whatIsYourAge: "Kuantu aña bo tin?",
      age: "Edad",
      whatIsYourGender: "Kua ta bo sekso?",
      gender: "Sekso",
      male: "Maskulino",
      female: "Femenino",
      whatIsYourHeight: "Kuantu haltu bo ta?",
      height: "Altura",
      whatIsYourWeight: "Kuantu peso bo tin?",
      weight: "Peso",
      whatIsYourWaistCircumference: "Kua ta bo sirkunferensia di sintura?",
      waistCircumference: "Sirkunferensia di sintura",
      whatIsYourBloodPressure: "Kua ta bo preshon di sanger?",
      bloodPressure: "Preshon di sanger",
      whatIsYourBloodGlucose: "Kua ta bo nivel di glukosa den sanger?",
      fasting: "Yunando",
      postMeals: "Despues di kuminda",
      bloodGlucoseLevel: "Nivel di glukosa den sanger",

      // QuestionScreen.tsx
      newAssessment: "Evaluashon Nobo",
      howOftenEatBreakfast: "Kon frekuente bo ta kome un bon desayuno?",
      breakfastNote: "(Enfatisando grano integral, fruta òf berdura, i nechi)",
      lessThan2Days: "Ménos ku 2 dia pa siman",
      twoToFourDays: "2-4 dia pa siman",
      fiveToSixDays: "5-6 dia pa siman",
      everyday: "Tur dia",
      howOftenSnack: "Kon frekuente bo ta kome snèk?",
      severalTimesDay: "Vários biaha pa dia",
      onceDay: "Un biaha pa dia",
      fewTimesWeek: "Algun biaha pa siman",
      rarelyNever: "Raramente òf nunka",
      howManyFruitsVeggies:
        "Kuantu porshon di fruta i berdura bo ta kome pa dia?",
      fruitsVeggiesNote:
        "(1 porshon = 1 pida mediano, 1 C fresku, 1/2 C kushiná, òf 6 oz 100% djus)",
      howManyWholeGrains: "Kuantu porshon di grano integral bo ta kome pa dia?",
      wholeGrainsNote:
        "(1 porshon = 1 sleis pan, 1/2 C aros maron òf oatmeal, 2/3 C cereal seku)",
      none: "Ningun",
      back: "Bèk",
      howManyNutsSeeds: "Kuantu porshon di nechi i simia bo ta kome pa siman?",
      nutsSeedsNote: "(1 porshon = 1 oz nechi òf simia, 2 T manteka di nechi)",
      howOftenRedMeat: "Kon frekuente bo ta kome karni kòrá?",
      threeOrMoreTimesWeek: "3 òf mas biaha pa siman",
      onceTwiceMonth: "Un òf dos biaha pa luna",
      never: "Nunka",
      howOftenExercise:
        "Kon frekuente bo ta hasi 20-30 minüt di ehersisio moderá te vigoroso?",
      rarely: "Raramente",
      oneTwoDaysWeek: "1-2 dia pa siman",
      threeFourDaysWeek: "3-4 dia pa siman",
      fiveMoreDaysWeek: "5 òf mas dia pa siman",
      howIsWeight: "Kon bo peso ta?",
      severelyOverweight: "Sobrepisá severamente",
      moderatelyOverweight: "Sobrepisá moderadamente",
      underweight: "Bao di peso",
      healthyWeight: "Peso salú",
      howOftenSleep: "Kon frekuente bo ta drumi 7-8 ora?",
      twoOrFewerDays: "2 òf ménos dia pa siman",
      threeFourDays: "3-4 dia pa siman",
      fiveSixDays: "5-6 dia pa siman",
      whatIsTobaccoHistory: "Kua ta bo historia ku tabako?",
      currentlyUse: "Ta usa aktualmente",
      quitLessThanTwoYears: "A stòp ménos ku 2 aña pasá",
      quitOverTwoYears: "A stòp mas ku 2 aña pasá",
      neverUsed: "Nunka a usa",
      howManyAlcohol: "Kuantu porshon di alkohòl bo ta konsumí pa siman?",
      alcoholNote: "(12 oz serbes, 8 oz likùr di malt, 5 oz biña, 1.5 oz shot)",
      excessiveAlcohol: "15+ (hòmber) òf 8+ (muhé)",
      howRateSpirituality: "Kon bo ta evaluá bo spiritualidat?",
      noInterest: "Sin interes",
      moderatelySpiritual: "Moderadamente spiritual",
      deeplySpiritual: "Profundamente spiritual",

      // interestScreen

      Is_Interests: "Interesnan",
      Is_TellYourInterest:
        "Bisá nos kiko bo tin interes den dje pa personalisá bo eksperensia.",
      Is_WeightManagement: "Maneho di Peso",
      Is_FitAndExercise: "Fitness i Ehersisio",
      Is_StopSmoking: "Stòp di Huma",
      Is_HealthyCooking: "Kushinamentu Salú",
      Is_StressReduction: "Redukshon di Estrès",
      Is_PreventHeartDisease: "Prevenshon di Malesa di Kurason",
      Is_DepressionRecovery: "Rekuperashon di Depreshon",
      Is_ReversingDiabetes: "Invertiendo Diabétis",
      Is_NaturalRemedies: "Remedinan Natural",
      Is_SpiritualHealth: "Salú Spiritual",
      Is_ImprovingMentalPerformance: "Mehorando Prestashon Mental",
      Is_Other: "Otro",
      Is_Name: "Nòmber",
      Is_Email: "Email",
      Is_Address: "Adres",
      Is_Phone: "Telefon",
      Is_Zip: "Zip",
      Is_ShowReport: "Mustra Rapòrt",

      // reportScreen

      Rs_Report: "Rapòrt",
      Rs_CustomizedReport: "Rapòrt Personalisá pa :",
      Rs_YourHealthAge: "Bo edat di salú ta",
      Rs_YourActualAge: "Bo edat real di",
      Rs_CurrentAge: "Edad Aktual",
      Rs_HealthAge: "Edad di Salú",
      Rs_PotentialAge: "Edad Potensial",
      Rs_HealthyHabitsParagraph:
        "Vários estudio di investigashon grandi, inkluyendo e konosido Estudio di Condado di Alameda i e Estudionan di Salú Adventista ta revelá un fuerte relashon entre e kustumbernan di salú menshoná abou i e riesgo di malesa/morto di un hende. Individuonan ku ta praktiká tur e kustumbernan di salú aki por influenshá nan longevidad ku kasi 30 aña.",
      Rs_MedicalDisclaimerTitle: "Disclaimer médiko",
      Rs_MedicalDisclaimerText:
        "Health Age ta destiná solamente pa propósitonan informativo i educativo. No ta un diagnóstiko médiko i no mester usa'é komo sustituto di conseho, diagnóstiko of tratamentu médiko profesional. Konsultá semper un profesional di salud kualifiká promé ku hasi kualke desishon médiko of kambionan den bo kuido di salud.",
      Rs_MedicalSources: "Fuente médiko",
      Rs_Source: "Fuente",
      Rs_Recommendations: "Rekomendashonnan",
      Rs_1_title: "Kome un bon desayuno tur dia",
      Rs_1_desc:
        "Desayuno ta stimulá metabolismo, ta yuda ku konsentrashon, i ta mehorá prestashon na skol i trabou. E ta yuda tambe den mantené un peso salú.",
      Rs_2_title: "Evitá snèk",
      Rs_2_desc:
        "Snèk por agregá un promedio di 580 kaloria pa dia, ta daña digesthon, ta disturbi kontrol di suku den sanger, i ta kontribuí na oumento di peso.",
      Rs_3_title: "Disfrutá mas fruta i berdura",
      Rs_3_desc:
        "Fruta i berdura ta riku na fitokímikonan, vitamina, i fibra miéntras ku nan ta mas abou den kaloria.",
      Rs_4_title: "Oumentá konsumo di grano integral",
      Rs_4_desc:
        "Grano integral ta kontené fibra, vitamina B, i mineral esensial ku ta sostené salú general.",
      Rs_5_title: "Kome mas nechi",
      Rs_5_desc:
        "Nechi ta un ekselente fuente di proteina i vet salú, i nan ta yuda regulá nivelnan di suku den sanger.",
      Rs_6_title: "Evitá karni kòrá",
      Rs_6_desc:
        "Kome karni kòrá a wòrdu konektá ku diabétis tipo 2, malesa di kurason, atake serebral, i sierto kansernan.",
      Rs_7_title: "Hasi ehersisio regularmente",
      Rs_7_desc:
        "Ehersisio ta stimulá energia, ta mehorá ánimo i nivelnan di kolesterol, ta baha preshon di sanger, ta mehorá soño, ta fortalesé inmunidat, i ta yuda kontrolá suku den sanger.",
      Rs_8_title: "Alkansa un peso salú",
      Rs_8_desc:
        "Mantené un BMI entre 18.5 - 24.9 i un sirkunferensia di sintura salú (ménos ku 40 inch pa hòmber, 35 inch pa muhé).",
      Rs_9_title: "Drui 7-8 ora di bon soño tur anochi",
      Rs_9_desc:
        "Soño adekuá ta sostené memoria, siñamentu, metabolismo, i funshon imunológiko.",
      Rs_10_title: "Stòp di huma",
      Rs_10_desc:
        "Humamentu ta hasi daño na tur órgano den kurpa, oumentando e riesgo di kansernan, malesa di kurason, COPD, asma, i problemanan dental.",
      Rs_11_title: "No bebe alkohòl",
      Rs_11_desc:
        "Uso di alkohòl por kousa problemanan neurológiko, kardiovaskular, i sikatriko, tambe oumentá e riesgo di kanser i malesa di higra.",

      Rs_12_title: "Oumentá spiritualidat",
      Rs_12_desc:
        "Fe den Dios por mehorá salú mental i fortalesé funshon imunológiko.",
      Rs_SavePdf: "Warda pdf",
      Rs_ShareReport: "Kompartí Rapòrt",

      // history screen

      Hs_List: "Lista",
      Hs_Group: "Grupo",
      Hs_View: "Bista",
      Hs_Filter: "Filtra",
      Hs_Options: "Opshonnan",
      Hs_Export: "Eksportá",
      Hs_Delete: "Eliminá",
      Hs_Search: "Buska",
      Hs_ExportAsCSV: "Eksportá komo CSV",
      Hs_Confirmation: "Bo ta sigur ku bo ke eliminá?",
      Hs_Success: "Artíkulo Eliminá",
      Hs_Cancel: "Kanselá",
      Hs_ItemsSelected: "Artíkulonan Selektá",
      Hs_SelectAll: "Selektá tur",
      Hs_NewGroup: "Grupo Nobo",
      Hs_ExistingGroup: "Grupo Eksistente",
      Hs_Create: "Krea",
      Hs_GroupName: "Nòmber di Grupo",
      Hs_EnterGroupName: "Pone nòmber di grupo",
      Hs_Reports: "Rapòrtnan",
      Hs_save: "Warda",
      Hs_Nothing: "Nada aki ainda!",
      Hs_NothingDesc:
        "Bo rapòrtnan di edat di salú lo aparesé aki asina ku bo kaba di evaluá.",
      Hs_Download: "Download",

      Hs_LanguageChanged: "Idioma kambia ku éksito",
      Hs_Change: "Kambia",

      // Filter Screen
      Fs_Filter: "Filtra pa",
      Fs_Close: "Sera",
      Fs_Date: "Fecha",
      Fs_From: "For di",
      Fs_To: "Te ku",
      Fs_ClearAll: "Limpia tur",
      Fs_ShowResults: "Mustra resultadonan",

      // others

      select: "Selektá",
      total: "Total",
      purchase: "Kompra",
      aboutProgramme: "Tokante e Programa",
      reports: "Rapòrtnan",
      PrintQuestion: "Imprimí Kuestionario",
      PrintReport: "Imprimí Rapòrt Blanku",
      reportSetting: "Konfigurashon di Rapòrt",
      changeLanguage: "Kambia Idioma",
      uploadLogo: "Karga bo logo",
      upload: "Karga",
      contactDetails: "Detayenan di Kontakto",
      enterAddress: "Pone Adres",
      enterPhone: "Pone Number di Telefon",
      createGroup: "Krea Grupo",

      // blood pressure and glucose

      normalBp: "Bo preshon di sanger ta normal",
      MaintainBp: "Por fabor mantené bo preshon di sanger",
      bpRange: "Rango normal ta 90-119/60-79 mmHg.",
      normalGlucoseLevel: "Bo nivel di glukosa den sanger ta normal",
      maintainGlucoseLevel: "Por fabor mantené bo nivel di glukosa den sanger",
      normalRangeGlucose: "Rango normal ta",
      for: "pa",
      postMeal: "despues di kuminda",
      test: "test",
      maintainBloodGlucose: "Manten bo nivel di azùkar den sanger stabil",
      maintainLowBloodGlucoseDesc:
        "Bo nivel di azùkar den sanger ta baha. Un nivel di azùkar stabil preveni komplikashon, duna mas energia i yuda ku salú general. Un dieta balansá i ehekisio ta yuda mantené esaki na kontrol!",
      maintainHighBloodGlucoseDesc:
        "Bo nivel di azùkar den sanger ta haltu. Un nivel di azùkar stabil preveni komplikashon, duna mas energia i yuda ku salú general. Un dieta balansá i ehekisio ta yuda mantené esaki na kontrol!",
      maintainBloodPressure: "Manten preshon di sanger bou di kontrol",
      maintainBloodPressureDesc:
        "Mantené un preshon di sanger saludable ta reduci e riesgo di malesa di kurason, strog i problema ku rinon. Ehekisio regular i un dieta balansá por hasi diferencia!",
      maintainLowBloodPressureDesc:
        "Bo preshon di sanger ta baha. Mantené un preshon di sanger saludable ta reduci e riesgo di malesa di kurason, strog i problema ku rinon. Ehekisio regular i un dieta balansá por hasi diferencia!",
      maintainHighBloodPressureDesc:
        "Bo preshon di sanger ta haltu. Mantené un preshon di sanger saludable ta reduci e riesgo di malesa di kurason, strog i problema ku rinon. Ehekisio regular i un dieta balansá por hasi diferencia!",

      // messages

      downloadSuccess: "Download ku éksito",
      goBackConfirmation: "Bo ta sigur ku bo ke bai bèk?",
      pleaseWait: "Por fabor warda!",
      // purchase Screen

      goBeyond: "Bai mas leu ku e kosnan básiko!",

      JoinPro:
        "Hunga ku nos Miembronan Pro i yega bo biahe di salú na e siguiente nivel",

      WhyJoinPro: "Dikon bo mester bira Pro?",

      UnlimitedReports: "Raportnan Sin Limitashon",

      FullReportHistory: "Historial Kompleto di Raportnan",

      PrintYourQuestionnaire: "Printa Kuestionario ku bo logo",

      printYourReport: "Printa Raport Blanku ku bo logo",

      upgrade: "Hasi Upgrade",

      yearlyPurchase: "Kompra Anual",

      thisOneForPro: "Oops! E ta pa Miembronan PRO.",

      proMembersDesc:
        "E karakterístika aki ta reservá pa nos Miembronan Pro. Kier partisipá? Hasi upgrade awor i disfruta di benefisionan eksklusivo, spesialmente pa bo!",

      UpgradeComplete: "Upgrade Kompleto!",

      NowAProMember: "Bo a bira un Miembro Pro awor!",
      UpgradeTo: "Hasi Upgrade Na",
      SubscriptionCancelledSuccess: "Subscripshon a kanselá ku éksito!",
      ConfirmSubCancel: "Bo ta sigur ku bo ke kanselá e subscripshon?",
      SubDaysRemaining: "Dia restante di Subscripshon:",
      RenewSub: "Renová Subscripshon",
      cancelSub: "Kanselá Subscripshon",
      renewSubConfirmation:
        "Si bo skohe pa renová awor, un bieu periodu di pago lo kuminsá for di awe, i e tempo restante di bo subscripshon aktual no lo ta válido mas. Bo ta sigur ku bo ke prosedé ku e renovashon?",
      renew: "Renová",
      BloodPressure: "Preshon di Sanger",
      BloodGlucose: "Glukosa di Sanger",
      BMI: "BMI",
      PDFDonwload: "PDF a ser deskargá!",
      PDFShared: "PDF a ser kompartí!",
      Error: "Algu a bai malo!",
      aboutTheApp: "Tokante e aplikashon",

       aboutTheAppDesc: "E app aki ta yuda determiná e “edad di salú” di bo kurpa segun bo práktikanan di estilo di bida. E app aki ta kombiná informashon di e estudionan di longevidad konosí di Alameda County i e estudionan nobo di Adventist Health. E app aki ta yuda partisipantenan komprondé e korrelashon fuerte entre nan hábito di salú i nan riesgo di morto. E ta duna un base ekselente pa konseho di salú.",
    aboutTheAppTitle: "Tokante e App",
    },
  },
  vi: {
    translation: {
      welcome: "Chào mừng",
      chooseLanguage: "Chọn Ngôn Ngữ",
      introduction: "Giới thiệu",
      howItWorks: "Cách thức hoạt động",
      benefits: "Lợi ích",
      discoverHealthAge: "Khám phá Tuổi Sức Khỏe của bạn!",
      lifestyleAffectsHealth:
        "Lối sống của bạn ảnh hưởng đến sức khỏe của bạn nhiều hơn bạn nghĩ. Hãy cùng tìm hiểu bạn thực sự trẻ đến mức nào!",
      simpleScienceBacked: "Đơn giản & Dựa trên Khoa học",
      answerQuestions:
        "Trả lời một vài câu hỏi về thói quen của bạn, và chúng tôi sẽ tính toán Tuổi Sức Khỏe của bạn dựa trên những hiểu biết sức khỏe thực tế.",
      getPersonalizedTips: "Nhận Lời khuyên Sức khỏe Cá nhân hóa",
      improveLifestyle:
        "Cải thiện lối sống của bạn với các khuyến nghị tùy chỉnh để đạt được tiềm năng sức khỏe tốt nhất của bạn.",
      helpCalculateHealthAge: "Tôi có thể giúp bạn tính tuổi sức khỏe của bạn.",
      startAssessment: "Bắt đầu đánh giá của bạn ngay bây giờ",
      home: "Trang chủ",
      purchases: "Mua hàng",
      history: "Lịch sử",
      dailyLimit: "Giới hạn hàng ngày",
      getStarted:
        "Hãy bắt đầu. Tuổi sức khỏe của bạn dựa trên lối sống và thói quen của bạn.",
      whatIsYourName: "Tên của bạn là gì?",
      enterName: "Nhập Tên",
      next: "Tiếp theo",
      whatIsYourAge: "Tuổi của bạn là bao nhiêu?",
      age: "Tuổi",
      whatIsYourGender: "Giới tính của bạn là gì?",
      gender: "Giới tính",
      male: "Nam",
      female: "Nữ",
      whatIsYourHeight: "Chiều cao của bạn là bao nhiêu?",
      height: "Chiều cao",
      whatIsYourWeight: "Cân nặng của bạn là bao nhiêu?",
      weight: "Cân nặng",
      whatIsYourWaistCircumference: "Vòng eo của bạn là bao nhiêu?",
      waistCircumference: "Vòng eo",
      whatIsYourBloodPressure: "Huyết áp của bạn là bao nhiêu?",
      bloodPressure: "Huyết áp",
      whatIsYourBloodGlucose: "Mức đường huyết của bạn là bao nhiêu?",
      fasting: "Nhịn ăn",
      postMeals: "Sau bữa ăn",
      bloodGlucoseLevel: "Mức đường huyết",
      newAssessment: "Đánh giá Mới",
      howOftenEatBreakfast: "Bạn ăn sáng đầy đủ bao lâu một lần?",
      breakfastNote:
        "(Nhấn mạnh ngũ cốc nguyên hạt, trái cây hoặc rau quả, và các loại hạt)",
      lessThan2Days: "Ít hơn 2 ngày mỗi tuần",
      twoToFourDays: "2-4 ngày mỗi tuần",
      fiveToSixDays: "5-6 ngày mỗi tuần",
      everyday: "Mỗi ngày",
      howOftenSnack: "Bạn ăn vặt bao lâu một lần?",
      severalTimesDay: "Nhiều lần trong ngày",
      onceDay: "Một lần một ngày",
      fewTimesWeek: "Một vài lần mỗi tuần",
      rarelyNever: "Hiếm khi hoặc không bao giờ",
      howManyFruitsVeggies:
        "Bạn ăn bao nhiêu khẩu phần trái cây và rau quả mỗi ngày?",
      fruitsVeggiesNote:
        "(1 khẩu phần = 1 miếng trung bình, 1 cốc tươi, 1/2 cốc nấu chín, hoặc 6 oz nước ép 100%)",
      howManyWholeGrains:
        "Bạn ăn bao nhiêu khẩu phần ngũ cốc nguyên hạt mỗi ngày?",
      wholeGrainsNote:
        "(1 khẩu phần = 1 lát bánh mì, 1/2 cốc gạo lứt hoặc bột yến mạch, 2/3 cốc ngũ cốc khô)",
      none: "Không có",
      back: "Quay lại",
      howManyNutsSeeds: "Bạn ăn bao nhiêu khẩu phần hạt và hạt giống mỗi tuần?",
      nutsSeedsNote:
        "(1 khẩu phần = 1 oz hạt hoặc hạt giống, 2 muỗng canh bơ hạt)",
      howOftenRedMeat: "Bạn ăn thịt đỏ bao lâu một lần?",
      threeOrMoreTimesWeek: "3 lần trở lên mỗi tuần",
      onceTwiceMonth: "Một hoặc hai lần mỗi tháng",
      never: "Không bao giờ",
      howOftenExercise:
        "Bạn tập thể dục vừa phải đến mạnh trong 20-30 phút bao lâu một lần?",
      rarely: "Hiếm khi",
      oneTwoDaysWeek: "1-2 ngày mỗi tuần",
      threeFourDaysWeek: "3-4 ngày mỗi tuần",
      fiveMoreDaysWeek: "5 ngày trở lên mỗi tuần",
      howIsWeight: "Cân nặng của bạn như thế nào?",
      severelyOverweight: "Thừa cân nghiêm trọng",
      moderatelyOverweight: "Thừa cân vừa phải",
      underweight: "Thiếu cân",
      healthyWeight: "Cân nặng khỏe mạnh",
      howOftenSleep: "Bạn ngủ 7-8 tiếng bao lâu một lần?",
      twoOrFewerDays: "2 ngày hoặc ít hơn mỗi tuần",
      threeFourDays: "3-4 ngày mỗi tuần",
      fiveSixDays: "5-6 ngày mỗi tuần",
      whatIsTobaccoHistory: "Lịch sử hút thuốc của bạn là gì?",
      currentlyUse: "Hiện đang sử dụng",
      quitLessThanTwoYears: "Bỏ thuốc dưới 2 năm trước",
      quitOverTwoYears: "Bỏ thuốc trên 2 năm trước",
      neverUsed: "Chưa bao giờ sử dụng",
      howManyAlcohol: "Bạn tiêu thụ bao nhiêu khẩu phần rượu mỗi tuần?",
      alcoholNote:
        "(12 oz bia, 8 oz rượu mạch nha, 5 oz rượu vang, 1.5 oz rượu mạnh)",
      excessiveAlcohol: "15+ (nam) hoặc 8+ (nữ)",
      howRateSpirituality: "Bạn đánh giá tâm linh của mình như thế nào?",
      noInterest: "Không quan tâm",
      moderatelySpiritual: "Tâm linh vừa phải",
      deeplySpiritual: "Tâm linh sâu sắc",
      Is_Interests: "Sở thích",
      Is_TellYourInterest:
        "Hãy cho chúng tôi biết bạn quan tâm đến điều gì để tùy chỉnh trải nghiệm của bạn.",
      Is_WeightManagement: "Quản lý Cân nặng",
      Is_FitAndExercise: "Thể dục và Tập thể dục",
      Is_StopSmoking: "Bỏ Thuốc lá",
      Is_HealthyCooking: "Nấu ăn Lành mạnh",
      Is_StressReduction: "Giảm Căng thẳng",
      Is_PreventHeartDisease: "Phòng ngừa Bệnh Tim",
      Is_DepressionRecovery: "Phục hồi Trầm cảm",
      Is_ReversingDiabetes: "Đảo ngược Bệnh tiểu đường",
      Is_NaturalRemedies: "Phương pháp chữa trị Tự nhiên",
      Is_SpiritualHealth: "Sức khỏe Tinh thần",
      Is_ImprovingMentalPerformance: "Cải thiện Hiệu suất Tinh thần",
      Is_Other: "Khác",
      Is_Name: "Tên",
      Is_Email: "Email",
      Is_Address: "Địa chỉ",
      Is_Phone: "Điện thoại",
      Is_Zip: "Mã Bưu điện",
      Is_ShowReport: "Hiển thị Báo cáo",
      Rs_Report: "Báo cáo",
      Rs_CustomizedReport: "Báo cáo Tùy chỉnh cho:",
      Rs_YourHealthAge: "Tuổi sức khỏe của bạn là",
      Rs_YourActualAge: "Tuổi thực tế của bạn là",
      Rs_CurrentAge: "Tuổi Hiện tại",
      Rs_HealthAge: "Tuổi Sức khỏe",
      Rs_PotentialAge: "Tuổi Tiềm năng",
      Rs_HealthyHabitsParagraph:
        "Một số nghiên cứu lớn, bao gồm Nghiên cứu Hạt Alameda nổi tiếng và Nghiên cứu Sức khỏe Adventist, cho thấy mối tương quan chặt chẽ giữa các thói quen sức khỏe được liệt kê dưới đây và nguy cơ mắc bệnh/tử vong. Những người thực hiện tất cả các thói quen lành mạnh này có thể ảnh hưởng đến tuổi thọ của họ gần 30 năm.",
      Rs_MedicalDisclaimerTitle: "Tuyên bố miễn trừ y tế",
      Rs_MedicalDisclaimerText:
        "Health Age chỉ nhằm mục đích thông tin và giáo dục. Đây không phải là chẩn đoán y tế và không nên được sử dụng thay thế cho tư vấn, chẩn đoán hoặc điều trị y tế chuyên nghiệp. Luôn tham khảo ý kiến chuyên gia chăm sóc sức khỏe có trình độ trước khi đưa ra bất kỳ quyết định y tế nào hoặc thay đổi chăm sóc sức khỏe của bạn.",
      Rs_MedicalSources: "Nguồn y tế",
      Rs_Source: "Nguồn",
      Rs_Recommendations: "Khuyến nghị",
      Rs_1_title: "Ăn sáng đầy đủ mỗi ngày",
      Rs_1_desc:
        "Bữa sáng thúc đẩy quá trình trao đổi chất, giúp tập trung và cải thiện hiệu suất ở trường và nơi làm việc. Nó cũng hỗ trợ duy trì cân nặng khỏe mạnh.",
      Rs_2_title: "Tránh ăn vặt",
      Rs_2_desc:
        "Ăn vặt có thể thêm trung bình 580 calo mỗi ngày, làm suy yếu tiêu hóa, làm gián đoạn kiểm soát đường huyết và góp phần tăng cân.",
      Rs_3_title: "Ăn nhiều trái cây và rau quả hơn",
      Rs_3_desc:
        "Trái cây và rau quả giàu phytochemical, vitamin và chất xơ trong khi lượng calo thấp hơn.",
      Rs_4_title: "Tăng lượng ngũ cốc nguyên hạt",
      Rs_4_desc:
        "Ngũ cốc nguyên hạt chứa chất xơ, vitamin B và khoáng chất thiết yếu hỗ trợ sức khỏe tổng thể.",
      Rs_5_title: "Ăn nhiều hạt hơn",
      Rs_5_desc:
        "Các loại hạt là nguồn protein và chất béo lành mạnh tuyệt vời, và chúng giúp điều chỉnh lượng đường trong máu.",
      Rs_6_title: "Tránh thịt đỏ",
      Rs_6_desc:
        "Ăn thịt đỏ có liên quan đến bệnh tiểu đường loại 2, bệnh tim, đột quỵ và một số bệnh ung thư.",
      Rs_7_title: "Tập thể dục thường xuyên",
      Rs_7_desc:
        "Tập thể dục tăng cường năng lượng, cải thiện tâm trạng và mức cholesterol, hạ huyết áp, tăng cường giấc ngủ, tăng cường khả năng miễn dịch và giúp kiểm soát lượng đường trong máu.",
      Rs_8_title: "Đạt được cân nặng khỏe mạnh",
      Rs_8_desc:
        "Duy trì chỉ số BMI từ 18,5 - 24,9 và vòng eo khỏe mạnh (dưới 40 inch đối với nam, 35 inch đối với nữ).",
      Rs_9_title: "Ngủ 7-8 tiếng mỗi đêm",
      Rs_9_desc:
        "Ngủ đủ giấc hỗ trợ trí nhớ, học tập, trao đổi chất và chức năng miễn dịch.",
      Rs_10_title: "Bỏ thuốc lá",
      Rs_10_desc:
        "Hút thuốc lá gây hại cho mọi cơ quan trong cơ thể, làm tăng nguy cơ ung thư, bệnh tim, COPD, hen suyễn và các vấn đề về răng miệng.",
      Rs_11_title: "Không uống rượu",
      Rs_11_desc:
        "Sử dụng rượu có thể gây ra các vấn đề về thần kinh, tim mạch và tâm thần, cũng như làm tăng nguy cơ ung thư và bệnh gan.",
      Rs_12_title: "Tăng cường tâm linh",
      Rs_12_desc:
        "Niềm tin vào Chúa có thể cải thiện sức khỏe tinh thần và tăng cường chức năng miễn dịch.",
      Rs_SavePdf: "Lưu pdf",
      Rs_ShareReport: "Chia sẻ Báo cáo",
      Hs_List: "Danh sách",
      Hs_Group: "Nhóm",
      Hs_View: "Xem",
      Hs_Filter: "Lọc",
      Hs_Options: "Tùy chọn",
      Hs_Export: "Xuất",
      Hs_Delete: "Xóa",
      Hs_Search: "Tìm kiếm",
      Hs_ExportAsCSV: "Xuất dưới dạng CSV",
      Hs_Confirmation: "Bạn có chắc chắn muốn xóa không?",
      Hs_Success: "Đã xóa Mục",
      Hs_Cancel: "Hủy",
      Hs_ItemsSelected: "Các Mục Đã Chọn",
      Hs_SelectAll: "Chọn tất cả",
      Hs_NewGroup: "Nhóm Mới",
      Hs_ExistingGroup: "Nhóm Hiện tại",
      Hs_Create: "Tạo",
      Hs_GroupName: "Tên Nhóm",
      Hs_EnterGroupName: "Nhập tên nhóm",
      Hs_Reports: "Báo cáo",
      Hs_save: "Lưu",
      Hs_Nothing: "Chưa có gì ở đây!",
      Hs_NothingDesc:
        "Báo cáo tuổi sức khỏe của bạn sẽ xuất hiện ở đây sau khi bạn hoàn thành đánh giá.",
      Hs_Download: "Tải xuống",
      Hs_LanguageChanged: "Thay đổi ngôn ngữ thành công",
      Hs_Change: "Thay đổi",
      Fs_Filter: "Lọc theo",
      Fs_Close: "Đóng",
      Fs_Date: "Ngày",
      Fs_From: "Từ",
      Fs_To: "Đến",
      Fs_ClearAll: "Xóa tất cả",
      Fs_ShowResults: "Hiển thị kết quả",
      select: "Chọn",
      total: "Tổng",
      purchase: "Mua hàng",
      aboutProgramme: "Về Chương trình",
      reports: "Báo cáo",
      PrintQuestion: "In Bảng câu hỏi",
      PrintReport: "In Báo cáo Trống",
      reportSetting: "Cài đặt Báo cáo",
      changeLanguage: "Thay đổi Ngôn ngữ",
      uploadLogo: "Tải lên logo của bạn",
      upload: "Tải lên",
      contactDetails: "Chi tiết Liên hệ",
      enterAddress: "Nhập Địa chỉ",
      enterPhone: "Nhập Số Điện thoại",
      createGroup: "Tạo Nhóm",
      normalBp: "Huyết áp của bạn bình thường",
      MaintainBp: "Vui lòng duy trì huyết áp của bạn",
      bpRange: "Phạm vi bình thường là 90-119/60-79 mmHg.",
      normalGlucoseLevel: "Mức đường huyết của bạn bình thường",
      maintainGlucoseLevel: "Vui lòng duy trì mức đường huyết của bạn",
      normalRangeGlucose: "Phạm vi bình thường là",
      for: "cho",
      postMeal: "sau bữa ăn",
      test: "kiểm tra",
      maintainBloodGlucose: "Duy trì mức đường huyết của bạn",
      maintainLowBloodGlucoseDesc:
        "Mức đường huyết của bạn đang thấp, duy trì đường huyết ổn định giúp ngăn ngừa biến chứng, tăng cường năng lượng và hỗ trợ sức khỏe tổng thể. Ăn uống cân bằng và tập thể dục giúp kiểm soát hiệu quả!",
      maintainHighBloodGlucoseDesc:
        "Mức đường huyết của bạn đang cao, duy trì đường huyết ổn định giúp ngăn ngừa biến chứng, tăng cường năng lượng và hỗ trợ sức khỏe tổng thể. Ăn uống cân bằng và tập thể dục giúp kiểm soát hiệu quả!",
      maintainBloodPressure: "Giữ huyết áp ổn định",
      maintainBloodPressureDesc:
        "Duy trì huyết áp khỏe mạnh giúp giảm nguy cơ mắc bệnh tim, đột quỵ và các vấn đề về thận. Tập thể dục thường xuyên và chế độ ăn uống cân bằng tạo ra sự khác biệt lớn!",
      maintainLowBloodPressureDesc:
        "Mức huyết áp của bạn đang thấp, duy trì huyết áp khỏe mạnh giúp giảm nguy cơ mắc bệnh tim, đột quỵ và các vấn đề về thận. Tập thể dục thường xuyên và chế độ ăn uống cân bằng tạo ra sự khác biệt lớn!",
      maintainHighBloodPressureDesc:
        "Mức huyết áp của bạn đang cao, duy trì huyết áp khỏe mạnh giúp giảm nguy cơ mắc bệnh tim, đột quỵ và các vấn đề về thận. Tập thể dục thường xuyên và chế độ ăn uống cân bằng tạo ra sự khác biệt lớn!",
      downloadSuccess: "Tải xuống Thành công",
      goBackConfirmation: "Bạn có chắc chắn muốn quay lại không?",
      pleaseWait: "Vui lòng đợi!",
      // purchase Screen

      goBeyond: "Vượt xa những điều cơ bản!",

      JoinPro:
        "Tham gia thành viên Pro và nâng tầm hành trình sức khỏe của bạn",

      WhyJoinPro: "Tại sao nên tham gia Pro?",

      UnlimitedReports: "Báo cáo không giới hạn",

      FullReportHistory: "Lịch sử báo cáo đầy đủ",

      PrintYourQuestionnaire: "In bảng câu hỏi với logo của bạn",

      printYourReport: "In báo cáo trống với logo của bạn",

      upgrade: "Nâng cấp",

      yearlyPurchase: "Mua hàng năm",

      thisOneForPro: "Ôi! Tính năng này chỉ dành cho thành viên PRO.",

      proMembersDesc:
        "Tính năng này được dành riêng cho thành viên Pro của chúng tôi. Muốn tham gia? Nâng cấp ngay và tận hưởng các đặc quyền dành riêng cho bạn!",

      UpgradeComplete: "Nâng cấp hoàn tất!",

      NowAProMember: "Bạn đã trở thành thành viên Pro!",
      UpgradeTo: "Nâng cấp lên",

      SubscriptionCancelledSuccess: "Hủy đăng ký thành công!",

      ConfirmSubCancel: "Bạn có chắc chắn muốn hủy đăng ký không?",

      SubDaysRemaining: "Số ngày còn lại của gói đăng ký:",

      RenewSub: "Gia hạn đăng ký",

      cancelSub: "Hủy đăng ký",

      renewSubConfirmation:
        "Nếu bạn chọn gia hạn ngay bây giờ, một chu kỳ thanh toán mới sẽ bắt đầu từ hôm nay và thời lượng còn lại của gói đăng ký hiện tại sẽ không còn hiệu lực. Bạn có chắc chắn muốn tiếp tục gia hạn không?",

      renew: "Gia hạn",

      BloodPressure: "Huyết áp",

      BloodGlucose: "Đường huyết",

      BMI: "Chỉ số BMI",

      PDFDonwload: "Tệp PDF đã được tải xuống!",

      PDFShared: "Tệp PDF đã được chia sẻ!",

      Error: "Đã xảy ra lỗi!",

      aboutTheApp: "Về ứng dụng",
      GetStarted: "Bắt đầu",
      systolic: "Huyết áp tâm thu",
      diastolic: "Huyết áp tâm trương",
      start: "Bắt đầu",
      enterRequiredFields: "Vui lòng nhập tất cả các trường bắt buộc!",
      enterThisFields: "Trường này là bắt buộc!",

      exit: "Thoát",
      exitApp: "Thoát ứng dụng",
      appExitConfirmation: "Bạn có muốn thoát khỏi ứng dụng không?",
      leavePage: "Thoát khỏi bài đánh giá?",
      leavePageConfirmation:
        "Khi bạn rời khỏi trang này, dữ liệu đã nhập sẽ bị mất",

      downloadOptions: "Tùy chọn tải xuống",
      a4Size: "Khổ giấy A4",
      usLetter: "Khổ giấy US Letter",
      pdfDownloaded: "Tệp PDF đã được tải xuống!",
      addedToGroup: "Đã thêm vào nhóm thành công!",
      success: "Thành công",
      exportedTo: "Đã xuất tới",


       "aboutTheAppDesc": "Ứng dụng này giúp xác định \"tuổi sức khỏe\" của cơ thể dựa trên lối sống của mỗi cá nhân. Ứng dụng này kết hợp thông tin từ cả nghiên cứu tuổi thọ Alameda County nổi tiếng và nghiên cứu mới của Adventist Health Studies. Ứng dụng này giúp người tham gia hiểu được mối tương quan chặt chẽ giữa thói quen sức khỏe và nguy cơ tử vong của họ. Nó cung cấp một nền tảng tuyệt vời để tư vấn sức khỏe.",
  "aboutTheAppTitle": "Về ứng dụng"
    },
  },
  mg: {
    translation: {
      welcome: "Tongasoa",
      chooseLanguage: "Fidio ny fiteny",
      introduction: "Fampidirana",
      howItWorks: "Ahoana no fiasany",
      benefits: "Tombontsoa",
      discoverHealthAge: "Fantaro ny taonan'ny fahasalamanao!",
      lifestyleAffectsHealth:
        "Misy fiantraikany lehibe amin'ny fahasalamanao ny fomba fiainanao. Andeha ho fantarintsika hoe tena tanora toy ny ahoana ianao!",
      simpleScienceBacked: "Tsotra & Miorina amin'ny Siansa",
      answerQuestions:
        "Valio ny fanontaniana vitsivitsy momba ny fahazaranao, ary hohisainay ny taonan'ny fahasalamanao mifototra amin'ny fomba fijery ara-pahasalamana tena izy.",
      getPersonalizedTips: "Mahazoa Torohevitra momba ny Fahasalamana manokana",
      improveLifestyle:
        "Hatsarao ny fomba fiainanao amin'ny alàlan'ny tolo-kevitra namboarina mba hahatratrarana ny fahafaha-manao fahasalamana tsara indrindra anao.",

      // HomeScreen.tsx
      helpCalculateHealthAge:
        "Afaka manampy anao hikajy ny taonan'ny fahasalamanao aho.",
      startAssessment: "Atombohy izao ny fanombanana anao",
      home: "Trano",
      purchases: "Fividianana",
      history: "Tantara",
      dailyLimit: "Fetra isan'andro",

      // healthAgeTest.tsx
      getStarted:
        "Andeha isika hanomboka. Ny taonan'ny fahasalamanao dia mifototra amin'ny fomba fiainanao sy ny fahazaranao.",
      whatIsYourName: "Iza no anaranao?",
      enterName: "Ampidiro ny anarana",
      next: "Manaraka",
      whatIsYourAge: "Firy taona ianao?",
      age: "Taona",
      whatIsYourGender: "Inona ny maha-lahy na maha-vavy anao?",
      gender: "Maha-lahy na maha-vavy",
      male: "Lehilahy",
      female: "Vehivavy",
      whatIsYourHeight: "Firy ny haavonao?",
      height: "Haavo",
      whatIsYourWeight: "Firy ny lanjanao?",
      weight: "Lanja",
      whatIsYourWaistCircumference: "Firy ny haben'ny valahanao?",
      waistCircumference: "Haben'ny valahana",
      whatIsYourBloodPressure: "Firy ny tosidrànao?",
      bloodPressure: "Tosidrà",
      whatIsYourBloodGlucose: "Firy ny tahan'ny siramamy ao amin'ny ranao?",
      fasting: "Mifady hanina",
      postMeals: "Aorian'ny sakafo",
      bloodGlucoseLevel: "Tahan'ny siramamy ao amin'ny ra",

      // QuestionScreen.tsx
      newAssessment: "Fanombanana vaovao",
      howOftenEatBreakfast: "Impiry ianao no misakafo maraina tsara?",
      breakfastNote:
        "(Manantitrantitra ny voamaina manontolo, voankazo na legioma, ary voanjo)",
      lessThan2Days: "Latsaky ny 2 andro isan-kerinandro",
      twoToFourDays: "2-4 andro isan-kerinandro",
      fiveToSixDays: "5-6 andro isan-kerinandro",
      everyday: "Isan'andro",
      howOftenSnack: "Impiry ianao no mihinana tsakitsaky?",
      severalTimesDay: "Impiry isan'andro",
      onceDay: "Indray mandeha isan'andro",
      fewTimesWeek: "Impiry isan-kerinandro",
      rarelyNever: "Tsy firy na tsy misy mihitsy",
      howManyFruitsVeggies:
        "Firafiry ny anjara voankazo sy legioma hohaninao isan'andro?",
      fruitsVeggiesNote:
        "(1 anjara = 1 sombin-tsakafo antonony, 1 C vaovao, 1/2 C masaka, na 6 oz ranom-boankazo 100%)",
      howManyWholeGrains:
        "Firafiry ny anjara voamaina manontolo hohaninao isan'andro?",
      wholeGrainsNote:
        "(1 anjara = 1 silaka mofo, 1/2 C vary volontany na oatmeal, 2/3 C serealy maina)",
      none: "Tsy misy",
      back: "Miverina",
      howManyNutsSeeds:
        "Firafiry ny anjara voanjo sy voa hohaninao isan-kerinandro?",
      nutsSeedsNote: "(1 anjara = 1 oz voanjo na voa, 2 T dibera voanjo)",
      howOftenRedMeat: "Impiry ianao no mihinana hena mena?",
      threeOrMoreTimesWeek: "3 na mihoatra isan-kerinandro",
      onceTwiceMonth: "Indray mandeha na indroa isam-bolana",
      never: "Tsy misy mihitsy",
      howOftenExercise:
        "Impiry ianao no manao fanatanjahan-tena 20-30 minitra antonony na mahery?",
      rarely: "Tsy firy",
      oneTwoDaysWeek: "1-2 andro isan-kerinandro",
      threeFourDaysWeek: "3-4 andro isan-kerinandro",
      fiveMoreDaysWeek: "5 na mihoatra andro isan-kerinandro",
      howIsWeight: "Ahoana ny lanjanao?",
      severelyOverweight: "Matavy be loatra",
      moderatelyOverweight: "Matavy antonony",
      underweight: "Tsy ampy lanja",
      healthyWeight: "Lanja ara-pahasalamana",
      howOftenSleep: "Impiry ianao no mahazo torimaso 7-8 ora?",
      twoOrFewerDays: "2 andro na latsaka isan-kerinandro",
      threeFourDays: "3-4 andro isan-kerinandro",
      fiveSixDays: "5-6 andro isan-kerinandro",
      whatIsTobaccoHistory: "Inona ny tantaranao amin'ny paraky?",
      currentlyUse: "Mampiasa amin'izao fotoana izao",
      quitLessThanTwoYears: "Nijanona latsaky ny 2 taona lasa izay",
      quitOverTwoYears: "Nijanona mihoatra ny 2 taona lasa izay",
      neverUsed: "Tsy nampiasa mihitsy",
      howManyAlcohol: "Firafiry ny anjara alikaola hohaninao isan-kerinandro?",
      alcoholNote:
        "(12 oz labiera, 8 oz toaka malt, 5 oz divay, 1.5 oz tifitra)",
      excessiveAlcohol: "15+ (lehilahy) na 8+ (vehivavy)",
      howRateSpirituality: "Ahoana no hanombananao ny ara-panahinao?",
      noInterest: "Tsy misy fahalianana",
      moderatelySpiritual: "Ara-panahy antonony",
      deeplySpiritual: "Ara-panahy lalina",

      // interestScreen

      Is_Interests: "Zavatra mahaliana",
      Is_TellYourInterest:
        "Lazao anay izay mahaliana anao mba hanamboarana ny traikefanao.",
      Is_WeightManagement: "Fitantanana ny lanja",
      Is_FitAndExercise: "Fahasalamana sy fanatanjahan-tena",
      Is_StopSmoking: "Atsaharo ny fifohana sigara",
      Is_HealthyCooking: "Fandrahoan-tsakafo ara-pahasalamana",
      Is_StressReduction: "Fampihenana ny adin-tsaina",
      Is_PreventHeartDisease: "Fisorohana ny aretim-po",
      Is_DepressionRecovery: "Fahasitranana amin'ny fahaketrahana",
      Is_ReversingDiabetes: "Famerenana ny diabeta",
      Is_NaturalRemedies: "Fanafody voajanahary",
      Is_SpiritualHealth: "Fahasalamana ara-panahy",
      Is_ImprovingMentalPerformance: "Fanatsarana ny fahombiazan'ny saina",
      Is_Other: "Hafa",
      Is_Name: "Anarana",
      Is_Email: "Mailaka",
      Is_Address: "Adiresy",
      Is_Phone: "Telefaonina",
      Is_Zip: "Kaody paositra",
      Is_ShowReport: "Asehoy ny tatitra",

      // reportScreen

      Rs_Report: "Tatitra",
      Rs_CustomizedReport: "Tatitra namboarina ho an'ny:",
      Rs_YourHealthAge: "Ny taonan'ny fahasalamanao dia",
      Rs_YourActualAge: "Ny tena taonanao dia",
      Rs_CurrentAge: "Taona ankehitriny",
      Rs_HealthAge: "Taonan'ny fahasalamana",
      Rs_PotentialAge: "Taona mety ho tratrarina",
      Rs_HealthyHabitsParagraph:
        "Fikarohana lehibe maromaro, ao anatin'izany ny Fikarohana Alameda County malaza sy ny Fikarohana Adventist Health, dia manambara fifandraisana matanjaka eo amin'ny fahazarana ara-pahasalamana voatanisa etsy ambany sy ny mety hisian'ny aretina/fahafatesana. Ny olona manao ireo fahazarana ara-pahasalamana rehetra ireo dia mety hisy fiantraikany amin'ny faharetan'ny fiainany amin'ny efa ho 30 taona.",
      Rs_MedicalDisclaimerTitle: "Fanazavana momba ny fahasalamana",
      Rs_MedicalDisclaimerText:
        "Ny Health Age dia natao ho an'ny tanjona fanazavana sy fanabeazana fotsiny. Tsy diagnôzy ara-pitsaboana izany ary tsy tokony hampiasaina ho solon'ny torohevitra, diagnôzy na fitsaboana ara-pitsaboana matihanina. Mila mihevitra matihanina momba ny fahasalamana foana alohan'ny handraisana fanapahan-kevitra ara-pitsaboana na fanovana ny fikarakarana ny fahasalamanao.",
      Rs_MedicalSources: "Loharanom-pitsaboana",
      Rs_Source: "Loharano",
      Rs_Recommendations: "Tolo-kevitra",
      Rs_1_title: "Mihinàna sakafo maraina tsara isan'andro",
      Rs_1_desc:
        "Manatsara ny metabolisma ny sakafo maraina, manampy amin'ny fifantohana, ary manatsara ny fahombiazana any an-tsekoly sy any am-piasana. Manampy amin'ny fitazonana lanja ara-pahasalamana koa izany.",
      Rs_2_title: "Aza mihinana tsakitsaky",
      Rs_2_desc:
        "Ny fihinanana tsakitsaky dia afaka manampy kaloria 580 isan'andro, manimba ny fandevonan-kanina, manelingelina ny fifehezana ny siramamy ao amin'ny ra, ary mandray anjara amin'ny fitomboan'ny lanja.",
      Rs_3_title: "Ankafizo ny voankazo sy legioma bebe kokoa",
      Rs_3_desc:
        "Ny voankazo sy legioma dia manankarena phytochemicals, vitamina ary fibre sady ambany kaloria.",
      Rs_4_title: "Ampitomboy ny fihinanana voamaina manontolo",
      Rs_4_desc:
        "Ny voamaina manontolo dia misy fibre, vitamina B, ary mineraly tena ilaina izay manohana ny fahasalamana amin'ny ankapobeny.",
      Rs_5_title: "Mihinàna voanjo bebe kokoa",
      Rs_5_desc:
        "Ny voanjo dia loharanon'ny proteinina sy tavy mahasalama tena tsara, ary manampy amin'ny fandrindrana ny tahan'ny siramamy ao amin'ny ra izy ireo.",
      Rs_6_title: "Aza mihinana hena mena",
      Rs_6_desc:
        "Ny fihinanana hena mena dia mifandray amin'ny diabeta karazany 2, aretim-po, lalan-dra, ary kansera sasany.",
      Rs_7_title: "Manaova fanatanjahan-tena tsy tapaka",
      Rs_7_desc:
        "Ny fanatanjahan-tena dia manatsara ny hery, manatsara ny toe-po sy ny tahan'ny kolesterola, mampihena ny tosidrà, manatsara ny torimaso, manamafy ny hery fiarovana, ary manampy amin'ny fifehezana ny siramamy ao amin'ny ra.",
      Rs_8_title: "Mahatratra lanja ara-pahasalamana",
      Rs_8_desc:
        "Tazony ny BMI eo anelanelan'ny 18.5 - 24.9 sy ny haben'ny valahana ara-pahasalamana (latsaky ny 40 in ho an'ny lehilahy, 35 in ho an'ny vehivavy).",
      Rs_9_title: "Mahazoa torimaso tsara 7-8 ora isan-kariva",
      Rs_9_desc:
        "Ny torimaso ampy dia manohana ny fitadidiana, ny fianarana, ny metabolisma ary ny hery fiarovana.",
      Rs_10_title: "Atsaharo ny fifohana sigara",
      Rs_10_desc:
        "Manimba ny taova rehetra ao amin'ny vatana ny fifohana sigara, mampitombo ny mety hisian'ny kansera, aretim-po, COPD, asma, ary olana amin'ny nify.",
      Rs_11_title: "Aza misotro toaka",
      Rs_11_desc:
        "Ny fihinanana alikaola dia mety hiteraka olana ara-tsaina, kardiovaskular ary ara-tsaina, ary koa mampitombo ny mety hisian'ny kansera sy ny aretin'ny aty.",
      Rs_12_title: "Ampitomboy ny ara-panahy",
      Rs_12_desc:
        "Ny finoana an'Andriamanitra dia mety hanatsara ny fahasalaman'ny saina ary hanamafy ny hery fiarovana.",
      Rs_SavePdf: "Tehirizo ho pdf",
      Rs_ShareReport: "Zarao ny tatitra",

      // history screen

      Hs_List: "Lisitra",
      Hs_Group: "Vondrona",
      Hs_View: "Jereo",
      Hs_Filter: "Sivana",
      Hs_Options: "Safidy",
      Hs_Export: "Alefaso",
      Hs_Delete: "Fafao",
      Hs_Search: "Karohy",
      Hs_ExportAsCSV: "Alefaso ho CSV",
      Hs_Confirmation: "Azonao antoka ve fa te hamafa?",
      Hs_Success: "Voafafa ny entana",
      Hs_Cancel: "Hanafoana",
      Hs_ItemsSelected: "Entana voafantina",
      Hs_SelectAll: "Fidio daholo",
      Hs_NewGroup: "Vondrona vaovao",
      Hs_ExistingGroup: "Vondrona efa misy",
      Hs_Create: "Hanao",
      Hs_GroupName: "Anaran'ny vondrona",
      Hs_EnterGroupName: "Ampidiro ny anaran'ny vondrona",
      Hs_Reports: "Tatitra",
      Hs_save: "Tehirizo",
      Hs_Nothing: "Tsy misy na inona na inona eto aloha!",
      Hs_NothingDesc:
        "Hiseho eto ny tatitra momba ny taonan'ny fahasalamanao rehefa vita ny fanombanana.",
      Hs_Download: "Ampidino",

      Hs_LanguageChanged: "Niova soa aman-tsara ny fiteny",
      Hs_Change: "Hanova",

      // Filter Screen
      Fs_Filter: "Sivana araka ny",
      Fs_Close: "Akatona",
      Fs_Date: "Daty",
      Fs_From: "Avy amin'ny",
      Fs_To: "Hatramin'ny",
      Fs_ClearAll: "Fafao daholo",
      Fs_ShowResults: "Asehoy ny vokatra",

      // others

      select: "Fidio",
      total: "Totaly",
      purchase: "Fividianana",
      aboutProgramme: "Momba ny fandaharana",
      reports: "Tatitra",
      PrintQuestion: "Pirinty ny fanontaniana",
      PrintReport: "Pirinty ny tatitra banga",
      reportSetting: "Fikirana tatitra",
      changeLanguage: "Hanova fiteny",
      uploadLogo: "Ampidiro ny logo-nao",
      upload: "Ampidiro",
      contactDetails: "Antsipiriany momba ny fifandraisana",
      enterAddress: "Ampidiro ny adiresy",
      enterPhone: "Ampidiro ny laharan'ny telefaonina",
      createGroup: "Hanao vondrona",

      // blood pressure and glucose

      normalBp: "Ara-dalàna ny tosidrànao",
      MaintainBp: "Azafady, tazomy ny tosidrànao",
      bpRange: "90-119/60-79 mmHg ny tahan'ny ara-dalàna.",
      normalGlucoseLevel: "Ara-dalàna ny tahan'ny siramamy ao amin'ny ranao",
      maintainGlucoseLevel:
        "Azafady, tazomy ny tahan'ny siramamy ao amin'ny ranao",
      normalRangeGlucose: "Ny tahan'ny ara-dalàna dia",
      for: "ho an'ny",
      postMeal: "aorian'ny sakafo",
      test: "fitsapana",
      maintainBloodGlucose:
        "Tazony ho voafehy ny haavon'ny siramamy ao amin'ny rànao",
      maintainLowBloodGlucoseDesc:
        "Ambany ny haavon'ny siramamy ao amin'ny rànao. Ny fitazonana izany ho milamina dia misoroka olana ara-pahasalamana, manome hery, ary manohana ny fahasalamana amin'ny ankapobeny. Ny sakafo voalanjalanja sy ny fanatanjahantena no manampy amin'ny fitazonana izany!",
      maintainHighBloodGlucoseDesc:
        "Avo ny haavon'ny siramamy ao amin'ny rànao. Ny fitazonana izany ho milamina dia misoroka olana ara-pahasalamana, manome hery, ary manohana ny fahasalamana amin'ny ankapobeny. Ny sakafo voalanjalanja sy ny fanatanjahantena no manampy amin'ny fitazonana izany!",

      maintainBloodPressure: "Tazony ho voafehy ny tsindrim-pahazoan-drà",
      maintainBloodPressureDesc:
        "Ny fitazonana ny tsindrim-pahazoan-drà ho salama dia mampihena ny loza mitatao amin’ny aretim-po, ny fikorontanan’ny atidoha, ary ny olana amin’ny voa. Ny fanatanjahantena sy ny sakafo voalanjalanja dia afaka mitondra fiovana lehibe!",
      maintainLowBloodPressureDesc:
        "Ambany ny haavon'ny tsindrim-pahazoan-drànao. Ny fitazonana izany ho salama dia mampihena ny loza mitatao amin’ny aretim-po, ny fikorontanan’ny atidoha, ary ny olana amin’ny voa. Ny fanatanjahantena sy ny sakafo voalanjalanja dia afaka mitondra fiovana lehibe!",
      maintainHighBloodPressureDesc:
        "Avo ny haavon'ny tsindrim-pahazoan-drànao. Ny fitazonana izany ho salama dia mampihena ny loza mitatao amin’ny aretim-po, ny fikorontanan’ny atidoha, ary ny olana amin’ny voa. Ny fanatanjahantena sy ny sakafo voalanjalanja dia afaka mitondra fiovana lehibe!",

      // messages

      downloadSuccess: "Voarindra soa aman-tsara",
      goBackConfirmation: "Azonao antoka ve fa te hiverina ianao?",
      pleaseWait: "Andraso azafady!",

      // purchase Screen

      goBeyond: "Mihoatra lavitra noho ny fototra!",

      JoinPro:
        "Midira ho Mpikambana Pro ary ento amin'ny dingana manaraka ny dianao ara-pahasalamana",

      WhyJoinPro: "Nahoana no hiditra ho Pro?",

      UnlimitedReports: "Tatitra tsy voafetra",

      FullReportHistory: "Tantara feno momba ny tatitra",

      PrintYourQuestionnaire: "Pirinty ny fanontaniana miaraka amin'ny marikao",

      printYourReport: "Pirinty tatitra banga miaraka amin'ny marikao",

      upgrade: "Havaozy",

      yearlyPurchase: "Fividianana isan-taona",

      thisOneForPro: "Oups! Ity ho an'ny Mpikambana PRO ihany.",

      proMembersDesc:
        "Ity endri-javatra ity dia natokana ho an'ny Mpikambana Pro. Te hiditra? Havaozy dieny izao ary ankafizo ireo tombontsoa manokana natao ho anao!",

      UpgradeComplete: "Fanaraha-maso vita!",

      NowAProMember: "Mpikambana Pro ianao izao!",
      UpgradeTo: "Havaozy Ho",
      SubscriptionCancelledSuccess:
        "Nahomby ny fanafoanana ny fisoratana anarana!",
      ConfirmSubCancel:
        "Azonao antoka ve fa te-hanafoana ny fisoratana anarana?",
      SubDaysRemaining: "Isan'andro tavela amin'ny fisoratana anarana:",
      RenewSub: "Havaozy ny fisoratana anarana",
      cancelSub: "Foano ny fisoratana anarana",
      renewSubConfirmation:
        "Raha misafidy ny hanavao ianao izao, dia hanomboka amin'ny anio ny tsingerim-bola vaovao, ary tsy ho manan-kery intsony ny fotoana sisa tavela amin'ny fisoratana anarana ankehitriny. Azonao antoka ve fa te-hanohy amin’ny fanavaozana?",
      renew: "Havaozy",
      BloodPressure: "Tsindrim-pandehanan-drà",
      BloodGlucose: "Siramamy amin'ny rà",
      BMI: "BMI",
      PDFDonwload: "Efa nalaina ny PDF!",
      PDFShared: "Efa nizara ny PDF!",
      Error: "Nisy zavatra tsy nety!",
      aboutTheApp: "Momba ny fampiharana",
      GetStarted: "Atombohy",
      systolic: "Sistolika",
      diastolic: "Diastolika",
      start: "Manomboka",
      enterRequiredFields: "Azafady fenoy daholo ny saha rehetra ilaina!",
      enterThisFields: "Ilaina ity saha ity!",

      exit: "Mivoaka",
      exitApp: "Mivoaka ny App",
      appExitConfirmation: "Te hivoaka ny app ve ianao?",
      leavePage: "Miala amin'ny fanombanana ve?",
      leavePageConfirmation:
        "Raha miala amin'ity pejy ity ianao dia ho very ny angon-drakitra nampidirinao",

      downloadOptions: "Safidy fampidinana",
      a4Size: "Habe A4",
      usLetter: "Taratasim-panjakana US",
      pdfDownloaded: "Voasintona ny PDF!",
      addedToGroup: "Nampiana tao amin'ny vondrona soa aman-tsara!",
      success: "Fahombiazana",
      exportedTo: "Nondrana ho any",

       aboutTheAppDesc:
        "Ity fampiharana ity dia manampy hamantatra ny “taonan’ny fahasalaman’ny” vatan’ny olona iray araka ny fomba fiainany. Ity fampiharana ity dia mampivondrona ny fampahalalana avy amin'ireo fandalinana lava velona fanta-daza natao tany Alameda County sy ireo Fandalinana Vaovao momba ny Fahasalaman'ny Advantista. Ity fampiharana ity dia manampy ny mpandray anjara hahatakatra ny fifandraisana matanjaka eo amin'ny fahazarana ara-pahasalamana sy ny mety hahafaty azy. Manome fototra tsara ho an'ny torohevitra momba ny fahasalamana izy io.",
      aboutTheAppTitle: "Momba ny Fampiharana",
    },
  },
  da: {
    translation: {
      welcome: "Velkommen",
      chooseLanguage: "Vælg sprog",
      introduction: "Introduktion",
      howItWorks: "Sådan fungerer det",
      benefits: "Fordele",
      discoverHealthAge: "Opdag din sundhedsalder!",
      lifestyleAffectsHealth:
        "Din livsstil påvirker din sundhed mere, end du tror. Lad os finde ud af, hvor ung du virkelig er!",
      simpleScienceBacked: "Simpel og videnskabeligt underbygget",
      answerQuestions:
        "Besvar et par spørgsmål om dine vaner, og vi beregner din sundhedsalder baseret på reelle sundhedsindsigter.",
      getPersonalizedTips: "Få personlige sundhedstips",
      improveLifestyle:
        "Forbedre din livsstil med skræddersyede anbefalinger for at nå dit bedste sundhedspotentiale.",
      helpCalculateHealthAge:
        "Jeg kan hjælpe dig med at beregne din sundhedsalder.",
      startAssessment: "Start din vurdering nu",
      home: "Hjem",
      purchases: "Køb",
      history: "Historik",
      dailyLimit: "Dagligt limit",
      getStarted:
        "Lad os komme i gang. Din sundhedsalder er baseret på din livsstil og vaner.",
      whatIsYourName: "Hvad er dit navn?",
      enterName: "Indtast navn",
      next: "Næste",
      whatIsYourAge: "Hvad er din alder?",
      age: "Alder",
      whatIsYourGender: "Hvad er dit køn?",
      gender: "Køn",
      male: "Mand",
      female: "Kvinde",
      whatIsYourHeight: "Hvad er din højde?",
      height: "Højde",
      whatIsYourWeight: "Hvad er din vægt?",
      weight: "Vægt",
      whatIsYourWaistCircumference: "Hvad er dit taljeomfang?",
      waistCircumference: "Taljeomfang",
      whatIsYourBloodPressure: "Hvad er dit blodtryk?",
      bloodPressure: "Blodtryk",
      whatIsYourBloodGlucose: "Hvad er dit blodsukkerniveau?",
      fasting: "Fastende",
      postMeals: "Efter måltider",
      bloodGlucoseLevel: "Blodsukkerniveau",
      newAssessment: "Ny vurdering",
      howOftenEatBreakfast: "Hvor ofte spiser du en god morgenmad?",
      breakfastNote: "(Med vægt på fuldkorn, frugt eller grøntsager og nødder)",
      lessThan2Days: "Mindre end 2 dage om ugen",
      twoToFourDays: "2-4 dage om ugen",
      fiveToSixDays: "5-6 dage om ugen",
      everyday: "Hver dag",
      howOftenSnack: "Hvor ofte spiser du snacks?",
      severalTimesDay: "Flere gange om dagen",
      onceDay: "En gang om dagen",
      fewTimesWeek: "Et par gange om ugen",
      rarelyNever: "Sjældent eller aldrig",
      howManyFruitsVeggies:
        "Hvor mange portioner frugt og grøntsager spiser du om dagen?",
      fruitsVeggiesNote:
        "(1 portion = 1 mellem stykke, 1 kop frisk, 1/2 kop tilberedt eller 6 oz 100% juice)",
      howManyWholeGrains: "Hvor mange portioner fuldkorn spiser du om dagen?",
      wholeGrainsNote:
        "(1 portion = 1 skive brød, 1/2 kop brune ris eller havregryn, 2/3 kop tør cereal)",
      none: "Ingen",
      back: "Tilbage",
      howManyNutsSeeds: "Hvor mange portioner nødder og frø spiser du om ugen?",
      nutsSeedsNote: "(1 portion = 1 oz nødder eller frø, 2 spsk nøddesmør)",
      howOftenRedMeat: "Hvor ofte spiser du rødt kød?",
      threeOrMoreTimesWeek: "3 eller flere gange om ugen",
      onceTwiceMonth: "En eller to gange om måneden",
      never: "Aldrig",
      howOftenExercise:
        "Hvor ofte får du 20-30 minutters moderat til kraftig motion?",
      rarely: "Sjældent",
      oneTwoDaysWeek: "1-2 dage om ugen",
      threeFourDaysWeek: "3-4 dage om ugen",
      fiveMoreDaysWeek: "5 eller flere dage om ugen",
      howIsWeight: "Hvordan er din vægt?",
      severelyOverweight: "Svært overvægtig",
      moderatelyOverweight: "Moderat overvægtig",
      underweight: "Undervægtig",
      healthyWeight: "Sund vægt",
      howOftenSleep: "Hvor ofte får du 7-8 timers søvn?",
      twoOrFewerDays: "2 eller færre dage om ugen",
      threeFourDays: "3-4 dage om ugen",
      fiveSixDays: "5-6 dage om ugen",
      whatIsTobaccoHistory: "Hvad er din historie med tobak?",
      currentlyUse: "Bruger i øjeblikket",
      quitLessThanTwoYears: "Stoppet for mindre end 2 år siden",
      quitOverTwoYears: "Stoppet for over 2 år siden",
      neverUsed: "Har aldrig brugt",
      howManyAlcohol: "Hvor mange portioner alkohol indtager du om ugen?",
      alcoholNote: "(12 oz øl, 8 oz maltlikør, 5 oz vin, 1,5 oz shot)",
      excessiveAlcohol: "15+ (mænd) eller 8+ (kvinder)",
      howRateSpirituality: "Hvordan vil du vurdere din spiritualitet?",
      noInterest: "Ingen interesse",
      moderatelySpiritual: "Moderat spirituel",
      deeplySpiritual: "Dybt spirituel",
      Is_Interests: "Interesser",
      Is_TellYourInterest:
        "Fortæl os, hvad du er interesseret i, for at tilpasse din oplevelse.",
      Is_WeightManagement: "Vægtstyring",
      Is_FitAndExercise: "Fitness og motion",
      Is_StopSmoking: "Rygestop",
      Is_HealthyCooking: "Sund madlavning",
      Is_StressReduction: "Stressreduktion",
      Is_PreventHeartDisease: "Forebyggelse af hjertesygdomme",
      Is_DepressionRecovery: "Depressionsrestitution",
      Is_ReversingDiabetes: "Omvending af diabetes",
      Is_NaturalRemedies: "Naturlige midler",
      Is_SpiritualHealth: "Åndelig sundhed",
      Is_ImprovingMentalPerformance: "Forbedring af mental ydeevne",
      Is_Other: "Andet",
      Is_Name: "Navn",
      Is_Email: "E-mail",
      Is_Address: "Adresse",
      Is_Phone: "Telefon",
      Is_Zip: "Postnummer",
      Is_ShowReport: "Vis rapport",
      Rs_Report: "Rapport",
      Rs_CustomizedReport: "Tilpasset rapport for:",
      Rs_YourHealthAge: "Din sundhedsalder er",
      Rs_YourActualAge: "Din faktiske alder på",
      Rs_CurrentAge: "Nuværende alder",
      Rs_HealthAge: "Sundhedsalder",
      Rs_PotentialAge: "Potentiel alder",
      Rs_HealthyHabitsParagraph:
        "Flere store forskningsstudier, herunder det velkendte Alameda County Study og Adventist Health Studies, afslører en stærk sammenhæng mellem de sundhedsvaner, der er anført nedenfor, og ens risiko for sygdom/død. Personer, der praktiserer alle disse sunde vaner, kan påvirke deres levetid med næsten 30 år.",
      Rs_MedicalDisclaimerTitle: "Medicinsk ansvarsfraskrivelse",
      Rs_MedicalDisclaimerText:
        "Health Age er kun beregnet til informations- og uddannelsesformål. Det er ikke en medicinsk diagnose og skal ikke bruges som erstatning for professionel medicinsk rådgivning, diagnose eller behandling. Kontakt altid en kvalificeret sundhedsfaglig person, før du træffer medicinske beslutninger eller ændrer din sundhedspleje.",
      Rs_MedicalSources: "Medicinske kilder",
      Rs_Source: "Kilde",
      Rs_Recommendations: "Anbefalinger",
      Rs_1_title: "Spis en god morgenmad dagligt",
      Rs_1_desc:
        "Morgenmad øger stofskiftet, hjælper med koncentrationen og forbedrer ydeevnen i skole og arbejde. Det hjælper også med at opretholde en sund vægt.",
      Rs_2_title: "Undgå snacks",
      Rs_2_desc:
        "Snacks kan tilføje et gennemsnit på 580 kalorier om dagen, forringe fordøjelsen, forstyrre blodsukkerkontrollen og bidrage til vægtøgning.",
      Rs_3_title: "Nyd flere frugter og grøntsager",
      Rs_3_desc:
        "Frugt og grønt er rige på fytokemikalier, vitaminer og fibre, mens de er lavere i kalorier.",
      Rs_4_title: "Øg indtaget af fuldkorn",
      Rs_4_desc:
        "Fuldkorn indeholder fibre, B-vitaminer og essentielle mineraler, der understøtter den generelle sundhed.",
      Rs_5_title: "Spis flere nødder",
      Rs_5_desc:
        "Nødder er en fremragende kilde til protein og sunde fedtstoffer, og de hjælper med at regulere blodsukkerniveauet.",
      Rs_6_title: "Undgå rødt kød",
      Rs_6_desc:
        "At spise rødt kød er blevet forbundet med type 2-diabetes, hjertesygdomme, slagtilfælde og visse kræftformer.",
      Rs_7_title: "Motioner regelmæssigt",
      Rs_7_desc:
        "Motion øger energi, forbedrer humør og kolesteroltal, sænker blodtrykket, forbedrer søvn, styrker immunitet og hjælper med at kontrollere blodsukkeret.",
      Rs_8_title: "Opnå en sund vægt",
      Rs_8_desc:
        "Oprethold et BMI mellem 18,5 - 24,9 og et sundt taljeomfang (mindre end 40 tommer for mænd, 35 tommer for kvinder).",
      Rs_9_title: "Få 7-8 timers god søvn hver nat",
      Rs_9_desc:
        "Tilstrækkelig søvn understøtter hukommelse, læring, stofskifte og immunfunktion.",
      Rs_10_title: "Stop med at ryge",
      Rs_10_desc:
        "Rygning skader alle organer i kroppen og øger risikoen for kræft, hjertesygdomme, KOL, astma og tandproblemer.",
      Rs_11_title: "Drik ikke alkohol",
      Rs_11_desc:
        "Alkoholbrug kan forårsage neurologiske, kardiovaskulære og psykiatriske problemer samt øge risikoen for kræft og leversygdom.",
      Rs_12_title: "Øg spiritualiteten",
      Rs_12_desc:
        "Tro på Gud kan forbedre mental sundhed og styrke immunfunktionen.",
      Rs_SavePdf: "Gem som pdf",
      Rs_ShareReport: "Del rapport",
      Hs_List: "Liste",
      Hs_Group: "Gruppe",
      Hs_View: "Vis",
      Hs_Filter: "Filter",
      Hs_Options: "Indstillinger",
      Hs_Export: "Eksporter",
      Hs_Delete: "Slet",
      Hs_Search: "Søg",
      Hs_ExportAsCSV: "Eksporter som CSV",
      Hs_Confirmation: "Er du sikker på, at du vil slette?",
      Hs_Success: "Element slettet",
      Hs_Cancel: "Annuller",
      Hs_ItemsSelected: "Valgte elementer",
      Hs_SelectAll: "Vælg alle",
      Hs_NewGroup: "Ny gruppe",
      Hs_ExistingGroup: "Eksisterende gruppe",
      Hs_Create: "Opret",
      Hs_GroupName: "Gruppenavn",
      Hs_EnterGroupName: "Indtast gruppenavn",
      Hs_Reports: "Rapporter",
      Hs_save: "Gem",
      Hs_Nothing: "Intet her endnu!",
      Hs_NothingDesc:
        "Dine sundhedsalderrapporter vises her, når du har gennemført vurderingen.",
      Hs_Download: "Download",
      Hs_LanguageChanged: "Sprog ændret succesfuldt",
      Hs_Change: "Ændre",
      Fs_Filter: "Filtrer efter",
      Fs_Close: "Luk",
      Fs_Date: "Dato",
      Fs_From: "Fra",
      Fs_To: "Til",
      Fs_ClearAll: "Ryd alle",
      Fs_ShowResults: "Vis resultater",
      select: "Vælg",
      total: "Total",
      purchase: "Køb",
      aboutProgramme: "Om programmet",
      reports: "Rapporter",
      PrintQuestion: "Udskriv spørgeskema",
      PrintReport: "Udskriv tom rapport",
      reportSetting: "Rapportindstillinger",
      changeLanguage: "Skift sprog",
      uploadLogo: "Upload dit logo",
      upload: "Upload",
      contactDetails: "Kontaktoplysninger",
      enterAddress: "Indtast adresse",
      enterPhone: "Indtast telefonnummer",
      createGroup: "Opret gruppe",
      normalBp: "Dit blodtryk er normalt",
      MaintainBp: "Venligst oprethold dit blodtryk",
      bpRange: "Normalområdet er 90-119/60-79 mmHg.",
      normalGlucoseLevel: "Dit blodsukkerniveau er normalt",
      maintainGlucoseLevel: "Venligst oprethold dit blodsukkerniveau",
      normalRangeGlucose: "Normalområdet er",
      for: "for",
      postMeal: "efter måltid",
      test: "test",
      maintainBloodGlucose: "Oprethold dit blodsukkerniveau",
      maintainLowBloodGlucoseDesc:
        "Dit blodsukkerniveau er lavt. Stabilt blodsukker forebygger komplikationer, øger energien og støtter det generelle helbred. Afbalanceret kost og motion hjælper med at holde det i skak!",
      maintainHighBloodGlucoseDesc:
        "Dit blodsukkerniveau er højt. Stabilt blodsukker forebygger komplikationer, øger energien og støtter det generelle helbred. Afbalanceret kost og motion hjælper med at holde det i skak!",
      maintainBloodPressure: "Hold blodtrykket under kontrol",
      maintainBloodPressureDesc:
        "At opretholde et sundt blodtryk reducerer risikoen for hjertesygdomme, slagtilfælde og nyreproblemer. Regelmæssig motion og en afbalanceret kost gør en stor forskel!",
      maintainLowBloodPressureDesc:
        "Dit blodtryk er lavt. At opretholde et sundt blodtryk reducerer risikoen for hjertesygdomme, slagtilfælde og nyreproblemer. Regelmæssig motion og en afbalanceret kost gør en stor forskel!",
      maintainHighBloodPressureDesc:
        "Dit blodtryk er højt. At opretholde et sundt blodtryk reducerer risikoen for hjertesygdomme, slagtilfælde og nyreproblemer. Regelmæssig motion og en afbalanceret kost gør en stor forskel!",
      downloadSuccess: "Downloadet succesfuldt",
      goBackConfirmation: "Er du sikker på, at du vil gå tilbage?",
      pleaseWait: "Vent venligst!",
      goBeyond: "Gå ud over det grundlæggende!",

      JoinPro: "Bliv Pro-medlem og tag din sundhedsrejse til næste niveau",

      WhyJoinPro: "Hvorfor blive Pro?",

      UnlimitedReports: "Ubegrænsede rapporter",

      FullReportHistory: "Fuld rapporthistorik",

      PrintYourQuestionnaire: "Udskriv spørgeskema med dit logo",

      printYourReport: "Udskriv tomme rapporter med dit logo",

      upgrade: "Opgrader",

      yearlyPurchase: "Årligt køb",

      thisOneForPro: "Ups! Denne er kun for PRO-medlemmer.",

      proMembersDesc:
        "Denne funktion er forbeholdt vores Pro-medlemmer. Vil du være med? Opgrader nu og nyd eksklusive fordele skræddersyet til dig!",

      UpgradeComplete: "Opgradering gennemført!",

      NowAProMember: "Du er nu Pro-medlem!",
      UpgradeTo: "Opgrader til",
      SubscriptionCancelledSuccess: "Abonnement annulleret med succes!",
      ConfirmSubCancel: "Er du sikker på, at du vil annullere abonnementet?",
      SubDaysRemaining: "Tilbageværende dage af abonnementet:",
      RenewSub: "Forny abonnement",
      cancelSub: "Annuller abonnement",
      renewSubConfirmation:
        "Hvis du vælger at forny nu, starter en ny faktureringscyklus fra i dag, og den resterende varighed af dit nuværende abonnement vil ikke længere være gyldig. Er du sikker på, at du vil fortsætte med fornyelsen?",
      renew: "Forny",
      BloodPressure: "Blodtryk",
      BloodGlucose: "Blodsukker",
      BMI: "BMI",
      PDFDonwload: "PDF er blevet downloadet!",
      PDFShared: "PDF er blevet delt!",
      Error: "Noget gik galt!",
      aboutTheApp: "Om appen",
      GetStarted: "Kom i gang",
      systolic: "Systolisk",
      diastolic: "Diastolisk",
      start: "Start",
      enterRequiredFields: "Indtast venligst alle påkrævede felter!",
      enterThisFields: "Dette felt er påkrævet!",

      exit: "Afslut",
      exitApp: "Afslut app",
      appExitConfirmation: "Vil du afslutte appen?",
      leavePage: "Forlad vurderingen?",
      leavePageConfirmation:
        "Når du forlader denne side, vil dine indtastede data gå tabt",

      downloadOptions: "Downloadmuligheder",
      a4Size: "A4 størrelse",
      usLetter: "US letter",
      pdfDownloaded: "PDF downloadet!",
      addedToGroup: "Tilføjet til gruppen succesfuldt!",
      success: "Succes",
      exportedTo: "Eksporteret til",

      aboutTheAppDesc:
        "Denne app hjælper med at bestemme 'sundhedsalderen' for ens krop i henhold til en persons livsstilsvaner. Denne app kombinerer information fra både de velkendte Alameda County longevity-studier og de nye Adventist Health Studies. Denne app hjælper deltagere med at forstå den stærke sammenhæng mellem ens sundhedsvaner og deres risiko for at dø. Den giver et fremragende grundlag for sundhedsvejledning.",
    aboutTheAppTitle: "Om appen",
    },
  },
  ta: {
    translation: {
      welcome: "வரவேற்பு",
      chooseLanguage: "மொழியைத் தேர்ந்தெடுக்கவும்",
      introduction: "அறிமுகம்",
      howItWorks: "இது எப்படி வேலை செய்கிறது",
      benefits: "நன்மைகள்",
      discoverHealthAge: "உங்கள் ஆரோக்கிய வயதைக் கண்டறியுங்கள்!",
      lifestyleAffectsHealth:
        "உங்கள் வாழ்க்கை முறை உங்கள் ஆரோக்கியத்தை நீங்கள் நினைப்பதை விட அதிகமாக பாதிக்கிறது. நீங்கள் உண்மையில் எவ்வளவு இளமையாக இருக்கிறீர்கள் என்று கண்டுபிடிப்போம்!",
      simpleScienceBacked: "எளிமையான மற்றும் அறிவியல் அடிப்படையிலானது",
      answerQuestions:
        "உங்கள் பழக்கவழக்கங்களைப் பற்றிய சில கேள்விகளுக்கு பதிலளிக்கவும், உண்மையான சுகாதார நுண்ணறிவுகளின் அடிப்படையில் உங்கள் ஆரோக்கிய வயதை நாங்கள் கணக்கிடுவோம்.",
      getPersonalizedTips:
        "தனிப்பயனாக்கப்பட்ட சுகாதார உதவிக்குறிப்புகளைப் பெறுங்கள்",
      improveLifestyle:
        "உங்கள் சிறந்த ஆரோக்கிய திறனை அடைய தனிப்பயனாக்கப்பட்ட பரிந்துரைகளுடன் உங்கள் வாழ்க்கை முறையை மேம்படுத்துங்கள்.",

      // HomeScreen.tsx
      helpCalculateHealthAge:
        "உங்கள் ஆரோக்கிய வயதைக் கணக்கிட நான் உதவ முடியும்.",
      startAssessment: "உங்கள் மதிப்பீட்டை இப்போது தொடங்கவும்",
      home: "வீடு",
      purchases: "கொள்வனவுகள்",
      history: "வரலாறு",
      dailyLimit: "தினசரி வரம்பு",

      // healthAgeTest.tsx
      getStarted:
        "தொடங்குவோம். உங்கள் ஆரோக்கிய வயது உங்கள் வாழ்க்கை முறை மற்றும் பழக்கவழக்கங்களை அடிப்படையாகக் கொண்டது.",
      whatIsYourName: "உங்கள் பெயர் என்ன?",
      enterName: "பெயரை உள்ளிடவும்",
      next: "அடுத்து",
      whatIsYourAge: "உங்கள் வயது என்ன?",
      age: "வயது",
      whatIsYourGender: "உங்கள் பாலினம் என்ன?",
      gender: "பாலினம்",
      male: "ஆண்",
      female: "பெண்",
      whatIsYourHeight: "உங்கள் உயரம் என்ன?",
      height: "உயரம்",
      whatIsYourWeight: "உங்கள் எடை என்ன?",
      weight: "எடை",
      whatIsYourWaistCircumference: "உங்கள் இடுப்பு சுற்றளவு என்ன?",
      waistCircumference: "இடுப்பு சுற்றளவு",
      whatIsYourBloodPressure: "உங்கள் இரத்த அழுத்தம் என்ன?",
      bloodPressure: "இரத்த அழுத்தம்",
      whatIsYourBloodGlucose: "உங்கள் இரத்த குளுக்கோஸ் அளவு என்ன?",
      fasting: "உணவு இடைவேளை",
      postMeals: "உணவுக்குப் பிறகு",
      bloodGlucoseLevel: "இரத்த குளுக்கோஸ் அளவு",

      // QuestionScreen.tsx
      newAssessment: "புதிய மதிப்பீடு",
      howOftenEatBreakfast:
        "நீங்கள் எவ்வளவு அடிக்கடி நல்ல காலை உணவு சாப்பிடுகிறீர்கள்?",
      breakfastNote:
        "(முழு தானியங்கள், பழங்கள் அல்லது காய்கறிகள் மற்றும் கொட்டைகள் ஆகியவற்றை வலியுறுத்துகிறது)",
      lessThan2Days: "வாரத்திற்கு 2 நாட்களுக்கு குறைவாக",
      twoToFourDays: "வாரத்திற்கு 2-4 நாட்கள்",
      fiveToSixDays: "வாரத்திற்கு 5-6 நாட்கள்",
      everyday: "தினமும்",
      howOftenSnack: "நீங்கள் எவ்வளவு அடிக்கடி சிற்றுண்டி சாப்பிடுகிறீர்கள்?",
      severalTimesDay: "ஒரு நாளைக்கு பல முறை",
      onceDay: "ஒரு நாளைக்கு ஒரு முறை",
      fewTimesWeek: "வாரத்திற்கு சில முறை",
      rarelyNever: "அரிதாக அல்லது ஒருபோதும் இல்லை",
      howManyFruitsVeggies:
        "ஒரு நாளைக்கு எத்தனை பழங்கள் மற்றும் காய்கறிகளை சாப்பிடுகிறீர்கள்?",
      fruitsVeggiesNote:
        "(1 பரிமாற்றம் = 1 நடுத்தர துண்டு, 1 கப் புதியது, 1/2 கப் சமைத்தது அல்லது 6 அவுன்ஸ் 100% சாறு)",
      howManyWholeGrains:
        "ஒரு நாளைக்கு எத்தனை முழு தானியங்களை சாப்பிடுகிறீர்கள்?",
      wholeGrainsNote:
        "(1 பரிமாற்றம் = 1 துண்டு ரொட்டி, 1/2 கப் பழுப்பு அரிசி அல்லது ஓட்ஸ், 2/3 கப் உலர் தானியங்கள்)",
      none: "இல்லை",
      back: "பின்னால்",
      howManyNutsSeeds:
        "வாரத்திற்கு எத்தனை கொட்டைகள் மற்றும் விதைகளை சாப்பிடுகிறீர்கள்?",
      nutsSeedsNote:
        "(1 பரிமாற்றம் = 1 அவுன்ஸ் கொட்டைகள் அல்லது விதைகள், 2 டீஸ்பூன் நட் வெண்ணெய்)",
      howOftenRedMeat:
        "நீங்கள் எவ்வளவு அடிக்கடி சிவப்பு இறைச்சி சாப்பிடுகிறீர்கள்?",
      threeOrMoreTimesWeek: "வாரத்திற்கு 3 அல்லது அதற்கு மேற்பட்ட முறை",
      onceTwiceMonth: "மாதத்திற்கு ஒன்று அல்லது இரண்டு முறை",
      never: "ஒருபோதும் இல்லை",
      howOftenExercise:
        "நீங்கள் எவ்வளவு அடிக்கடி 20-30 நிமிடங்கள் மிதமான முதல் தீவிரமான உடற்பயிற்சி செய்கிறீர்கள்?",
      rarely: "அரிதாக",
      oneTwoDaysWeek: "வாரத்திற்கு 1-2 நாட்கள்",
      threeFourDaysWeek: "வாரத்திற்கு 3-4 நாட்கள்",
      fiveMoreDaysWeek: "வாரத்திற்கு 5 அல்லது அதற்கு மேற்பட்ட நாட்கள்",
      howIsWeight: "உங்கள் எடை எப்படி இருக்கிறது?",
      severelyOverweight: "அதிக எடை",
      moderatelyOverweight: "மிதமான அதிக எடை",
      underweight: "குறைந்த எடை",
      healthyWeight: "ஆரோக்கியமான எடை",
      howOftenSleep: "நீங்கள் எவ்வளவு அடிக்கடி 7-8 மணி நேரம் தூங்குகிறீர்கள்?",
      twoOrFewerDays: "வாரத்திற்கு 2 அல்லது அதற்கும் குறைவான நாட்கள்",
      threeFourDays: "வாரத்திற்கு 3-4 நாட்கள்",
      fiveSixDays: "வாரத்திற்கு 5-6 நாட்கள்",
      whatIsTobaccoHistory: "புகையிலை பற்றிய உங்கள் வரலாறு என்ன?",
      currentlyUse: "தற்போது பயன்படுத்துகிறேன்",
      quitLessThanTwoYears: "2 ஆண்டுகளுக்கு முன்பு விட்டுவிட்டேன்",
      quitOverTwoYears: "2 ஆண்டுகளுக்கு முன்பு விட்டுவிட்டேன்",
      neverUsed: "ஒருபோதும் பயன்படுத்தியதில்லை",
      howManyAlcohol: "வாரத்திற்கு எத்தனை மதுபானங்களை உட்கொள்கிறீர்கள்?",
      alcoholNote:
        "(12 அவுன்ஸ் பீர், 8 அவுன்ஸ் மால்ட் மது, 5 அவுன்ஸ் ஒயின், 1.5 அவுன்ஸ் ஷாட்)",
      excessiveAlcohol: "15+ (ஆண்கள்) அல்லது 8+ (பெண்கள்)",
      howRateSpirituality: "உங்கள் ஆன்மீகத்தை எப்படி மதிப்பிடுவீர்கள்?",
      noInterest: "ஆர்வம் இல்லை",
      moderatelySpiritual: "மிதமான ஆன்மீகம்",
      deeplySpiritual: "ஆழ்ந்த ஆன்மீகம்",

      // interestScreen

      Is_Interests: "விருப்பங்கள்",
      Is_TellYourInterest:
        "உங்கள் அனுபவத்தைத் தனிப்பயனாக்க நீங்கள் எதில் ஆர்வமாக உள்ளீர்கள் என்று எங்களிடம் கூறுங்கள்.",
      Is_WeightManagement: "எடை மேலாண்மை",
      Is_FitAndExercise: "உடற்பயிற்சி மற்றும் உடற்பயிற்சி",
      Is_StopSmoking: "புகைபிடிப்பதை நிறுத்துங்கள்",
      Is_HealthyCooking: "ஆரோக்கியமான சமையல்",
      Is_StressReduction: "மன அழுத்த குறைப்பு",
      Is_PreventHeartDisease: "இதய நோய் தடுப்பு",
      Is_DepressionRecovery: "மனச்சோர்வு மீட்பு",
      Is_ReversingDiabetes: "நீரிழிவு நோயை மாற்றுதல்",
      Is_NaturalRemedies: "இயற்கை வைத்தியம்",
      Is_SpiritualHealth: "ஆன்மீக ஆரோக்கியம்",
      Is_ImprovingMentalPerformance: "மன செயல்திறனை மேம்படுத்துதல்",
      Is_Other: "மற்றவை",
      Is_Name: "பெயர்",
      Is_Email: "மின்னஞ்சல்",
      Is_Address: "முகவரி",
      Is_Phone: "தொலைபேசி",
      Is_Zip: "ஜிப்",
      Is_ShowReport: "அறிக்கையைக் காட்டு",

      // reportScreen

      Rs_Report: "அறிக்கை",
      Rs_CustomizedReport: "இதற்கான தனிப்பயனாக்கப்பட்ட அறிக்கை:",
      Rs_YourHealthAge: "உங்கள் ஆரோக்கிய வயது",
      Rs_YourActualAge: "உங்கள் உண்மையான வயது",
      Rs_CurrentAge: "தற்போதைய வயது",
      Rs_HealthAge: "ஆரோக்கிய வயது",
      Rs_PotentialAge: "சாத்தியமான வயது",
      Rs_HealthyHabitsParagraph:
        "அலமேடா கவுண்டி ஆய்வு மற்றும் அட்வென்டிஸ்ட் சுகாதார ஆய்வுகள் உள்ளிட்ட பல பெரிய ஆராய்ச்சி ஆய்வுகள், கீழே பட்டியலிடப்பட்டுள்ள சுகாதார பழக்கங்களுக்கும் ஒருவரின் நோய்/இறப்பு ஆபத்துக்கும் இடையே வலுவான தொடர்பை வெளிப்படுத்துகின்றன. இந்த ஆரோக்கியமான பழக்கங்கள் அனைத்தையும் கடைப்பிடிக்கும் நபர்கள் தங்கள் ஆயுளை கிட்டத்தட்ட 30 ஆண்டுகள் வரை பாதிக்கலாம்.",
      Rs_MedicalDisclaimerTitle: "மருத்துவ மறுப்பு",
      Rs_MedicalDisclaimerText:
        "ஹெல்த் ஏஜ் தகவல் மற்றும் கல்வி நோக்கங்களுக்காக மட்டுமே பயன்படுத்தப்படுகிறது. இது மருத்துவ கண்டறிதல் அல்ல, மேலும் தொழில்முறை மருத்துவ ஆலோசனை, கண்டறிதல் அல்லது சிகிச்சைக்கு மாற்றாக பயன்படுத்தப்படக்கூடாது. எந்த மருத்துவ முடிவுகளையும் எடுப்பதற்கோ அல்லது உங்கள் சுகாதார பராமரிப்பில் மாற்றங்கள் செய்வதற்கோ முன் எப்போதும் தகுதிபெற்ற சுகாதார நிபுணரை அணுகவும்.",
      Rs_MedicalSources: "மருத்துவ ஆதாரங்கள்",
      Rs_Source: "ஆதாரம்",
      Rs_Recommendations: "பரிந்துரைகள்",
      Rs_1_title: "தினமும் நல்ல காலை உணவு சாப்பிடுங்கள்",
      Rs_1_desc:
        "காலை உணவு வளர்சிதை மாற்றத்தை அதிகரிக்கிறது, கவனம் செலுத்த உதவுகிறது, பள்ளி மற்றும் பணியிடத்தில் செயல்திறனை மேம்படுத்துகிறது. இது ஆரோக்கியமான எடையை பராமரிக்க உதவுகிறது.",
      Rs_2_title: "சிற்றுண்டி சாப்பிடுவதைத் தவிர்க்கவும்",
      Rs_2_desc:
        "சிற்றுண்டி ஒரு நாளைக்கு சராசரியாக 580 கலோரிகளை சேர்க்கலாம், செரிமானத்தை பாதிக்கும், இரத்த சர்க்கரை கட்டுப்பாட்டை சீர்குலைக்கும் மற்றும் எடை அதிகரிப்புக்கு பங்களிக்கும்.",
      Rs_3_title: "அதிக பழங்கள் மற்றும் காய்கறிகளை அனுபவிக்கவும்",
      Rs_3_desc:
        "பழங்கள் மற்றும் காய்கறிகளில் பைட்டோ கெமிக்கல்கள், வைட்டமின்கள் மற்றும் நார்ச்சத்து நிறைந்துள்ளது, அதே நேரத்தில் கலோரிகள் குறைவாக உள்ளது.",
      Rs_4_title: "முழு தானிய உட்கொள்ளலை அதிகரிக்கவும்",
      Rs_4_desc:
        "முழு தானியங்களில் நார்ச்சத்து, பி வைட்டமின்கள் மற்றும் ஒட்டுமொத்த ஆரோக்கியத்தை ஆதரிக்கும் அத்தியாவசிய தாதுக்கள் உள்ளன.",
      Rs_5_title: "அதிக கொட்டைகள் சாப்பிடுங்கள்",
      Rs_5_desc:
        "கொட்டைகள் புரதம் மற்றும் ஆரோக்கியமான கொழுப்புகளின் சிறந்த மூலமாகும், மேலும் அவை இரத்த சர்க்கரை அளவை கட்டுப்படுத்த உதவுகின்றன.",
      Rs_6_title: "சிவப்பு இறைச்சியைத் தவிர்க்கவும்",
      Rs_6_desc:
        "சிவப்பு இறைச்சி சாப்பிடுவது வகை 2 நீரிழிவு, இதய நோய், பக்கவாதம் மற்றும் சில புற்றுநோய்களுடன் இணைக்கப்பட்டுள்ளது.",
      Rs_7_title: "வழக்கமாக உடற்பயிற்சி செய்யுங்கள்",
      Rs_7_desc:
        "உடற்பயிற்சி ஆற்றலை அதிகரிக்கிறது, மனநிலை மற்றும் கொழுப்பு அளவை மேம்படுத்துகிறது, இரத்த அழுத்தத்தை குறைக்கிறது, தூக்கத்தை மேம்படுத்துகிறது, நோய் எதிர்ப்பு சக்தியை பலப்படுத்துகிறது மற்றும் இரத்த சர்க்கரையை கட்டுப்படுத்த உதவுகிறது.",
      Rs_8_title: "ஆரோக்கியமான எடையை அடையுங்கள்",
      Rs_8_desc:
        "18.5 - 24.9 க்கு இடையில் BMI ஐ பராமரிக்கவும் மற்றும் ஆரோக்கியமான இடுப்பு சுற்றளவை (ஆண்களுக்கு 40 அங்குலத்திற்கும் குறைவாக, பெண்களுக்கு 35 அங்குலத்திற்கும் குறைவாக) பராமரிக்கவும்.",
      Rs_9_title: "ஒவ்வொரு இரவும் 7-8 மணி நேரம் நல்ல தூக்கம் பெறுங்கள்",
      Rs_9_desc:
        "போதுமான தூக்கம் நினைவகம், கற்றல், வளர்சிதை மாற்றம் மற்றும் நோயெதிர்ப்பு செயல்பாட்டை ஆதரிக்கிறது.",
      Rs_10_title: "புகைபிடிப்பதை நிறுத்துங்கள்",
      Rs_10_desc:
        "புகைபிடித்தல் உடலில் உள்ள ஒவ்வொரு உறுப்பையும் பாதிக்கிறது, புற்றுநோய், இதய நோய், COPD, ஆஸ்துமா மற்றும் பல் பிரச்சினைகளின் அபாயத்தை அதிகரிக்கிறது.",
      Rs_11_title: "மது அருந்த வேண்டாம்",
      Rs_11_desc:
        "மது அருந்துவது நரம்பியல், இருதய மற்றும் மனநல பிரச்சினைகளை ஏற்படுத்தும், அத்துடன் புற்றுநோய் மற்றும் கல்லீரல் நோயின் அபாயத்தை அதிகரிக்கும்.",
      Rs_12_title: "ஆன்மீகத்தை அதிகரிக்கவும்",
      Rs_12_desc:
        "கடவுளின் மீது நம்பிக்கை மன ஆரோக்கியத்தை மேம்படுத்தலாம் மற்றும் நோய் எதிர்ப்பு சக்தியை வலுப்படுத்தலாம்.",
      Rs_SavePdf: "PDF ஐ சேமிக்கவும்",
      Rs_ShareReport: "அறிக்கையைப் பகிரவும்",

      // history screen

      Hs_List: "பட்டியல்",
      Hs_Group: "குழு",
      Hs_View: "காண்க",
      Hs_Filter: "வடிகட்டி",
      Hs_Options: "விருப்பங்கள்",
      Hs_Export: "ஏற்றுமதி",
      Hs_Delete: "நீக்கு",
      Hs_Search: "தேடல்",
      Hs_ExportAsCSV: "CSV ஆக ஏற்றுமதி செய்",
      Hs_Confirmation: "நீங்கள் நீக்க விரும்புகிறீர்களா?",
      Hs_Success: "உருப்படி நீக்கப்பட்டது",
      Hs_Cancel: "ரத்து செய்",
      Hs_ItemsSelected: "தேர்ந்தெடுக்கப்பட்ட உருப்படிகள்",
      Hs_SelectAll: "அனைத்தையும் தேர்ந்தெடு",
      Hs_NewGroup: "புதிய குழு",
      Hs_ExistingGroup: "உள்ள குழு",
      Hs_Create: "உருவாக்கு",
      Hs_GroupName: "குழு பெயர்",
      Hs_EnterGroupName: "குழு பெயரை உள்ளிடவும்",
      Hs_Reports: "அறிக்கைகள்",
      Hs_save: "சேமி",
      Hs_Nothing: "இன்னும் எதுவும் இல்லை!",
      Hs_NothingDesc:
        "நீங்கள் மதிப்பீட்டை முடித்தவுடன் உங்கள் ஆரோக்கிய வயது அறிக்கைகள் இங்கே தோன்றும்.",
      Hs_Download: "பதிவிறக்கம்",

      Hs_LanguageChanged: "மொழி வெற்றிகரமாக மாற்றப்பட்டது",
      Hs_Change: "மாற்று",

      // Filter Screen
      Fs_Filter: "வடிகட்டி",
      Fs_Close: "மூடு",
      Fs_Date: "தேதி",
      Fs_From: "இருந்து",
      Fs_To: "வரை",
      Fs_ClearAll: "அனைத்தையும் அழி",
      Fs_ShowResults: "முடிவுகளைக் காட்டு",

      // others

      select: "தேர்ந்தெடு",
      total: "மொத்தம்",
      purchase: "கொள்முதல்",
      aboutProgramme: "நிகழ்ச்சி பற்றி",
      reports: "அறிக்கைகள்",
      PrintQuestion: "கேள்வித்தாளை அச்சிடு",
      PrintReport: "வெற்று அறிக்கையை அச்சிடு",
      reportSetting: "அறிக்கை அமைப்புகள்",
      changeLanguage: "மொழியை மாற்று",
      uploadLogo: "உங்கள் லோகோவை பதிவேற்றவும்",
      upload: "பதிவேற்று",
      contactDetails: "தொடர்பு விவரங்கள்",
      enterAddress: "முகவரியை உள்ளிடவும்",
      enterPhone: "தொலைபேசி எண்ணை உள்ளிடவும்",
      createGroup: "குழுவை உருவாக்கு",

      // blood pressure and glucose

      normalBp: "உங்கள் இரத்த அழுத்தம் இயல்பானது",
      MaintainBp: "உங்கள் இரத்த அழுத்தத்தை பராமரிக்கவும்",
      bpRange: "இயல்பான வரம்பு 90-119/60-79 mmHg.",
      normalGlucoseLevel: "உங்கள் இரத்த குளுக்கோஸ் அளவு இயல்பானது",
      maintainGlucoseLevel: "உங்கள் இரத்த குளுக்கோஸ் அளவை பராமரிக்கவும்",
      normalRangeGlucose: "இயல்பான வரம்பு",
      for: "க்கு",
      postMeal: "உணவுக்குப் பின்",
      test: "சோதனை",
      maintainBloodGlucose: "உங்கள் இரத்த சர்க்கரை அளவுகளை பராமரிக்கவும்",
      maintainLowBloodGlucoseDesc:
        "உங்கள் இரத்த சர்க்கரை அளவுகள் குறைவாக உள்ளன. நிலையான இரத்த சர்க்கரை சிக்கல்களைத் தவிர்க்கிறது, சக்தியை அதிகரிக்கிறது மற்றும் ஒட்டுமொத்த ஆரோக்கியத்தையும் ஆதரிக்கிறது. சமநிலையிலான உணவு மற்றும் உடற்பயிற்சி இதனை கட்டுப்பாட்டில் வைத்திருக்கும்!",
      maintainHighBloodGlucoseDesc:
        "உங்கள் இரத்த சர்க்கரை அளவுகள் அதிகமாக உள்ளன. நிலையான இரத்த சர்க்கரை சிக்கல்களைத் தவிர்க்கிறது, சக்தியை அதிகரிக்கிறது மற்றும் ஒட்டுமொத்த ஆரோக்கியத்தையும் ஆதரிக்கிறது. சமநிலையிலான உணவு மற்றும் உடற்பயிற்சி இதனை கட்டுப்பாட்டில் வைத்திருக்கும்!",
      maintainBloodPressure:
        "உங்கள் இரத்த அழுத்தத்தைக் கட்டுப்பாட்டில் வைத்திருங்கள்",
      maintainBloodPressureDesc:
        "ஆரோக்கியமான இரத்த அழுத்தம் இதய நோய்கள், பக்கவாதம் மற்றும் சிறுநீரக சிக்கல்களின் அபாயத்தை குறைக்கும். ஒழுங்கான உடற்பயிற்சி மற்றும் சமநிலையான உணவு மிகப்பெரிய மாற்றத்தை ஏற்படுத்தும்!",
      maintainLowBloodPressureDesc:
        "உங்கள் இரத்த அழுத்தம் குறைவாக உள்ளது. ஆரோக்கியமான இரத்த அழுத்தம் இதய நோய்கள், பக்கவாதம் மற்றும் சிறுநீரக சிக்கல்களின் அபாயத்தை குறைக்கும். ஒழுங்கான உடற்பயிற்சி மற்றும் சமநிலையான உணவு மிகப்பெரிய மாற்றத்தை ஏற்படுத்தும்!",
      maintainHighBloodPressureDesc:
        "உங்கள் இரத்த அழுத்தம் அதிகமாக உள்ளது. ஆரோக்கியமான இரத்த அழுத்தம் இதய நோய்கள், பக்கவாதம் மற்றும் சிறுநீரக சிக்கல்களின் அபாயத்தை குறைக்கும். ஒழுங்கான உடற்பயிற்சி மற்றும் சமநிலையான உணவு மிகப்பெரிய மாற்றத்தை ஏற்படுத்தும்!",

      // messages

      downloadSuccess: "வெற்றிகரமாக பதிவிறக்கம் செய்யப்பட்டது",
      goBackConfirmation: "நீங்கள் பின்னோக்கிச் செல்ல விரும்புகிறீர்களா?",
      pleaseWait: "தயவுசெய்து காத்திருங்கள்!",
      // purchase Screen

      goBeyond: "அடிப்படைகளைத் தாண்டுங்கள்!",

      JoinPro:
        "எங்கள் ப்ரோ உறுப்பினர்களுடன் இணைந்து உங்கள் ஆரோக்கியப் பயணத்தை அடுத்த நிலைக்கு எடுத்துச் செல்லுங்கள்",

      WhyJoinPro: "ஏன் ப்ரோவில் சேர வேண்டும்?",

      UnlimitedReports: "வரம்பில்லா அறிக்கைகள்",

      FullReportHistory: "முழு அறிக்கை வரலாறு",

      PrintYourQuestionnaire: "உங்கள் லோகோவுடன் கேள்வித்தாளை அச்சிடுங்கள்",

      printYourReport: "உங்கள் லோகோவுடன் வெற்று அறிக்கைகளை அச்சிடுங்கள்",

      upgrade: "மேம்படுத்து",

      yearlyPurchase: "வருடாந்திர வாங்கல்",

      thisOneForPro: "ஓஹ்! இது ப்ரோ உறுப்பினர்களுக்கானது.",

      proMembersDesc:
        "இந்த அம்சம் எங்கள் ப்ரோ உறுப்பினர்களுக்காக மட்டுமே. சேர விருப்பமா? இப்போது மேம்படுத்தி, உங்கள் தேவைகளுக்கேற்ப வடிவமைக்கப்பட்ட சிறப்பு நன்மைகளை அனுபவியுங்கள்!",

      UpgradeComplete: "மேம்படுத்தல் முடிந்தது!",

      NowAProMember: "நீங்கள் இப்போது ஒரு ப்ரோ உறுப்பினர்!",

      UpgradeTo: "மேம்படுத்துக",
      SubscriptionCancelledSuccess: "சந்தா வெற்றிகரமாக ரத்து செய்யப்பட்டது!",
      ConfirmSubCancel: "சந்தாவை ரத்து செய்ய விரும்புகிறீர்களா?",
      SubDaysRemaining: "மீதமுள்ள சந்தா நாட்கள்:",
      RenewSub: "சந்தாவை புதுப்பிக்கவும்",
      cancelSub: "சந்தாவை ரத்து செய்க",
      renewSubConfirmation:
        "இப்போது புதுப்பிக்க தேர்வு செய்தால், இன்று முதல் ஒரு புதிய பில்லிங் சுழற்சி துவங்கும், மற்றும் உங்கள் தற்போதைய சந்தாவின் மீதமுள்ள காலம் செல்லுபடியாகாது. நீங்கள் தொடர விரும்புகிறீர்களா?",
      renew: "புதுப்பிக்கவும்",
      BloodPressure: "இரத்த அழுத்தம்",
      BloodGlucose: "இரத்த சர்க்கரை",
      BMI: "உடல் массы குறியீடு",
      PDFDonwload: "PDF பதிவிறக்கம் செய்யப்பட்டது!",
      PDFShared: "PDF பகிரப்பட்டது!",
      Error: "ஏதோ தவறு ஏற்பட்டது!",
      aboutTheApp: "இந்த செயலியின் பற்றி",
      GetStarted: "தொடங்கு",
      systolic: "சிஸ்டொலிக்",
      diastolic: "டைஅஸ்டொலிக்",
      start: "ஆரம்பி",
      enterRequiredFields:
        "தயவுசெய்து தேவையான அனைத்து புலங்களையும் நிரப்பவும்!",
      enterThisFields: "இந்த புலம் அவசியம்!",

      exit: "வெளியேறு",
      exitApp: "அப்பிளிகேஷனை வெளியேறு",
      appExitConfirmation:
        "நீங்கள் அப்பிளிகேஷனிலிருந்து வெளியேற விரும்புகிறீர்களா?",
      leavePage: "அசஸ்‌മെண்டை விட்டு வெளியேறவா?",
      leavePageConfirmation:
        "நீங்கள் இந்த பக்கத்தை விட்டு வெளியேறினால், உங்களால் உள்ளிடப்பட்ட தகவல்கள் அழியும்",

      downloadOptions: "பதிவிறக்கம் விருப்பங்கள்",
      a4Size: "A4 அளவு",
      usLetter: "US லெட்டர்",
      pdfDownloaded: "PDF பதிவிறக்கம் செய்யப்பட்டது!",
      addedToGroup: "குழுவிற்கு வெற்றிகரமாக சேர்க்கப்பட்டது!",
      success: "வெற்றி",
      exportedTo: "ஏற்றுமதி செய்யப்பட்டது",

       aboutTheAppDesc:
        "இந்தச் செயலி தனிநபரின் வாழ்க்கை முறைப் பழக்கவழக்கங்களின்படி ஒருவரின் உடலின் “ஆரோக்கிய வயதை” தீர்மானிக்க உதவுகிறது. இந்தச் செயலி நன்கு அறியப்பட்ட அலமேடா கவுண்டி நீண்ட ஆயுள் ஆய்வுகள் மற்றும் புதிய அட்வென்டிஸ்ட் சுகாதார ஆய்வுகள் இரண்டிலிருந்தும் தகவல்களை ஒருங்கிணைக்கிறது. ஒருவரின் ஆரோக்கிய பழக்கவழக்கங்களுக்கும் இறப்பு அபாயத்திற்கும் இடையே உள்ள வலுவான தொடர்பை பங்கேற்பாளர்கள் புரிந்துகொள்ள இந்தச் செயலி உதவுகிறது. இது சுகாதார ஆலோசனைக்கு ஒரு சிறந்த அடிப்படையை வழங்குகிறது.",
    aboutTheAppTitle: "செயலியைப் பற்றி",
    },
  },
  bn: {
    translation: {
      welcome: "স্বাগতম",
      chooseLanguage: "ভাষা নির্বাচন করুন",
      introduction: "ভূমিকা",
      howItWorks: "এটি কীভাবে কাজ করে",
      benefits: "সুবিধাসমূহ",
      discoverHealthAge: "আপনার স্বাস্থ্য বয়স জানুন!",
      lifestyleAffectsHealth:
        "আপনার জীবনধারা আপনার ধারণার চেয়েও বেশি স্বাস্থ্যকে প্রভাবিত করে। চলুন জেনে নিই আপনি আসলে কতটা তরুণ!",
      simpleScienceBacked: "সহজ ও বিজ্ঞানভিত্তিক",
      answerQuestions:
        "আপনার অভ্যাস সম্পর্কে কয়েকটি প্রশ্নের উত্তর দিন, আর আমরা প্রকৃত স্বাস্থ্য তথ্যের ভিত্তিতে আপনার স্বাস্থ্য বয়স নির্ণয় করব।",
      getPersonalizedTips: "ব্যক্তিগতকৃত স্বাস্থ্য পরামর্শ পান",
      improveLifestyle:
        "কাস্টমাইজড সুপারিশের মাধ্যমে আপনার জীবনধারা উন্নত করুন এবং সর্বোত্তম স্বাস্থ্য সম্ভাবনায় পৌঁছান।",
      helpCalculateHealthAge: "আমি আপনার স্বাস্থ্য বয়স নির্ণয় করতে সাহায্য করতে পারি।",
      startAssessment: "এখনই আপনার মূল্যায়ন শুরু করুন",
      home: "হোম",
      purchases: "ক্রয়সমূহ",
      history: "ইতিহাস",
      dailyLimit: "দৈনিক সীমা",

      getStarted:
        "চলুন শুরু করা যাক। আপনার স্বাস্থ্য বয়স আপনার জীবনধারা ও অভ্যাসের উপর নির্ভর করে।",
      whatIsYourName: "আপনার নাম কী?",
      enterName: "নাম লিখুন",
      next: "পরবর্তী",
      whatIsYourAge: "আপনার বয়স কত?",
      age: "বয়স",
      whatIsYourGender: "আপনার লিঙ্গ কী?",
      gender: "লিঙ্গ",
      male: "পুরুষ",
      female: "নারী",
      whatIsYourHeight: "আপনার উচ্চতা কত?",
      height: "উচ্চতা",
      whatIsYourWeight: "আপনার ওজন কত?",
      weight: "ওজন",
      whatIsYourWaistCircumference: "আপনার কোমরের পরিধি কত?",
      waistCircumference: "কোমরের পরিধি",
      whatIsYourBloodPressure: "আপনার রক্তচাপ কত?",
      bloodPressure: "রক্তচাপ",
      whatIsYourBloodGlucose: "আপনার রক্তের গ্লুকোজের মাত্রা কত?",
      fasting: "খালি পেটে",
      postMeals: "খাবারের পরে",
      bloodGlucoseLevel: "রক্তের গ্লুকোজের মাত্রা",

      newAssessment: "নতুন মূল্যায়ন",
      howOftenEatBreakfast: "আপনি কত ঘন ঘন সকালের ভালো নাশতা করেন?",
      breakfastNote: "(সম্পূর্ণ শস্য, ফল বা শাক-সবজি এবং বাদামকে গুরুত্ব দেওয়া)",
      lessThan2Days: "সপ্তাহে ২ দিনের কম",
      twoToFourDays: "সপ্তাহে ২ - ৪ দিন",
      fiveToSixDays: "সপ্তাহে ৫ - ৬ দিন",
      everyday: "প্রতিদিন",
      howOftenSnack: "আপনি কত ঘন ঘন হালকা খাবার খান?",
      severalTimesDay: "দিনে কয়েকবার",
      onceDay: "দিনে একবার",
      fewTimesWeek: "সপ্তাহে কয়েকবার",
      rarelyNever: "কদাচিৎ বা কখনোই না",
      howManyFruitsVeggies: "আপনি দিনে কতটি পরিবেশন ফল ও সবজি খান?",
      fruitsVeggiesNote:
        "(১ পরিবেশন = ১ মাঝারি টুকরা, ১ কাপ তাজা, ½ কাপ রান্না করা, বা ৬ আউন্স ১০০% রস)",
      howManyWholeGrains: "আপনি দিনে কতটি সম্পূর্ণ শস্যের পরিবেশন খান?",
      wholeGrainsNote:
        "(১ পরিবেশন = ১ টুকরো রুটি, ½ কাপ বাদামী চাল বা ওটমিল, ⅔ কাপ শুকনো সিরিয়াল)",
      none: "কোনোটি নয়",
      back: "পূর্ববর্তী",
      howManyNutsSeeds: "আপনি প্রতি সপ্তাহে কতটি পরিবেশন বাদাম ও বীজ খান?",
      nutsSeedsNote: "(১ পরিবেশন = ১ আউন্স বাদাম বা বীজ, ২ টেবিল চামচ বাদামের মাখন)",
      howOftenRedMeat: "আপনি কত ঘন ঘন লাল মাংস খান?",
      threeOrMoreTimesWeek: "সপ্তাহে ৩ বা তার বেশি বার",
      onceTwiceMonth: "মাসে এক বা দুই বার",
      never: "কখনো না",
      howOftenExercise:
        "আপনি কত ঘন ঘন ২০-৩০ মিনিট মাঝারি থেকে তীব্র ব্যায়াম করেন?",
      rarely: "কদাচিৎ",
      oneTwoDaysWeek: "সপ্তাহে ১ - ২ দিন",
      threeFourDaysWeek: "সপ্তাহে ৩ - ৪ দিন",
      fiveMoreDaysWeek: "সপ্তাহে ৫ বা তার বেশি দিন",
      howIsWeight: "আপনার ওজন কেমন?",
      severelyOverweight: "গুরুতরভাবে অতিরিক্ত ওজন",
      moderatelyOverweight: "মাঝারিভাবে অতিরিক্ত ওজন",
      underweight: "কম ওজন",
      healthyWeight: "স্বাস্থ্যকর ওজন",
      howOftenSleep: "আপনি কত ঘন ঘন ৭ - ৮ ঘণ্টা ঘুম পান?",
      twoOrFewerDays: "সপ্তাহে ২ দিন বা তার কম",
      threeFourDays: "সপ্তাহে ৩ - ৪ দিন",
      fiveSixDays: "সপ্তাহে ৫ - ৬ দিন",
      whatIsTobaccoHistory: "তামাক ব্যবহারে আপনার ইতিহাস কী?",
      currentlyUse: "বর্তমানে ব্যবহার করি",
      quitLessThanTwoYears: "২ বছরেরও কম সময় আগে ছেড়েছি",
      quitOverTwoYears: "২ বছরেরও বেশি সময় আগে ছেড়েছি",
      neverUsed: "কখনো ব্যবহার করিনি",
      howManyAlcohol: "আপনি প্রতি সপ্তাহে কতটি পরিবেশন মদ পান করেন?",
      alcoholNote: "(১২ আউন্স বিয়ার, ৮ আউন্স মাল্ট লিকার, ৫ আউন্স ওয়াইন, ১.৫ আউন্স শট)",
      excessiveAlcohol: "১৫+ (পুরুষ) বা ৮+ (নারী)",
      howRateSpirituality: "আপনার আধ্যাত্মিকতাকে আপনি কীভাবে মূল্যায়ন করবেন?",
      noInterest: "কোনো আগ্রহ নেই",
      moderatelySpiritual: "মধ্যমভাবে আধ্যাত্মিক",
      deeplySpiritual: "গভীরভাবে আধ্যাত্মিক",

      Is_Interests: "আগ্রহসমূহ",
      Is_TellYourInterest:
        "আপনি কীসে আগ্রহী তা আমাদের জানান, যাতে আমরা আপনার অভিজ্ঞতা কাস্টমাইজ করতে পারি।",
      Is_WeightManagement: "ওজন নিয়ন্ত্রণ",
      Is_FitAndExercise: "ফিটনেস এবং ব্যায়াম",
      Is_StopSmoking: "ধূমপান বন্ধ করুন",
      Is_HealthyCooking: "স্বাস্থ্যকর রান্না",
      Is_StressReduction: "মানসিক চাপ কমানো",
      Is_PreventHeartDisease: "হৃদরোগ প্রতিরোধ",
      Is_DepressionRecovery: "বিষণ্ণতা থেকে মুক্তি",
      Is_ReversingDiabetes: "ডায়াবেটিস নিরাময়",
      Is_NaturalRemedies: "প্রাকৃতিক প্রতিকার",
      Is_SpiritualHealth: "আধ্যাত্মিক স্বাস্থ্য",
      Is_ImprovingMentalPerformance: "মানসিক কর্মক্ষমতা উন্নত করা",
      Is_Other: "অন্যান্য",
      Is_Name: "নাম",
      Is_Email: "ইমেইল",
      Is_Address: "ঠিকানা",
      Is_Phone: "ফোন",
      Is_Zip: "জিপ কোড",
      Is_ShowReport: "রিপোর্ট দেখুন",

      Rs_Report: "রিপোর্ট",
      Rs_CustomizedReport: "যাঁর জন্য কাস্টমাইজড রিপোর্ট :",
      Rs_YourHealthAge: "আপনার স্বাস্থ্য বয়স",
      Rs_YourActualAge: "আপনার প্রকৃত বয়স",
      Rs_CurrentAge: "বর্তমান বয়স",
      Rs_HealthAge: "স্বাস্থ্য বয়স",
      Rs_PotentialAge: "সম্ভাব্য স্বাস্থ্য বয়স",
      Rs_HealthyHabitsParagraph:
        "সুপরিচিত আলামেদা কাউন্টি স্টাডি এবং অ্যাডভেন্টিস্ট হেলথ স্টাডিজসহ কয়েকটি বড় গবেষণা নিচে তালিকাভুক্ত স্বাস্থ্য অভ্যাসসমূহ এবং রোগ ও মৃত্যুর ঝুঁকির মধ্যে একটি স্পষ্ট সম্পর্ক প্রকাশ করে। এই সমস্ত স্বাস্থ্যকর অভ্যাস অনুশীলন করা ব্যক্তিরা তাদের আয়ু প্রায় ৩০ বছর পর্যন্ত প্রভাবিত করতে পারেন।",
      Rs_MedicalDisclaimerTitle: "চিকিৎসা সংক্রান্ত দাবিত্যাগ",
      Rs_MedicalDisclaimerText:
        "স্বাস্থ্য বয়স শুধুমাত্র তথ্যগত ও শিক্ষামূলক উদ্দেশ্যে তৈরি। এটি কোনো চিকিৎসা নির্ণয় নয় এবং পেশাদার চিকিৎসা পরামর্শ, রোগ নির্ণয় বা চিকিৎসার বিকল্প হিসেবে ব্যবহার করা উচিত নয়। কোনো চিকিৎসা সংক্রান্ত সিদ্ধান্ত নেওয়ার বা আপনার চিকিৎসায় পরিবর্তন আনার আগে সর্বদা একজন যোগ্য স্বাস্থ্যসেবা পেশাদারের পরামর্শ নিন।",
      Rs_MedicalSources: "চিকিৎসা সূত্রসমূহ",
      Rs_Source: "সূত্র",
      Rs_Recommendations: "সুপারিশসমূহ",
      Rs_1_title: "প্রতিদিন সকালের ভালো নাশতা করুন",
      Rs_1_desc:
        "সকালের নাশতা বিপাক বৃদ্ধি করে, মনোযোগ বাড়াতে সাহায্য করে এবং স্কুল ও কাজের ক্ষেত্রে কর্মক্ষমতা উন্নত করে। এটি স্বাস্থ্যকর ওজন বজায় রাখতেও সহায়ক।",
      Rs_2_title: "হালকা খাবার খাওয়া এড়িয়ে চলুন",
      Rs_2_desc:
        "হালকা খাবার খাওয়া প্রতিদিন গড়ে ৫৮০ ক্যালরি যোগ করতে পারে, হজমে বাধা দেয়, রক্তের শর্করার নিয়ন্ত্রণ ব্যাহত করে এবং ওজন বৃদ্ধিতে অবদান রাখে।",
      Rs_3_title: "আরও বেশি ফল ও সবজি খান",
      Rs_3_desc:
        "ফল ও সবজি ফাইটোকেমিক্যাল, ভিটামিন এবং ফাইবারে পরিপূর্ণ, আর এগুলোর ক্যালোরিও তুলনামূলকভাবে কম।",
      Rs_4_title: "সম্পূর্ণ শস্যের পরিমাণ বৃদ্ধি করুন",
      Rs_4_desc:
        "সম্পূর্ণ শস্যে ফাইবার, বি ভিটামিন এবং প্রয়োজনীয় খনিজ উপাদান থাকে, যা সামগ্রিক স্বাস্থ্যের জন্য সহায়ক।",
      Rs_5_title: "আরও বাদাম খান",
      Rs_5_desc:
        "বাদাম প্রোটিন এবং ভালো চর্বির একটি চমৎকার উৎস, এবং এগুলো রক্তের শর্করার মাত্রা নিয়ন্ত্রণে সাহায্য করে।",
      Rs_6_title: "লাল মাংস এড়িয়ে চলুন",
      Rs_6_desc:
        "লাল মাংস খাওয়ার সঙ্গে টাইপ ২ ডায়াবেটিস, হৃদরোগ, স্ট্রোক এবং নির্দিষ্ট কিছু ক্যানসারের সম্পর্ক পাওয়া গেছে।",
      Rs_7_title: "নিয়মিত ব্যায়াম করুন",
      Rs_7_desc:
        "ব্যায়াম শক্তি বৃদ্ধি করে, মেজাজ ও কোলেস্টেরলের মাত্রা উন্নত করে, রক্তচাপ কমায়, ঘুম ভালো করে, রোগ প্রতিরোধ ক্ষমতা শক্তিশালী করে এবং রক্তের শর্করা নিয়ন্ত্রণে সাহায্য করে।",
      Rs_8_title: "স্বাস্থ্যকর ওজন অর্জন করুন",
      Rs_8_desc:
        "বিএমআই ১৮.৫ - ২৪.৯ এর মধ্যে এবং স্বাস্থ্যকর কোমরের পরিধি বজায় রাখুন (পুরুষদের জন্য ৪০ ইঞ্চির কম, নারীদের জন্য ৩৫ ইঞ্চির কম)।",
      Rs_9_title: "প্রতি রাতে ৭-৮ ঘণ্টা ভালো ঘুম নিন",
      Rs_9_desc:
        "পর্যাপ্ত ঘুম স্মৃতিশক্তি, শেখার ক্ষমতা, বিপাকক্রিয়া এবং রোগ প্রতিরোধ ক্ষমতার জন্য সহায়ক।",
      Rs_10_title: "ধূমপান বন্ধ করুন",
      Rs_10_desc:
        "ধূমপান শরীরের প্রতিটি অঙ্গের ক্ষতি করে এবং ক্যান্সার, হৃদরোগ, সিওপিডি, হাঁপানি ও দাঁতের সমস্যার ঝুঁকি বাড়ায়।",
      Rs_11_title: "মদ্যপান করবেন না",
      Rs_11_desc:
        "মদ্যপান স্নায়বিক, হৃদরোগ সংক্রান্ত এবং মানসিক সমস্যা সৃষ্টি করতে পারে, পাশাপাশি ক্যান্সার ও লিভার রোগের ঝুঁকি বাড়ায়।",
      Rs_12_title: "আধ্যাত্মিকতা বৃদ্ধি করুন",
      Rs_12_desc:
        "ঈশ্বরে বিশ্বাস মানসিক স্বাস্থ্য উন্নত করতে এবং রোগ প্রতিরোধ ক্ষমতা শক্তিশালী করতে পারে।",
      Rs_SavePdf: "পিডিএফ সংরক্ষণ করুন",
      Rs_ShareReport: "রিপোর্ট শেয়ার করুন",

      Hs_List: "তালিকা",
      Hs_Group: "গ্রুপ",
      Hs_View: "দেখুন",
      Hs_Filter: "ফিল্টার",
      Hs_Options: "অপশন",
      Hs_Export: "এক্সপোর্ট",
      Hs_Delete: "মুছুন",
      Hs_Search: "খুঁজুন",
      Hs_ExportAsCSV: "CSV হিসেবে এক্সপোর্ট করুন",
      Hs_Confirmation: "আপনি কি নিশ্চিতভাবে মুছে ফেলতে চান ?",
      Hs_Success: "আইটেম মুছে ফেলা হয়েছে",
      Hs_Cancel: "বাতিল",
      Hs_ItemsSelected: "আইটেম নির্বাচিত",
      Hs_SelectAll: "সব নির্বাচন করুন",
      Hs_NewGroup: "নতুন গ্রুপ",
      Hs_ExistingGroup: "বিদ্যমান গ্রুপ",
      Hs_Create: "তৈরি করুন",
      Hs_GroupName: "গ্রুপের নাম",
      Hs_EnterGroupName: "গ্রুপের নাম লিখুন",
      Hs_Reports: "রিপোর্টসমূহ",
      Hs_save: "সংরক্ষণ করুন",
      Hs_Nothing: "এখানে এখনো কিছু নেই!",
      Hs_NothingDesc:
        "আপনি মূল্যায়ন সম্পন্ন করলে আপনার স্বাস্থ্য বয়স রিপোর্ট এখানে দেখা যাবে।",
      Hs_Download: "ডাউনলোড",
      Hs_LanguageChanged: "ভাষা সফলভাবে পরিবর্তন করা হয়েছে",
      Hs_Change: "পরিবর্তন করুন",

      Fs_Filter: "ফিল্টার করুন",
      Fs_Close: "বন্ধ করুন",
      Fs_Date: "তারিখ",
      Fs_From: "থেকে",
      Fs_To: "পর্যন্ত",
      Fs_ClearAll: "সব মুছুন",
      Fs_ShowResults: "ফলাফল দেখুন",

      select: "নির্বাচন করুন",
      total: "মোট",
      purchase: "ক্রয়",
      aboutProgramme: "প্রোগ্রাম সম্পর্কে",
      reports: "রিপোর্টসমূহ",
      PrintQuestion: "প্রশ্নমালা প্রিন্ট করুন",
      PrintReport: "ফাঁকা রিপোর্ট প্রিন্ট করুন",
      reportSetting: "রিপোর্ট সেটিংস",
      changeLanguage: "ভাষা পরিবর্তন করুন",
      uploadLogo: "আপনার লোগো আপলোড করুন",
      upload: "আপলোড",
      contactDetails: "যোগাযোগের তথ্য",
      enterAddress: "ঠিকানা লিখুন",
      enterPhone: "ফোন নম্বর লিখুন",
      createGroup: "গ্রুপ তৈরি করুন",

      normalBp: "আপনার রক্তচাপ স্বাভাবিক",
      MaintainBp: "অনুগ্রহ করে আপনার রক্তচাপ নিয়ন্ত্রণে রাখুন",
      bpRange: "স্বাভাবিক সীমা হলো 90-119/60-79 mmHg।",
      normalGlucoseLevel: "আপনার রক্তের গ্লুকোজের মাত্রা স্বাভাবিক",
      maintainGlucoseLevel: "অনুগ্রহ করে আপনার রক্তের গ্লুকোজের মাত্রা নিয়ন্ত্রণে রাখুন",
      normalRangeGlucose: "স্বাভাবিক সীমা হলো",
      for: "—",
      postMeal: "খাবারের পরের",
      test: "পরীক্ষার ক্ষেত্রে",
      maintainBloodGlucose: "আপনার রক্তের গ্লুকোজের মাত্রা বজায় রাখুন",
      maintainLowBloodGlucoseDesc:
        "আপনার রক্তের গ্লুকোজের মাত্রা কম। স্থিতিশীল রক্তের গ্লুকোজ জটিলতা প্রতিরোধ করে, শক্তি বাড়ায় এবং সামগ্রিক স্বাস্থ্যে সহায়তা করে। সুষম খাবার এবং ব্যায়াম তা নিয়ন্ত্রণে রাখতে সাহায্য করে!",
      maintainHighBloodGlucoseDesc:
        "আপনার রক্তের গ্লুকোজের মাত্রা বেশি। স্থিতিশীল রক্তের গ্লুকোজ জটিলতা প্রতিরোধ করে, শক্তি বাড়ায় এবং সামগ্রিক স্বাস্থ্যে সহায়তা করে। সুষম খাবার এবং ব্যায়াম তা নিয়ন্ত্রণে রাখতে সাহায্য করে!",
      maintainBloodPressure: "রক্তচাপ নিয়ন্ত্রণে রাখুন",
      maintainBloodPressureDesc:
        "স্বাস্থ্যকর রক্তচাপ বজায় রাখা হৃদরোগ, স্ট্রোক এবং কিডনির সমস্যার ঝুঁকি কমায়। নিয়মিত ব্যায়াম এবং সুষম খাদ্য অনেক বড় পরিবর্তন আনতে পারে!",
      maintainLowBloodPressureDesc:
        "আপনার রক্তচাপের মাত্রা কম। স্বাস্থ্যকর রক্তচাপ বজায় রাখা হৃদরোগ, স্ট্রোক এবং কিডনির সমস্যার ঝুঁকি কমায়। নিয়মিত ব্যায়াম এবং সুষম খাদ্য অনেক বড় পরিবর্তন আনতে পারে!",
      maintainHighBloodPressureDesc:
        "আপনার রক্তচাপের মাত্রা বেশি। স্বাস্থ্যকর রক্তচাপ বজায় রাখা হৃদরোগ, স্ট্রোক এবং কিডনির সমস্যার ঝুঁকি কমায়। নিয়মিত ব্যায়াম এবং সুষম খাদ্য অনেক বড় পরিবর্তন আনতে পারে!",

      downloadSuccess: "সফলভাবে ডাউনলোড হয়েছে",
      goBackConfirmation: "আপনি কি নিশ্চিতভাবে ফিরে যেতে চান ?",
      pleaseWait: "অনুগ্রহ করে অপেক্ষা করুন!",
      goBeyond: "সাধারণের চেয়ে আরও এগিয়ে যান!",
      JoinPro:
        "আমাদের প্রো সদস্যদের সঙ্গে যোগ দিন এবং আপনার স্বাস্থ্য যাত্রাকে পরবর্তী স্তরে নিয়ে যান",
      WhyJoinPro: "কেন প্রো-তে যোগ দেবেন ?",
      UnlimitedReports: "সীমাহীন রিপোর্ট",
      FullReportHistory: "সম্পূর্ণ রিপোর্টের ইতিহাস",
      PrintYourQuestionnaire: "আপনার লোগো দিয়ে প্রশ্নমালা প্রিন্ট করুন",
      printYourReport: "আপনার লোগো দিয়ে ফাঁকা রিপোর্ট প্রিন্ট করুন",
      upgrade: "আপগ্রেড",
      yearlyPurchase: "বার্ষিক ক্রয়",
      thisOneForPro: "ওহ! এটি প্রো সদস্যদের জন্য।",
      proMembersDesc:
        "এই সুবিধাটি শুধুমাত্র আমাদের প্রো সদস্যদের জন্য সংরক্ষিত। যোগ দিতে চান? এখনই আপগ্রেড করুন এবং আপনার জন্য বিশেষভাবে তৈরি সুবিধাগুলো উপভোগ করুন!",
      UpgradeComplete: "আপগ্রেড সম্পন্ন!",
      NowAProMember: "আপনি এখন একজন প্রো সদস্য!",
      UpgradeTo: "আপগ্রেড করুন",
      SubscriptionCancelledSuccess: "সাবস্ক্রিপশন সফলভাবে বাতিল করা হয়েছে!",
      ConfirmSubCancel: "আপনি কি নিশ্চিতভাবে সাবস্ক্রিপশন বাতিল করতে চান ?",
      SubDaysRemaining: "সাবস্ক্রিপশনের অবশিষ্ট দিন :",
      RenewSub: "সাবস্ক্রিপশন নবায়ন করুন",
      cancelSub: "সাবস্ক্রিপশন বাতিল করুন",
      renewSubConfirmation:
        "আপনি যদি এখনই নবায়ন করতে চান, তাহলে আজ থেকে একটি নতুন বিলিং চক্র শুরু হবে এবং আপনার বর্তমান সাবস্ক্রিপশনের অবশিষ্ট সময় আর কার্যকর থাকবে না। আপনি কি নবায়ন করতে চান?",
      renew: "নবায়ন করুন",
      BloodPressure: "রক্তচাপ",
      BloodGlucose: "রক্তের গ্লুকোজ",
      BMI: "বিএমআই",
      PDFDonwload: "পিডিএফ ডাউনলোড করা হয়েছে !",
      PDFShared: "পিডিএফ শেয়ার করা হয়েছে !",
      Error: "কিছু একটা সমস্যা হয়েছে !",
      aboutTheApp: "অ্যাপ সম্পর্কে",
      GetStarted: "শুরু করুন",
      systolic: "সিস্টোলিক",
      diastolic: "ডায়াস্টোলিক",
      start: "শুরু করুন",
      enterRequiredFields: "অনুগ্রহ করে প্রয়োজনীয় সব তথ্য পূরণ করুন !",
      enterThisFields: "এই ঘরটি পূরণ করা আবশ্যক !",

      exit: "প্রস্থান",
      exitApp: "অ্যাপ থেকে প্রস্থান",
      appExitConfirmation: "আপনি কি অ্যাপ থেকে বের হতে চান ?",
      leavePage: "মূল্যায়ন থেকে বের হবেন ?",
      leavePageConfirmation:
        "এই পৃষ্ঠা থেকে বের হলে আপনার প্রবেশ করানো তথ্য মুছে যাবে",

      downloadOptions: "ডাউনলোড অপশন",
      a4Size: "A4 সাইজ",
      usLetter: "US লেটার",
      pdfDownloaded: "পিডিএফ ডাউনলোড হয়েছে !",
      addedToGroup: "সফলভাবে গ্রুপে যোগ করা হয়েছে !",
      success: "সফল",
      exportedTo: "এক্সপোর্ট করা হয়েছে",

      aboutTheAppDesc:
        "এই অ্যাপটি একজন ব্যক্তির জীবনধারার অভ্যাস অনুযায়ী তার শরীরের “স্বাস্থ্য বয়স” নির্ণয় করতে সাহায্য করে। এই অ্যাপটি সুপরিচিত আলামেদা কাউন্টি দীর্ঘায়ু গবেষণা এবং নতুন অ্যাডভেন্টিস্ট হেলথ স্টাডিজ — উভয়ের তথ্য একত্রিত করে। এটি অংশগ্রহণকারীদের নিজেদের স্বাস্থ্য অভ্যাস এবং মৃত্যুঝুঁকির মধ্যে থাকা দৃঢ় সম্পর্ক বুঝতে সাহায্য করে। এটি স্বাস্থ্য পরামর্শ প্রদানের একটি চমৎকার ভিত্তি তৈরি করে।",
      aboutTheAppTitle: "অ্যাপ সম্পর্কে",
    },
  },
  id: {
    translation: {
      welcome: "Selamat datang",
      chooseLanguage: "Pilih Bahasa",
      introduction: "Pengenalan",
      howItWorks: "Cara kerjanya",
      benefits: "Manfaat",
      discoverHealthAge: "Temukan Usia Kesehatan Anda!",
      lifestyleAffectsHealth:
        "Gaya hidup Anda memengaruhi kesehatan lebih dari yang Anda kira. Mari cari tahu seberapa muda Anda sebenarnya!",
      simpleScienceBacked: "Sederhana & Berbasis Ilmiah",
      answerQuestions:
        "Jawab beberapa pertanyaan tentang kebiasaan Anda, dan kami akan menghitung Usia Kesehatan Anda berdasarkan wawasan kesehatan yang nyata.",
      getPersonalizedTips: "Dapatkan Tips Kesehatan Personal",
      improveLifestyle:
        "Tingkatkan gaya hidup Anda dengan rekomendasi yang disesuaikan untuk mencapai potensi kesehatan terbaik Anda.",
      helpCalculateHealthAge: "Saya dapat membantu Anda menghitung usia kesehatan Anda.",
      startAssessment: "Mulai penilaian Anda sekarang",
      home: "Beranda",
      purchases: "Pembelian",
      history: "Riwayat",
      dailyLimit: "Batas Harian",

      getStarted:
        "Mari mulai. Usia kesehatan Anda didasarkan pada gaya hidup dan kebiasaan Anda.",
      whatIsYourName: "Siapa nama Anda?",
      enterName: "Masukkan Nama",
      next: "Berikutnya",
      whatIsYourAge: "Berapa usia Anda?",
      age: "Usia",
      whatIsYourGender: "Apa jenis kelamin Anda?",
      gender: "Jenis Kelamin",
      male: "Laki-laki",
      female: "Perempuan",
      whatIsYourHeight: "Berapa tinggi badan Anda?",
      height: "Tinggi Badan",
      whatIsYourWeight: "Berapa berat badan Anda?",
      weight: "Berat Badan",
      whatIsYourWaistCircumference: "Berapa lingkar pinggang Anda?",
      waistCircumference: "Lingkar pinggang",
      whatIsYourBloodPressure: "Berapa tekanan darah Anda?",
      bloodPressure: "Tekanan darah",
      whatIsYourBloodGlucose: "Berapa kadar gula darah Anda?",
      fasting: "Puasa",
      postMeals: "Setelah makan",
      bloodGlucoseLevel: "Kadar gula darah",

      newAssessment: "Penilaian Baru",
      howOftenEatBreakfast: "Seberapa sering Anda memakan sarapan yang baik?",
      breakfastNote: "(terutama biji-bijian utuh, buah atau sayuran, dan kacang-kacangan)",
      lessThan2Days: "Kurang dari 2 hari per minggu",
      twoToFourDays: "2 - 4 hari per minggu",
      fiveToSixDays: "5 - 6 hari per minggu",
      everyday: "Setiap hari",
      howOftenSnack: "Seberapa sering Anda ngemil?",
      severalTimesDay: "Beberapa kali sehari",
      onceDay: "Sekali sehari",
      fewTimesWeek: "Beberapa kali seminggu",
      rarelyNever: "Jarang atau tidak pernah",
      howManyFruitsVeggies: "Berapa porsi buah dan sayuran yang Anda makan per hari?",
      fruitsVeggiesNote:
        "(1 porsi = 1 buah sedang, 1 cangkir segar, ½ cangkir matang, atau 6 oz jus 100%)",
      howManyWholeGrains: "Berapa porsi biji-bijian utuh yang Anda makan per hari?",
      wholeGrainsNote:
        "(1 porsi = 1 irisan roti, ½ cangkir nasi merah atau oatmeal, ⅔ cangkir sereal kering)",
      none: "Tidak ada",
      back: "Kembali",
      howManyNutsSeeds:
        "Berapa porsi kacang-kacangan dan biji-bijian yang Anda makan per minggu?",
      nutsSeedsNote: "(1 porsi = 1 oz kacang atau biji-bijian, 2 sdm selai kacang)",
      howOftenRedMeat: "Seberapa sering Anda makan daging merah?",
      threeOrMoreTimesWeek: "3 kali atau lebih per minggu",
      onceTwiceMonth: "Sekali atau dua kali per bulan",
      never: "Tidak pernah",
      howOftenExercise:
        "Seberapa sering Anda mendapatkan 20 - 30 menit olahraga dengan intensitas sedang hingga berat?",
      rarely: "Jarang",
      oneTwoDaysWeek: "1 - 2 hari per minggu",
      threeFourDaysWeek: "3 - 4 hari per minggu",
      fiveMoreDaysWeek: "5 hari atau lebih per minggu",
      howIsWeight: "Bagaimana berat badan Anda?",
      severelyOverweight: "Berat badan sangat berlebih",
      moderatelyOverweight: "Berat badan agak berlebih",
      underweight: "Berat badan kurang",
      healthyWeight: "Berat badan sehat",
      howOftenSleep: "Seberapa sering Anda tidur 7 - 8 jam?",
      twoOrFewerDays: "2 hari atau kurang per minggu",
      threeFourDays: "3 - 4 hari per minggu",
      fiveSixDays: "5 - 6 hari per minggu",
      whatIsTobaccoHistory: "Bagaimana riwayat Anda dengan tembakau?",
      currentlyUse: "Masih menggunakan",
      quitLessThanTwoYears: "Berhenti kurang dari 2 tahun yang lalu",
      quitOverTwoYears: "Berhenti lebih dari 2 tahun yang lalu",
      neverUsed: "Tidak pernah menggunakan",
      howManyAlcohol: "Berapa banyak porsi alkohol yang Anda konsumsi per minggu?",
      alcoholNote: "(12 oz bir, 8 oz minuman malt, 5 oz anggur, 1,5 oz minuman keras)",
      excessiveAlcohol: "15+ (pria) atau 8+ (wanita)",
      howRateSpirituality: "Bagaimana Anda menilai spiritualitas Anda?",
      noInterest: "Tidak tertarik",
      moderatelySpiritual: "Agak spiritual",
      deeplySpiritual: "Sangat spiritual",

      Is_Interests: "Minat",
      Is_TellYourInterest:
        "Beri tahu kami apa yang Anda minati untuk menyesuaikan pengalaman Anda.",
      Is_WeightManagement: "Manajemen Berat Badan",
      Is_FitAndExercise: "Kebugaran dan Olahraga",
      Is_StopSmoking: "Berhenti Merokok",
      Is_HealthyCooking: "Memasak Sehat",
      Is_StressReduction: "Pengurangan Stres",
      Is_PreventHeartDisease: "Pencegahan Penyakit Jantung",
      Is_DepressionRecovery: "Pemulihan Depresi",
      Is_ReversingDiabetes: "Membalikkan Diabetes",
      Is_NaturalRemedies: "Obat Alami",
      Is_SpiritualHealth: "Kesehatan Spiritual",
      Is_ImprovingMentalPerformance: "Meningkatkan Kinerja Mental",
      Is_Other: "Lainnya",
      Is_Name: "Nama",
      Is_Email: "Email",
      Is_Address: "Alamat",
      Is_Phone: "Telepon",
      Is_Zip: "Kode Pos",
      Is_ShowReport: "Tampilkan Laporan",

      Rs_Report: "Laporan",
      Rs_CustomizedReport: "Laporan Kustom untuk :",
      Rs_YourHealthAge: "Usia kesehatan Anda",
      Rs_YourActualAge: "Usia sebenarnya Anda",
      Rs_CurrentAge: "Usia Saat Ini",
      Rs_HealthAge: "Usia Kesehatan",
      Rs_PotentialAge: "Usia Kesehatan Potensial",
      Rs_HealthyHabitsParagraph:
        "Beberapa penelitian besar, termasuk Studi Alameda County yang terkenal dan Studi Kesehatan Adventist, mengungkapkan hubungan yang kuat antara kebiasaan kesehatan yang tercantum di bawah ini dan risiko penyakit atau kematian seseorang. Individu yang menerapkan semua kebiasaan sehat ini dapat memengaruhi umur panjang mereka hampir 30 tahun.",
      Rs_MedicalDisclaimerTitle: "Penafian Medis",
      Rs_MedicalDisclaimerText:
        "Usia Kesehatan hanya ditujukan untuk tujuan informasi dan edukasi. Ini bukan diagnosis medis dan tidak boleh digunakan sebagai pengganti nasihat, diagnosis, atau perawatan medis profesional. Selalu konsultasikan dengan tenaga kesehatan yang berkualifikasi sebelum membuat keputusan medis apa pun atau mengubah perawatan kesehatan Anda.",
      Rs_MedicalSources: "Sumber Medis",
      Rs_Source: "Sumber",
      Rs_Recommendations: "Rekomendasi",
      Rs_1_title: "Makan sarapan yang baik setiap hari",
      Rs_1_desc:
        "Sarapan meningkatkan metabolisme, membantu konsentrasi, dan meningkatkan performa di sekolah dan tempat kerja. Sarapan juga membantu menjaga berat badan yang sehat.",
      Rs_2_title: "Hindari ngemil",
      Rs_2_desc:
        "Ngemil dapat menambah rata-rata 580 kalori per hari, mengganggu pencernaan, mengganggu kontrol gula darah, dan berkontribusi pada kenaikan berat badan.",
      Rs_3_title: "Nikmati lebih banyak buah dan sayuran",
      Rs_3_desc:
        "Buah dan sayuran kaya akan fitokimia, vitamin, dan serat, serta lebih rendah kalori.",
      Rs_4_title: "Tingkatkan asupan biji-bijian utuh",
      Rs_4_desc:
        "Biji-bijian utuh mengandung serat, vitamin B, dan mineral penting yang mendukung kesehatan secara keseluruhan.",
      Rs_5_title: "Makan lebih banyak kacang",
      Rs_5_desc:
        "Kacang adalah sumber protein dan lemak sehat yang sangat baik, dan membantu mengatur kadar gula darah.",
      Rs_6_title: "Hindari daging merah",
      Rs_6_desc:
        "Mengonsumsi daging merah telah dikaitkan dengan diabetes tipe 2, penyakit jantung, stroke, dan beberapa jenis kanker.",
      Rs_7_title: "Berolahraga secara teratur",
      Rs_7_desc:
        "Berolahraga meningkatkan energi, memperbaiki suasana hati dan kadar kolesterol, menurunkan tekanan darah, meningkatkan kualitas tidur, memperkuat kekebalan tubuh, dan membantu mengontrol gula darah.",
      Rs_8_title: "Capai berat badan yang sehat",
      Rs_8_desc:
        "Pertahankan BMI antara 18,5 - 24,9 dan lingkar pinggang yang sehat (kurang dari 40 inci untuk pria, 35 inci untuk wanita).",
      Rs_9_title: "Dapatkan 7-8 jam tidur yang nyenyak setiap malam",
      Rs_9_desc:
        "Tidur yang cukup mendukung memori, pembelajaran, metabolisme, dan fungsi kekebalan tubuh.",
      Rs_10_title: "Berhenti merokok",
      Rs_10_desc:
        "Merokok merusak setiap organ tubuh, meningkatkan risiko kanker, penyakit jantung, PPOK, asma, dan masalah gigi.",
      Rs_11_title: "Jangan minum alkohol",
      Rs_11_desc:
        "Penggunaan alkohol dapat menyebabkan masalah neurologis, kardiovaskular, dan psikiatrik, serta meningkatkan risiko kanker dan penyakit hati.",
      Rs_12_title: "Tingkatkan spiritualitas",
      Rs_12_desc:
        "Iman kepada Tuhan dapat meningkatkan kesehatan mental dan memperkuat fungsi kekebalan tubuh.",
      Rs_SavePdf: "Simpan pdf",
      Rs_ShareReport: "Bagikan Laporan",

      Hs_List: "Daftar",
      Hs_Group: "Grup",
      Hs_View: "Lihat",
      Hs_Filter: "Filter",
      Hs_Options: "Opsi",
      Hs_Export: "Ekspor",
      Hs_Delete: "Hapus",
      Hs_Search: "Cari",
      Hs_ExportAsCSV: "Ekspor sebagai CSV",
      Hs_Confirmation: "Apakah Anda yakin ingin menghapus ?",
      Hs_Success: "Item Dihapus",
      Hs_Cancel: "Batal",
      Hs_ItemsSelected: "Item Dipilih",
      Hs_SelectAll: "Pilih semua",
      Hs_NewGroup: "Grup Baru",
      Hs_ExistingGroup: "Grup yang Ada",
      Hs_Create: "Buat",
      Hs_GroupName: "Nama Grup",
      Hs_EnterGroupName: "Masukkan nama grup",
      Hs_Reports: "Laporan",
      Hs_save: "Simpan",
      Hs_Nothing: "Belum ada apa pun di sini!",
      Hs_NothingDesc:
        "Laporan usia kesehatan Anda akan muncul di sini setelah Anda menyelesaikan penilaian.",
      Hs_Download: "Unduh",
      Hs_LanguageChanged: "Bahasa berhasil diubah",
      Hs_Change: "Ubah",

      Fs_Filter: "Filter berdasarkan",
      Fs_Close: "Tutup",
      Fs_Date: "Tanggal",
      Fs_From: "Dari",
      Fs_To: "Sampai",
      Fs_ClearAll: "Hapus semua",
      Fs_ShowResults: "Tampilkan hasil",

      select: "Pilih",
      total: "Total",
      purchase: "Pembelian",
      aboutProgramme: "Tentang Program",
      reports: "Laporan",
      PrintQuestion: "Cetak Kuesioner",
      PrintReport: "Cetak Laporan Kosong",
      reportSetting: "Pengaturan Laporan",
      changeLanguage: "Ubah Bahasa",
      uploadLogo: "Unggah logo Anda",
      upload: "Unggah",
      contactDetails: "Detail Kontak",
      enterAddress: "Masukkan Alamat",
      enterPhone: "Masukkan Nomor Telepon",
      createGroup: "Buat Grup",

      normalBp: "Tekanan darah Anda normal",
      MaintainBp: "Harap jaga tekanan darah Anda",
      bpRange: "Rentang normal adalah 90-119/60-79 mmHg.",
      normalGlucoseLevel: "Kadar gula darah Anda normal",
      maintainGlucoseLevel: "Harap jaga kadar gula darah Anda",
      normalRangeGlucose: "Rentang normal adalah",
      for: "untuk tes",
      postMeal: "setelah makan",
      test: "ini",
      maintainBloodGlucose: "Pertahankan Kadar Gula Darah Anda",
      maintainLowBloodGlucoseDesc:
        "Kadar gula darah Anda rendah. Gula darah yang stabil mencegah komplikasi, meningkatkan energi, dan mendukung kesehatan secara keseluruhan. Pola makan seimbang dan olahraga membantu menjaganya tetap terkendali!",
      maintainHighBloodGlucoseDesc:
        "Kadar gula darah Anda tinggi. Gula darah yang stabil mencegah komplikasi, meningkatkan energi, dan mendukung kesehatan secara keseluruhan. Pola makan seimbang dan olahraga membantu menjaganya tetap terkendali!",
      maintainBloodPressure: "Jaga Tekanan Darah Tetap Terkontrol",
      maintainBloodPressureDesc:
        "Menjaga tekanan darah yang sehat mengurangi risiko penyakit jantung, stroke, dan masalah ginjal. Olahraga teratur dan pola makan seimbang dapat membuat perbedaan besar!",
      maintainLowBloodPressureDesc:
        "Tekanan darah Anda rendah. Menjaga tekanan darah yang sehat mengurangi risiko penyakit jantung, stroke, dan masalah ginjal. Olahraga teratur dan pola makan seimbang dapat membuat perbedaan besar!",
      maintainHighBloodPressureDesc:
        "Tekanan darah Anda tinggi. Menjaga tekanan darah yang sehat mengurangi risiko penyakit jantung, stroke, dan masalah ginjal. Olahraga teratur dan pola makan seimbang dapat membuat perbedaan besar!",

      downloadSuccess: "Berhasil diunduh",
      goBackConfirmation: "Apakah Anda yakin ingin kembali ?",
      pleaseWait: "Harap tunggu!",
      goBeyond: "Lampaui yang dasar!",
      JoinPro:
        "Bergabunglah dengan Anggota Pro kami dan bawa perjalanan kesehatan Anda ke tingkat berikutnya",
      WhyJoinPro: "Mengapa Bergabung dengan Pro ?",
      UnlimitedReports: "Laporan Tanpa Batas",
      FullReportHistory: "Riwayat Laporan Lengkap",
      PrintYourQuestionnaire: "Cetak Kuesioner dengan logo Anda",
      printYourReport: "Cetak Laporan Kosong dengan logo Anda",
      upgrade: "Tingkatkan",
      yearlyPurchase: "Pembelian tahunan",
      thisOneForPro: "Ups! Yang ini untuk Anggota PRO.",
      proMembersDesc:
        "Fitur ini khusus untuk Anggota Pro kami. Ingin bergabung? Tingkatkan sekarang dan nikmati manfaat eksklusif yang dirancang khusus untuk Anda!",
      UpgradeComplete: "Peningkatan Selesai!",
      NowAProMember: "Anda Sekarang Anggota Pro!",
      UpgradeTo: "Tingkatkan Ke",
      SubscriptionCancelledSuccess: "Langganan berhasil dibatalkan!",
      ConfirmSubCancel: "Apakah Anda yakin ingin membatalkan Langganan ?",
      SubDaysRemaining: "Sisa Hari Langganan :",
      RenewSub: "Perpanjang Langganan",
      cancelSub: "Batalkan Langganan",
      renewSubConfirmation:
        "Jika Anda memilih untuk memperpanjang sekarang, siklus penagihan baru akan dimulai hari ini, dan sisa durasi langganan Anda saat ini tidak akan berlaku lagi. Apakah Anda yakin ingin melanjutkan perpanjangan?",
      renew: "Perpanjang",
      BloodPressure: "Tekanan Darah",
      BloodGlucose: "Gula Darah",
      BMI: "BMI",
      PDFDonwload: "PDF telah diunduh !",
      PDFShared: "PDF telah dibagikan !",
      Error: "Terjadi kesalahan !",
      aboutTheApp: "Tentang Aplikasi",
      GetStarted: "Mulai",
      systolic: "Sistolik",
      diastolic: "Diastolik",
      start: "Mulai",
      enterRequiredFields: "Harap isi semua kolom yang wajib diisi !",
      enterThisFields: "Kolom ini wajib diisi !",

      exit: "Keluar",
      exitApp: "Keluar Aplikasi",
      appExitConfirmation: "Apakah Anda ingin keluar dari aplikasi ?",
      leavePage: "Keluar dari Penilaian ?",
      leavePageConfirmation:
        "Setelah Anda meninggalkan halaman ini, data yang Anda masukkan akan hilang",

      downloadOptions: "Opsi Unduhan",
      a4Size: "Ukuran A4",
      usLetter: "Ukuran US Letter",
      pdfDownloaded: "PDF diunduh !",
      addedToGroup: "Berhasil ditambahkan ke grup !",
      success: "Berhasil",
      exportedTo: "Diekspor ke",

      aboutTheAppDesc:
        "Aplikasi ini membantu menentukan “usia kesehatan” tubuh seseorang berdasarkan praktik gaya hidup individu tersebut. Aplikasi ini menggabungkan informasi dari studi umur panjang Alameda County yang terkenal dan Studi Kesehatan Adventist yang baru. Aplikasi ini membantu peserta memahami hubungan yang kuat antara kebiasaan kesehatan seseorang dan risiko kematian mereka. Aplikasi ini memberikan dasar yang sangat baik untuk konseling kesehatan.",
      aboutTheAppTitle: "Tentang Aplikasi",
    },
  },
  tr: {
    translation: {
      welcome: "Hoş geldiniz",
      chooseLanguage: "Dil Seçin",
      introduction: "Giriş",
      howItWorks: "Nasıl çalışır",
      benefits: "Faydaları",
      discoverHealthAge: "Sağlık Yaşınızı Keşfedin!",
      lifestyleAffectsHealth:
        "Yaşam tarzınız sağlığınızı düşündüğünüzden çok daha fazla etkiler. Gerçekte ne kadar genç olduğunuzu öğrenelim!",
      simpleScienceBacked: "Basit ve Bilimsel Temelli",
      answerQuestions:
        "Alışkanlıklarınızla ilgili birkaç soruyu yanıtlayın, biz de gerçek sağlık verilerine dayanarak Sağlık Yaşınızı hesaplayalım.",
      getPersonalizedTips: "Kişiselleştirilmiş Sağlık Önerileri Alın",
      improveLifestyle:
        "Özelleştirilmiş önerilerle yaşam tarzınızı iyileştirin ve en iyi sağlık potansiyelinize ulaşın.",
      helpCalculateHealthAge: "Sağlık yaşınızı hesaplamanıza yardımcı olabilirim.",
      startAssessment: "Değerlendirmenizi şimdi başlatın",
      home: "Ana Sayfa",
      purchases: "Satın Alımlar",
      history: "Geçmiş",
      dailyLimit: "Günlük Limit",

      getStarted:
        "Hadi başlayalım. Sağlık yaşınız yaşam tarzınıza ve alışkanlıklarınıza dayanır.",
      whatIsYourName: "Adınız nedir?",
      enterName: "Ad Girin",
      next: "İleri",
      whatIsYourAge: "Yaşınız kaç?",
      age: "Yaş",
      whatIsYourGender: "Cinsiyetiniz nedir?",
      gender: "Cinsiyet",
      male: "Erkek",
      female: "Kadın",
      whatIsYourHeight: "Boyunuz kaç?",
      height: "Boy",
      whatIsYourWeight: "Kilonuz kaç?",
      weight: "Kilo",
      whatIsYourWaistCircumference: "Bel çevreniz kaç?",
      waistCircumference: "Bel çevresi",
      whatIsYourBloodPressure: "Kan basıncınız kaç?",
      bloodPressure: "Kan basıncı",
      whatIsYourBloodGlucose: "Kan şekeri seviyeniz kaç?",
      fasting: "Açlık",
      postMeals: "Yemek sonrası",
      bloodGlucoseLevel: "Kan şekeri seviyesi",

      newAssessment: "Yeni Değerlendirme",
      howOftenEatBreakfast: "Ne sıklıkla iyi bir kahvaltı yaparsınız?",
      breakfastNote: "(Tam tahıllar, meyveler veya sebzeler ve kuruyemişlere vurgu yaparak)",
      lessThan2Days: "Haftada 2 günden az",
      twoToFourDays: "Haftada 2 - 4 gün",
      fiveToSixDays: "Haftada 5 - 6 gün",
      everyday: "Her gün",
      howOftenSnack: "Ne sıklıkla atıştırırsınız?",
      severalTimesDay: "Günde birkaç kez",
      onceDay: "Günde bir kez",
      fewTimesWeek: "Haftada birkaç kez",
      rarelyNever: "Nadiren veya hiç",
      howManyFruitsVeggies: "Günde kaç porsiyon meyve ve sebze yiyorsunuz?",
      fruitsVeggiesNote:
        "(1 porsiyon = 1 orta boy parça, 1 su bardağı taze, ½ su bardağı pişmiş veya 6 oz %100 meyve suyu)",
      howManyWholeGrains: "Günde kaç porsiyon tam tahıl tüketiyorsunuz?",
      wholeGrainsNote:
        "(1 porsiyon = 1 dilim ekmek, ½ su bardağı kahverengi pirinç veya yulaf ezmesi, ⅔ su bardağı kuru tahıl)",
      none: "Yok",
      back: "Geri",
      howManyNutsSeeds: "Haftada kaç porsiyon kuruyemiş ve tohum yiyorsunuz?",
      nutsSeedsNote: "(1 porsiyon = 28 gr kuruyemiş veya tohum, 2 yemek kaşığı fındık ezmesi)",
      howOftenRedMeat: "Ne sıklıkla kırmızı et yersiniz?",
      threeOrMoreTimesWeek: "Haftada 3 veya daha fazla kez",
      onceTwiceMonth: "Ayda bir ya da iki kez",
      never: "Hiç",
      howOftenExercise:
        "Ne sıklıkla 20-30 dakika orta ila yoğun egzersiz yapıyorsunuz?",
      rarely: "Nadiren",
      oneTwoDaysWeek: "Haftada 1 - 2 gün",
      threeFourDaysWeek: "Haftada 3 - 4 gün",
      fiveMoreDaysWeek: "Haftada 5 veya daha fazla gün",
      howIsWeight: "Kilonuz nasıl?",
      severelyOverweight: "Aşırı kilolu",
      moderatelyOverweight: "Orta derecede kilolu",
      underweight: "Zayıf",
      healthyWeight: "Sağlıklı kilo",
      howOftenSleep: "Ne sıklıkla 7 - 8 saat uyuyorsunuz?",
      twoOrFewerDays: "Haftada 2 gün veya daha az",
      threeFourDays: "Haftada 3 - 4 gün",
      fiveSixDays: "Haftada 5 - 6 gün",
      whatIsTobaccoHistory: "Tütünle geçmişiniz nedir?",
      currentlyUse: "Hâlen kullanıyorum",
      quitLessThanTwoYears: "2 yıldan kısa süre önce bıraktım",
      quitOverTwoYears: "2 yıldan uzun süre önce bıraktım",
      neverUsed: "Hiç kullanmadım",
      howManyAlcohol: "Haftada kaç porsiyon alkol tüketiyorsunuz?",
      alcoholNote: "(12 oz bira, 8 oz malt likör, 5 oz şarap, 1.5 oz shot)",
      excessiveAlcohol: "15+ (erkek) veya 8+ (kadın)",
      howRateSpirituality: "Maneviyatınızı nasıl değerlendirirsiniz?",
      noInterest: "İlgilenmiyorum",
      moderatelySpiritual: "Orta derecede manevi",
      deeplySpiritual: "Derinden manevi",

      Is_Interests: "İlgi alanları",
      Is_TellYourInterest:
        "Deneyiminizi kişiselleştirmek için nelerle ilgilendiğinizi bize bildirin.",
      Is_WeightManagement: "Kilo Yönetimi",
      Is_FitAndExercise: "Fitness ve Egzersiz",
      Is_StopSmoking: "Sigarayı Bırakma",
      Is_HealthyCooking: "Sağlıklı Yemek Pişirme",
      Is_StressReduction: "Stres Azaltma",
      Is_PreventHeartDisease: "Kalp Hastalığı Önleme",
      Is_DepressionRecovery: "Depresyon İyileşmesi",
      Is_ReversingDiabetes: "Diyabeti Tersine Çevirme",
      Is_NaturalRemedies: "Doğal Çözümler",
      Is_SpiritualHealth: "Ruhsal Sağlık",
      Is_ImprovingMentalPerformance: "Zihinsel Performansı Artırma",
      Is_Other: "Diğer",
      Is_Name: "İsim",
      Is_Email: "E-posta",
      Is_Address: "Adres",
      Is_Phone: "Telefon",
      Is_Zip: "Posta Kodu",
      Is_ShowReport: "Raporu Göster",

      Rs_Report: "Rapor",
      Rs_CustomizedReport: "Özelleştirilmiş Rapor :",
      Rs_YourHealthAge: "Sağlık yaşınız",
      Rs_YourActualAge: "Gerçek yaşınız",
      Rs_CurrentAge: "Mevcut Yaş",
      Rs_HealthAge: "Sağlık Yaşı",
      Rs_PotentialAge: "Potansiyel Sağlık Yaşı",
      Rs_HealthyHabitsParagraph:
        "İyi bilinen Alameda County Çalışması ve Adventist Sağlık Çalışmaları da dahil olmak üzere birkaç büyük araştırma, aşağıda listelenen sağlık alışkanlıkları ile hastalık ve ölüm riski arasında güçlü bir ilişki olduğunu ortaya koymaktadır. Tüm bu sağlıklı alışkanlıkları uygulayan bireyler, yaşam sürelerini neredeyse 30 yıl etkileyebilir.",
      Rs_MedicalDisclaimerTitle: "Tıbbi Sorumluluk Reddi",
      Rs_MedicalDisclaimerText:
        "Sağlık Yaşı yalnızca bilgilendirme ve eğitim amaçlıdır. Tıbbi bir teşhis değildir ve profesyonel tıbbi tavsiye, teşhis veya tedavinin yerine kullanılmamalıdır. Herhangi bir tıbbi karar vermeden veya sağlık bakımınızda değişiklik yapmadan önce daima nitelikli bir sağlık uzmanına danışın.",
      Rs_MedicalSources: "Tıbbi Kaynaklar",
      Rs_Source: "Kaynak",
      Rs_Recommendations: "Öneriler",
      Rs_1_title: "Her gün iyi bir kahvaltı yapın",
      Rs_1_desc:
        "Kahvaltı metabolizmayı hızlandırır, odaklanmaya yardımcı olur ve okulda ve işte performansı artırır. Ayrıca sağlıklı bir kiloyu korumaya da yardımcı olur.",
      Rs_2_title: "Atıştırmaktan kaçının",
      Rs_2_desc:
        "Atıştırmak günde ortalama 580 kalori ekleyebilir, sindirimi bozar, kan şekeri kontrolünü etkiler ve kilo alımına katkıda bulunur.",
      Rs_3_title: "Daha fazla meyve ve sebze tüketin",
      Rs_3_desc:
        "Meyve ve sebzeler fitokimyasallar, vitaminler ve lif açısından zengindir, ayrıca daha düşük kalorilidir.",
      Rs_4_title: "Tam tahıl alımını artırın",
      Rs_4_desc:
        "Tam tahıllar genel sağlığı destekleyen lif, B vitaminleri ve temel mineraller içerir.",
      Rs_5_title: "Daha fazla kuruyemiş yiyin",
      Rs_5_desc:
        "Kuruyemişler mükemmel bir protein ve sağlıklı yağ kaynağıdır ve kan şekeri seviyelerinin düzenlenmesine yardımcı olur.",
      Rs_6_title: "Kırmızı etten kaçının",
      Rs_6_desc:
        "Kırmızı et tüketimi tip 2 diyabet, kalp hastalığı, inme ve bazı kanser türleri ile ilişkilendirilmiştir.",
      Rs_7_title: "Düzenli egzersiz yapın",
      Rs_7_desc:
        "Egzersiz enerjiyi artırır, ruh halini ve kolesterol seviyelerini iyileştirir, kan basıncını düşürür, uykuyu iyileştirir, bağışıklığı güçlendirir ve kan şekerini kontrol etmeye yardımcı olur.",
      Rs_8_title: "Sağlıklı bir kiloya ulaşın",
      Rs_8_desc:
        "VKİ'nizi 18,5 - 24,9 arasında ve bel çevrenizi sağlıklı düzeyde tutun (erkeklerde 40 inçten, kadınlarda 35 inçten az).",
      Rs_9_title: "Her gece 7-8 saat iyi uyuyun",
      Rs_9_desc:
        "Yeterli uyku hafızayı, öğrenmeyi, metabolizmayı ve bağışıklık fonksiyonunu destekler.",
      Rs_10_title: "Sigarayı Bırakma",
      Rs_10_desc:
        "Sigara içmek vücuttaki her organa zarar verir; kanser, kalp hastalığı, KOAH, astım ve diş problemleri riskini artırır.",
      Rs_11_title: "Alkol almayın",
      Rs_11_desc:
        "Alkol kullanımı nörolojik, kardiyovasküler ve psikiyatrik sorunlara yol açabilir, ayrıca kanser ve karaciğer hastalığı riskini artırır.",
      Rs_12_title: "Maneviyatı artırın",
      Rs_12_desc:
        "Tanrı'ya inanmak zihinsel sağlığı iyileştirebilir ve bağışıklık fonksiyonunu güçlendirebilir.",
      Rs_SavePdf: "pdf kaydet",
      Rs_ShareReport: "Raporu Paylaş",

      Hs_List: "Liste",
      Hs_Group: "Grup",
      Hs_View: "Görüntüle",
      Hs_Filter: "Filtre",
      Hs_Options: "Seçenekler",
      Hs_Export: "Dışa Aktar",
      Hs_Delete: "Sil",
      Hs_Search: "Ara",
      Hs_ExportAsCSV: "CSV olarak dışa aktar",
      Hs_Confirmation: "Silmek istediğinizden emin misiniz ?",
      Hs_Success: "Öğe Silindi",
      Hs_Cancel: "İptal",
      Hs_ItemsSelected: "Öğe Seçildi",
      Hs_SelectAll: "Tümünü seç",
      Hs_NewGroup: "Yeni Grup",
      Hs_ExistingGroup: "Mevcut Grup",
      Hs_Create: "Oluştur",
      Hs_GroupName: "Grup Adı",
      Hs_EnterGroupName: "Grup adı girin",
      Hs_Reports: "Raporlar",
      Hs_save: "Kaydet",
      Hs_Nothing: "Burada henüz bir şey yok!",
      Hs_NothingDesc:
        "Değerlendirmeyi tamamladığınızda sağlık yaşı raporlarınız burada görünecek.",
      Hs_Download: "İndir",
      Hs_LanguageChanged: "Dil başarıyla değiştirildi",
      Hs_Change: "Değiştir",

      Fs_Filter: "Şuna göre filtrele",
      Fs_Close: "Kapat",
      Fs_Date: "Tarih",
      Fs_From: "Başlangıç",
      Fs_To: "Bitiş",
      Fs_ClearAll: "Tümünü temizle",
      Fs_ShowResults: "Sonuçları göster",

      select: "Seç",
      total: "Toplam",
      purchase: "Satın Al",
      aboutProgramme: "Program Hakkında",
      reports: "Raporlar",
      PrintQuestion: "Anketi Yazdır",
      PrintReport: "Boş Rapor Yazdır",
      reportSetting: "Rapor Ayarları",
      changeLanguage: "Dili Değiştir",
      uploadLogo: "Logonuzu yükleyin",
      upload: "Yükle",
      contactDetails: "İletişim Bilgileri",
      enterAddress: "Adres Girin",
      enterPhone: "Telefon Numarası Girin",
      createGroup: "Grup Oluştur",

      normalBp: "Kan basıncınız normal",
      MaintainBp: "Lütfen kan basıncınızı koruyun",
      bpRange: "Normal aralık 90-119/60-79 mmHg'dir.",
      normalGlucoseLevel: "Kan şekeri seviyeniz normal",
      maintainGlucoseLevel: "Lütfen kan şekeri seviyenizi koruyun",
      normalRangeGlucose: "Normal aralık",
      for: "—",
      postMeal: "Yemek sonrası",
      test: "testi için geçerlidir",
      maintainBloodGlucose: "Kan Şekeri Düzeyinizi Koruyun",
      maintainLowBloodGlucoseDesc:
        "Kan şekeriniz düşük. Dengeli kan şekeri komplikasyonları önler, enerjiyi artırır ve genel sağlığı destekler. Dengeli beslenme ve egzersiz bunu kontrol altında tutmaya yardımcı olur!",
      maintainHighBloodGlucoseDesc:
        "Kan şekeriniz yüksek. Dengeli kan şekeri komplikasyonları önler, enerjiyi artırır ve genel sağlığı destekler. Dengeli beslenme ve egzersiz bunu kontrol altında tutmaya yardımcı olur!",
      maintainBloodPressure: "Kan Basıncını Kontrol Altında Tutun",
      maintainBloodPressureDesc:
        "Sağlıklı kan basıncını korumak kalp hastalığı, inme ve böbrek problemleri riskini azaltır. Düzenli egzersiz ve dengeli beslenme büyük fark yaratabilir!",
      maintainLowBloodPressureDesc:
        "Kan basıncınız düşük. Sağlıklı kan basıncını korumak kalp hastalığı, inme ve böbrek problemleri riskini azaltır. Düzenli egzersiz ve dengeli beslenme büyük fark yaratabilir!",
      maintainHighBloodPressureDesc:
        "Kan basıncınız yüksek. Sağlıklı kan basıncını korumak kalp hastalığı, inme ve böbrek problemleri riskini azaltır. Düzenli egzersiz ve dengeli beslenme büyük fark yaratabilir!",

      downloadSuccess: "Başarıyla indirildi",
      goBackConfirmation: "Geri dönmek istediğinizden emin misiniz ?",
      pleaseWait: "Lütfen bekleyin!",
      goBeyond: "Temel özelliklerin ötesine geçin!",
      JoinPro:
        "Pro Üyelerimize katılın ve sağlık yolculuğunuzu bir üst seviyeye taşıyın",
      WhyJoinPro: "Neden Pro'ya Katılmalısınız ?",
      UnlimitedReports: "Sınırsız Rapor",
      FullReportHistory: "Tam Rapor Geçmişi",
      PrintYourQuestionnaire: "Anketi kendi logonuzla yazdırın",
      printYourReport: "Boş Raporları kendi logonuzla yazdırın",
      upgrade: "Yükselt",
      yearlyPurchase: "Yıllık satın alma",
      thisOneForPro: "Hop! Bu, PRO Üyelere özel.",
      proMembersDesc:
        "Bu özellik yalnızca Pro Üyelerimize özeldir. Katılmak ister misiniz? Hemen yükseltin ve size özel hazırlanmış ayrıcalıkların keyfini çıkarın!",
      UpgradeComplete: "Yükseltme Tamamlandı!",
      NowAProMember: "Artık bir Pro Üyesiniz!",
      UpgradeTo: "Şuna Yükselt",
      SubscriptionCancelledSuccess: "Abonelik başarıyla iptal edildi!",
      ConfirmSubCancel: "Aboneliği iptal etmek istediğinizden emin misiniz ?",
      SubDaysRemaining: "Kalan Abonelik Günü :",
      RenewSub: "Aboneliği Yenile",
      cancelSub: "Aboneliği İptal Et",
      renewSubConfirmation:
        "Şimdi yenilemeyi seçerseniz, bugünden itibaren yeni bir faturalandırma dönemi başlayacak ve mevcut aboneliğinizin kalan süresi geçerliliğini yitirecektir. Yenilemeye devam etmek istediğinizden emin misiniz?",
      renew: "Yenile",
      BloodPressure: "Kan Basıncı",
      BloodGlucose: "Kan Şekeri",
      BMI: "VKİ",
      PDFDonwload: "PDF indirildi !",
      PDFShared: "PDF paylaşıldı !",
      Error: "Bir şeyler ters gitti !",
      aboutTheApp: "Uygulama Hakkında",
      GetStarted: "Başla",
      systolic: "Sistolik",
      diastolic: "Diyastolik",
      start: "Başla",
      enterRequiredFields: "Lütfen gerekli tüm alanları doldurun !",
      enterThisFields: "Bu alan zorunludur !",

      exit: "Çıkış",
      exitApp: "Uygulamadan Çık",
      appExitConfirmation: "Uygulamadan çıkmak istiyor musunuz ?",
      leavePage: "Değerlendirmeden çıkılsın mı ?",
      leavePageConfirmation:
        "Bu sayfadan ayrıldığınızda girdiğiniz veriler kaybolacak",

      downloadOptions: "İndirme Seçenekleri",
      a4Size: "A4 boyutu",
      usLetter: "US Letter boyutu",
      pdfDownloaded: "PDF indirildi !",
      addedToGroup: "Gruba başarıyla eklendi !",
      success: "Başarılı",
      exportedTo: "Şuraya aktarıldı",

      aboutTheAppDesc:
        "Bu uygulama, bireyin yaşam tarzı alışkanlıklarına göre vücudunun “sağlık yaşını” belirlemeye yardımcı olur. Bu uygulama, iyi bilinen Alameda County uzun yaşam çalışmaları ile yeni Adventist Sağlık Çalışmalarının bilgilerini bir araya getirir. Katılımcıların sağlık alışkanlıkları ile ölüm riskleri arasındaki güçlü ilişkiyi anlamalarına yardımcı olur. Sağlık danışmanlığı için mükemmel bir temel sağlar.",
      aboutTheAppTitle: "Uygulama Hakkında",
    },
  },
  te: {
    translation: {
      welcome: "స్వాగతం",
      chooseLanguage: "భాషను ఎంచుకోండి",
      introduction: "పరిచయం",
      howItWorks: "ఇది ఎలా పనిచేస్తుంది",
      benefits: "ప్రయోజనాలు",
      discoverHealthAge: "మీ ఆరోగ్య వయస్సును తెలుసుకోండి!",
      lifestyleAffectsHealth:
        "మీ జీవనశైలి మీరు అనుకున్నదానికంటే ఎక్కువగా మీ ఆరోగ్యాన్ని ప్రభావితం చేస్తుంది. మీరు నిజంగా ఎంత యువకులో తెలుసుకుందాం!",
      simpleScienceBacked: "సరళం & శాస్త్రీయ ఆధారితం",
      answerQuestions:
        "మీ అలవాట్ల గురించి కొన్ని ప్రశ్నలకు సమాధానం ఇవ్వండి, నిజమైన ఆరోగ్య సమాచారం ఆధారంగా మేము మీ ఆరోగ్య వయస్సును లెక్కిస్తాము.",
      getPersonalizedTips: "వ్యక్తిగత ఆరోగ్య సూచనలు పొందండి",
      improveLifestyle:
        "మీ ఉత్తమ ఆరోగ్య సామర్థ్యాన్ని చేరుకోవడానికి అనుకూలీకరించిన సిఫార్సులతో మీ జీవనశైలిని మెరుగుపరచుకోండి.",
      helpCalculateHealthAge: "మీ ఆరోగ్య వయస్సును లెక్కించడంలో నేను సహాయపడగలను.",
      startAssessment: "ఇప్పుడే మీ మూల్యాంకనాన్ని ప్రారంభించండి",
      home: "హోమ్",
      purchases: "కొనుగోళ్లు",
      history: "చరిత్ర",
      dailyLimit: "రోజువారీ పరిమితి",

      getStarted:
        "ప్రారంభిద్దాం. మీ ఆరోగ్య వయస్సు మీ జీవనశైలి మరియు అలవాట్లపై ఆధారపడి ఉంటుంది.",
      whatIsYourName: "మీ పేరు ఏమిటి?",
      enterName: "పేరు నమోదు చేయండి",
      next: "తదుపరి",
      whatIsYourAge: "మీ వయస్సు ఎంత?",
      age: "వయస్సు",
      whatIsYourGender: "మీ లింగం ఏమిటి?",
      gender: "లింగం",
      male: "పురుషుడు",
      female: "స్త్రీ",
      whatIsYourHeight: "మీ ఎత్తు ఎంత?",
      height: "ఎత్తు",
      whatIsYourWeight: "మీ బరువు ఎంత?",
      weight: "బరువు",
      whatIsYourWaistCircumference: "మీ నడుము చుట్టుకొలత ఎంత?",
      waistCircumference: "నడుము చుట్టుకొలత",
      whatIsYourBloodPressure: "మీ రక్తపోటు ఎంత?",
      bloodPressure: "రక్తపోటు",
      whatIsYourBloodGlucose: "మీ రక్తంలో గ్లూకోజ్ స్థాయి ఎంత?",
      fasting: "ఉపవాసం",
      postMeals: "భోజనం తర్వాత",
      bloodGlucoseLevel: "రక్తంలో గ్లూకోజ్ స్థాయి",

      newAssessment: "కొత్త మూల్యాంకనం",
      howOftenEatBreakfast: "మీరు ఎంత తరచుగా మంచి అల్పాహారం తీసుకుంటారు?",
      breakfastNote: "(పూర్తి ధాన్యాలు, పండ్లు లేదా కూరగాయలు మరియు గింజలకు ప్రాధాన్యత ఇస్తూ)",
      lessThan2Days: "వారానికి 2 రోజుల కంటే తక్కువ",
      twoToFourDays: "వారానికి 2 - 4 రోజులు",
      fiveToSixDays: "వారానికి 5 - 6 రోజులు",
      everyday: "ప్రతిరోజూ",
      howOftenSnack: "మీరు ఎంత తరచుగా అల్పాహారం తింటారు?",
      severalTimesDay: "రోజుకు అనేకసార్లు",
      onceDay: "రోజుకు ఒకసారి",
      fewTimesWeek: "వారానికి కొన్నిసార్లు",
      rarelyNever: "అరుదుగా లేదా ఎప్పుడూ కాదు",
      howManyFruitsVeggies: "మీరు రోజుకు ఎన్ని సర్వింగ్‌ల పండ్లు మరియు కూరగాయలు తింటారు?",
      fruitsVeggiesNote:
        "(1 సర్వింగ్ = 1 మధ్యస్థ ముక్క, 1 కప్పు తాజా, ½ కప్పు వండినది, లేదా 6 ఔన్సుల 100% రసం)",
      howManyWholeGrains: "మీరు రోజుకు ఎన్ని సర్వింగ్‌ల పూర్తి ధాన్యాలు తింటారు?",
      wholeGrainsNote:
        "(1 సర్వింగ్ = 1 స్లైస్ బ్రెడ్, ½ కప్పు బ్రౌన్ రైస్ లేదా ఓట్స్, ⅔ కప్పు డ్రై సీరియల్)",
      none: "ఏదీ లేదు",
      back: "వెనుకకు",
      howManyNutsSeeds: "మీరు వారానికి ఎన్ని సర్వింగ్‌ల గింజలు మరియు విత్తనాలు తింటారు?",
      nutsSeedsNote: "(1 సర్వింగ్ = 1 ఔన్సు గింజలు లేదా విత్తనాలు, 2 టేబుల్ స్పూన్ల నట్ బటర్)",
      howOftenRedMeat: "మీరు ఎంత తరచుగా ఎర్ర మాంసం తింటారు?",
      threeOrMoreTimesWeek: "వారానికి 3 లేదా అంతకంటే ఎక్కువ సార్లు",
      onceTwiceMonth: "నెలకు ఒకటి లేదా రెండు సార్లు",
      never: "ఎప్పుడూ కాదు",
      howOftenExercise:
        "మీరు ఎంత తరచుగా 20-30 నిమిషాల మధ్యస్థ నుండి తీవ్రమైన వ్యాయామం చేస్తారు?",
      rarely: "అరుదుగా",
      oneTwoDaysWeek: "వారానికి 1 - 2 రోజులు",
      threeFourDaysWeek: "వారానికి 3 - 4 రోజులు",
      fiveMoreDaysWeek: "వారానికి 5 లేదా అంతకంటే ఎక్కువ రోజులు",
      howIsWeight: "మీ బరువు ఎలా ఉంది?",
      severelyOverweight: "తీవ్రంగా అధిక బరువు",
      moderatelyOverweight: "మధ్యస్థంగా అధిక బరువు",
      underweight: "తక్కువ బరువు",
      healthyWeight: "ఆరోగ్యకరమైన బరువు",
      howOftenSleep: "మీరు ఎంత తరచుగా 7 - 8 గంటలు నిద్రపోతారు?",
      twoOrFewerDays: "వారానికి 2 రోజులు లేదా అంతకంటే తక్కువ",
      threeFourDays: "వారానికి 3 - 4 రోజులు",
      fiveSixDays: "వారానికి 5 - 6 రోజులు",
      whatIsTobaccoHistory: "పొగాకుతో మీ చరిత్ర ఏమిటి?",
      currentlyUse: "ప్రస్తుతం ఉపయోగిస్తున్నాను",
      quitLessThanTwoYears: "2 సంవత్సరాల కంటే తక్కువ కాలం క్రితం మానేశాను",
      quitOverTwoYears: "2 సంవత్సరాల కంటే ఎక్కువ కాలం క్రితం మానేశాను",
      neverUsed: "ఎప్పుడూ ఉపయోగించలేదు",
      howManyAlcohol: "మీరు వారానికి ఎన్ని సర్వింగ్‌ల మద్యం సేవిస్తారు?",
      alcoholNote: "(12 ఔన్సుల బీర్, 8 ఔన్సుల మాల్ట్ లికర్, 5 ఔన్సుల వైన్, 1.5 ఔన్సుల షాట్)",
      excessiveAlcohol: "15+ (పురుషులు) లేదా 8+ (స్త్రీలు)",
      howRateSpirituality: "మీ ఆధ్యాత్మికతను మీరు ఎలా అంచనా వేస్తారు?",
      noInterest: "ఆసక్తి లేదు",
      moderatelySpiritual: "మధ్యస్థంగా ఆధ్యాత్మికం",
      deeplySpiritual: "లోతుగా ఆధ్యాత్మికం",

      Is_Interests: "అభిరుచులు",
      Is_TellYourInterest:
        "మీ అనుభవాన్ని అనుకూలీకరించడానికి మీకు దేనిపై ఆసక్తి ఉందో మాకు తెలియజేయండి.",
      Is_WeightManagement: "బరువు నిర్వహణ",
      Is_FitAndExercise: "ఫిట్‌నెస్ మరియు వ్యాయామం",
      Is_StopSmoking: "ధూమపానం మానడం",
      Is_HealthyCooking: "ఆరోగ్యకరమైన వంట",
      Is_StressReduction: "మానసిక ఒత్తిడిని తగ్గించడం",
      Is_PreventHeartDisease: "హృద్రోగ నివారణ",
      Is_DepressionRecovery: "డిప్రెషన్ నుండి కోలుకోవడం",
      Is_ReversingDiabetes: "మధుమేహాన్ని తిప్పికొట్టడం",
      Is_NaturalRemedies: "సహజ చికిత్సలు",
      Is_SpiritualHealth: "ఆధ్యాత్మిక ఆరోగ్యం",
      Is_ImprovingMentalPerformance: "మానసిక సామర్థ్యాన్ని మెరుగుపరచడం",
      Is_Other: "ఇతరం",
      Is_Name: "పేరు",
      Is_Email: "ఇమెయిల్",
      Is_Address: "చిరునామా",
      Is_Phone: "ఫోన్",
      Is_Zip: "పిన్ కోడ్",
      Is_ShowReport: "రిపోర్ట్ చూపించు",

      Rs_Report: "రిపోర్ట్",
      Rs_CustomizedReport: "కస్టమైజ్ చేసిన రిపోర్ట్ :",
      Rs_YourHealthAge: "మీ ఆరోగ్య వయస్సు",
      Rs_YourActualAge: "మీ వాస్తవ వయస్సు",
      Rs_CurrentAge: "ప్రస్తుత వయస్సు",
      Rs_HealthAge: "ఆరోగ్య వయస్సు",
      Rs_PotentialAge: "సంభావ్య ఆరోగ్య వయస్సు",
      Rs_HealthyHabitsParagraph:
        "ప్రసిద్ధ అలమేడా కౌంటీ అధ్యయనం మరియు అడ్వెంటిస్ట్ ఆరోగ్య అధ్యయనాలతో సహా అనేక పెద్ద పరిశోధనలు, క్రింద పేర్కొన్న ఆరోగ్య అలవాట్లకు మరియు వ్యాధి లేదా మరణ ప్రమాదానికి మధ్య బలమైన సంబంధాన్ని వెల్లడిస్తున్నాయి. ఈ ఆరోగ్యకరమైన అలవాట్లన్నింటినీ పాటించే వ్యక్తులు తమ ఆయుష్షును దాదాపు 30 సంవత్సరాల వరకు ప్రభావితం చేయగలరు.",
      Rs_MedicalDisclaimerTitle: "వైద్య నిరాకరణ",
      Rs_MedicalDisclaimerText:
        "ఆరోగ్య వయస్సు కేవలం సమాచార మరియు విద్యా ప్రయోజనాల కోసం మాత్రమే. ఇది వైద్య నిర్ధారణ కాదు మరియు వృత్తిపరమైన వైద్య సలహా, నిర్ధారణ లేదా చికిత్సకు ప్రత్యామ్నాయంగా ఉపయోగించకూడదు. ఏదైనా వైద్య నిర్ణయం తీసుకునే ముందు లేదా మీ ఆరోగ్య సంరక్షణలో మార్పులు చేసే ముందు ఎల్లప్పుడూ అర్హత కలిగిన వైద్య నిపుణుడిని సంప్రదించండి.",
      Rs_MedicalSources: "వైద్య మూలాలు",
      Rs_Source: "మూలం",
      Rs_Recommendations: "సిఫార్సులు",
      Rs_1_title: "ప్రతిరోజూ మంచి అల్పాహారం తీసుకోండి",
      Rs_1_desc:
        "అల్పాహారం జీవక్రియను పెంచుతుంది, ఏకాగ్రతకు సహాయపడుతుంది మరియు పాఠశాల మరియు పనిలో పనితీరును మెరుగుపరుస్తుంది. ఇది ఆరోగ్యకరమైన బరువును నిలుపుకోవడంలో కూడా సహాయపడుతుంది.",
      Rs_2_title: "అల్పాహారం మధ్య తినడం మానుకోండి",
      Rs_2_desc:
        "మధ్యలో తినడం రోజుకు సగటున 580 కేలరీలు జోడించవచ్చు, జీర్ణక్రియను దెబ్బతీస్తుంది, రక్తంలో చక్కెర నియంత్రణను భంగపరుస్తుంది మరియు బరువు పెరగడానికి దోహదం చేస్తుంది.",
      Rs_3_title: "మరిన్ని పండ్లు మరియు కూరగాయలు తినండి",
      Rs_3_desc:
        "పండ్లు మరియు కూరగాయలు ఫైటోకెమికల్స్, విటమిన్లు మరియు పీచుపదార్థంతో సమృద్ధిగా ఉంటాయి, అలాగే తక్కువ కేలరీలు కలిగి ఉంటాయి.",
      Rs_4_title: "పూర్తి ధాన్యాల వినియోగాన్ని పెంచండి",
      Rs_4_desc:
        "పూర్తి ధాన్యాలలో మొత్తం ఆరోగ్యానికి తోడ్పడే పీచుపదార్థం, బి విటమిన్లు మరియు అవసరమైన ఖనిజాలు ఉంటాయి.",
      Rs_5_title: "మరిన్ని గింజలు తినండి",
      Rs_5_desc:
        "గింజలు ప్రోటీన్ మరియు ఆరోగ్యకరమైన కొవ్వుల అద్భుతమైన మూలం, అలాగే రక్తంలో చక్కెర స్థాయిలను నియంత్రించడంలో సహాయపడతాయి.",
      Rs_6_title: "ఎర్ర మాంసం మానుకోండి",
      Rs_6_desc:
        "ఎర్ర మాంసం తినడం టైప్ 2 మధుమేహం, గుండె జబ్బు, స్ట్రోక్ మరియు కొన్ని రకాల క్యాన్సర్‌లతో సంబంధం కలిగి ఉంది.",
      Rs_7_title: "క్రమం తప్పకుండా వ్యాయామం చేయండి",
      Rs_7_desc:
        "వ్యాయామం శక్తిని పెంచుతుంది, మానసిక స్థితిని మరియు కొలెస్ట్రాల్ స్థాయిలను మెరుగుపరుస్తుంది, రక్తపోటును తగ్గిస్తుంది, నిద్రను మెరుగుపరుస్తుంది, రోగనిరోధక శక్తిని బలపరుస్తుంది మరియు రక్తంలో చక్కెరను నియంత్రించడంలో సహాయపడుతుంది.",
      Rs_8_title: "ఆరోగ్యకరమైన బరువును సాధించండి",
      Rs_8_desc:
        "BMI 18.5 - 24.9 మధ్య మరియు ఆరోగ్యకరమైన నడుము చుట్టుకొలతను నిర్వహించండి (పురుషులకు 40 అంగుళాల కంటే తక్కువ, స్త్రీలకు 35 అంగుళాల కంటే తక్కువ).",
      Rs_9_title: "ప్రతి రాత్రి 7-8 గంటల మంచి నిద్ర పొందండి",
      Rs_9_desc:
        "తగినంత నిద్ర జ్ఞాపకశక్తి, నేర్చుకోవడం, జీవక్రియ మరియు రోగనిరోధక పనితీరుకు తోడ్పడుతుంది.",
      Rs_10_title: "ధూమపానం మానండి",
      Rs_10_desc:
        "ధూమపానం శరీరంలోని ప్రతి అవయవాన్ని దెబ్బతీస్తుంది, క్యాన్సర్, గుండె జబ్బు, COPD, ఆస్తమా మరియు దంత సమస్యల ప్రమాదాన్ని పెంచుతుంది.",
      Rs_11_title: "మద్యం తాగవద్దు",
      Rs_11_desc:
        "మద్యం వినియోగం నాడీ, హృదయనాళ మరియు మానసిక సమస్యలకు దారితీయవచ్చు, అలాగే క్యాన్సర్ మరియు కాలేయ వ్యాధి ప్రమాదాన్ని పెంచుతుంది.",
      Rs_12_title: "ఆధ్యాత్మికతను పెంపొందించండి",
      Rs_12_desc:
        "దేవుడిపై విశ్వాసం మానసిక ఆరోగ్యాన్ని మెరుగుపరచవచ్చు మరియు రోగనిరోధక శక్తిని బలపరచవచ్చు.",
      Rs_SavePdf: "pdf సేవ్ చేయండి",
      Rs_ShareReport: "రిపోర్ట్ షేర్ చేయండి",

      Hs_List: "జాబితా",
      Hs_Group: "గ్రూప్",
      Hs_View: "చూడండి",
      Hs_Filter: "ఫిల్టర్",
      Hs_Options: "ఎంపికలు",
      Hs_Export: "ఎగుమతి",
      Hs_Delete: "తొలగించు",
      Hs_Search: "వెతకండి",
      Hs_ExportAsCSV: "CSV గా ఎగుమతి చేయండి",
      Hs_Confirmation: "మీరు తొలగించాలనుకుంటున్నారని ఖచ్చితంగా ఉన్నారా ?",
      Hs_Success: "అంశం తొలగించబడింది",
      Hs_Cancel: "రద్దు",
      Hs_ItemsSelected: "అంశాలు ఎంపిక చేయబడ్డాయి",
      Hs_SelectAll: "అన్నీ ఎంచుకోండి",
      Hs_NewGroup: "కొత్త గ్రూప్",
      Hs_ExistingGroup: "ఉన్న గ్రూప్",
      Hs_Create: "సృష్టించు",
      Hs_GroupName: "గ్రూప్ పేరు",
      Hs_EnterGroupName: "గ్రూప్ పేరును నమోదు చేయండి",
      Hs_Reports: "రిపోర్టులు",
      Hs_save: "సేవ్ చేయండి",
      Hs_Nothing: "ఇక్కడ ఇంకా ఏమీ లేదు!",
      Hs_NothingDesc:
        "మీరు మూల్యాంకనాన్ని పూర్తి చేసిన తర్వాత మీ ఆరోగ్య వయస్సు రిపోర్టులు ఇక్కడ కనిపిస్తాయి.",
      Hs_Download: "డౌన్‌లోడ్",
      Hs_LanguageChanged: "భాష విజయవంతంగా మార్చబడింది",
      Hs_Change: "మార్చు",

      Fs_Filter: "దీని ప్రకారం ఫిల్టర్ చేయండి",
      Fs_Close: "మూసివేయి",
      Fs_Date: "తేదీ",
      Fs_From: "నుండి",
      Fs_To: "వరకు",
      Fs_ClearAll: "అన్నీ తొలగించు",
      Fs_ShowResults: "ఫలితాలను చూపించు",

      select: "ఎంచుకోండి",
      total: "మొత్తం",
      purchase: "కొనుగోలు",
      aboutProgramme: "కార్యక్రమం గురించి",
      reports: "రిపోర్టులు",
      PrintQuestion: "ప్రశ్నావళిని ముద్రించండి",
      PrintReport: "ఖాళీ రిపోర్ట్ ముద్రించండి",
      reportSetting: "రిపోర్ట్ సెట్టింగ్‌లు",
      changeLanguage: "భాషను మార్చండి",
      uploadLogo: "మీ లోగోను అప్‌లోడ్ చేయండి",
      upload: "అప్‌లోడ్",
      contactDetails: "సంప్రదింపు వివరాలు",
      enterAddress: "చిరునామా నమోదు చేయండి",
      enterPhone: "ఫోన్ నంబర్ నమోదు చేయండి",
      createGroup: "గ్రూప్ సృష్టించండి",

      normalBp: "మీ రక్తపోటు సాధారణంగా ఉంది",
      MaintainBp: "దయచేసి మీ రక్తపోటును నియంత్రణలో ఉంచండి",
      bpRange: "సాధారణ పరిధి 90-119/60-79 mmHg.",
      normalGlucoseLevel: "మీ రక్తంలో గ్లూకోజ్ స్థాయి సాధారణంగా ఉంది",
      maintainGlucoseLevel: "దయచేసి మీ రక్తంలో గ్లూకోజ్ స్థాయిని నియంత్రణలో ఉంచండి",
      normalRangeGlucose: "సాధారణ పరిధి",
      for: "—",
      postMeal: "భోజనం తర్వాత",
      test: "పరీక్షకు వర్తిస్తుంది",
      maintainBloodGlucose: "మీ రక్తంలో గ్లూకోజ్ స్థాయిలను నిర్వహించండి",
      maintainLowBloodGlucoseDesc:
        "మీ రక్తంలో గ్లూకోజ్ స్థాయి తక్కువగా ఉంది. స్థిరమైన రక్తంలో గ్లూకోజ్ సమస్యలను నివారిస్తుంది, శక్తిని పెంచుతుంది మరియు మొత్తం ఆరోగ్యానికి తోడ్పడుతుంది. సమతుల్య ఆహారం మరియు వ్యాయామం దీన్ని నియంత్రణలో ఉంచడంలో సహాయపడతాయి!",
      maintainHighBloodGlucoseDesc:
        "మీ రక్తంలో గ్లూకోజ్ స్థాయి ఎక్కువగా ఉంది. స్థిరమైన రక్తంలో గ్లూకోజ్ సమస్యలను నివారిస్తుంది, శక్తిని పెంచుతుంది మరియు మొత్తం ఆరోగ్యానికి తోడ్పడుతుంది. సమతుల్య ఆహారం మరియు వ్యాయామం దీన్ని నియంత్రణలో ఉంచడంలో సహాయపడతాయి!",
      maintainBloodPressure: "రక్తపోటును నియంత్రణలో ఉంచండి",
      maintainBloodPressureDesc:
        "ఆరోగ్యకరమైన రక్తపోటును నిర్వహించడం గుండె జబ్బు, స్ట్రోక్ మరియు మూత్రపిండ సమస్యల ప్రమాదాన్ని తగ్గిస్తుంది. క్రమం తప్పని వ్యాయామం మరియు సమతుల్య ఆహారం పెద్ద మార్పు తీసుకురాగలవు!",
      maintainLowBloodPressureDesc:
        "మీ రక్తపోటు తక్కువగా ఉంది. ఆరోగ్యకరమైన రక్తపోటును నిర్వహించడం గుండె జబ్బు, స్ట్రోక్ మరియు మూత్రపిండ సమస్యల ప్రమాదాన్ని తగ్గిస్తుంది. క్రమం తప్పని వ్యాయామం మరియు సమతుల్య ఆహారం పెద్ద మార్పు తీసుకురాగలవు!",
      maintainHighBloodPressureDesc:
        "మీ రక్తపోటు ఎక్కువగా ఉంది. ఆరోగ్యకరమైన రక్తపోటును నిర్వహించడం గుండె జబ్బు, స్ట్రోక్ మరియు మూత్రపిండ సమస్యల ప్రమాదాన్ని తగ్గిస్తుంది. క్రమం తప్పని వ్యాయామం మరియు సమతుల్య ఆహారం పెద్ద మార్పు తీసుకురాగలవు!",

      downloadSuccess: "విజయవంతంగా డౌన్‌లోడ్ చేయబడింది",
      goBackConfirmation: "మీరు వెనుకకు వెళ్లాలనుకుంటున్నారని ఖచ్చితంగా ఉన్నారా ?",
      pleaseWait: "దయచేసి వేచి ఉండండి!",
      goBeyond: "ప్రాథమిక సౌకర్యాలకు మించి వెళ్లండి!",
      JoinPro:
        "మా ప్రో సభ్యులతో చేరండి మరియు మీ ఆరోగ్య ప్రయాణాన్ని తదుపరి స్థాయికి తీసుకెళ్లండి",
      WhyJoinPro: "ప్రోలో ఎందుకు చేరాలి ?",
      UnlimitedReports: "అపరిమిత రిపోర్టులు",
      FullReportHistory: "పూర్తి రిపోర్ట్ చరిత్ర",
      PrintYourQuestionnaire: "మీ లోగోతో ప్రశ్నావళిని ముద్రించండి",
      printYourReport: "మీ లోగోతో ఖాళీ రిపోర్టులను ముద్రించండి",
      upgrade: "అప్‌గ్రేడ్",
      yearlyPurchase: "వార్షిక కొనుగోలు",
      thisOneForPro: "అయ్యో! ఇది ప్రో సభ్యుల కోసం.",
      proMembersDesc:
        "ఈ ఫీచర్ మా ప్రో సభ్యుల కోసం మాత్రమే. చేరాలనుకుంటున్నారా? ఇప్పుడే అప్‌గ్రేడ్ చేసి మీ కోసం ప్రత్యేకంగా రూపొందించిన ప్రయోజనాలను ఆస్వాదించండి!",
      UpgradeComplete: "అప్‌గ్రేడ్ పూర్తయింది!",
      NowAProMember: "మీరు ఇప్పుడు ప్రో సభ్యులు!",
      UpgradeTo: "దీనికి అప్‌గ్రేడ్ చేయండి",
      SubscriptionCancelledSuccess: "సబ్‌స్క్రిప్షన్ విజయవంతంగా రద్దు చేయబడింది!",
      ConfirmSubCancel: "మీరు సబ్‌స్క్రిప్షన్‌ను రద్దు చేయాలనుకుంటున్నారని ఖచ్చితంగా ఉన్నారా ?",
      SubDaysRemaining: "సబ్‌స్క్రిప్షన్ మిగిలిన రోజులు :",
      RenewSub: "సబ్‌స్క్రిప్షన్ పునరుద్ధరించండి",
      cancelSub: "సబ్‌స్క్రిప్షన్ రద్దు చేయండి",
      renewSubConfirmation:
        "మీరు ఇప్పుడు పునరుద్ధరించాలని ఎంచుకుంటే, ఈరోజు నుండి కొత్త బిల్లింగ్ చక్రం ప్రారంభమవుతుంది మరియు మీ ప్రస్తుత సబ్‌స్క్రిప్షన్ మిగిలిన వ్యవధి చెల్లుబాటు కాదు. మీరు పునరుద్ధరణతో కొనసాగాలనుకుంటున్నారా?",
      renew: "పునరుద్ధరించు",
      BloodPressure: "రక్తపోటు",
      BloodGlucose: "రక్తంలో గ్లూకోజ్",
      BMI: "BMI",
      PDFDonwload: "PDF డౌన్‌లోడ్ చేయబడింది !",
      PDFShared: "PDF షేర్ చేయబడింది !",
      Error: "ఏదో తప్పు జరిగింది !",
      aboutTheApp: "యాప్ గురించి",
      GetStarted: "ప్రారంభించండి",
      systolic: "సిస్టోలిక్",
      diastolic: "డయాస్టోలిక్",
      start: "ప్రారంభించండి",
      enterRequiredFields: "దయచేసి అవసరమైన అన్ని వివరాలను నమోదు చేయండి !",
      enterThisFields: "ఈ ఫీల్డ్ తప్పనిసరి !",

      exit: "నిష్క్రమించు",
      exitApp: "యాప్ నుండి నిష్క్రమించు",
      appExitConfirmation: "మీరు యాప్ నుండి నిష్క్రమించాలనుకుంటున్నారా ?",
      leavePage: "మూల్యాంకనం నుండి నిష్క్రమించాలా ?",
      leavePageConfirmation:
        "మీరు ఈ పేజీని విడిచిపెట్టిన తర్వాత మీరు నమోదు చేసిన సమాచారం కోల్పోతుంది",

      downloadOptions: "డౌన్‌లోడ్ ఎంపికలు",
      a4Size: "A4 సైజు",
      usLetter: "US లెటర్ సైజు",
      pdfDownloaded: "PDF డౌన్‌లోడ్ చేయబడింది !",
      addedToGroup: "గ్రూప్‌కు విజయవంతంగా జోడించబడింది !",
      success: "విజయం",
      exportedTo: "దీనికి ఎగుమతి చేయబడింది",

      aboutTheAppDesc:
        "ఈ యాప్ ఒక వ్యక్తి యొక్క జీవనశైలి అలవాట్ల ఆధారంగా వారి శరీరం యొక్క “ఆరోగ్య వయస్సు”ను నిర్ణయించడంలో సహాయపడుతుంది. ఈ యాప్ ప్రసిద్ధ అలమేడా కౌంటీ దీర్ఘాయుష్షు అధ్యయనాలు మరియు కొత్త అడ్వెంటిస్ట్ ఆరోగ్య అధ్యయనాల సమాచారాన్ని కలిపి అందిస్తుంది. పాల్గొనేవారు తమ ఆరోగ్య అలవాట్లకు మరియు మరణ ప్రమాదానికి మధ్య ఉన్న బలమైన సంబంధాన్ని అర్థం చేసుకోవడంలో ఇది సహాయపడుతుంది. ఇది ఆరోగ్య సలహాకు అద్భుతమైన ఆధారాన్ని అందిస్తుంది.",
      aboutTheAppTitle: "యాప్ గురించి",
    },
  },
  pa: {
    translation: {
      welcome: "ਜੀ ਆਇਆਂ ਨੂੰ",
      chooseLanguage: "ਭਾਸ਼ਾ ਚੁਣੋ",
      introduction: "ਜਾਣ-ਪਛਾਣ",
      howItWorks: "ਇਹ ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ ਹੈ",
      benefits: "ਲਾਭ",
      discoverHealthAge: "ਆਪਣੀ ਸਿਹਤ ਦੀ ਉਮਰ ਜਾਣੋ!",
      lifestyleAffectsHealth:
        "ਤੁਹਾਡੀ ਜੀਵਨਸ਼ੈਲੀ ਤੁਹਾਡੀ ਸੋਚ ਨਾਲੋਂ ਕਿਤੇ ਵੱਧ ਤੁਹਾਡੀ ਸਿਹਤ ਨੂੰ ਪ੍ਰਭਾਵਿਤ ਕਰਦੀ ਹੈ। ਆਓ ਜਾਣੀਏ ਕਿ ਤੁਸੀਂ ਅਸਲ ਵਿੱਚ ਕਿੰਨੇ ਜਵਾਨ ਹੋ!",
      simpleScienceBacked: "ਸਰਲ ਅਤੇ ਵਿਗਿਆਨ ਆਧਾਰਿਤ",
      answerQuestions:
        "ਆਪਣੀਆਂ ਆਦਤਾਂ ਬਾਰੇ ਕੁਝ ਸਵਾਲਾਂ ਦੇ ਜਵਾਬ ਦਿਓ, ਅਤੇ ਅਸੀਂ ਅਸਲ ਸਿਹਤ ਜਾਣਕਾਰੀ ਦੇ ਆਧਾਰ ਉੱਤੇ ਤੁਹਾਡੀ ਸਿਹਤ ਦੀ ਉਮਰ ਕੱਢਾਂਗੇ।",
      getPersonalizedTips: "ਨਿੱਜੀ ਸਿਹਤ ਸੁਝਾਅ ਪ੍ਰਾਪਤ ਕਰੋ",
      improveLifestyle:
        "ਆਪਣੀ ਸਭ ਤੋਂ ਵਧੀਆ ਸਿਹਤ ਸਮਰੱਥਾ ਤੱਕ ਪਹੁੰਚਣ ਲਈ ਵਿਅਕਤੀਗਤ ਸਿਫਾਰਸ਼ਾਂ ਨਾਲ ਆਪਣੀ ਜੀਵਨਸ਼ੈਲੀ ਸੁਧਾਰੋ।",
      helpCalculateHealthAge: "ਮੈਂ ਤੁਹਾਡੀ ਸਿਹਤ ਦੀ ਉਮਰ ਕੱਢਣ ਵਿੱਚ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ।",
      startAssessment: "ਹੁਣੇ ਆਪਣਾ ਮੁਲਾਂਕਣ ਸ਼ੁਰੂ ਕਰੋ",
      home: "ਘਰ",
      purchases: "ਖਰੀਦਾਂ",
      history: "ਇਤਿਹਾਸ",
      dailyLimit: "ਰੋਜ਼ਾਨਾ ਸੀਮਾ",

      getStarted:
        "ਆਓ ਸ਼ੁਰੂ ਕਰੀਏ। ਤੁਹਾਡੀ ਸਿਹਤ ਦੀ ਉਮਰ ਤੁਹਾਡੀ ਜੀਵਨਸ਼ੈਲੀ ਅਤੇ ਆਦਤਾਂ ਉੱਤੇ ਨਿਰਭਰ ਕਰਦੀ ਹੈ।",
      whatIsYourName: "ਤੁਹਾਡਾ ਨਾਮ ਕੀ ਹੈ?",
      enterName: "ਨਾਮ ਦਰਜ ਕਰੋ",
      next: "ਅੱਗੇ",
      whatIsYourAge: "ਤੁਹਾਡੀ ਉਮਰ ਕਿੰਨੀ ਹੈ?",
      age: "ਉਮਰ",
      whatIsYourGender: "ਤੁਹਾਡਾ ਲਿੰਗ ਕੀ ਹੈ?",
      gender: "ਲਿੰਗ",
      male: "ਪੁਰਸ਼",
      female: "ਔਰਤ",
      whatIsYourHeight: "ਤੁਹਾਡਾ ਕੱਦ ਕਿੰਨਾ ਹੈ?",
      height: "ਕੱਦ",
      whatIsYourWeight: "ਤੁਹਾਡਾ ਵਜ਼ਨ ਕਿੰਨਾ ਹੈ?",
      weight: "ਵਜ਼ਨ",
      whatIsYourWaistCircumference: "ਤੁਹਾਡੀ ਕਮਰ ਦਾ ਘਿਰਾਓ ਕਿੰਨਾ ਹੈ?",
      waistCircumference: "ਕਮਰ ਦਾ ਘਿਰਾਓ",
      whatIsYourBloodPressure: "ਤੁਹਾਡਾ ਬਲੱਡ ਪ੍ਰੈਸ਼ਰ ਕਿੰਨਾ ਹੈ?",
      bloodPressure: "ਬਲੱਡ ਪ੍ਰੈਸ਼ਰ",
      whatIsYourBloodGlucose: "ਤੁਹਾਡੇ ਖੂਨ ਵਿੱਚ ਗਲੂਕੋਜ਼ ਦਾ ਪੱਧਰ ਕਿੰਨਾ ਹੈ?",
      fasting: "ਖਾਲੀ ਪੇਟ",
      postMeals: "ਖਾਣੇ ਤੋਂ ਬਾਅਦ",
      bloodGlucoseLevel: "ਖੂਨ ਵਿੱਚ ਗਲੂਕੋਜ਼ ਦਾ ਪੱਧਰ",

      newAssessment: "ਨਵਾਂ ਮੁਲਾਂਕਣ",
      howOftenEatBreakfast: "ਤੁਸੀਂ ਚੰਗਾ ਨਾਸ਼ਤਾ ਕਿੰਨੀ ਵਾਰ ਖਾਂਦੇ ਹੋ?",
      breakfastNote: "(ਪੂਰੇ ਅਨਾਜ, ਫਲ ਜਾਂ ਸਬਜ਼ੀਆਂ ਅਤੇ ਬਦਾਮਾਂ ਉੱਤੇ ਜ਼ੋਰ ਦਿੰਦਿਆਂ)",
      lessThan2Days: "ਹਫ਼ਤੇ ਵਿੱਚ 2 ਦਿਨ ਤੋਂ ਘੱਟ",
      twoToFourDays: "ਹਫ਼ਤੇ ਵਿੱਚ 2 - 4 ਦਿਨ",
      fiveToSixDays: "ਹਫ਼ਤੇ ਵਿੱਚ 5 - 6 ਦਿਨ",
      everyday: "ਹਰ ਰੋਜ਼",
      howOftenSnack: "ਤੁਸੀਂ ਕਿੰਨੀ ਵਾਰ ਹਲਕਾ ਭੋਜਨ ਖਾਂਦੇ ਹੋ?",
      severalTimesDay: "ਦਿਨ ਵਿੱਚ ਕਈ ਵਾਰੀ",
      onceDay: "ਦਿਨ ਵਿੱਚ ਇੱਕ ਵਾਰੀ",
      fewTimesWeek: "ਹਫ਼ਤੇ ਵਿੱਚ ਕੁਝ ਵਾਰੀ",
      rarelyNever: "ਘੱਟ ਹੀ ਜਾਂ ਕਦੇ ਨਹੀਂ",
      howManyFruitsVeggies: "ਤੁਸੀਂ ਇੱਕ ਦਿਨ ਵਿੱਚ ਫਲਾਂ ਅਤੇ ਸਬਜ਼ੀਆਂ ਦੀਆਂ ਕਿੰਨੀਆਂ ਖੁਰਾਕਾਂ ਖਾਂਦੇ ਹੋ?",
      fruitsVeggiesNote:
        "(1 ਖੁਰਾਕ = 1 ਦਰਮਿਆਨਾ ਟੁਕੜਾ, 1 ਕੱਪ ਤਾਜ਼ਾ, ½ ਕੱਪ ਪਕਾਇਆ ਹੋਇਆ, ਜਾਂ 6 ਔਂਸ 100% ਰਸ)",
      howManyWholeGrains: "ਤੁਸੀਂ ਹਰ ਰੋਜ਼ ਪੂਰੇ ਅਨਾਜ ਦੀਆਂ ਕਿੰਨੀਆਂ ਖੁਰਾਕਾਂ ਖਾਂਦੇ ਹੋ?",
      wholeGrainsNote:
        "(1 ਖੁਰਾਕ = 1 ਟੁਕੜਾ ਰੋਟੀ, ½ ਕੱਪ ਬ੍ਰਾਊਨ ਚਾਵਲ ਜਾਂ ਓਟਮੀਲ, ⅔ ਕੱਪ ਸੁੱਕਾ ਸਿਰੀਅਲ)",
      none: "ਕੋਈ ਨਹੀਂ",
      back: "ਪਿੱਛੇ",
      howManyNutsSeeds: "ਤੁਸੀਂ ਹਫ਼ਤੇ ਵਿੱਚ ਬਦਾਮਾਂ ਅਤੇ ਬੀਜਾਂ ਦੀਆਂ ਕਿੰਨੀਆਂ ਖੁਰਾਕਾਂ ਖਾਂਦੇ ਹੋ?",
      nutsSeedsNote: "(1 ਖੁਰਾਕ = 1 ਔਂਸ ਬਦਾਮ ਜਾਂ ਬੀਜ, 2 ਚਮਚ ਬਦਾਮ ਦਾ ਮੱਖਣ)",
      howOftenRedMeat: "ਤੁਸੀਂ ਲਾਲ ਮਾਸ ਕਿੰਨੀ ਵਾਰ ਖਾਂਦੇ ਹੋ?",
      threeOrMoreTimesWeek: "ਹਫ਼ਤੇ ਵਿੱਚ 3 ਜਾਂ ਵੱਧ ਵਾਰ",
      onceTwiceMonth: "ਮਹੀਨੇ ਵਿੱਚ ਇੱਕ ਜਾਂ ਦੋ ਵਾਰ",
      never: "ਕਦੇ ਨਹੀਂ",
      howOftenExercise:
        "ਤੁਸੀਂ ਕਿੰਨੀ ਵਾਰ 20-30 ਮਿੰਟ ਦੀ ਦਰਮਿਆਨੀ ਤੋਂ ਤੀਬਰ ਕਸਰਤ ਕਰਦੇ ਹੋ?",
      rarely: "ਘੱਟ ਹੀ",
      oneTwoDaysWeek: "ਹਫ਼ਤੇ ਵਿੱਚ 1 - 2 ਦਿਨ",
      threeFourDaysWeek: "ਹਫ਼ਤੇ ਵਿੱਚ 3 - 4 ਦਿਨ",
      fiveMoreDaysWeek: "ਹਫ਼ਤੇ ਵਿੱਚ 5 ਜਾਂ ਵੱਧ ਦਿਨ",
      howIsWeight: "ਤੁਹਾਡਾ ਵਜ਼ਨ ਕਿਹੋ ਜਿਹਾ ਹੈ?",
      severelyOverweight: "ਬਹੁਤ ਜ਼ਿਆਦਾ ਵਜ਼ਨ",
      moderatelyOverweight: "ਦਰਮਿਆਨਾ ਵੱਧ ਵਜ਼ਨ",
      underweight: "ਘੱਟ ਵਜ਼ਨ",
      healthyWeight: "ਸਿਹਤਮੰਦ ਵਜ਼ਨ",
      howOftenSleep: "ਤੁਹਾਨੂੰ ਕਿੰਨੀ ਵਾਰ 7 - 8 ਘੰਟੇ ਦੀ ਨੀਂਦ ਮਿਲਦੀ ਹੈ?",
      twoOrFewerDays: "ਹਫ਼ਤੇ ਵਿੱਚ 2 ਜਾਂ ਘੱਟ ਦਿਨ",
      threeFourDays: "ਹਫ਼ਤੇ ਵਿੱਚ 3 - 4 ਦਿਨ",
      fiveSixDays: "ਹਫ਼ਤੇ ਵਿੱਚ 5 - 6 ਦਿਨ",
      whatIsTobaccoHistory: "ਤਮਾਕੂ ਨਾਲ ਤੁਹਾਡਾ ਇਤਿਹਾਸ ਕੀ ਹੈ?",
      currentlyUse: "ਹੁਣ ਵੀ ਵਰਤਦਾ ਹਾਂ",
      quitLessThanTwoYears: "2 ਸਾਲ ਤੋਂ ਘੱਟ ਸਮਾਂ ਪਹਿਲਾਂ ਛੱਡਿਆ",
      quitOverTwoYears: "2 ਸਾਲ ਤੋਂ ਵੱਧ ਸਮਾਂ ਪਹਿਲਾਂ ਛੱਡਿਆ",
      neverUsed: "ਕਦੇ ਨਹੀਂ ਵਰਤਿਆ",
      howManyAlcohol: "ਤੁਸੀਂ ਪ੍ਰਤੀ ਹਫ਼ਤਾ ਸ਼ਰਾਬ ਦੀਆਂ ਕਿੰਨੀਆਂ ਖੁਰਾਕਾਂ ਲੈਂਦੇ ਹੋ?",
      alcoholNote: "(12 ਔਂਸ ਬੀਅਰ, 8 ਔਂਸ ਮਾਲਟ ਲਿਕਰ, 5 ਔਂਸ ਵਾਈਨ, 1.5 ਔਂਸ ਸ਼ਾਟ)",
      excessiveAlcohol: "15+ (ਮਰਦ) ਜਾਂ 8+ (ਔਰਤਾਂ)",
      howRateSpirituality: "ਤੁਸੀਂ ਆਪਣੀ ਅਧਿਆਤਮਿਕਤਾ ਨੂੰ ਕਿਵੇਂ ਦਰਜਾ ਦਿੰਦੇ ਹੋ?",
      noInterest: "ਕੋਈ ਦਿਲਚਸਪੀ ਨਹੀਂ",
      moderatelySpiritual: "ਦਰਮਿਆਨੇ ਤੌਰ ਉੱਤੇ ਅਧਿਆਤਮਿਕ",
      deeplySpiritual: "ਡੂੰਘੇ ਤੌਰ ਉੱਤੇ ਅਧਿਆਤਮਿਕ",

      Is_Interests: "ਰੁਚੀਆਂ",
      Is_TellYourInterest:
        "ਆਪਣਾ ਅਨੁਭਵ ਵਿਅਕਤੀਗਤ ਬਣਾਉਣ ਲਈ ਸਾਨੂੰ ਦੱਸੋ ਕਿ ਤੁਹਾਨੂੰ ਕਿਸ ਵਿੱਚ ਦਿਲਚਸਪੀ ਹੈ।",
      Is_WeightManagement: "ਵਜ਼ਨ ਪ੍ਰਬੰਧਨ",
      Is_FitAndExercise: "ਫਿਟਨੈਸ ਅਤੇ ਕਸਰਤ",
      Is_StopSmoking: "ਸਿਗਰਟਨੋਸ਼ੀ ਛੱਡਣਾ",
      Is_HealthyCooking: "ਸਿਹਤਮੰਦ ਖਾਣਾ ਬਣਾਉਣਾ",
      Is_StressReduction: "ਤਣਾਅ ਘਟਾਉਣਾ",
      Is_PreventHeartDisease: "ਦਿਲ ਦੀ ਬਿਮਾਰੀ ਦੀ ਰੋਕਥਾਮ",
      Is_DepressionRecovery: "ਡਿਪਰੈਸ਼ਨ ਤੋਂ ਸਿਹਤਯਾਬੀ",
      Is_ReversingDiabetes: "ਸ਼ੂਗਰ ਨੂੰ ਉਲਟਾਉਣਾ",
      Is_NaturalRemedies: "ਕੁਦਰਤੀ ਇਲਾਜ",
      Is_SpiritualHealth: "ਅਧਿਆਤਮਿਕ ਸਿਹਤ",
      Is_ImprovingMentalPerformance: "ਮਾਨਸਿਕ ਪ੍ਰਦਰਸ਼ਨ ਸੁਧਾਰਨਾ",
      Is_Other: "ਹੋਰ",
      Is_Name: "ਨਾਮ",
      Is_Email: "ਈਮੇਲ",
      Is_Address: "ਪਤਾ",
      Is_Phone: "ਫ਼ੋਨ",
      Is_Zip: "ਪਿੰਨ ਕੋਡ",
      Is_ShowReport: "ਰਿਪੋਰਟ ਵੇਖੋ",

      Rs_Report: "ਰਿਪੋਰਟ",
      Rs_CustomizedReport: "ਤੁਹਾਡੇ ਲਈ ਵਿਅਕਤੀਗਤ ਰਿਪੋਰਟ :",
      Rs_YourHealthAge: "ਤੁਹਾਡੀ ਸਿਹਤ ਦੀ ਉਮਰ",
      Rs_YourActualAge: "ਤੁਹਾਡੀ ਅਸਲ ਉਮਰ",
      Rs_CurrentAge: "ਮੌਜੂਦਾ ਉਮਰ",
      Rs_HealthAge: "ਸਿਹਤ ਦੀ ਉਮਰ",
      Rs_PotentialAge: "ਸੰਭਾਵਿਤ ਸਿਹਤ ਉਮਰ",
      Rs_HealthyHabitsParagraph:
        "ਮਸ਼ਹੂਰ ਅਲਾਮੇਡਾ ਕਾਉਂਟੀ ਅਧਿਐਨ ਅਤੇ ਐਡਵੈਂਟਿਸਟ ਸਿਹਤ ਅਧਿਐਨਾਂ ਸਮੇਤ ਕਈ ਵੱਡੀਆਂ ਖੋਜਾਂ, ਹੇਠਾਂ ਦਿੱਤੀਆਂ ਸਿਹਤ ਆਦਤਾਂ ਅਤੇ ਬਿਮਾਰੀ ਜਾਂ ਮੌਤ ਦੇ ਖ਼ਤਰੇ ਵਿਚਕਾਰ ਮਜ਼ਬੂਤ ਸਬੰਧ ਦਰਸਾਉਂਦੀਆਂ ਹਨ। ਇਹ ਸਾਰੀਆਂ ਸਿਹਤਮੰਦ ਆਦਤਾਂ ਅਪਣਾਉਣ ਵਾਲੇ ਵਿਅਕਤੀ ਆਪਣੀ ਉਮਰ ਨੂੰ ਲਗਭਗ 30 ਸਾਲ ਤੱਕ ਪ੍ਰਭਾਵਿਤ ਕਰ ਸਕਦੇ ਹਨ।",
      Rs_MedicalDisclaimerTitle: "ਮੈਡੀਕਲ ਬੇਦਾਅਵਾ",
      Rs_MedicalDisclaimerText:
        "ਸਿਹਤ ਦੀ ਉਮਰ ਸਿਰਫ਼ ਜਾਣਕਾਰੀ ਅਤੇ ਸਿੱਖਿਆ ਦੇ ਉਦੇਸ਼ ਲਈ ਹੈ। ਇਹ ਕੋਈ ਮੈਡੀਕਲ ਨਿਦਾਨ ਨਹੀਂ ਹੈ ਅਤੇ ਇਸਨੂੰ ਪੇਸ਼ੇਵਰ ਮੈਡੀਕਲ ਸਲਾਹ, ਨਿਦਾਨ ਜਾਂ ਇਲਾਜ ਦੇ ਬਦਲ ਵਜੋਂ ਨਹੀਂ ਵਰਤਣਾ ਚਾਹੀਦਾ। ਕੋਈ ਵੀ ਮੈਡੀਕਲ ਫ਼ੈਸਲਾ ਲੈਣ ਜਾਂ ਆਪਣੀ ਸਿਹਤ ਸੰਭਾਲ ਵਿੱਚ ਤਬਦੀਲੀ ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ ਹਮੇਸ਼ਾ ਯੋਗ ਸਿਹਤ ਮਾਹਿਰ ਦੀ ਸਲਾਹ ਲਓ।",
      Rs_MedicalSources: "ਮੈਡੀਕਲ ਸਰੋਤ",
      Rs_Source: "ਸਰੋਤ",
      Rs_Recommendations: "ਸਿਫਾਰਸ਼ਾਂ",
      Rs_1_title: "ਹਰ ਰੋਜ਼ ਚੰਗਾ ਨਾਸ਼ਤਾ ਕਰੋ",
      Rs_1_desc:
        "ਨਾਸ਼ਤਾ ਮੈਟਾਬੋਲਿਜ਼ਮ ਤੇਜ਼ ਕਰਦਾ ਹੈ, ਧਿਆਨ ਕੇਂਦਰਿਤ ਕਰਨ ਵਿੱਚ ਮਦਦ ਕਰਦਾ ਹੈ ਅਤੇ ਸਕੂਲ ਤੇ ਕੰਮ ਵਿੱਚ ਪ੍ਰਦਰਸ਼ਨ ਸੁਧਾਰਦਾ ਹੈ। ਇਹ ਸਿਹਤਮੰਦ ਵਜ਼ਨ ਬਣਾਈ ਰੱਖਣ ਵਿੱਚ ਵੀ ਮਦਦ ਕਰਦਾ ਹੈ।",
      Rs_2_title: "ਹਲਕਾ ਭੋਜਨ ਵਾਰ-ਵਾਰ ਖਾਣ ਤੋਂ ਬਚੋ",
      Rs_2_desc:
        "ਵਾਰ-ਵਾਰ ਹਲਕਾ ਭੋਜਨ ਖਾਣ ਨਾਲ ਹਰ ਦਿਨ ਔਸਤਨ 580 ਕੈਲੋਰੀ ਵਧ ਸਕਦੀਆਂ ਹਨ, ਹਜ਼ਮ ਪ੍ਰਭਾਵਿਤ ਹੁੰਦਾ ਹੈ, ਖੂਨ ਵਿੱਚ ਸ਼ੂਗਰ ਦਾ ਨਿਯੰਤਰਣ ਵਿਗੜਦਾ ਹੈ ਅਤੇ ਵਜ਼ਨ ਵਧਦਾ ਹੈ।",
      Rs_3_title: "ਵਧੇਰੇ ਫਲ ਅਤੇ ਸਬਜ਼ੀਆਂ ਖਾਓ",
      Rs_3_desc:
        "ਫਲ ਅਤੇ ਸਬਜ਼ੀਆਂ ਫਾਇਟੋਕੈਮਿਕਲ, ਵਿਟਾਮਿਨ ਅਤੇ ਰੇਸ਼ੇ ਨਾਲ ਭਰਪੂਰ ਹੁੰਦੀਆਂ ਹਨ ਅਤੇ ਇਨ੍ਹਾਂ ਵਿੱਚ ਕੈਲੋਰੀ ਵੀ ਘੱਟ ਹੁੰਦੀ ਹੈ।",
      Rs_4_title: "ਪੂਰੇ ਅਨਾਜ ਦੀ ਵਰਤੋਂ ਵਧਾਓ",
      Rs_4_desc:
        "ਪੂਰੇ ਅਨਾਜ ਵਿੱਚ ਰੇਸ਼ਾ, ਵਿਟਾਮਿਨ ਬੀ ਅਤੇ ਜ਼ਰੂਰੀ ਖਣਿਜ ਹੁੰਦੇ ਹਨ ਜੋ ਸਮੁੱਚੀ ਸਿਹਤ ਲਈ ਸਹਾਇਕ ਹਨ।",
      Rs_5_title: "ਵਧੇਰੇ ਬਦਾਮ ਖਾਓ",
      Rs_5_desc:
        "ਬਦਾਮ ਪ੍ਰੋਟੀਨ ਅਤੇ ਚੰਗੀਆਂ ਚਰਬੀਆਂ ਦਾ ਸ਼ਾਨਦਾਰ ਸਰੋਤ ਹਨ, ਅਤੇ ਇਹ ਖੂਨ ਵਿੱਚ ਸ਼ੂਗਰ ਦੇ ਪੱਧਰ ਨੂੰ ਕਾਬੂ ਕਰਨ ਵਿੱਚ ਮਦਦ ਕਰਦੇ ਹਨ।",
      Rs_6_title: "ਲਾਲ ਮਾਸ ਤੋਂ ਬਚੋ",
      Rs_6_desc:
        "ਲਾਲ ਮਾਸ ਖਾਣਾ ਟਾਈਪ 2 ਸ਼ੂਗਰ, ਦਿਲ ਦੀ ਬਿਮਾਰੀ, ਸਟ੍ਰੋਕ ਅਤੇ ਕੁਝ ਕਿਸਮਾਂ ਦੇ ਕੈਂਸਰ ਨਾਲ ਜੁੜਿਆ ਹੋਇਆ ਹੈ।",
      Rs_7_title: "ਨਿਯਮਤ ਕਸਰਤ ਕਰੋ",
      Rs_7_desc:
        "ਕਸਰਤ ਊਰਜਾ ਵਧਾਉਂਦੀ ਹੈ, ਮੂਡ ਅਤੇ ਕੋਲੈਸਟ੍ਰੋਲ ਦੇ ਪੱਧਰ ਸੁਧਾਰਦੀ ਹੈ, ਬਲੱਡ ਪ੍ਰੈਸ਼ਰ ਘਟਾਉਂਦੀ ਹੈ, ਨੀਂਦ ਬਿਹਤਰ ਕਰਦੀ ਹੈ, ਰੋਗ-ਪ੍ਰਤੀਰੋਧਕ ਸ਼ਕਤੀ ਵਧਾਉਂਦੀ ਹੈ ਅਤੇ ਖੂਨ ਵਿੱਚ ਸ਼ੂਗਰ ਕਾਬੂ ਕਰਨ ਵਿੱਚ ਮਦਦ ਕਰਦੀ ਹੈ।",
      Rs_8_title: "ਸਿਹਤਮੰਦ ਵਜ਼ਨ ਹਾਸਲ ਕਰੋ",
      Rs_8_desc:
        "ਬੀਐਮਆਈ 18.5 - 24.9 ਵਿਚਕਾਰ ਅਤੇ ਕਮਰ ਦਾ ਘਿਰਾਓ ਸਿਹਤਮੰਦ ਪੱਧਰ ਉੱਤੇ ਰੱਖੋ (ਮਰਦਾਂ ਲਈ 40 ਇੰਚ ਤੋਂ ਘੱਟ, ਔਰਤਾਂ ਲਈ 35 ਇੰਚ ਤੋਂ ਘੱਟ)।",
      Rs_9_title: "ਹਰ ਰਾਤ 7-8 ਘੰਟੇ ਚੰਗੀ ਨੀਂਦ ਲਵੋ",
      Rs_9_desc:
        "ਪੂਰੀ ਨੀਂਦ ਯਾਦ ਸ਼ਕਤੀ, ਸਿੱਖਣ ਦੀ ਸਮਰੱਥਾ, ਮੈਟਾਬੋਲਿਜ਼ਮ ਅਤੇ ਰੋਗ-ਪ੍ਰਤੀਰੋਧਕ ਪ੍ਰਣਾਲੀ ਲਈ ਸਹਾਇਕ ਹੈ।",
      Rs_10_title: "ਸਿਗਰਟਨੋਸ਼ੀ ਬੰਦ ਕਰੋ",
      Rs_10_desc:
        "ਸਿਗਰਟਨੋਸ਼ੀ ਸਰੀਰ ਦੇ ਹਰ ਅੰਗ ਨੂੰ ਨੁਕਸਾਨ ਪਹੁੰਚਾਉਂਦੀ ਹੈ ਅਤੇ ਕੈਂਸਰ, ਦਿਲ ਦੀ ਬਿਮਾਰੀ, ਸੀਓਪੀਡੀ, ਦਮਾ ਅਤੇ ਦੰਦਾਂ ਦੀਆਂ ਸਮੱਸਿਆਵਾਂ ਦਾ ਖ਼ਤਰਾ ਵਧਾਉਂਦੀ ਹੈ।",
      Rs_11_title: "ਸ਼ਰਾਬ ਨਾ ਪੀਓ",
      Rs_11_desc:
        "ਸ਼ਰਾਬ ਦੀ ਵਰਤੋਂ ਨਾਲ ਨਿਊਰੋਲੋਜੀਕਲ, ਦਿਲ ਅਤੇ ਖ਼ੂਨ ਨਾਲੀਆਂ ਸਬੰਧੀ ਅਤੇ ਮਾਨਸਿਕ ਸਮੱਸਿਆਵਾਂ ਹੋ ਸਕਦੀਆਂ ਹਨ, ਨਾਲ ਹੀ ਕੈਂਸਰ ਅਤੇ ਜਿਗਰ ਦੀ ਬਿਮਾਰੀ ਦਾ ਖ਼ਤਰਾ ਵਧਦਾ ਹੈ।",
      Rs_12_title: "ਅਧਿਆਤਮਿਕਤਾ ਵਧਾਓ",
      Rs_12_desc:
        "ਪਰਮਾਤਮਾ ਉੱਤੇ ਵਿਸ਼ਵਾਸ ਮਾਨਸਿਕ ਸਿਹਤ ਸੁਧਾਰ ਸਕਦਾ ਹੈ ਅਤੇ ਰੋਗ-ਪ੍ਰਤੀਰੋਧਕ ਸ਼ਕਤੀ ਮਜ਼ਬੂਤ ਕਰ ਸਕਦਾ ਹੈ।",
      Rs_SavePdf: "pdf ਸੁਰੱਖਿਅਤ ਕਰੋ",
      Rs_ShareReport: "ਰਿਪੋਰਟ ਸਾਂਝੀ ਕਰੋ",

      Hs_List: "ਸੂਚੀ",
      Hs_Group: "ਗਰੁੱਪ",
      Hs_View: "ਵੇਖੋ",
      Hs_Filter: "ਫਿਲਟਰ",
      Hs_Options: "ਵਿਕਲਪ",
      Hs_Export: "ਐਕਸਪੋਰਟ",
      Hs_Delete: "ਮਿਟਾਓ",
      Hs_Search: "ਖੋਜੋ",
      Hs_ExportAsCSV: "CSV ਵਜੋਂ ਐਕਸਪੋਰਟ ਕਰੋ",
      Hs_Confirmation: "ਕੀ ਤੁਸੀਂ ਸੱਚਮੁੱਚ ਮਿਟਾਉਣਾ ਚਾਹੁੰਦੇ ਹੋ ?",
      Hs_Success: "ਆਈਟਮ ਮਿਟਾ ਦਿੱਤੀ ਗਈ",
      Hs_Cancel: "ਰੱਦ ਕਰੋ",
      Hs_ItemsSelected: "ਆਈਟਮਾਂ ਚੁਣੀਆਂ ਗਈਆਂ",
      Hs_SelectAll: "ਸਭ ਚੁਣੋ",
      Hs_NewGroup: "ਨਵਾਂ ਗਰੁੱਪ",
      Hs_ExistingGroup: "ਮੌਜੂਦਾ ਗਰੁੱਪ",
      Hs_Create: "ਬਣਾਓ",
      Hs_GroupName: "ਗਰੁੱਪ ਦਾ ਨਾਮ",
      Hs_EnterGroupName: "ਗਰੁੱਪ ਦਾ ਨਾਮ ਦਰਜ ਕਰੋ",
      Hs_Reports: "ਰਿਪੋਰਟਾਂ",
      Hs_save: "ਸੁਰੱਖਿਅਤ ਕਰੋ",
      Hs_Nothing: "ਇੱਥੇ ਅਜੇ ਕੁਝ ਨਹੀਂ ਹੈ!",
      Hs_NothingDesc:
        "ਮੁਲਾਂਕਣ ਪੂਰਾ ਕਰਨ ਤੋਂ ਬਾਅਦ ਤੁਹਾਡੀਆਂ ਸਿਹਤ ਉਮਰ ਰਿਪੋਰਟਾਂ ਇੱਥੇ ਦਿਖਾਈ ਦੇਣਗੀਆਂ।",
      Hs_Download: "ਡਾਊਨਲੋਡ",
      Hs_LanguageChanged: "ਭਾਸ਼ਾ ਸਫਲਤਾਪੂਰਵਕ ਬਦਲ ਗਈ",
      Hs_Change: "ਬਦਲੋ",

      Fs_Filter: "ਇਸ ਅਨੁਸਾਰ ਫਿਲਟਰ ਕਰੋ",
      Fs_Close: "ਬੰਦ ਕਰੋ",
      Fs_Date: "ਤਾਰੀਖ਼",
      Fs_From: "ਤੋਂ",
      Fs_To: "ਤੱਕ",
      Fs_ClearAll: "ਸਭ ਸਾਫ਼ ਕਰੋ",
      Fs_ShowResults: "ਨਤੀਜੇ ਵਿਖਾਓ",

      select: "ਚੁਣੋ",
      total: "ਕੁੱਲ",
      purchase: "ਖਰੀਦ",
      aboutProgramme: "ਪ੍ਰੋਗਰਾਮ ਬਾਰੇ",
      reports: "ਰਿਪੋਰਟਾਂ",
      PrintQuestion: "ਪ੍ਰਸ਼ਨਾਵਲੀ ਛਾਪੋ",
      PrintReport: "ਖਾਲੀ ਰਿਪੋਰਟ ਛਾਪੋ",
      reportSetting: "ਰਿਪੋਰਟ ਸੈਟਿੰਗਾਂ",
      changeLanguage: "ਭਾਸ਼ਾ ਬਦਲੋ",
      uploadLogo: "ਆਪਣਾ ਲੋਗੋ ਅੱਪਲੋਡ ਕਰੋ",
      upload: "ਅੱਪਲੋਡ",
      contactDetails: "ਸੰਪਰਕ ਵੇਰਵੇ",
      enterAddress: "ਪਤਾ ਦਰਜ ਕਰੋ",
      enterPhone: "ਫ਼ੋਨ ਨੰਬਰ ਦਰਜ ਕਰੋ",
      createGroup: "ਗਰੁੱਪ ਬਣਾਓ",

      normalBp: "ਤੁਹਾਡਾ ਬਲੱਡ ਪ੍ਰੈਸ਼ਰ ਸਧਾਰਨ ਹੈ",
      MaintainBp: "ਕਿਰਪਾ ਕਰਕੇ ਆਪਣਾ ਬਲੱਡ ਪ੍ਰੈਸ਼ਰ ਕਾਬੂ ਵਿੱਚ ਰੱਖੋ",
      bpRange: "ਸਧਾਰਨ ਸੀਮਾ 90-119/60-79 mmHg ਹੈ।",
      normalGlucoseLevel: "ਤੁਹਾਡੇ ਖੂਨ ਵਿੱਚ ਗਲੂਕੋਜ਼ ਦਾ ਪੱਧਰ ਸਧਾਰਨ ਹੈ",
      maintainGlucoseLevel: "ਕਿਰਪਾ ਕਰਕੇ ਆਪਣੇ ਖੂਨ ਵਿੱਚ ਗਲੂਕੋਜ਼ ਦਾ ਪੱਧਰ ਕਾਬੂ ਵਿੱਚ ਰੱਖੋ",
      normalRangeGlucose: "ਸਧਾਰਨ ਸੀਮਾ",
      for: "—",
      postMeal: "ਖਾਣੇ ਤੋਂ ਬਾਅਦ",
      test: "ਟੈਸਟ ਲਈ ਲਾਗੂ ਹੈ",
      maintainBloodGlucose: "ਆਪਣੇ ਖੂਨ ਵਿੱਚ ਗਲੂਕੋਜ਼ ਦੇ ਪੱਧਰ ਕਾਇਮ ਰੱਖੋ",
      maintainLowBloodGlucoseDesc:
        "ਤੁਹਾਡੇ ਖੂਨ ਵਿੱਚ ਗਲੂਕੋਜ਼ ਦਾ ਪੱਧਰ ਘੱਟ ਹੈ। ਸਥਿਰ ਗਲੂਕੋਜ਼ ਪੇਚੀਦਗੀਆਂ ਰੋਕਦਾ ਹੈ, ਊਰਜਾ ਵਧਾਉਂਦਾ ਹੈ ਅਤੇ ਸਮੁੱਚੀ ਸਿਹਤ ਦਾ ਸਮਰਥਨ ਕਰਦਾ ਹੈ। ਸੰਤੁਲਿਤ ਖਾਣਾ ਅਤੇ ਕਸਰਤ ਇਸਨੂੰ ਕਾਬੂ ਵਿੱਚ ਰੱਖਣ ਵਿੱਚ ਮਦਦ ਕਰਦੇ ਹਨ!",
      maintainHighBloodGlucoseDesc:
        "ਤੁਹਾਡੇ ਖੂਨ ਵਿੱਚ ਗਲੂਕੋਜ਼ ਦਾ ਪੱਧਰ ਵੱਧ ਹੈ। ਸਥਿਰ ਗਲੂਕੋਜ਼ ਪੇਚੀਦਗੀਆਂ ਰੋਕਦਾ ਹੈ, ਊਰਜਾ ਵਧਾਉਂਦਾ ਹੈ ਅਤੇ ਸਮੁੱਚੀ ਸਿਹਤ ਦਾ ਸਮਰਥਨ ਕਰਦਾ ਹੈ। ਸੰਤੁਲਿਤ ਖਾਣਾ ਅਤੇ ਕਸਰਤ ਇਸਨੂੰ ਕਾਬੂ ਵਿੱਚ ਰੱਖਣ ਵਿੱਚ ਮਦਦ ਕਰਦੇ ਹਨ!",
      maintainBloodPressure: "ਬਲੱਡ ਪ੍ਰੈਸ਼ਰ ਕਾਬੂ ਵਿੱਚ ਰੱਖੋ",
      maintainBloodPressureDesc:
        "ਸਿਹਤਮੰਦ ਬਲੱਡ ਪ੍ਰੈਸ਼ਰ ਬਣਾਈ ਰੱਖਣ ਨਾਲ ਦਿਲ ਦੀ ਬਿਮਾਰੀ, ਸਟ੍ਰੋਕ ਅਤੇ ਗੁਰਦੇ ਦੀਆਂ ਸਮੱਸਿਆਵਾਂ ਦਾ ਖ਼ਤਰਾ ਘਟਦਾ ਹੈ। ਨਿਯਮਤ ਕਸਰਤ ਅਤੇ ਸੰਤੁਲਿਤ ਖੁਰਾਕ ਵੱਡਾ ਫ਼ਰਕ ਪਾ ਸਕਦੀ ਹੈ!",
      maintainLowBloodPressureDesc:
        "ਤੁਹਾਡਾ ਬਲੱਡ ਪ੍ਰੈਸ਼ਰ ਘੱਟ ਹੈ। ਸਿਹਤਮੰਦ ਬਲੱਡ ਪ੍ਰੈਸ਼ਰ ਬਣਾਈ ਰੱਖਣ ਨਾਲ ਦਿਲ ਦੀ ਬਿਮਾਰੀ, ਸਟ੍ਰੋਕ ਅਤੇ ਗੁਰਦੇ ਦੀਆਂ ਸਮੱਸਿਆਵਾਂ ਦਾ ਖ਼ਤਰਾ ਘਟਦਾ ਹੈ। ਨਿਯਮਤ ਕਸਰਤ ਅਤੇ ਸੰਤੁਲਿਤ ਖੁਰਾਕ ਵੱਡਾ ਫ਼ਰਕ ਪਾ ਸਕਦੀ ਹੈ!",
      maintainHighBloodPressureDesc:
        "ਤੁਹਾਡਾ ਬਲੱਡ ਪ੍ਰੈਸ਼ਰ ਵੱਧ ਹੈ। ਸਿਹਤਮੰਦ ਬਲੱਡ ਪ੍ਰੈਸ਼ਰ ਬਣਾਈ ਰੱਖਣ ਨਾਲ ਦਿਲ ਦੀ ਬਿਮਾਰੀ, ਸਟ੍ਰੋਕ ਅਤੇ ਗੁਰਦੇ ਦੀਆਂ ਸਮੱਸਿਆਵਾਂ ਦਾ ਖ਼ਤਰਾ ਘਟਦਾ ਹੈ। ਨਿਯਮਤ ਕਸਰਤ ਅਤੇ ਸੰਤੁਲਿਤ ਖੁਰਾਕ ਵੱਡਾ ਫ਼ਰਕ ਪਾ ਸਕਦੀ ਹੈ!",

      downloadSuccess: "ਸਫਲਤਾਪੂਰਵਕ ਡਾਊਨਲੋਡ ਹੋ ਗਿਆ",
      goBackConfirmation: "ਕੀ ਤੁਸੀਂ ਸੱਚਮੁੱਚ ਵਾਪਸ ਜਾਣਾ ਚਾਹੁੰਦੇ ਹੋ ?",
      pleaseWait: "ਕਿਰਪਾ ਕਰਕੇ ਉਡੀਕ ਕਰੋ!",
      goBeyond: "ਬੁਨਿਆਦੀ ਸਹੂਲਤਾਂ ਤੋਂ ਅੱਗੇ ਵਧੋ!",
      JoinPro:
        "ਸਾਡੇ ਪ੍ਰੋ ਮੈਂਬਰਾਂ ਨਾਲ ਜੁੜੋ ਅਤੇ ਆਪਣੇ ਸਿਹਤ ਸਫ਼ਰ ਨੂੰ ਅਗਲੇ ਪੱਧਰ ਤੱਕ ਲੈ ਜਾਓ",
      WhyJoinPro: "ਪ੍ਰੋ ਵਿੱਚ ਕਿਉਂ ਸ਼ਾਮਲ ਹੋਵੋ ?",
      UnlimitedReports: "ਬੇਅੰਤ ਰਿਪੋਰਟਾਂ",
      FullReportHistory: "ਪੂਰਾ ਰਿਪੋਰਟ ਇਤਿਹਾਸ",
      PrintYourQuestionnaire: "ਆਪਣੇ ਲੋਗੋ ਨਾਲ ਪ੍ਰਸ਼ਨਾਵਲੀ ਛਾਪੋ",
      printYourReport: "ਆਪਣੇ ਲੋਗੋ ਨਾਲ ਖਾਲੀ ਰਿਪੋਰਟਾਂ ਛਾਪੋ",
      upgrade: "ਅੱਪਗ੍ਰੇਡ",
      yearlyPurchase: "ਸਾਲਾਨਾ ਖਰੀਦ",
      thisOneForPro: "ਓਹੋ! ਇਹ ਪ੍ਰੋ ਮੈਂਬਰਾਂ ਲਈ ਹੈ।",
      proMembersDesc:
        "ਇਹ ਸਹੂਲਤ ਸਿਰਫ਼ ਸਾਡੇ ਪ੍ਰੋ ਮੈਂਬਰਾਂ ਲਈ ਹੈ। ਸ਼ਾਮਲ ਹੋਣਾ ਚਾਹੁੰਦੇ ਹੋ? ਹੁਣੇ ਅੱਪਗ੍ਰੇਡ ਕਰੋ ਅਤੇ ਤੁਹਾਡੇ ਲਈ ਖ਼ਾਸ ਤਿਆਰ ਕੀਤੇ ਲਾਭਾਂ ਦਾ ਆਨੰਦ ਲਓ!",
      UpgradeComplete: "ਅੱਪਗ੍ਰੇਡ ਪੂਰਾ ਹੋਇਆ!",
      NowAProMember: "ਤੁਸੀਂ ਹੁਣ ਪ੍ਰੋ ਮੈਂਬਰ ਹੋ!",
      UpgradeTo: "ਇਸ ਵਿੱਚ ਅੱਪਗ੍ਰੇਡ ਕਰੋ",
      SubscriptionCancelledSuccess: "ਸਬਸਕ੍ਰਿਪਸ਼ਨ ਸਫਲਤਾਪੂਰਵਕ ਰੱਦ ਹੋ ਗਈ!",
      ConfirmSubCancel: "ਕੀ ਤੁਸੀਂ ਸੱਚਮੁੱਚ ਸਬਸਕ੍ਰਿਪਸ਼ਨ ਰੱਦ ਕਰਨਾ ਚਾਹੁੰਦੇ ਹੋ ?",
      SubDaysRemaining: "ਸਬਸਕ੍ਰਿਪਸ਼ਨ ਦੇ ਬਾਕੀ ਦਿਨ :",
      RenewSub: "ਸਬਸਕ੍ਰਿਪਸ਼ਨ ਨਵਿਆਓ",
      cancelSub: "ਸਬਸਕ੍ਰਿਪਸ਼ਨ ਰੱਦ ਕਰੋ",
      renewSubConfirmation:
        "ਜੇ ਤੁਸੀਂ ਹੁਣੇ ਨਵਿਆਉਣਾ ਚੁਣਦੇ ਹੋ, ਤਾਂ ਅੱਜ ਤੋਂ ਨਵਾਂ ਬਿਲਿੰਗ ਚੱਕਰ ਸ਼ੁਰੂ ਹੋਵੇਗਾ ਅਤੇ ਤੁਹਾਡੀ ਮੌਜੂਦਾ ਸਬਸਕ੍ਰਿਪਸ਼ਨ ਦਾ ਬਾਕੀ ਸਮਾਂ ਵੈਧ ਨਹੀਂ ਰਹੇਗਾ। ਕੀ ਤੁਸੀਂ ਨਵਿਆਉਣਾ ਜਾਰੀ ਰੱਖਣਾ ਚਾਹੁੰਦੇ ਹੋ?",
      renew: "ਨਵਿਆਓ",
      BloodPressure: "ਬਲੱਡ ਪ੍ਰੈਸ਼ਰ",
      BloodGlucose: "ਖੂਨ ਵਿੱਚ ਗਲੂਕੋਜ਼",
      BMI: "ਬੀਐਮਆਈ",
      PDFDonwload: "PDF ਡਾਊਨਲੋਡ ਹੋ ਗਈ !",
      PDFShared: "PDF ਸਾਂਝੀ ਕੀਤੀ ਗਈ !",
      Error: "ਕੁਝ ਗਲਤ ਹੋ ਗਿਆ !",
      aboutTheApp: "ਐਪ ਬਾਰੇ",
      GetStarted: "ਸ਼ੁਰੂ ਕਰੋ",
      systolic: "ਸਿਸਟੋਲਿਕ",
      diastolic: "ਡਾਇਸਟੋਲਿਕ",
      start: "ਸ਼ੁਰੂ ਕਰੋ",
      enterRequiredFields: "ਕਿਰਪਾ ਕਰਕੇ ਸਾਰੇ ਲੋੜੀਂਦੇ ਖ਼ਾਨੇ ਭਰੋ !",
      enterThisFields: "ਇਹ ਖ਼ਾਨਾ ਜ਼ਰੂਰੀ ਹੈ !",

      exit: "ਬਾਹਰ ਜਾਓ",
      exitApp: "ਐਪ ਤੋਂ ਬਾਹਰ ਜਾਓ",
      appExitConfirmation: "ਕੀ ਤੁਸੀਂ ਐਪ ਤੋਂ ਬਾਹਰ ਜਾਣਾ ਚਾਹੁੰਦੇ ਹੋ ?",
      leavePage: "ਮੁਲਾਂਕਣ ਤੋਂ ਬਾਹਰ ਜਾਣਾ ਹੈ ?",
      leavePageConfirmation:
        "ਇਸ ਪੰਨੇ ਤੋਂ ਬਾਹਰ ਜਾਣ ਉੱਤੇ ਤੁਹਾਡੀ ਦਰਜ ਕੀਤੀ ਜਾਣਕਾਰੀ ਖਤਮ ਹੋ ਜਾਵੇਗੀ",

      downloadOptions: "ਡਾਊਨਲੋਡ ਵਿਕਲਪ",
      a4Size: "A4 ਆਕਾਰ",
      usLetter: "US ਲੈਟਰ ਆਕਾਰ",
      pdfDownloaded: "PDF ਡਾਊਨਲੋਡ ਹੋ ਗਈ !",
      addedToGroup: "ਗਰੁੱਪ ਵਿੱਚ ਸਫਲਤਾਪੂਰਵਕ ਜੋੜਿਆ ਗਿਆ !",
      success: "ਸਫਲ",
      exportedTo: "ਇੱਥੇ ਐਕਸਪੋਰਟ ਕੀਤਾ ਗਿਆ",

      aboutTheAppDesc:
        "ਇਹ ਐਪ ਕਿਸੇ ਵਿਅਕਤੀ ਦੀਆਂ ਜੀਵਨਸ਼ੈਲੀ ਆਦਤਾਂ ਦੇ ਆਧਾਰ ਉੱਤੇ ਉਸਦੇ ਸਰੀਰ ਦੀ “ਸਿਹਤ ਦੀ ਉਮਰ” ਪਤਾ ਕਰਨ ਵਿੱਚ ਮਦਦ ਕਰਦੀ ਹੈ। ਇਹ ਐਪ ਮਸ਼ਹੂਰ ਅਲਾਮੇਡਾ ਕਾਉਂਟੀ ਲੰਬੀ ਉਮਰ ਅਧਿਐਨਾਂ ਅਤੇ ਨਵੇਂ ਐਡਵੈਂਟਿਸਟ ਸਿਹਤ ਅਧਿਐਨਾਂ ਦੀ ਜਾਣਕਾਰੀ ਨੂੰ ਜੋੜਦੀ ਹੈ। ਇਹ ਭਾਗ ਲੈਣ ਵਾਲਿਆਂ ਨੂੰ ਉਹਨਾਂ ਦੀਆਂ ਸਿਹਤ ਆਦਤਾਂ ਅਤੇ ਮੌਤ ਦੇ ਖ਼ਤਰੇ ਵਿਚਕਾਰ ਮਜ਼ਬੂਤ ਸਬੰਧ ਸਮਝਣ ਵਿੱਚ ਮਦਦ ਕਰਦੀ ਹੈ। ਇਹ ਸਿਹਤ ਸਲਾਹ ਲਈ ਸ਼ਾਨਦਾਰ ਆਧਾਰ ਪ੍ਰਦਾਨ ਕਰਦੀ ਹੈ।",
      aboutTheAppTitle: "ਐਪ ਬਾਰੇ",
    },
  },
  // NOTE: fa / he / ur are RTL. Like the existing `ar` bundle, they are
  // intentionally NOT listed in LanguageScreen, ChangesLanguage or the
  // DrawerNavigator language menu, because the app has no RTL layout support.
  // They are prepared here so they can be switched on once RTL lands.
  fa: {
    translation: {
      welcome: "خوش آمدید",
      chooseLanguage: "انتخاب زبان",
      introduction: "معرفی",
      howItWorks: "چگونه کار می‌کند",
      benefits: "مزایا",
      discoverHealthAge: "سن سلامت خود را کشف کنید!",
      lifestyleAffectsHealth:
        "سبک زندگی شما بیش از آنچه فکر می‌کنید بر سلامتی‌تان اثر می‌گذارد. بیایید ببینیم واقعاً چقدر جوان هستید!",
      simpleScienceBacked: "ساده و مبتنی بر علم",
      answerQuestions:
        "به چند پرسش درباره‌ی عادت‌هایتان پاسخ دهید تا ما سن سلامت شما را بر پایه‌ی داده‌های واقعی سلامت محاسبه کنیم.",
      getPersonalizedTips: "توصیه‌های سلامت شخصی‌سازی‌شده دریافت کنید",
      improveLifestyle:
        "با توصیه‌های سفارشی سبک زندگی خود را بهبود دهید و به بهترین توان سلامتی خود برسید.",
      helpCalculateHealthAge: "می‌توانم در محاسبه‌ی سن سلامت شما کمک کنم.",
      startAssessment: "همین حالا ارزیابی خود را آغاز کنید",
      home: "خانه",
      purchases: "خریدها",
      history: "تاریخچه",
      dailyLimit: "محدودیت روزانه",

      getStarted:
        "بیایید شروع کنیم. سن سلامت شما بر پایه‌ی سبک زندگی و عادت‌های شماست.",
      whatIsYourName: "نام شما چیست؟",
      enterName: "نام را وارد کنید",
      next: "بعدی",
      whatIsYourAge: "سن شما چند است؟",
      age: "سن",
      whatIsYourGender: "جنسیت شما چیست؟",
      gender: "جنسیت",
      male: "مرد",
      female: "زن",
      whatIsYourHeight: "قد شما چقدر است؟",
      height: "قد",
      whatIsYourWeight: "وزن شما چقدر است؟",
      weight: "وزن",
      whatIsYourWaistCircumference: "دور کمر شما چقدر است؟",
      waistCircumference: "دور کمر",
      whatIsYourBloodPressure: "فشار خون شما چقدر است؟",
      bloodPressure: "فشار خون",
      whatIsYourBloodGlucose: "سطح قند خون شما چقدر است؟",
      fasting: "ناشتا",
      postMeals: "پس از غذا",
      bloodGlucoseLevel: "سطح قند خون",

      newAssessment: "ارزیابی جدید",
      howOftenEatBreakfast: "چند وقت یک‌بار صبحانه‌ی کامل می‌خورید؟",
      breakfastNote: "(با تأکید بر غلات کامل، میوه‌ها یا سبزیجات و آجیل)",
      lessThan2Days: "کمتر از ۲ روز در هفته",
      twoToFourDays: "۲ - ۴ روز در هفته",
      fiveToSixDays: "۵ - ۶ روز در هفته",
      everyday: "هر روز",
      howOftenSnack: "چند وقت یک‌بار میان‌وعده می‌خورید؟",
      severalTimesDay: "چند بار در روز",
      onceDay: "یک بار در روز",
      fewTimesWeek: "چند بار در هفته",
      rarelyNever: "به ندرت یا هرگز",
      howManyFruitsVeggies: "روزانه چند وعده میوه و سبزیجات می‌خورید؟",
      fruitsVeggiesNote:
        "(۱ وعده = ۱ قطعه متوسط، ۱ فنجان تازه، ½ فنجان پخته شده، یا ۶ اونس آب‌میوه ۱۰۰٪)",
      howManyWholeGrains: "روزانه چند وعده غلات کامل مصرف می‌کنید؟",
      wholeGrainsNote:
        "(۱ وعده = ۱ برش نان، ½ پیمانه برنج قهوه‌ای یا جو، ⅔ پیمانه غلات خشک)",
      none: "هیچ‌کدام",
      back: "بازگشت",
      howManyNutsSeeds: "در هر هفته چند وعده آجیل و دانه می‌خورید؟",
      nutsSeedsNote: "(۱ وعده = ۱ اونس آجیل یا دانه، ۲ قاشق غذاخوری کره‌ی آجیل)",
      howOftenRedMeat: "چند وقت یک بار گوشت قرمز می‌خورید؟",
      threeOrMoreTimesWeek: "۳ بار یا بیشتر در هفته",
      onceTwiceMonth: "یک یا دو بار در ماه",
      never: "هرگز",
      howOftenExercise:
        "چند وقت یک بار ۲۰ تا ۳۰ دقیقه ورزش با شدت متوسط تا شدید انجام می‌دهید؟",
      rarely: "به ندرت",
      oneTwoDaysWeek: "۱ - ۲ روز در هفته",
      threeFourDaysWeek: "۳ - ۴ روز در هفته",
      fiveMoreDaysWeek: "۵ روز یا بیشتر در هفته",
      howIsWeight: "وضعیت وزن شما چگونه است؟",
      severelyOverweight: "اضافه وزن شدید",
      moderatelyOverweight: "اضافه وزن متوسط",
      underweight: "کم‌وزن",
      healthyWeight: "وزن سالم",
      howOftenSleep: "چند وقت یک بار ۷ تا ۸ ساعت می‌خوابید؟",
      twoOrFewerDays: "۲ روز یا کمتر در هفته",
      threeFourDays: "۳ - ۴ روز در هفته",
      fiveSixDays: "۵ - ۶ روز در هفته",
      whatIsTobaccoHistory: "تاریخچه شما با تنباکو چیست؟",
      currentlyUse: "در حال حاضر استفاده می‌کنم",
      quitLessThanTwoYears: "کمتر از ۲ سال پیش ترک کرده‌ام",
      quitOverTwoYears: "بیش از ۲ سال پیش ترک کرده‌ام",
      neverUsed: "هرگز استفاده نکرده‌ام",
      howManyAlcohol: "چند وعده الکل در هفته مصرف می‌کنید؟",
      alcoholNote: "(۱۲ اونس آبجو، ۸ اونس مشروب مالت، ۵ اونس شراب، ۱.۵ اونس شات)",
      excessiveAlcohol: "۱۵+ (مردان) یا ۸+ (زنان)",
      howRateSpirituality: "معنویت خود را چگونه ارزیابی می‌کنید؟",
      noInterest: "بدون علاقه",
      moderatelySpiritual: "تا حدودی معنوی",
      deeplySpiritual: "عمیقاً معنوی",

      Is_Interests: "علایق",
      Is_TellYourInterest:
        "برای شخصی‌سازی تجربه‌ی شما، به ما بگویید به چه چیزی علاقه دارید.",
      Is_WeightManagement: "مدیریت وزن",
      Is_FitAndExercise: "سلامت و ورزش",
      Is_StopSmoking: "ترک سیگار",
      Is_HealthyCooking: "پخت و پز سالم",
      Is_StressReduction: "کاهش استرس",
      Is_PreventHeartDisease: "پیشگیری از بیماری‌های قلبی",
      Is_DepressionRecovery: "بهبود از افسردگی",
      Is_ReversingDiabetes: "معکوس کردن دیابت",
      Is_NaturalRemedies: "درمان‌های طبیعی",
      Is_SpiritualHealth: "سلامت روحی",
      Is_ImprovingMentalPerformance: "بهبود عملکرد ذهنی",
      Is_Other: "سایر",
      Is_Name: "نام",
      Is_Email: "ایمیل",
      Is_Address: "نشانی",
      Is_Phone: "تلفن",
      Is_Zip: "کد پستی",
      Is_ShowReport: "نمایش گزارش",

      Rs_Report: "گزارش",
      Rs_CustomizedReport: "گزارش سفارشی برای :",
      Rs_YourHealthAge: "سن سلامت شما",
      Rs_YourActualAge: "سن واقعی شما",
      Rs_CurrentAge: "سن کنونی",
      Rs_HealthAge: "سن سلامت",
      Rs_PotentialAge: "سن سلامت بالقوه",
      Rs_HealthyHabitsParagraph:
        "چند پژوهش بزرگ، از جمله مطالعه‌ی شناخته‌شده‌ی آلامیدا کانتی و مطالعات سلامت ادونتیست، ارتباط قوی میان عادت‌های سلامتی فهرست‌شده در زیر و خطر بیماری یا مرگ را نشان می‌دهند. افرادی که همه‌ی این عادت‌های سالم را رعایت می‌کنند ممکن است طول عمر خود را تا نزدیک به ۳۰ سال تحت تأثیر قرار دهند.",
      Rs_MedicalDisclaimerTitle: "سلب مسئولیت پزشکی",
      Rs_MedicalDisclaimerText:
        "سن سلامت تنها برای اهداف اطلاع‌رسانی و آموزشی است. این یک تشخیص پزشکی نیست و نباید جایگزین مشاوره، تشخیص یا درمان پزشکی حرفه‌ای شود. پیش از هرگونه تصمیم پزشکی یا تغییر در مراقبت‌های سلامتی خود، همواره با یک متخصص واجد شرایط مشورت کنید.",
      Rs_MedicalSources: "منابع پزشکی",
      Rs_Source: "منبع",
      Rs_Recommendations: "توصیه‌ها",
      Rs_1_title: "هر روز یک صبحانه خوب بخورید",
      Rs_1_desc:
        "صبحانه متابولیسم را افزایش می‌دهد، به تمرکز کمک می‌کند و عملکرد را در مدرسه و محل کار بهبود می‌بخشد. همچنین به حفظ وزن سالم کمک می‌کند.",
      Rs_2_title: "از خوردن تنقلات خودداری کنید",
      Rs_2_desc:
        "خوردن تنقلات می‌تواند روزانه به طور متوسط ۵۸۰ کالری اضافه کند، هضم را مختل کند، کنترل قند خون را به هم بزند و به افزایش وزن بینجامد.",
      Rs_3_title: "میوه‌ها و سبزیجات بیشتری مصرف کنید",
      Rs_3_desc:
        "میوه‌ها و سبزیجات سرشار از فیتوشیمیکال‌ها، ویتامین‌ها و فیبر هستند و کالری کمتری دارند.",
      Rs_4_title: "مصرف غلات کامل را افزایش دهید",
      Rs_4_desc:
        "غلات کامل حاوی فیبر، ویتامین‌های گروه B و مواد معدنی ضروری هستند که از سلامت کلی پشتیبانی می‌کنند.",
      Rs_5_title: "آجیل بیشتری بخورید",
      Rs_5_desc:
        "آجیل منبع بسیار خوبی از پروتئین و چربی‌های سالم است و به تنظیم سطح قند خون کمک می‌کند.",
      Rs_6_title: "از گوشت قرمز بپرهیزید",
      Rs_6_desc:
        "خوردن گوشت قرمز با دیابت نوع ۲، بیماری قلبی، سکته و برخی سرطان‌ها مرتبط بوده است.",
      Rs_7_title: "به طور منظم ورزش کنید",
      Rs_7_desc:
        "ورزش انرژی را افزایش می‌دهد، خلق و خو و سطح کلسترول را بهبود می‌بخشد، فشار خون را کاهش می‌دهد، خواب را بهتر می‌کند، ایمنی بدن را تقویت می‌کند و به کنترل قند خون کمک می‌کند.",
      Rs_8_title: "به وزن سالم برسید",
      Rs_8_desc:
        "شاخص توده بدنی را بین ۱۸.۵ - ۲۴.۹ و دور کمر را در محدوده‌ی سالم نگه دارید (کمتر از ۴۰ اینچ برای مردان، ۳۵ اینچ برای زنان).",
      Rs_9_title: "هر شب ۷ تا ۸ ساعت خواب خوب داشته باشید",
      Rs_9_desc:
        "خواب کافی از حافظه، یادگیری، متابولیسم و عملکرد ایمنی بدن پشتیبانی می‌کند.",
      Rs_10_title: "سیگار را ترک کنید",
      Rs_10_desc:
        "سیگار کشیدن به هر عضو بدن آسیب می‌رساند و خطر سرطان، بیماری قلبی، بیماری مزمن انسدادی ریه (COPD)، آسم و مشکلات دندانی را افزایش می‌دهد.",
      Rs_11_title: "الکل ننوشید",
      Rs_11_desc:
        "مصرف الکل می‌تواند به مشکلات عصبی، قلبی-عروقی و روانپزشکی بینجامد و خطر سرطان و بیماری کبدی را افزایش دهد.",
      Rs_12_title: "معنویت را افزایش دهید",
      Rs_12_desc:
        "ایمان به خدا می‌تواند سلامت روان را بهبود بخشد و عملکرد ایمنی بدن را تقویت کند.",
      Rs_SavePdf: "ذخیره pdf",
      Rs_ShareReport: "اشتراک‌گذاری گزارش",

      Hs_List: "فهرست",
      Hs_Group: "گروه",
      Hs_View: "مشاهده",
      Hs_Filter: "فیلتر",
      Hs_Options: "گزینه‌ها",
      Hs_Export: "برون‌ریزی",
      Hs_Delete: "حذف",
      Hs_Search: "جستجو",
      Hs_ExportAsCSV: "برون‌ریزی به صورت CSV",
      Hs_Confirmation: "آیا مطمئن هستید که می‌خواهید حذف کنید ؟",
      Hs_Success: "مورد حذف شد",
      Hs_Cancel: "لغو",
      Hs_ItemsSelected: "مورد انتخاب شد",
      Hs_SelectAll: "انتخاب همه",
      Hs_NewGroup: "گروه جدید",
      Hs_ExistingGroup: "گروه موجود",
      Hs_Create: "ایجاد",
      Hs_GroupName: "نام گروه",
      Hs_EnterGroupName: "نام گروه را وارد کنید",
      Hs_Reports: "گزارش‌ها",
      Hs_save: "ذخیره",
      Hs_Nothing: "هنوز چیزی اینجا نیست!",
      Hs_NothingDesc:
        "پس از تکمیل ارزیابی، گزارش‌های سن سلامت شما اینجا نمایش داده می‌شوند.",
      Hs_Download: "دانلود",
      Hs_LanguageChanged: "زبان با موفقیت تغییر کرد",
      Hs_Change: "تغییر",

      Fs_Filter: "فیلتر بر اساس",
      Fs_Close: "بستن",
      Fs_Date: "تاریخ",
      Fs_From: "از",
      Fs_To: "تا",
      Fs_ClearAll: "پاک کردن همه",
      Fs_ShowResults: "نمایش نتایج",

      select: "انتخاب",
      total: "مجموع",
      purchase: "خرید",
      aboutProgramme: "درباره‌ی برنامه",
      reports: "گزارش‌ها",
      PrintQuestion: "چاپ پرسشنامه",
      PrintReport: "چاپ گزارش خالی",
      reportSetting: "تنظیمات گزارش",
      changeLanguage: "تغییر زبان",
      uploadLogo: "لوگوی خود را بارگذاری کنید",
      upload: "بارگذاری",
      contactDetails: "اطلاعات تماس",
      enterAddress: "نشانی را وارد کنید",
      enterPhone: "شماره تلفن را وارد کنید",
      createGroup: "ایجاد گروه",

      normalBp: "فشار خون شما طبیعی است",
      MaintainBp: "لطفاً فشار خون خود را کنترل کنید",
      bpRange: "محدوده‌ی طبیعی ۹۰-۱۱۹/۶۰-۷۹ mmHg است.",
      normalGlucoseLevel: "سطح قند خون شما طبیعی است",
      maintainGlucoseLevel: "لطفاً سطح قند خون خود را کنترل کنید",
      normalRangeGlucose: "محدوده‌ی طبیعی",
      for: "—",
      postMeal: "پس از غذا",
      test: "برای آزمایش صدق می‌کند",
      maintainBloodGlucose: "سطح قند خون خود را حفظ کنید",
      maintainLowBloodGlucoseDesc:
        "سطح قند خون شما پایین است. قند خون پایدار از بروز عوارض جلوگیری می‌کند، انرژی را افزایش می‌دهد و از سلامت کلی پشتیبانی می‌کند. تغذیه‌ی متعادل و ورزش به کنترل آن کمک می‌کنند!",
      maintainHighBloodGlucoseDesc:
        "سطح قند خون شما بالا است. قند خون پایدار از بروز عوارض جلوگیری می‌کند، انرژی را افزایش می‌دهد و از سلامت کلی پشتیبانی می‌کند. تغذیه‌ی متعادل و ورزش به کنترل آن کمک می‌کنند!",
      maintainBloodPressure: "فشار خون را تحت کنترل نگه دارید",
      maintainBloodPressureDesc:
        "حفظ فشار خون سالم خطر بیماری قلبی، سکته و مشکلات کلیوی را کاهش می‌دهد. ورزش منظم و رژیم غذایی متعادل می‌تواند تفاوت بزرگی ایجاد کند!",
      maintainLowBloodPressureDesc:
        "فشار خون شما پایین است. حفظ فشار خون سالم خطر بیماری قلبی، سکته و مشکلات کلیوی را کاهش می‌دهد. ورزش منظم و رژیم غذایی متعادل می‌تواند تفاوت بزرگی ایجاد کند!",
      maintainHighBloodPressureDesc:
        "فشار خون شما بالا است. حفظ فشار خون سالم خطر بیماری قلبی، سکته و مشکلات کلیوی را کاهش می‌دهد. ورزش منظم و رژیم غذایی متعادل می‌تواند تفاوت بزرگی ایجاد کند!",

      downloadSuccess: "با موفقیت دانلود شد",
      goBackConfirmation: "آیا مطمئن هستید که می‌خواهید بازگردید ؟",
      pleaseWait: "لطفاً صبر کنید!",
      goBeyond: "فراتر از امکانات پایه بروید!",
      JoinPro:
        "به اعضای پرو ما بپیوندید و سفر سلامتی خود را به سطح بالاتری ببرید",
      WhyJoinPro: "چرا به پرو بپیوندیم ؟",
      UnlimitedReports: "گزارش‌های نامحدود",
      FullReportHistory: "تاریخچه‌ی کامل گزارش‌ها",
      PrintYourQuestionnaire: "چاپ پرسشنامه با لوگوی شما",
      printYourReport: "چاپ گزارش‌های خالی با لوگوی شما",
      upgrade: "ارتقا",
      yearlyPurchase: "خرید سالانه",
      thisOneForPro: "اوه! این یکی مخصوص اعضای پرو است.",
      proMembersDesc:
        "این قابلیت تنها برای اعضای پرو ما در نظر گرفته شده است. می‌خواهید بپیوندید؟ همین حالا ارتقا دهید و از مزایای ویژه‌ای که برای شما آماده شده بهره‌مند شوید!",
      UpgradeComplete: "ارتقا کامل شد!",
      NowAProMember: "شما اکنون عضو پرو هستید!",
      UpgradeTo: "ارتقا به",
      SubscriptionCancelledSuccess: "اشتراک با موفقیت لغو شد!",
      ConfirmSubCancel: "آیا مطمئن هستید که می‌خواهید اشتراک را لغو کنید ؟",
      SubDaysRemaining: "روزهای باقی‌مانده‌ی اشتراک :",
      RenewSub: "تمدید اشتراک",
      cancelSub: "لغو اشتراک",
      renewSubConfirmation:
        "اگر اکنون تمدید را انتخاب کنید، یک دوره‌ی صورتحساب جدید از امروز آغاز می‌شود و مدت باقی‌مانده‌ی اشتراک فعلی شما دیگر معتبر نخواهد بود. آیا مطمئن هستید که می‌خواهید تمدید را ادامه دهید؟",
      renew: "تمدید",
      BloodPressure: "فشار خون",
      BloodGlucose: "قند خون",
      BMI: "شاخص توده بدنی",
      PDFDonwload: "PDF دانلود شد !",
      PDFShared: "PDF به اشتراک گذاشته شد !",
      Error: "مشکلی پیش آمد !",
      aboutTheApp: "درباره‌ی برنامه",
      GetStarted: "شروع کنید",
      systolic: "سیستولیک",
      diastolic: "دیاستولیک",
      start: "شروع",
      enterRequiredFields: "لطفاً همه‌ی فیلدهای لازم را پر کنید !",
      enterThisFields: "این فیلد الزامی است !",

      exit: "خروج",
      exitApp: "خروج از برنامه",
      appExitConfirmation: "آیا می‌خواهید از برنامه خارج شوید ؟",
      leavePage: "از ارزیابی خارج می‌شوید ؟",
      leavePageConfirmation:
        "با ترک این صفحه، اطلاعاتی که وارد کرده‌اید از بین خواهد رفت",

      downloadOptions: "گزینه‌های دانلود",
      a4Size: "اندازه A4",
      usLetter: "اندازه US Letter",
      pdfDownloaded: "PDF دانلود شد !",
      addedToGroup: "با موفقیت به گروه افزوده شد !",
      success: "موفق",
      exportedTo: "برون‌ریزی شد به",

      aboutTheAppDesc:
        "این برنامه کمک می‌کند «سن سلامت» بدن فرد بر پایه‌ی عادت‌های سبک زندگی او تعیین شود. این برنامه اطلاعات مطالعات شناخته‌شده‌ی طول عمر آلامیدا کانتی و مطالعات جدید سلامت ادونتیست را با هم ترکیب می‌کند. این برنامه به شرکت‌کنندگان کمک می‌کند ارتباط قوی میان عادت‌های سلامتی و خطر مرگ را درک کنند و پایه‌ای بسیار خوب برای مشاوره‌ی سلامت فراهم می‌آورد.",
      aboutTheAppTitle: "درباره‌ی برنامه",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
