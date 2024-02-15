import {ScrollView, Text, Image, StyleSheet, Pressable} from "react-native";
import React, {useContext, useEffect, useState} from "react";
import TokenContext from "../context/token-context";
import {BACKEND_URL} from "../tools/constants";
import {Photo} from "../constants/types";
import axios, {AxiosRequestConfig} from "axios";
import base64 from 'base-64';

function ListOfPhotos() {
    const [state, _] = useContext(TokenContext);
    const [listOfPhotos, setListOfPhotos] = useState<Photo[]>([]);
    const [listOfPhotosWithImage, setListOfPhotosWithImage] = useState<Photo[]>([]);

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

    function showPhotoId(photoId: number | undefined) {
        console.log("photoId:" + photoId)
    }

    return (
        <ScrollView contentContainerStyle={{padding: 10}}>
            <Text>is user logged: {String(state.isUserLogged)}</Text>

            {listOfPhotosWithImage.map((photo) => (
                <Pressable key={photo.id} onPress={() => showPhotoId(photo.id)} hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
                    <Image
                        style={{ width: '100%', height: 200, marginBottom: 10 }}
                        source={{ uri: photo.image }}
                    />
                </Pressable>
            ))}
        </ScrollView>
    );
}

export default ListOfPhotos;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#592d2d',
        alignItems: 'center',
        justifyContent: 'center',
    },
    menu_text: {
        color: "black",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 40,
    },
});