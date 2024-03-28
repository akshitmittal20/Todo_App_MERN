import '../App.css'

//this class will render/display all the todos line wise
//this will also update the todos as completed
export function DisplayTodo(props){
    return <div>
        {props.todos.map(function(todo) {     //fetching the  each todo from todos array. THis Map is like a foreach function
            return <div key={todo._id} className="displayTodo">
                <br />             
            {/* //we need to drifne the unique key for each child else react thows error  */}
                <h2>{todo.title}</h2>
                <h3>{todo.description}</h3>
                <button  className="updateTodo"  onClick={()=>{
                    fetch("http://localhost:3000/completed",{       //calling backend update todo method
                        method:"PUT",
                        body: JSON.stringify({
                            _id: todo._id       //fetching id of this todo from db , as our body need todo is as defined in the put function code in backend 
                            //object._id gives us the id of that object from mongoose db
                        }),
                        headers:{
                            "content-type":"application/json"
                        } 
                    })
                        .then(async function(res){
                            // alert("Todo is marked to Completed")
                            const updatedTodos = props.todos.map(t => {
                                if (t._id === todo._id) {
                                    return { ...t, completed: true };
                                } else {
                                    return t;
                                }
                            });
                            props.setTodos(updatedTodos);
                            // props.setTodos(...todo,{_id: todo._id}]);
                        })
                }}>{todo.completed==true?"Completed": "Mark as Completed"}</button>
                
                <button className="deleteTodo" onClick={()=>{
                    fetch("https://todo-app-mern-omega.vercel.app/delete",{
                        method:"DELETE",
                        body:JSON.stringify({
                            _id:todo._id
                        }),
                        headers:{
                            "content-type": "application/json"
                        }
                    })
                    .then( async function(res){
                        alert("Are you sure, you want to Delete");
                        props.setTodos(prevTodos => prevTodos.filter(t => t._id !== todo._id));
                    })
                }}>  Delete </button>
                
            </div>
        })}
    </div>
}