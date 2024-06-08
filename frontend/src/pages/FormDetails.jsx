import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormDetails = () => {

    const [formData, setFormData] = useState({streamId: "",commitId: "",location: ""});
    const url = "http://127.0.0.1:5000/";
    let navigate = useNavigate();

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }

    function handleSubmit(event)
    {
        event.preventDefault();

        
        // console.log(formData);

        // get volume
        navigate('/dashboard', {state: {
            'volume': "223",
            'location': formData.location,
            'stream_id': formData.streamId
            // 'response': response.data
        }})
        // axios.post(url+"getstreamparams", {
        //     stream_id: formData.streamId,
        //     commit_id: formData.commitId
        // })
        // .then((response) => {
        //     axios.post(url + "generateplan", {
        //         location: formData.location,
        //         volume: response.data.parameters.volume
        //     }).then((response) => {
        //         navigate('/dashboard', {state: {
        //             'volume': "223",
        //             'location': formData.location,
        //             'response': response.data
        //         }})
        //     })
        // })
    }
    return (
        <form onSubmit={handleSubmit}>
            <TextField id="stream" label="Enter Stream Id" variant="standard" name="streamId" value={formData.streamId} onChange={handleChange}/><br />
            <TextField id="commit" label="Enter Commit Id" variant="standard" name="commitId" value={formData.commitId} onChange={handleChange}/><br />
            <TextField id="location" label="Enter Location" variant="standard" name="location" value={formData.location} onChange={handleChange}/><br />
            <button type='submit'>Submit</button>
        </form>
    )
}

export default FormDetails