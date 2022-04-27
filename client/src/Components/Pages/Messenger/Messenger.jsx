import { useContext, useEffect, useRef, useState } from "react";
import ChatOnline from '../chatOnline/ChatOnline';
import Conversation from '../conversations/Conversation';
import Header from '../HomeP';
import Message from '../message/Message';
import './messenger.css';
import { useSelector } from "react-redux";
import cookie from "js-cookie";
import axios from "axios";
import { io } from "socket.io-client";


export default function Messenger() {
    const scrollRef = useRef();

    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [allusers, setAllUsers] = useState([]);


    const socket = useRef();

    const userData = useSelector((state) => state.userReducer);
     const userId = cookie.get("id");


     useEffect(() => {
        const getAllUsers = async () => {
          const res = await axios.get("http://localhost:5000/api/oneuser/all-users");
          setAllUsers(res.data);
        };
    
        getAllUsers();
      }, [userId]);

     useEffect(()=> {
      socket.current = (io("ws://localhost:8900"));
      socket.current.on("getMessage", (data) => {
        setArrivalMessage({
          sender: data.senderId,
          text: data.text,
          createdAt: Date.now(),
        });
      });
     },[] 
     );

     useEffect(() => {
        arrivalMessage &&
          currentChat?.members.includes(arrivalMessage.sender) &&
          setMessages((prev) => [...prev, arrivalMessage]);
      }, [arrivalMessage, currentChat]);


     useEffect(() => {
        socket.current.emit("addUser", userId);
        socket.current.on("getUsers", (users) => {
            try {
                
                setOnlineUsers(
                   users 
                  );
              } catch (err) {
                console.log(err);
              }
        });
      }, [userData]);

console.log(onlineUsers)

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/conversations/"+userId);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [userId]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/messages/" + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

   const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: userId,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== userId
    );

    socket.current.emit("sendMessage", {
      senderId: userId,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post("http://localhost:5000/api/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
    <Header/>
    <div className='messenger'>
        <div className="chatMenu">
        <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
            {conversations.map((c) => (
                <div onClick={() => setCurrentChat(c)}>
              <Conversation conversation={c} currentUser={userData}/>
              </div>
            ))}
            
            
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                {messages.map((m) => (
                    <div ref={scrollRef}>
                      <Message message={m} own={m.sender === userId} />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                    
                  ></textarea>
                  <button className="chatSubmitButton"  onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
        <div className="chatOnlineWrapper">
        <ChatOnline
              onlineUsers={onlineUsers}
              currentId={userId}
              setCurrentChat={setCurrentChat}
            />


            
        </div>
            
            </div>    
    </div>
    </>
  );
}
