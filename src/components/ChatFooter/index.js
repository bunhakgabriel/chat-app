import React, { useState } from "react";
import * as C from "./styles";
import { MdSend } from "react-icons/md";
import { auth, db } from "../../services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, doc, addDoc, serverTimestamp } from "firebase/firestore";

const ChatFooter = ({ chatId }) => {
  const [user] = useAuthState(auth);
  const [message, setMessage] = useState("");

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!message.trim() || !user) return;

    try {
      await addDoc(collection(doc(db, "chats", chatId), "messages"), {
        message,
        user: user.email,
        photoURL: user.photoURL,
        timestamp: serverTimestamp(),
      });
      setMessage("");
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
    }
  };

  return (
    <C.Container>
      <C.Form onSubmit={handleSendMessage}>
        <C.Input
          placeholder="Mensagem"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <button type="submit" style={{ border: 'none' }}>
          <MdSend />
        </button>
      </C.Form>
    </C.Container>
  );
};

export default ChatFooter;
