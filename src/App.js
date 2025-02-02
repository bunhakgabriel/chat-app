import React, { useEffect, useState } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "./services/firebase";
import { doc, setDoc } from "firebase/firestore"; // Importando métodos corretos
import Login from "./components/Login/Login";
// import Loading from "./components/Loading/Loading";
import Sidebar from './components/Sidebar';
import * as C from "./styles/app";
import Chat from './components/Chat/Index';

const App = () => {
    const [user, loading] = useAuthState(auth);
    const [userChat, setUserChat] = useState(null);

    useEffect(() => {
        if (user) {
            setDoc(doc(db, "users", user.uid), {
                email: user.email,
                photoUrl: user.photoURL,
            });
        }
    }, [user]);

    // if (loading) return <Loading />;
    if (!user) return <Login />;

    return (
        <C.Container>
            <Sidebar setUserChat={setUserChat} userChat={userChat} />
            <Chat userChat={userChat} />
        </C.Container>
    );
}

export default App;
