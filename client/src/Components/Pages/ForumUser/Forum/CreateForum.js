import { Button, TextField } from "@material-ui/core";
import axios from "axios";
import React, {useState} from "react";
import { useNavigate, useParams } from "react-router-dom";



const CreatCategory = () => {
    const {id} = useParams();
    const [title,setTitle] = useState("");
    const navigate = useNavigate();


    const handleOnSubmit = async event => {
        event.preventDefault();
        
        const data = {
            title,
            categoryId: id
        };
        const response = await axios.post('http://localhost:5000/api/forum/create', data);
        const {_id} = response.data;
        navigate('/forum/new/'+_id);
    };

    return (
        <div style={{padding:"10rem"}}>
            <h1 style={{marginBottom: "2rem"}}> Create Forum</h1>

            <form onSubmit={handleOnSubmit}>

                <TextField label="Title" required fullWidth margin="normal" value={title} onChange={e => setTitle(e.target.value)}/>
                <Button type="submit" variant="contained" color="primary" >Create</Button>
            </form>
        </div>
    )
};

export default CreatCategory;