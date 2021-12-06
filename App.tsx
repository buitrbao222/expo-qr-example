import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import styles from './styles';

export default function App() {
  return (
    <View style={[styles.flex1]}>
      <StatusBar style="auto" />

      <View></View>

      <View style={[styles.bgRed]}></View>
    </View>
  );
}
