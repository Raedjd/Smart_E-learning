import { Button, Divider, List, ListItem, ListItemText } from "@material-ui/core";
import axios from "axios";
import React, {useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';

export default function BrowseForum(){

    const[forums, setForums] = useState([]);

    useEffect(() => {
        getForums();
    }, []);


    const getForums = async () =>{

        const response = await axios.get('http://localhost:5000/api/forum');
        setForums(response.data);

    };

    const navigate = useNavigate(); 

    return(
        <div style={{padding:"10rem"}}>
            <h1>Browse Forums</h1>

            <Button variant="contained" color="primary" onClick={() => navigate('/forum/create')}>Create Category</Button> 
            <Divider style={{margin: "2rem 0"}}/>

            <List>
                {forums.map((cat, index) => (
                    <ListItem button onClick={() => navigate('/forum/new/'+cat._id)}>
                        <ListItemText primary={cat.title} secondary={cat.createdAt}/>
                    </ListItem>
                ) )};
            </List>
        </div>
    )
}