import React, {useContext, useEffect, useState} from "react";
import {Modal, Text, TouchableHighlight, View, Alert, StyleSheet, Image} from "react-native";
import axios, {AxiosRequestConfig} from "axios";
import TokenContext from "../context/token-context";
import {BACKEND_URL} from "../tools/constants";
import base64 from 'base-64';

function AppModal() {
    const [state, _] = useContext(TokenContext);
    const [isModalWindowForImageOpen, setIsModalWindowForImageOpen] = useState(false);
    const [image, setImage] = useState("");

    useEffect(() => {
        showModalWindowWithImage(3);
    }, []);

    async function showModalWindowWithImage(imageId: number | undefined) {
        console.log(isModalWindowForImageOpen);
        setIsModalWindowForImageOpen(true);
        const config: AxiosRequestConfig = {
            responseType: 'arraybuffer',
            headers: {
                Authorization: `Bearer ${state.idToken}`,
                'Content-Type': 'application/json',
            },
        };

        if (imageId) {
            const response = await axios.get(`${BACKEND_URL.BY_IP}/photo/${imageId}`, config);
            if (response.data) {
                const base64Image = base64.encode(new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), ''));
                setImage(`data:image/jpeg;base64,${base64Image}`);
            }
        }
    }

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={isModalWindowForImageOpen}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Hello from Modal!</Text>

                        <View style={{ width: '100%', height: '90%', marginBottom: 10, backgroundColor: "black" }}>
                                <Image
                                    style={{ width: '100%', height: '100%' }}
                                    source={{ uri: image || 'placeholder_image_url'}}
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

            <TouchableHighlight
                style={styles.openButton}
                onPress={() => {
                    setIsModalWindowForImageOpen(true);
                }}
            >
                <Text style={styles.textStyle}>Show Modal</Text>
            </TouchableHighlight>
        </View>
    );
}

const styles= StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        width: '100%',
        height: '100%', // This sets 100% height
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
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

export default AppModal;