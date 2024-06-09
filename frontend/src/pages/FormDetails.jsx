import React, {useEffect, useState} from 'react';
import TextField from '@mui/material/TextField';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import '../style/FormDetails.css'
import loader from '../assets/images/Subtract.svg'
import Button from '@mui/material/Button';

const FormDetails = () => {

    const [formData, setFormData] = useState({streamId: "",commitId: "",location: ""});
 
    // const url = "http://127.0.0.1:5000/";
    const url = "https://buildsphere.up.railway.app/";

    let navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [token, setToken] = useState("")
    const VUE_APP_SPECKLE_NAME="Speckle Demo App"
    const TOKEN = `${VUE_APP_SPECKLE_NAME}.AuthToken`
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    })

    useEffect(()=> {
        setToken(localStorage.getItem(TOKEN));
    }, [])
    function handleChange(event) {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }

    function handleSubmit(event)
    {
        setLoading(true)
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
        formdataParams.append("token", token);
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
                <div className='formbody'>
                <h1 className='gradient-text'>BuildSphere App</h1>
                <br /><br />
                <form onSubmit={handleSubmit}>
                    <div className='commit-and-stream'>
                    <TextField id="stream" className='textfield' label="Enter Stream Id" variant="standard" name="streamId" value={formData.streamId} onChange={handleChange}/><br />
                    <TextField id="commit" className='textfield' label="Enter Commit Id" variant="standard" name="commitId" value={formData.commitId} onChange={handleChange}/><br />
                    
                    </div>
                    <TextField id="location" className='textfield' label="Enter Location" variant="standard" name="location" value={formData.location} onChange={handleChange}/><br />
                    {/* <button type='submit' className='submitbutton'>Submit</button>  */}
                    {
                        loading?<img src={loader} className='loader' alt="" />:
                        <button type='submit' className='submitbutton'>Submit</button>
                    }
                    
                    
                </form>
                </div>
            </ThemeProvider>
        </>
    )
}

export default FormDetails