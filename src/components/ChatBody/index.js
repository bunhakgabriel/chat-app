import React, { useEffect, useRef } from "react";
import { db } from "../../services/firebase";
import { collection, doc, query, orderBy, onSnapshot } from "firebase/firestore";
import * as C from "./styles";
import Message from "../Message";

const ChatBody = ({ chatId }) => {
  const [messages, setMessages] = React.useState([]);
  const refBody = useRef(null);

  useEffect(() => {
    if (!chatId) return;

    const messagesQuery = query(
      collection(doc(db, "chats", chatId), "messages"),
      orderBy("timestamp", "asc")
    );

    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    });

    return () => unsubscribe();
  }, [chatId]);

  useEffect(() => {
    if (refBody.current) {
      refBody.current.scrollTop = refBody.current.scrollHeight;
    }
  }, [messages]);

  return (
    <C.Container ref={refBody}>
      {messages.map((message) => (
        <Message
          key={message.id}
          user={message.user}
          message={{
            message: message.message,
            timestamp: message.timestamp?.toMillis(),
          }}
        />
      ))}
    </C.Container>
  );
};

export default ChatBody;
