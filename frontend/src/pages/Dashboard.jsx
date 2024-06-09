import React from 'react'
import { useLocation } from 'react-router-dom'
import Markdown from 'react-markdown'
import '../style/Dashboard.css'

const Dashboard = () => {
    const {state} = useLocation();

    console.log(state);

    function Download()
    {
      console.log('download')
    }

    const file = new Blob([state.response.response], { type: "text/plain" });
    const filename = "structural_insights_" + Date.now().toString() + ".md";
  
  return (
    <div className='wrapper'>
        <h1 className='gradient-text'>Structural Insights</h1>
        <div className="iframe-wrapper">
          <iframe src={`https://speckle.xyz/embed?stream=${state.stream_id}`} width="920" height="400" frameborder="0"></iframe>
        </div>
        <button className="tryout" variant="outlined">
          <a
            download={filename}
            target="_blank"
            rel="noreferrer"
            href={URL.createObjectURL(file)}
            style={{
              textDecoration: "inherit",
              color: "inherit",
            }}
          >
            {" "}
            <p className="button-text">Download Report</p>
          </a>
        </button>
        <Markdown className='markdown'>
          {state.response.response}
        </Markdown>
    </div>
  )
}

export default Dashboard