import React, { useRef, useState } from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { CameraView, useCameraPermissions } from "expo-camera";
import {colors} from "../constants/constants";

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
        return <View style={styles.container} />;
    }
    if (!permission.granted) {
        return (
            <View style={styles.permissionContainer}>
                <Text style={styles.permissionText}>No access to camera</Text>
                <TouchableOpacity onPress={requestPermission} style={styles.button}>
                    <Text style={styles.buttonText}>Grant permission</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {capturedPhoto ? (
                <View style={styles.previewContainer}>
                    <Image source={{ uri: capturedPhoto }} style={styles.previewImage} />
                    <TouchableOpacity onPress={() => setCapturedPhoto(null)} style={styles.retakeButton}>
                        <Text style={styles.buttonText}>Retake</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <CameraView style={{ flex: 1 }} facing="back" ref={cameraRef}>
                    <View style={styles.cameraOverlay}>
                        <TouchableOpacity
                            style={styles.captureButton}
                            onPress={takePicture}>
                            <View style={styles.captureInner} />
                        </TouchableOpacity>
                    </View>
                </CameraView>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    permissionContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
        padding: 20,
    },
    permissionText: {
        color: colors.onBackground,
        fontSize: 18,
        marginBottom: 20,
    },
    button: {
        backgroundColor: colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 8,
    },
    buttonText: {
        color: colors.onPrimary,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    previewContainer: {
        flex: 1,
    },
    previewImage: {
        flex: 1,
    },
    retakeButton: {
        position: 'absolute',
        bottom: 30,
        alignSelf: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.onPrimary,
    },
    cameraOverlay: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 40,
    },
    captureButton: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 4,
        borderColor: '#fff',
    },
    captureInner: {
        width: 54,
        height: 54,
        borderRadius: 27,
        backgroundColor: '#fff',
    }
});

export default CapturePhoto;
