import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigator from './Navigator';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <SafeAreaProvider>
      <Navigator />
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
