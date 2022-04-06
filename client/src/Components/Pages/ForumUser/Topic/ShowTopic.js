import { Button, Divider, List, ListItem, ListItemText, TextField } from "@material-ui/core";
import axios from "axios";
import React, {useState, useEffect, useContext} from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import cookie from "js-cookie";
export default function ShowTopic(){
    const userData = useSelector((state) => state.userReducer);
    const userId = cookie.get("id");
    const[topic, setTopic] = useState(null);
    const[comments, setComments] = useState([]);
    const[page, setPage] = useState(1);
    const[hasMore, setHasMore] = useState(false);
    const[isReplying, setIsReplying] = useState(false);
    const[replyContent, setReplyContent] = useState("");



    const {id} = useParams();


    useEffect(() => {
        getTopic();
        getComments();
    }, []);


    const getTopic = async() =>{

        const response = await axios.get('http://localhost:5000/api/topic/'+id);
        setTopic(response.data);

    };

    const getComments = async() =>{

        const response = await axios.get('http://localhost:5000/api/comment/topic/'+id, {
            params: {
                page
            }
        });
        if (response.data.length) {
           setComments(response.data);
           setPage(page + 1);
           setHasMore(true);

        }else {
           setHasMore(false);
        }

    };

    const handleReply = async event => {
        event.preventDefault();
        if (!replyContent) return;
        const data = {
            userId:userId ,
            topicId: topic._id,
            content: replyContent
        };
        const response = await axios.post("http://localhost:5000/api/comment/create", data);
        setComments([...comments, response.data]);
    }

    const navigate = useNavigate(); 

    return(
        <div style={{padding:"10rem"}}>
            {topic && <h1>{topic.title}</h1>}

            {topic &&<p>{topic.content}</p>}

            <List>
                {comments.map((comment, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={comment.content} secondary={comment.createdAt}/>
                    </ListItem>
                    
                ) )};
            </List>
            <Button variant="contained"
                     color="primary"
                      disabled={!hasMore} 
                      style={{marginRight: "1rem"}}
                      onClick={getComments}>Load More Comments</Button>
            <Button variant="contained"
                     color="primary"
                      onClick={() => setIsReplying(true)}>Reply</Button>

            {isReplying && (
                <form onSubmit={handleReply}>
                    <TextField fullWidth
                    label="content"
                    value={replyContent}
                    onChange={e => setReplyContent(e.target.value)}/>
                    <Button type="submit">Reply</Button>
                </form>
            )}                    
        </div>
    )
}