import { useState, useEffect } from 'react'
import {TodoProvider} from "./contexts/index"
import './App.css'
import {TodosForm, TodosItem} from './components/index'

// import UserContextProvider from './context/UserContextProvider';

function App() {
 const [todos, setTodos] = useState([]);

 const addTodo = (todo)=>{
  setTodos((prev)=>[...prev, {id: Date.now(), ...todo} ]);
 };

  const updateTodo = (id, todo) =>{
    setTodos((prev)=>prev.map((prevTodo)=>(prevTodo.id===id ? todo : prevTodo)))
  };

  const deleteTodo = (id) =>{
    setTodos((prev)=> prev.filter((prevTodo)=>prevTodo.id !== id))
  };

  const toggleComplete = (id) =>{
    setTodos((prev)=>prev.map((prevTodo)=> prevTodo.id === id ? {...prevTodo, completed: !prevTodo.completed} : prevTodo))
  };
 
  useEffect(()=>{
   const data = JSON.parse(localStorage.getItem("todos"));
    if(data && data.length > 0){
      setTodos(data)
    }
  }, []);

  useEffect(()=>{
    localStorage.setItem("todos", JSON.stringify(todos))
  },[todos])
 
 
  return (
    
    <TodoProvider value={{todos, addTodo, deleteTodo, updateTodo, toggleComplete}} >
   <div className="bg-[#18284b] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-3 mt-2">TODOS MANAGER</h1>
                    <div className="mb-4">
                        {/* Todo form goes here */} 
                        <TodosForm/>
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {todos.map((todo)=>(
                          <div key={todo.id} className='w-full' >
                            <TodosItem todo={todo} />
                          </div>
                        ))}
                    </div>
                </div>
            </div>
    
    </TodoProvider>
   
  )
}

export default App
