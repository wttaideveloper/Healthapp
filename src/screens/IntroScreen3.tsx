import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type IntroScreen3Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Intro3'>;
};

const IntroScreen3: React.FC<IntroScreen3Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Intro Screen 3</Text>
      <Button title="Get Started" onPress={() => navigation.replace('Main')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default IntroScreen3;