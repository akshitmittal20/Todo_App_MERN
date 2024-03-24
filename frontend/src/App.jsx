import { useState } from 'react'
import './App.css'
import { CreateTodo } from './Components/CreateTodo'
import { DisplayTodo } from './Components/DisplayTodo'

function App() {
  const [todos, setTodos] = useState([]);
//this todos name should be same as the respones coming from backend. If it has Todos instead of todos, then use Todos here, else it will throow error
//for not able to map to response., because it would not find that naem variable. Reebr, it is case sesitive

// fetch("http://localhost:3000/todos")
//   .then(async function(res){   //this line is just to define async keyword by wrapping res.json in function, so that we can use await in res.json()!!
//     const json = await res.json();
//     setTodos(json.todos)
//   })
  
  //or, with async await method - 
  async function fetchData(){
    try{
        const res = await  fetch("http://localhost:3000/todos")
        const json= await res.json();
        setTodos(json.todos)
    }
    catch(error){
      console.error(error)
    }
  }
  fetchData();


  return (
      <div>
        <CreateTodo></CreateTodo>    {/* <CreateTodo setTodos={setTodos}></CreateTodo>  the setTodos state variable wuld be passed if the createtodo componenet needed it as props*/}
        <DisplayTodo todos={todos}></DisplayTodo>     {/*passing the todos array to displaytodo function*/}
      </div>
  )
}

export default App
