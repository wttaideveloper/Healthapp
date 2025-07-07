import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { icons } from '../components/images';

type SplashScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Splash'>;
};

const SplashScreenComponent: React.FC<SplashScreenProps> = ({ navigation }) => {
  useEffect(() => {
    const prepare = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate loading for 2 seconds
      } catch (e) {
        console.warn(e);
      } finally {
        await SplashScreen.hideAsync();
        navigation.replace('Language'); // Navigate to Language Screen after splash
      }
    };

    prepare();
  }, []);

  return (
    <View style={styles.container}>
      <Image source={icons.splashScreen} style={{flex:1}} resizeMode='center'></Image>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default SplashScreenComponent;