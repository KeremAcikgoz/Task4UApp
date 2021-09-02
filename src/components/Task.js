import { FaTimesCircle } from 'react-icons/fa';
import { lightTheme, darkTheme } from '../Themes.js';

const Task = ({ task, onDelete, onToggle }) => {
    return (
        <div className={`task ${task.reminder ? ' reminder' : ''}`} onDoubleClick={() => onToggle(task.id)}>
            <h3>
                {task.text}
                <FaTimesCircle className='x-button' style={{color: 'black', cursor:'pointer'}} onClick={() => onDelete(task.id)}/>
            </h3>
            <p>{task.day}</p>
        </div>
    )
}

export default Task
