import logo from '../assets/onlydata-logo.png'
import Navbar from './Navbar'

const Header = () => {
    return(
        <div className="header-container">
            <a href="/">
                <img src={logo} alt="onlydata logo"></img>
            </a>
            <Navbar></Navbar>
        </div>
    )
}

export default Header