import { Link } from "react-router-dom"
const Footer = () => {
    return (
        <footer className='footer'>
           <Link className='link' to="/about">About Us</Link>
           <Link className='link' to='/how'>How to Use</Link>
        </footer>
    )
}

export default Footer
