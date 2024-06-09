import React, { useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'

const Login = () => {
    let navigate = useNavigate();
       //  The Speckle Application Id
       const VUE_APP_SPECKLE_ID= process.env.REACT_APP_SPECKLE_ID

       // The Speckle Application Secret
       const VUE_APP_SPECKLE_SECRET=process.env.REACT_APP_SPECKLE_SECRET
   
       const VUE_APP_SERVER_URL=process.env.REACT_APP_SERVER_URL
       const VUE_APP_SPECKLE_NAME=process.env.REACT_APP_SPECKLE_NAME
       const CHALLENGE = `${VUE_APP_SPECKLE_NAME}.Challenge`
        const TOKEN = `${VUE_APP_SPECKLE_NAME}.AuthToken`
        const REFRESH_TOKEN = `${VUE_APP_SPECKLE_NAME}.RefreshToken`
       const [searchParams, setSearchParams] = useSearchParams();

       async function exchangeAccessCode(accessCode) {
        var res = await fetch(`${VUE_APP_SERVER_URL}/auth/token/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            accessCode: accessCode,
            appId: VUE_APP_SPECKLE_ID,
            appSecret: VUE_APP_SPECKLE_SECRET,
            challenge: localStorage.getItem(CHALLENGE)
          })
        })
        var data = await res.json()
        if (data.token) {
          // If retrieving the token was successful, remove challenge and set the new token and refresh token
          localStorage.removeItem(CHALLENGE)
          localStorage.setItem(TOKEN, data.token)
          localStorage.setItem(REFRESH_TOKEN, data.refreshToken)

        }

        navigate('/form')
        return data

      }

       useEffect(() => {
        const accessCode = searchParams.get('access_code');

        if (accessCode)
        {
         exchangeAccessCode(accessCode);   
        }
       }, [searchParams])

       function handleLogin()
       {
        var challenge = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
        // Save challenge in localStorage
        localStorage.setItem(CHALLENGE, challenge)
        // Send user to auth page
        window.location = `${VUE_APP_SERVER_URL}/authn/verify/${VUE_APP_SPECKLE_ID}/${challenge}`
       }
       return (
            <button className='tryout' onClick={handleLogin}>Try It Out</button>
        )
}

export default Login