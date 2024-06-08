import React from 'react'
import { useLocation } from 'react-router-dom'

const Dashboard = () => {
    const {state} = useLocation();

    console.log(state);
  return (
    <div>
        <iframe title="Speckle" src={`https://app.speckle.systems/projects/b7b1dee9e2/models/${state.stream_id}`} width="600" height="400" frameborder="0"></iframe>
    </div>
  )
}

export default Dashboard