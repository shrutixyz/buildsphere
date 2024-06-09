import React from 'react'
import { useLocation } from 'react-router-dom'
import Markdown from 'react-markdown'
import '../style/Dashboard.css'

const Dashboard = () => {
    const {state} = useLocation();

    console.log(state);
  return (
    <div className='wrapper'>
        <Markdown className='markdown'>
          {state.response.response}
        </Markdown>
        <iframe src={`https://speckle.xyz/embed?stream=${state.stream_id}`} width="600" height="400" frameborder="0"></iframe>
    </div>
  )
}

export default Dashboard