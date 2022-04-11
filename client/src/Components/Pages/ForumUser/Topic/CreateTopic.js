import { Button, TextField } from "@material-ui/core";
import axios from "axios";
import React, {useState, useContext} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import cookie from "js-cookie";

const CreatCategory = () => {
    const userData = useSelector((state) => state.userReducer);
    const userId = cookie.get("id");
    const {id} = useParams();
    const [title,setTitle] = useState("");
    const [content,setContent] = useState("");
    const navigate = useNavigate();


    const handleOnSubmit = async event => {
        event.preventDefault();
        
        const data = {
            title,
            content,
            userId: userId,
            forumId: id
        };
        const response = await axios.post('http://localhost:5000/api/topic/create', data);
        const {_id} = response.data;
        navigate('/topic/new/'+_id);
    };

    return (
        <div style={{padding:"10rem"}}>
            <h1 style={{marginBottom: "2rem"}}> Create Topic</h1>

            <form onSubmit={handleOnSubmit}>

                <TextField label="Title" required fullWidth margin="normal" value={title} onChange={e => setTitle(e.target.value)}/>
                <textarea placeholder="Content" style={{width:"100%", height:"500"}} required  value={content} onChange={e => setContent(e.target.value)}></textarea>
                <Button type="submit" variant="contained" color="primary" >Create</Button>
            </form>
        </div>
    )
};

export default CreatCategory;