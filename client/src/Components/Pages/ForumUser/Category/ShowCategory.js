import { Button, Divider, List, ListItem, ListItemText } from "@material-ui/core";
import axios from "axios";
import React, {useState, useEffect} from "react";
import { useNavigate, useParams } from 'react-router-dom';

export default function ShowCategory(){
    
    const navigate = useNavigate(); 


    const[category, setCategory] = useState(null);
    const[forum, setForum] = useState([]);
    const {id} = useParams();


    useEffect(() => {
        getCategory();
        getForum();

    }, []);


    const getCategory = async() =>{

        const response = await axios.get('http://localhost:5000/api/category/'+id);
        setCategory(response.data);

    };

    const getForum = async() =>{

        const response = await axios.get('http://localhost:5000/api/forum/category/'+id);
        setForum(response.data);
       

    };

    
    return(
        <div style={{padding:"10rem"}}>
            {category && <h1>{category.title} </h1>}

            <Button variant="contained" color="primary" onClick={() => navigate('/forum/create/'+id)}>Create Forum</Button> 

            <List>
                {forum.map((foru, index) => (
                    <ListItem button onClick={() => navigate('/forum/new/'+foru._id)}>
                        <ListItemText primary={foru.title} secondary={foru.createdAt}/>
                    </ListItem>
                ) )};
            </List>
        </div>
    )
}