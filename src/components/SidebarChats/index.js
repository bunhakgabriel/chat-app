import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "../../services/firebase";
import * as C from "./styles";
import SidebarChatsItem from "../SidebarChatsItem";
import { collection, query, where } from "firebase/firestore";

const SidebarChats = ({ setUserChat, userChat }) => {
  const [user] = useAuthState(auth);

  // Atualizando a referência do Firestore para o formato modular
  const refChat = query(collection(db, "chats"), where("users", "array-contains", user.email));

  const [chatsSnapshot] = useCollection(refChat);

  return (
    <C.Container>
      {chatsSnapshot?.docs.map((item, index) => (
        <C.Content key={index}>
          <SidebarChatsItem
            id={item.id}
            users={item.data().users}
            user={user}
            setUserChat={setUserChat}
            active={userChat?.chatId === item.id ? "active" : ""}
          />
          <C.Divider />
        </C.Content>
      ))}
    </C.Container>
  );
};

export default SidebarChats;
