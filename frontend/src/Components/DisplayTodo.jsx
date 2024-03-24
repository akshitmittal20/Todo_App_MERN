//this class will render/display all the todos line wise
//this will also update the todos as completed
export function DisplayTodo({todos}){
    return <div>
        {todos.map(function(todo) {     //fetching the  each todo from todos array. THis Map is like a foreach function
            return <div>            
                <h1>{todo.title}</h1>
                <h2>{todo.description}</h2>
                <button onClick={()=>{
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
                        alert("Todo updatd to Completed")
                        })
                }}>{todo.completed==true?"Completed": "Mark as Completed"}</button>
            </div>
        })}
    </div>
}