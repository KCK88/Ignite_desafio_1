import { useState, useEffect } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    if (newTaskTitle.length === 0) {
      return
    }
    const high = 1000000
    const low = 1
    const task: Task = {
      id: Math.floor(Math.random() * (1 + high - low)) + low,
      title: newTaskTitle,
      isComplete: false
    };
    setTasks([...tasks, task]);
    setNewTaskTitle("");
  }

  function handleToggleTaskCompletion(id: number) {
    tasks.forEach(task => {
      if (task.id === id) {
        //equivalente
        // if (task.isComplete === true) {
        //   task.isComplete = false
        // } else {
        //   task.isComplete = true
        // }
        task.isComplete = !task.isComplete
        // console.log(task.title + " " + task.id + " " + task.isComplete)
        //equivalente
        // task.isComplete = task.isComplete === true ? false : true
      }
      setTasks([...tasks]);
      setNewTaskTitle("");
    });
  }

  function handleRemoveTask(id: number) {
  tasks.splice(tasks.findIndex(task => (task.id === id)),1)
  setTasks([...tasks]);
  setNewTaskTitle("");
  
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    checked={task.isComplete}
                    onChange={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16} />
              </button>
            </li>
          ))}

        </ul>
      </main>
    </section>
  )
}