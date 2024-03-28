import { useState } from "react";
import axios from "axios"
import '../App.css'

export function CreateTodo(props){

    //initialising state variable
    const [title,setTitle] = useState("");
    const [ desc, setDesc] = useState("")

    return<div>
        <input className="add" style={{ padding: 10, margin: 10}} type="text" placeholder="title" onChange={function(e){
            const value = e.target.value;
            //storing the input value in a variable named as value. On change function triggers just when user write anything in the inout box
            setTitle (value);   //passing the value of what user inputed in the settitle state variable
        }} />
        <input className="add" style={{ padding: 10, margin: 10}} type="text" placeholder="description" onChange={function(e){
            const value = e.target.value;   
            setDesc (value);
        }} />

        <button className="addATodo"  style={{ padding: 10, margin: 10}} onClick={()=>{   //add todo button function starts
            // fetch("http://localhost:3000/todo",{            //calling a post method from backend      
            //     method:"POST",
            //     body: JSON.stringify({
            //         title:title,
            //         description: desc
            //     }), //stringify is important in order for backend to recognise the request is in json 
            //     //becaues we use - app.use(express.json()) , it means this only. That it will only accept json
            //     headers:{
            //         "content-type":"application/json"
            //     }       //headers is necessary to send along, if sending request through some frontend 
            // })
            // .then(async function(res){     //we can also use async await instead of promise, like we had done in app.jsx
            //     alert("Press OK to Continue")     //if fetch method completes, only then, thsi alert wil come
                

                //we could use axios library too instead of fetch method. more professional!
                axios.post("https://todo-app-mern-omega.vercel.app/todo",{
                    title:title,
                    description:desc  
                })
                .then(function(res){
                    alert("Press OK to Continue");
                    props.setTodos(prevTodos => ([...prevTodos, {     
                        title: title,                
                        description: desc          
                    }]))


                // //we could follow the following steps if the new updated todo is not rendered on the screen automaticallys instantly when we add a todo
                // props.setTodos([...todos, {     //spread todo operator - "...". It creates a new array of all the todos
                //     title:title,                //these two values are also passed, so that the new array created above , gets attached with new todo element 
                //     description: desc           //with these 2 new values 
                // }])
            })
        }}>Add a Todo</button>
    </div>
}