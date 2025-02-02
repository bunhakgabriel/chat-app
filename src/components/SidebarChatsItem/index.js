import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../services/firebase";
import * as C from "./styles";
import { MdPerson } from "react-icons/md";
import { collection, query, where } from "firebase/firestore";

const getUser = (users, userLogged) =>
  users?.filter((user) => user !== userLogged?.email)[0];

const SidebarChatsItem = ({ id, users, user, setUserChat, active }) => {
  // Atualizando a referência ao Firestore
  const userEmail = getUser(users, user);
  const refUser = query(collection(db, "users"), where("email", "==", userEmail));

  const [getUserItem] = useCollection(refUser);

  const Avatar = getUserItem?.docs?.[0]?.data();
  const item = userEmail;

  const handleNewChat = () => {
    const userChat = {
      chatId: id,
      name: item.split("@")[0],
      photoURL: Avatar?.photoURL,
    };

    setUserChat(userChat);
  };

  return (
    <C.Container onClick={handleNewChat} className={active}>
      {Avatar ? <C.Avatar src={Avatar?.photoURL} /> : <MdPerson />}
      <C.Name>{item.split("@")[0]}</C.Name>
    </C.Container>
  );
};

export default SidebarChatsItem;
