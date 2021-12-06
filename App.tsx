import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';

export default function App() {
  const devices = useCameraDevices();

  const [hasPermission, setHasPermission] = useState<boolean>();

  const device = devices.back;

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermission();

      setHasPermission(cameraPermission === 'authorized');
    })();
  }, []);

  if (hasPermission === undefined) {
    return (
      <View>
        <Text>Requesting camera permission</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View>
        <Text>No camera permission</Text>
      </View>
    );
  }

  if (!device) {
    return (
      <View>
        <Text>Loading camera</Text>
      </View>
    );
  }

  return (
    <View style={[styles.flex1, styles.bgWhite]}>
      <Camera style={styles.absoluteFill} device={device} isActive />

      <View style={styles.flex1}>
        <Text>Hello camera</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  bgWhite: {
    backgroundColor: '#fff',
  },
  absoluteFill: StyleSheet.absoluteFillObject,
});
