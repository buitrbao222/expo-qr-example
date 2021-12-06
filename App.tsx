import { BarCodeScanningResult, Camera } from 'expo-camera';
import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  Dimensions,
  LayoutChangeEvent,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import styles from './styles';

const { width, height } = Dimensions.get('window');

export default function App() {
  const [hasPermission, setHasPermission] = useState<boolean>();

  const [qr, setQR] = useState<string>();

  const [isScanEnabled, setIsScanEnabled] = useState<boolean>(true);

  const [cameraSize, setCameraSize] =
    useState<{ width: number; height: number }>();

  const camera = useRef<Camera>(null);

  useEffect(() => {
    (async () => {
      const { granted } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(granted);
    })();
  }, []);

  const onCameraContainerLayout = (event: LayoutChangeEvent) => {
    const {
      layout: { height, width },
    } = event.nativeEvent;

    setCameraSize({
      height,
      width: (height * 3) / 4,
    });
  };

  const onBarCodeScanned = (result: BarCodeScanningResult) => {
    setQR(result.data);
    setIsScanEnabled(false);
  };

  const enableScanning = () => {
    setIsScanEnabled(true);
  };

  if (hasPermission === undefined) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.flex1}>
      <View style={styles.flex1} onLayout={onCameraContainerLayout}>
        <Camera
          ref={camera}
          style={cameraSize}
          onBarCodeScanned={isScanEnabled ? onBarCodeScanned : undefined}
          ratio="4:3"
        />
      </View>

      <View style={styles.flex1}>
        <Text>{qr || 'Scan to read QR'}</Text>

        {!isScanEnabled && (
          <Button title="Scan again" onPress={enableScanning} />
        )}
      </View>
    </View>
  );
}
