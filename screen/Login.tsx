import {Button, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useContext, useEffect, useState} from "react";
import {AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserSession} from "amazon-cognito-identity-js";
import UserPool from "../security/UserPool";
import jwtDecode from "jwt-decode";
import LabelAndInput from "./components/LabelAndInput";
import axios from "axios";
import {BACKEND_URL, colors, SCREEN} from "../constants/constants";
import {ActionType, State} from "../model/token.model";
import TokenContext from "../context/token-context";
import {useNavigation} from "@react-navigation/native";

interface jwtTokenId {
    "aud": string,
    "auth_time": string,
    "cognito:username": string,
    "email": string,
    "email:verified": string,
    "event_id": string,
    "exp": Date,
    "iat": Date,
    "iss": string,
    "jti": string,
    "name": string,
    "sub": string,
    "token_use": string,
}

function Login()  {
    const [username, setUsername] = useState("katzz");
    const [email, setEmail] = useState("katzz@seznam.cz");
    const [password, setPassword] = useState("Monitor11!");
    const [isUserLogged, setIsUserLogged] = useState(false);
    const [loggedUserUsername, setLoggedUserUsername] = useState("");
    const [messageFromBackend, setMessageFromBackend] = useState("Press button"); // TODO: only for testing:
    const [idToken, setIdToken] = useState("");
    const [isLoginVisible, setIsLoginVisible] = useState(true);
    const [state, dispatch] = useContext(TokenContext);
    const navigation = useNavigation();

    useEffect(() => {
        checkIfUserIsLogged()
    }, [])

    function setToken(type: ActionType, tokens: Partial<State>) {
        // Merge with the current state so only provided tokens are changed
        dispatch({
            type: type,
            payload: {
                ...state,
                ...tokens
            }
        });
    }

    async function checkIfUserIsLogged() {
        console.log("checking user")
        getSessionAndVerify().then(session => {
            if (session) {
                console.log("logging user !!!!!!!!!!!!!!!!!!!!")
                setIsUserLogged(true);
                setLoggedUserUsername(session.getAccessToken().payload.username);
                setIdToken(session.getIdToken().getJwtToken());
                // setToken(ActionType.SET_ACCESS_TOKEN, {accessToken: session.getAccessToken().getJwtToken()});
                // setToken(ActionType.SET_REFRESH_TOKEN, {refreshToken: session.getRefreshToken().getToken()});
                setToken(ActionType.SET_ID_TOKEN, {idToken: session.getIdToken().getJwtToken()});
                setToken(ActionType.SET_ACCESS_TOKEN, {accessToken: session.getAccessToken().getJwtToken()});
                setToken(ActionType.SET_REFRESH_TOKEN, {refreshToken: session.getRefreshToken().getToken()});
                setIsUserLoggedContext(true);
            } else {
                console.log("user is not logged");
                setIsUserLogged(false);
                setLoggedUserUsername("");
                setIdToken("")
                // setToken(ActionType.SET_ACCESS_TOKEN, {accessToken: null})
                // setToken(ActionType.SET_REFRESH_TOKEN, {refreshToken: null})
                setIsUserLoggedContext(false);
                setToken(ActionType.SET_ID_TOKEN, {idToken: null})
                setToken(ActionType.SET_ACCESS_TOKEN, {accessToken: null})
                setToken(ActionType.SET_REFRESH_TOKEN, {refreshToken: null})
            }
        })
    }

    async function getSessionAndVerify(): Promise<CognitoUserSession | null> {
        try {
            const session = await getSession();
            // console.log(session);
            if (session instanceof CognitoUserSession) {
                return session;
            } else {
                return null;
            }
        } catch (err) {
            return null;
        }

    }

    async function getSession() {
        return await new Promise((resolve, reject) => {
            const user = UserPool.getCurrentUser();

            if (user) {
                user.getSession((err: any, session: CognitoUserSession) => {
                    if (err) {
                        reject();
                    } else {
                        resolve(session);
                    }
                });
            } else {
                reject();
            }
        });
    }

    function setIsUserLoggedContext(isUserLogged: boolean) {
        console.log("isUserLogged = " + isUserLogged)
        dispatch({
            type: ActionType.SET_IS_USER_LOGGED,
            payload: {
                ...state,
                isUserLogged: isUserLogged
            }
        });
    }

    function onSubmit() {
        const attributesToBeAdded = [
            {
                Name: "name",
                Value: username,
            },
            {
                Name: "email",
                Value: email,
            },
        ];


        const attrList: Array<CognitoUserAttribute> = attributesToBeAdded.map(
            attr => {
                return new CognitoUserAttribute(attr);
            }
        );

        UserPool.signUp(username, password, attrList, [], (err, data) => {
                if (err) {
                    console.log(err)
                }

                console.log(data)
            }
        )
    }

    function onLogin() {
        const user = new CognitoUser({
            Username: email,
            Pool: UserPool
        });

        const authDetails = new AuthenticationDetails({
            Username: email,
            Password: password
        });

        user.authenticateUser(authDetails, {
            onSuccess: (data) => {
                // console.log("onSuccess: ", data);
                setIsUserLogged(true);
                setIdToken(data.getIdToken().getJwtToken());
                const jwtToken = data.getIdToken().getJwtToken();
                const jwtDecoded: jwtTokenId = jwtDecode(jwtToken);
                // console.log(jwtDecoded);
                // console.log(jwtDecoded.name);
                // console.log(jwtDecoded);
                setLoggedUserUsername(jwtDecoded.name);
                setIsUserLoggedContext(true);
                setToken(ActionType.SET_ID_TOKEN, {idToken: data.getIdToken().getJwtToken()});
                setToken(ActionType.SET_ACCESS_TOKEN, {accessToken: data.getAccessToken().getJwtToken()});
                setToken(ActionType.SET_REFRESH_TOKEN, {refreshToken: data.getRefreshToken().getToken()});
                navigation.navigate(SCREEN.LIST_OF_PHOTOS as never);
            },
            onFailure: (err) => {
                console.log("on Failure ", err);
                setIsUserLoggedContext(false);
            },
            newPasswordRequired: (data) => {
                console.log("newPasswordRequired: ", data);
            },
        })
    }

    function logout() {
        console.log("logging user out")
        const user = UserPool.getCurrentUser();
        console.log(user)
        if (user) {
            setIsUserLogged(false);
            setIsUserLoggedContext(false);
            setLoggedUserUsername("");
            user.signOut();
        }

    }

    // TODO: remove when not needed
    async function sendTestingRequestToBackend() {
        const config = {
            headers: { Authorization: `Bearer ${idToken}` }
        };

        console.log("idToken = " + idToken);
        console.log("-------------------")
        console.log("BACKEND_URL = " + BACKEND_URL.BY_IP);
        const response= await axios.get(BACKEND_URL.BY_IP, config);
        console.log(response);
        console.log(response.data);
        setMessageFromBackend(response.data);
    }

    function toggleLoginAndSignUp() {
        setIsLoginVisible(!isLoginVisible);
    }

    return (
        <View style={styles.container}>
            {!isUserLogged && !isLoginVisible &&
                <>
                    <View style={styles.formWrapper}>
                        <LabelAndInput
                            labelName={"Username"}
                            textInputValue={username}
                            onChange={setUsername}
                        />

                        <LabelAndInput
                            labelName={"Email"}
                            textInputValue={email}
                            onChange={setEmail}
                        />

                        <LabelAndInput
                            labelName={"Password"}
                            textInputValue={password}
                            onChange={setPassword}
                            isPassword={true}
                        />

                        <TouchableOpacity onPress={onSubmit} style={styles.button}>
                            <Text style={styles.buttonText}>Sign In</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={toggleLoginAndSignUp} style={styles.buttonReversed}>
                            <Text style={styles.buttonTextReversed}>Already member? Log In!</Text>
                        </TouchableOpacity>

                    </View>
                </>
            }
            {!isUserLogged && isLoginVisible &&
                <>
                    <View style={styles.formWrapper}>
                        <LabelAndInput
                            labelName={"Email"}
                            textInputValue={email}
                            onChange={setEmail}
                        />

                        <LabelAndInput
                            labelName={"Password"}
                            textInputValue={password}
                            onChange={setPassword}
                            isPassword={true}
                        />
                    </View>

                    <TouchableOpacity onPress={onLogin} style={styles.button}>
                        <Text style={styles.buttonText}>Log In</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={toggleLoginAndSignUp} style={styles.buttonReversed}>
                        <Text style={styles.buttonTextReversed}>Not a member? Sign Up!</Text>
                    </TouchableOpacity>
                </>
            }

            {isUserLogged &&
                <>
                    <Text>Welcome {loggedUserUsername}</Text>
                    <Button title={"Logout"} onPress={logout}/>

                    <Button title={"Send testing request to backend"} onPress={sendTestingRequestToBackend}/>
                    <Text>{messageFromBackend}</Text>
                </>
            }

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background
    },
    formWrapper: {
        flex: 0,
        width: '90%',
        height: 'auto',
        alignSelf: 'center'
    },
    button: {
        backgroundColor: colors.lightBlue,
        borderRadius: 40,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        width: '90%',
        marginTop: 15
    },
    buttonText: {
        color: colors.background,
        fontSize: 18,
        fontWeight: "bold",
    },
    buttonReversed: {
        backgroundColor: colors.background,
        borderRadius: 40,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        width: '90%',
        marginTop: 15,
        borderColor: colors.lightBlue,
    },
    buttonTextReversed: {
        color: colors.grey,
        fontSize: 18,
        fontWeight: "bold",
    }
});


export default Login;
