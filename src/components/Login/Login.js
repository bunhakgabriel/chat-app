import React from "react";
import { auth, provider } from "../../services/firebase"
import { signInWithPopup } from "firebase/auth";
import * as C from "./styles"

const Login = () => {
    const handleSignin = () => {
        signInWithPopup(auth, provider).catch(alert);
    };
    return (
        <C.Container>
            <C.Button onClick={handleSignin}>Login com Google</C.Button>
        </C.Container>
    )
}

export default Login;