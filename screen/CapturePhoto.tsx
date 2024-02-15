import React, {useEffect, useRef, useState} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {Camera, CameraType} from "expo-camera";

function CapturePhoto() {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const cameraRef = useRef<Camera | null>(null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (!hasPermission) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={{ flex: 1 }}>
            <Camera style={{ flex: 1 }} type={Camera.Constants.Type as CameraType} ref={cameraRef}>
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
                        onPress={async () => {
                            if (cameraRef.current) {
                                let photo = await cameraRef.current.takePictureAsync();
                                console.log('photo', photo);
                            }
                        }}>
                        <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Capture </Text>
                    </TouchableOpacity>
                </View>
            </Camera>
        </View>
    );
}

export default CapturePhoto;