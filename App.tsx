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
const screenRatio = height / width;

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

  const onCameraReady = async () => {
    const supportedRatios =
      (await camera.current?.getSupportedRatiosAsync()) || [];

    console.log('Supported ratios:');
    for (let ratio of supportedRatios) {
      const [ratioHeight, ratioWidth] = ratio.split(':').map(x => +x);
      const ratioNumber = ratioHeight / ratioWidth;
      console.log(`${ratio}:\t ${ratioNumber}`);
    }
    console.log('Device screen ratio:', screenRatio);
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
    <View style={[styles.flex1, styles.relative]}>
      <Camera
        ref={camera}
        onCameraReady={onCameraReady}
        style={{
          width: width,
          height: width,
        }}
        onBarCodeScanned={isScanEnabled ? onBarCodeScanned : undefined}
        ratio="16:9"
      />

      <View style={styles.flex1}>
        <Text>{qr || 'Scan to read QR'}</Text>

        {!isScanEnabled && (
          <Button title="Scan again" onPress={enableScanning} />
        )}
      </View>
    </View>
  );
}
