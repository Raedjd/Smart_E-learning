import "./conversation.css";
import { useEffect, useState } from "react";
import axios from "axios";



export default function Conversation({ conversation, currentUser }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const friendId = conversation.members.find((m) => m !== currentUser._id);
    
        const getUser = async () => {
          try {
            const res = await axios("http://localhost:5000/api/oneuser/" + friendId);
            setUser(res.data);
          } catch (err) {
            console.log(err);
          }
        };
        getUser();
      }, [currentUser, conversation]);

  return (

    <div className="conversation">
        <img className="conversationImg" src={user?.avatar} alt=''/>
        <span  className='converationName'>{user?.username}</span>

    </div>
  )
}
