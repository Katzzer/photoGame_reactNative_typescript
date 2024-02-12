import {Text} from "react-native";
import React, {useContext} from "react";
import TokenContext from "../context/token-context";

function ListOfPhotos() {
    const [state, _] = useContext(TokenContext);
    console.log(state);

    return (
        <>
            <Text>Welcome at OrderDetail</Text>
            <Text>is user logged: {String(state.isUserLogged)}</Text>
            <Text>{"state.idToken"}</Text>
        </>
    );
}

export default ListOfPhotos;
