import { useEffect, useState } from "react"
import "./App.css"

function App() {
  // State variable 'todos' to store the todo items
  const [todos, setTodos] = useState([])

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'))
    if (storedTodos && storedTodos.length > 0) {
      setTodos(storedTodos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  // Add a new todo item to the 'todos' array
  function addTodo(text) {
    setTodos([...todos, text])
  }
   
  // Remove a todo item at the specified index from the 'todos' array
  function removeTodo(index) {
    setTodos(todos.filter((todo, i) => i !== index))
  }

  function editTodo(index, text) {
    const newTodos = [...todos]
    newTodos[index] = text
    setTodos(newTodos)
  }
  return (
    <div className="App">
      <h1>Todo list</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault()
          addTodo(event.target.elements.todo.value)
          event.target.elements.todo.value = ''
        }}  
      >
        <input type="text" name="todo"/>
        <button type="submit">Add todo</button>
      </form>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            <input type="text" value={todo} onChange={(event) => editTodo(index, event.target.value)} />
            <button onClick={() => removeTodo(index)}>Remove</button>
          </li>
        ))}
      </ul>
      
    </div>
  );
}

export default App;
