import React from 'react'
import { useLocation } from 'react-router-dom'

const Dashboard = () => {
    const {state} = useLocation();

    console.log(state);
  return (
    <div>
        <iframe src={`https://speckle.xyz/embed?stream=${state.stream_id}`} width="600" height="400" frameborder="0"></iframe>
    </div>
  )
}

export default Dashboard