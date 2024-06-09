import '../style/Home.css'
import one from '../assets/images/one.svg'
import two from '../assets/images/two.svg'
import three from '../assets/images/three.svg'
import subtitle from '../assets/images/subtitle.svg'
import { useNavigate } from 'react-router-dom'

const Home = () =>{
    const navigate = useNavigate()
    return (
        <>
            <div className='homebody'>
            <h1 class="gradient-text">Get Insights on your Structures</h1>
            <div className="moving-border">
            <iframe title="Speckle" src="https://app.speckle.systems/projects/12502513cf/models/d786d1fe09#embed=%7B%22isEnabled%22%3Atrue%2C%22isTransparent%22%3Atrue%2C%22hideControls%22%3Atrue%2C%22hideSelectionInfo%22%3Atrue%2C%22noScroll%22%3Atrue%7D" width="100%" height="100%" frameborder="0"></iframe>
            </div>
            <h6>credits to the original creator of this model</h6>
            <img src={subtitle} className='subtitle' alt="" />

            <div className='cols-parent'>
                <img src={one} className='cols' alt="" />
                <img src={two} className='cols' alt="" />
                <img src={three} className='cols' alt="" />
            </div>
            <button className='tryout' onClick={()=>navigate('/form')}>Try It Out</button>
            </div>
            <div className='footer'>
                    <div className='footer1'>
                        BUILD.<br/>WITH BUILDSPHERE
                    </div>

                    <div className='footer2'>
                        Quick Links
                        <br />
                        <p className='hyperlink' onClick={()=>window.location.href='https://speckle.xyz'}>About Speckle</p>
                        <p className='hyperlink' onClick={()=>window.location.href='https://github.com/shrutixyz/buildsphere'}>Source Code</p>
                    </div>
            </div>
        </>
    )
}

export default Home