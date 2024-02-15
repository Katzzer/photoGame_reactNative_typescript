import React, {useState} from 'react';
import { Button, Image, View, ImageSourcePropType } from 'react-native';
import { launchCamera, CameraOptions, ImagePickerResponse } from 'react-native-image-picker';

function CapturePhoto() {
    const [photo, setPhoto] = useState<ImageSourcePropType | null>(null);

    const capturePhoto = () => {
        const options: CameraOptions = {
            mediaType: 'photo',
            maxWidth: 300,
            maxHeight: 300,
        };

        launchCamera(options, (response: ImagePickerResponse) => {
            if (response.assets && response.assets.length > 0) {
                const uri = response.assets[0].uri;
                if (uri) {
                    setPhoto({ uri });
                }
            }
        });
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button title="Capture Photo" onPress={capturePhoto} />
            {photo && <Image source={photo} style={{ width: 300, height: 300 }} />}
        </View>
    );
}

export default CapturePhoto;