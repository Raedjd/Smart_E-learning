import axios from "axios";
import React, {useState} from "react";
import { useNavigate } from "react-router-dom";



const CreatCategory = () => {
    const [title,setTitle] = useState("");
    const navigate = useNavigate();


    const handleOnSubmit = async event => {
        event.preventDefault();
        
        const data = { 
            title
        };
        const response = await axios.post('http://localhost:5000/api/category/create', data);
        const {_id} = response.data;
        navigate('/category/'+_id);

    };

    return (
        <div style={{padding:"10rem"}}>
            <h1 style={{marginBottom: "2rem"}}> Create Category</h1>

            <form onSubmit={handleOnSubmit}>

                <input class="form-control" label="Title" required fullWidth margin="normal" value={title} onChange={e => setTitle(e.target.value)}/>
                <button class="btn btn-primary" type="submit" variant="contained"  >Create</button>
            </form>
        </div>
    )
};

export default CreatCategory;