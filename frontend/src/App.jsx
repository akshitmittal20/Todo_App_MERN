import { useEffect, useState } from 'react'
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
  

  // //or, with async await method - 
  // async function fetchData(){
  //   try{
  //       const res = await  fetch("http://localhost:3000/todos")
  //       const json= await res.json();
  //       setTodos(json.todos)
  //   }
  //   catch(error){
  //     console.error(error)
  //   }
  // }
  // fetchData();



  //this fetch request will cause the again re render of the todos, infintitely, as the state will get change again n again and it will go to 1st use state line again and again to fetch db data.
//Hence it is better to use use effect hook instead of use state.
//use effect is kind of lifecycle event based, on which we can put the condition , which when fulfilled, then call the fetch api.
//that condition can be using the setinterval for 10 seconds and putting fetch inside that, so that fetc only calls after 10 second to check if database havebeen updated or not, instead of being called again n again like here!!

  useEffect(()=>{
    fetch("https://todo-app-mern-omega.vercel.app/todos")
    .then(async(res)=>{
      const json = await res.json();
      setTodos(json.todos)
    })
  },[])

  return (
      <div>
        <CreateTodo setTodos={setTodos}></CreateTodo>    {/* <CreateTodo setTodos={setTodos}></CreateTodo>  the setTodos state variable wuld be passed if the createtodo componenet needed it as props*/}
        <DisplayTodo todos = {todos}   setTodos={setTodos}></DisplayTodo>     {/*passing the todos array to displaytodo function*/}
      </div>
  )
}

export default App
