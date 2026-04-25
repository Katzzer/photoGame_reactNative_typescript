import {ScrollView, Text, Image, StyleSheet, Pressable, Modal, View, TouchableHighlight} from "react-native";
import React, {useContext, useEffect, useState} from "react";
import TokenContext from "../context/token-context";
import {ACTIVE_BACKEND_URL, colors} from "../constants/constants";
import {Photo} from "../constants/types";
import axios, {AxiosRequestConfig} from "axios";
import base64 from 'base-64';

function ListOfPhotos() {
    const [state, _] = useContext(TokenContext);
    const [listOfPhotos, setListOfPhotos] = useState<Photo[]>([]);
    const [listOfPhotosWithImage, setListOfPhotosWithImage] = useState<Photo[]>([]);
    const [isModalWindowForImageOpen, setIsModalWindowForImageOpen] = useState(false);
    const [image, setImage] = useState("");
    const [lastOpenedPhotoId, setLastOpenedPhotoId] = useState<number | undefined>(undefined);

    useEffect(() => {
        getListOfPhotos();
    }, []);

    useEffect(() => {
        function fetchPhotos() {
            try {
                listOfPhotos.map(photo => getImageThumbnailFromBackend(photo));
            } catch (error) {
                console.log(error);
            }
        }

        fetchPhotos();
    }, [listOfPhotos]);

    async function getImageThumbnailFromBackend(photo: Photo): Promise<string | undefined> {
        const config: AxiosRequestConfig = {
            responseType: 'arraybuffer',
            headers: {
                Authorization: `Bearer ${state.idToken}`,
                'Content-Type': 'application/json',
            },
        };

        const response = await axios.get(`${ACTIVE_BACKEND_URL}/photo/thumbnail/${photo.id}`, config);
        if (response.data) {

            // Use base64.encode() to convert array buffer to base64
            const base64Image = base64.encode(new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), ''));
            photo.image = `data:image/jpeg;base64,${base64Image}`;

            setListOfPhotosWithImage(prevState => {
                const doesExist = prevState.some(existingPhoto => existingPhoto.id === photo.id);

                if (!doesExist) {
                    return [...prevState, photo];
                } else {
                    return prevState;
                }
            });
        }

        return undefined;
    }

    function getListOfPhotos() {
        // const url = params.country ? `${ACTIVE_BACKEND_URL}/find-photos-by-location/${params.country}/${params.city}` : `${ACTIVE_BACKEND_URL}/photos/all-photos-for-current-user`
        const url = `${ACTIVE_BACKEND_URL}/photos/all-photos-for-current-user`;

        setListOfPhotos([]);
        setListOfPhotosWithImage([]);
        const config:AxiosRequestConfig  = {
            headers: {
                Authorization: `Bearer ${state.idToken}`
            },
        };
        axios.get(url, config).then(response => {
            setListOfPhotos(response.data);
        })
    }

    async function showModalWindowWithImage(imageId: number | undefined) {
        setIsModalWindowForImageOpen(true);

        if (imageId !== lastOpenedPhotoId) {
            setImage("");

            const config: AxiosRequestConfig = {
                responseType: 'arraybuffer',
                headers: {
                    Authorization: `Bearer ${state.idToken}`,
                    'Content-Type': 'application/json',
                },
            };

            if (imageId) {
                const startTime = Date.now();
                const response = await axios.get(`${ACTIVE_BACKEND_URL}/photo-for-mobile/${imageId}`, config);
                const endTime = Date.now();
                const elapsedTime = endTime - startTime; // Time in milliseconds

                console.log('Elapsed time for getting photo from backend in milliseconds: ', elapsedTime);
                if (response.data) {
                    const startTime = Date.now();
                    const base64Image = base64.encode(new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), ''));
                    const endTime = Date.now();
                    const elapsedTime = endTime - startTime; // Time in milliseconds

                    console.log('Elapsed time for base64 encode in milliseconds: ', elapsedTime);
                    setImage(`data:image/jpeg;base64,${base64Image}`);
                }
            }
        }

        setLastOpenedPhotoId(imageId);

    }

    return (
        <ScrollView contentContainerStyle={{padding: 15}} style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalWindowForImageOpen}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.modalHeader}>
                             <Text style={styles.modalTitle}>Detail Fotografie</Text>
                        </View>

                        <View style={styles.modalImageContainer}>
                            <Image
                                style={styles.fullImage}
                                source={{ uri: image || 'placeholder_image_url'}}
                                resizeMode="contain"
                            />
                        </View>

                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => {
                                setIsModalWindowForImageOpen(!isModalWindowForImageOpen);
                            }}
                        >
                            <Text style={styles.textStyle}>ZAVŘÍT</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {listOfPhotosWithImage.map((photo) => (
                <Pressable 
                    key={photo.id} 
                    onPress={() => showModalWindowWithImage(photo.id)}
                    style={({ pressed }) => [
                        styles.photoCard,
                        { opacity: pressed ? 0.7 : 1 }
                    ]}
                >
                    <Image
                        source={{ uri: photo.image }}
                        resizeMode="cover"
                        style={styles.thumbnail}
                    />
                    <View style={styles.photoInfo}>
                        <Text style={styles.photoId}>ID: {photo.id}</Text>
                    </View>
                </Pressable>
            ))}
        </ScrollView>
    );
}

export default ListOfPhotos;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.8)',
    },
    modalView: {
        width: '90%',
        height: '80%',
        backgroundColor: colors.surface,
        borderRadius: 15,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    },
    modalHeader: {
        width: '100%',
        marginBottom: 15,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.onSurface,
        textAlign: 'center',
    },
    modalImageContainer: {
        flex: 1,
        width: '100%',
        backgroundColor: '#000',
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 20,
    },
    fullImage: {
        width: '100%',
        height: '100%',
    },
    closeButton: {
        backgroundColor: colors.primary,
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 30,
        elevation: 2,
    },
    textStyle: {
        color: colors.onPrimary,
        fontWeight: "bold",
        textAlign: "center",
        textTransform: 'uppercase',
    },
    photoCard: {
        backgroundColor: colors.surface,
        borderRadius: 12,
        marginBottom: 20,
        overflow: 'hidden',
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
    },
    thumbnail: {
        width: '100%',
        height: 200,
    },
    photoInfo: {
        padding: 10,
        backgroundColor: colors.surface,
    },
    photoId: {
        color: colors.lightGrey,
        fontSize: 12,
    }
});
