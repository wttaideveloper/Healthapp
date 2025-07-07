import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import LanguageScreen from '../screens/LanguageScreen';
import IntroScreen1 from '../screens/IntroScreen1';
import IntroScreen2 from '../screens/IntroScreen2';
import IntroScreen3 from '../screens/IntroScreen3';
import DrawerNavigator from './DrawerNavigator';
import ChangeLanguage from '../screens/ChangesLanguage';
import { initDatabase } from '../components/utils/database';


export type RootStackParamList = {
  Splash: undefined;
  Language: undefined;
  Intro1: undefined;
  Intro2: undefined;
  Intro3: undefined;
  InitialScreen: undefined;
  ChangeLanguage: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  
        // React.useEffect(() => {
        //   InitializeDb();
        // }, []);
      
        // const InitializeDb = async () => {
        //   await initDatabase().catch(console.error);
        // };
  return (
    <Stack.Navigator initialRouteName="Language" screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="Splash" component={SplashScreen} /> */}
      <Stack.Screen name="Language" component={LanguageScreen} />
      <Stack.Screen name="Intro1" component={IntroScreen1} />
      <Stack.Screen name="Intro2" component={IntroScreen2} />
      <Stack.Screen name="Intro3" component={IntroScreen3} />
      <Stack.Screen name="ChangeLanguage" component={ChangeLanguage} />
      <Stack.Screen
        name="InitialScreen"
        component={DrawerNavigator}
        
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;