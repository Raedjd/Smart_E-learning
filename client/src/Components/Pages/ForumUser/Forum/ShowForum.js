import { Button, Divider, List, ListItem, ListItemText } from "@material-ui/core";
import axios from "axios";
import React, {useState, useEffect} from "react";
import { useNavigate, useParams } from 'react-router-dom';

export default function ShowForum(){

    const[forum, setForum] = useState(null);
    const[topics, setTopics] = useState([]);
    const {id} = useParams();


    useEffect(() => {
        getForum();
        getTopics();
    }, []);


    const getForum = async() =>{

        const response = await axios.get('http://localhost:5000/api/forum/'+id);
        setForum(response.data);

    };

    const getTopics = async() =>{

        const response = await axios.get('/api/topic/forum/'+id);
        setTopics(response.data);

    };

    const navigate = useNavigate(); 

    return(
        <div style={{padding:"10rem"}}>
            {forum && <h1>{forum.title}</h1>}
            <Button variant="contained" color="primary" onClick={() => navigate('/topic/create/'+id)}>Create Topic</Button> 


            <List>
                {topics.map((tops, index) => (
                    <ListItem key={index} button onClick={() => navigate('/topic/new/'+tops._id)}>
                        <ListItemText primary={tops.title} secondary={tops.createdAt}/>
                    </ListItem>
                ) )};
            </List>
        </div>
    )
}