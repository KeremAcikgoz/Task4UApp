import { Link } from "react-router-dom";

import React from 'react'

const HowTo = () => {
    return (
        <>
        <div className='how'>
            <h3>Welcome to the Task4U app</h3>
            <li>Click 'Create a Task' Button to create a new task</li>
            <li>If you set a reminder to a task, the task will be listed with a border. Tasks without a reminder are borderless.</li>
            <li>You can double click a task to toggle its reminder status.</li>
            <li>To delete a task, simply click the x button of that task.</li>
        </div>
        <Link style={{display: 'flex', justifyContent: 'center'}} to="/">Home</Link>
        </>

    )
}

export default HowTo
