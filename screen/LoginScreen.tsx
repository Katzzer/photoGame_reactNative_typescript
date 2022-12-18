import {Button} from "react-native";
import {useEffect, useState} from "react";
import {AuthenticationDetails, CognitoUser, CognitoUserAttribute} from "amazon-cognito-identity-js";
import UserPool from "../security/UserPool";
import jwtDecode from "jwt-decode";
import LabelAndInput from "../components/LabelAndInput";

interface jwtTokenId {
    "aud": string,
    "auth_time": string,
    "cognito:username" : string,
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

function LoginScreen() {
    const [username, setUsername] = useState("katzz");
    const [email, setEmail] = useState("katzz@seznam.cz");
    const [password, setPassword] = useState("Monitor11!");
    const [isUserLogged, setIsUserLogged] = useState(false);
    const [loggedUserUsername, setLoggedUserUsername] = useState("");

    useEffect(() => {
        checkIfUserIsLogged()
    }, [])

    function checkIfUserIsLogged() {
        console.log("checking user")
        const user = UserPool.getCurrentUser();
        if (user != null) {
            console.log(user.getUsername())
            setIsUserLogged(true);
            setLoggedUserUsername(user.getUsername())
        } else {
            setIsUserLogged(false);
            setLoggedUserUsername("");
        }
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

    function onLogin () {
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
                console.log("onSuccess: ", data);
                setIsUserLogged(true);
                const jwtToken = data.getIdToken().getJwtToken();
                const jwtDecoded:jwtTokenId = jwtDecode(jwtToken);
                console.log(jwtDecoded)
                console.log(jwtDecoded.name)
                setLoggedUserUsername(jwtDecoded.name)
            },
            onFailure: (err) => {
                console.log("on Failure ", err);
            },
            newPasswordRequired: (data) => {
                console.log("newPasswordRequired: ",  data);
            },
        })
    }

    return (
        <>
            <LabelAndInput
                label={"Username"}
                textInputValue={username}
                onChange={setUsername}
            />

            <LabelAndInput
                label={"Email"}
                textInputValue={email}
                onChange={setEmail}
            />

            <LabelAndInput
                label={"Password"}
                textInputValue={password}
                onChange={setPassword}
            />

            <Button title={"Sing in"} onPress={onSubmit} />

            <LabelAndInput
                label={"Username"}
                textInputValue={username}
                onChange={setUsername}
            />

            <LabelAndInput
                label={"Email"}
                textInputValue={email}
                onChange={setEmail}
            />

            <Button title={"Log in"} onPress={onLogin} />
        </>
    );
}

export default LoginScreen;
