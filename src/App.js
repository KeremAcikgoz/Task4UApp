import Header from "./components/Header";
import Tasks from "./components/Tasks";
import { useState, useEffect } from 'react';
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import About from "./components/About";
import HowTo from "./components/HowTo";
import Switch from "./components/Switch";
import styled, { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme, GlobalStyles } from './Themes.js';


function App() {

  const StyledApp = styled.div`
    color: ${(props) => props.theme.fontColor}
  `;

  const [theme, setTheme] = useState('light');

  const themeToggler = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  }

  const [isToggled, setIsToggled] = useState(false)

  const [showAddButton, setShowAddButton] = useState(false)

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const listTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    }

    listTasks();
  }, [])

  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks');
    const data = await res.json();
    return data;
  }

  const fetch1Task = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();
    return data;
  }

  const addTask = async (task) => {

    const res = await fetch('http://localhost:5000/tasks',{
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })

    const data = await res.json()

    setTasks([...tasks, data])


    // const id = Math.floor(Math.random() * 10000) + 1;
    // const newTask = { id, ...task }
    // setTasks([...tasks, newTask])
  }

  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    })

    setTasks(tasks.filter((task) => task.id !== id))
  }

  const toggleReminder = async (id) => {
    const toggleTask = await fetch1Task(id);
    const updatedTask = { ...toggleTask, reminder: !toggleTask.reminder}
    const res = await fetch(`http://localhost:5000/tasks/${id}`,{
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    })

    const data = await res.json()

    setTasks(tasks.map((task) => task.id === id ? {...task, reminder: data.reminder} : task))
  }

  return (
      <Router>
        <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme }>
          <GlobalStyles />
          <StyledApp className="container">
            <Header onAdd={() => setShowAddButton(!showAddButton)} showAdd={showAddButton}/>
            <Switch rounded={true} isToggled={isToggled} onToggle={() => {
              setIsToggled(!isToggled);
              themeToggler();
            }}/>
            <Route path='/' exact render={(props) => (
              <>
                {showAddButton && <AddTask onAdd={addTask}/>}
                {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/> : 'You have not added any tasks. Click Add button to add one'}
              </>
            ) }
            />
            <Route path='/about' component={About} />
            <Route path='/' exact component={Footer} />
            <Route path='/how' exact component={HowTo} />
          </StyledApp>
        </ThemeProvider>
      </Router>
  );
}

export default App; 
