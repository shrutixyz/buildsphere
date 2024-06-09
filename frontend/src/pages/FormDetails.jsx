import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import '../style/FormDetails.css'
import Button from '@mui/material/Button';

const FormDetails = () => {

    const [formData, setFormData] = useState({streamId: "",commitId: "",location: ""});
    const url = "http://127.0.0.1:5000/";
    let navigate = useNavigate();


    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    })
    function handleChange(event) {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }

    function handleSubmit(event)
    {
        event.preventDefault();

        
        console.log(formData);

        // get volume
        // navigate('/dashboard', {state: {
        //     'volume': "223",
        //     'location': formData.location,
        //     'stream_id': formData.streamId
        //     // 'response': response.data
        // }})

        let formdataParams = new FormData();
        //add three variable to form
        formdataParams.append("stream_id", formData.streamId);
        formdataParams.append("commit_id", formData.commitId);

        console.log(formdataParams);
        axios({method: "post", url: url+"getstreamparams", data: formdataParams})
        .then((response) => {
            let formDataPlan = new FormData();
            formDataPlan.append("place", formData.location);
            formDataPlan.append("volume", response.data.parameters.volume);

            axios.post(url + "generateplan", formDataPlan).then((response) => {
                navigate('/dashboard', {state: {
                    'volume': "223",
                    'location': formData.location,
                    'response': response.data,
                    'stream_id': formData.streamId
                }})
            })
        })
    }
    return (
        <>
            <ThemeProvider theme={darkTheme}>
                <h1 className='title'>BuildSphere App</h1>
                <form onSubmit={handleSubmit}>
                    <TextField id="stream" label="Enter Stream Id" variant="standard" name="streamId" value={formData.streamId} onChange={handleChange}/><br />
                    <TextField id="commit" label="Enter Commit Id" variant="standard" name="commitId" value={formData.commitId} onChange={handleChange}/><br />
                    <TextField id="location" label="Enter Location" variant="standard" name="location" value={formData.location} onChange={handleChange}/><br />
                    <Button variant="contained" type='submit'>
                        Submit
                    </Button>
                </form>
            </ThemeProvider>
        </>
    )
}

export default FormDetails