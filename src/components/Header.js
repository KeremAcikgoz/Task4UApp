import PropTypes from 'prop-types';
import Button from './Button';
import { useLocation } from 'react-router';

const Header = ({ title, onAdd, showAdd }) => {
    const location = useLocation()

    return (
        <>
        <header className='header'>
            <h1>{title}</h1>
            { location.pathname==='/' && <Button 
                color='rgb(110,0,110)' 
                text={showAdd ? 'Close' : 'Create a Task'} 
                onClick={onAdd}
            />}
        </header>
        <div>
            <h3 className='slogan'>Stay Organized with Task4U</h3>
        </div>
        </>
    )
}

Header.defaultProps = {
    title: 'Task4U',
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}

// const headingStyle = {
//     color: 'red', 
//     backgroundColor: 'black'
// }


export default Header
