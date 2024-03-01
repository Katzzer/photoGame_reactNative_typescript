import {ScrollView, Text, Image, StyleSheet, Pressable, Modal, View, TouchableHighlight} from "react-native";
import React, {useContext, useEffect, useState} from "react";
import TokenContext from "../context/token-context";
import {BACKEND_URL, colors} from "../constants/constants";
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

        const response = await axios.get(`${BACKEND_URL.BY_IP}/photo/thumbnail/${photo.id}`, config);
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
        // const url = params.country ? `${BACKEND_URL.BY_IP}/find-photos-by-location/${params.country}/${params.city}` : `${BACKEND_URL.BY_IP}/photos/all-photos-for-current-user`
        const url = `${BACKEND_URL.BY_IP}/photos/all-photos-for-current-user`;

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
                const response = await axios.get(`${BACKEND_URL.BY_IP}/photo-for-mobile/${imageId}`, config);
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
        <ScrollView contentContainerStyle={{padding: 10}} style={styles.container}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={isModalWindowForImageOpen}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>

                        <View style={{ width: '100%', height: '90%', marginBottom: 10, backgroundColor: "black" }}>
                            <Image
                                style={{ width: '100%', height: '100%' }}
                                source={{ uri: image || 'placeholder_image_url'}}
                                resizeMode="contain"
                            />
                        </View>

                        <TouchableHighlight
                            style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                            onPress={() => {
                                setIsModalWindowForImageOpen(!isModalWindowForImageOpen);
                            }}
                        >
                            <Text style={styles.textStyle}>Close Modal</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>

            {listOfPhotosWithImage.map((photo) => (
                <Pressable key={photo.id} onPress={() => showModalWindowWithImage(photo.id)} hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
                    <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#626262', height: 200, marginBottom: 10 }}>
                        <Image
                            source={{ uri: photo.image }}
                            resizeMode="contain"
                            style={{ width: '100%', height: '100%' }}
                        />
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
    menu_text: {
        color: "black",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 40,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        width: '100%',
        height: '100%'
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        // borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '100%',
        height: '100%', // This sets 100% height
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },


    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});