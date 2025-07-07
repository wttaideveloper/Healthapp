import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type IntroScreen2Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Intro2'>;
};

const IntroScreen2: React.FC<IntroScreen2Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Intro Screen 2</Text>
      <Button title="Next" onPress={() => navigation.navigate('Intro3')} />
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

export default IntroScreen2;