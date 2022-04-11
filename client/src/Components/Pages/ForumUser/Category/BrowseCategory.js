import { Button, Divider, List, ListItem, ListItemText } from "@material-ui/core";
import axios from "axios";
import React, {useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import { Navigate } from "react-router-dom";
import cookie from "js-cookie";

export default function BrowseCategory(){
    const userId = cookie.get("id");


    const[categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories();
    }, []);


    const getCategories = async () =>{

        const response = await axios.get('http://localhost:5000/api/category');
        setCategories(response.data);

    };

    const navigate = useNavigate(); 

    return userId ? (
        <div style={{padding:"10rem"}}>
            <h1>Browse Category</h1>

            <Button variant="contained" color="primary" onClick={() => navigate('/Category/create')}>Create Category</Button> 
            <Divider style={{margin: "2rem 0"}}/>

            <List>
                {categories.map((cat, index) => (
                    <ListItem key={index} button onClick={() => navigate('/category/new/'+cat._id)}>
                        <ListItemText primary={cat.title} secondary={cat.createdAt}/>
                    </ListItem>
                ) )};
            </List>
        </div>
      ) : (
        <Navigate to="/notfound" />
      );
}