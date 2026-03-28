import React, { useRef, useState } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { CameraView, useCameraPermissions } from "expo-camera";

function CapturePhoto() {
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef<CameraView | null>(null);
    const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);

    const takePicture = async () => {
        if (cameraRef.current) {
            let photo = await cameraRef.current.takePictureAsync();
            if (photo) {
                setCapturedPhoto(photo.uri);
            }
        }
    };

    if (!permission) {
        return <View />;
    }
    if (!permission.granted) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>No access to camera</Text>
                <TouchableOpacity onPress={requestPermission}>
                    <Text>Grant permission</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            {capturedPhoto ? (
                <Image source={{ uri: capturedPhoto }} style={{ flex: 1 }} />
            ) : (
                <CameraView style={{ flex: 1 }} facing="back" ref={cameraRef}>
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: 'transparent',
                            flexDirection: 'row',
                        }}>
                        <TouchableOpacity
                            style={{
                                flex: 0.1,
                                alignSelf: 'flex-end',
                                alignItems: 'center',
                            }}
                            onPress={takePicture}>
                            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Capture </Text>
                        </TouchableOpacity>
                    </View>
                </CameraView>
            )}
        </View>
    );
}

export default CapturePhoto;
