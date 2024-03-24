const express = require("express");
const { createTodo, updateTodo } = require("./types");
const { todoModel2 } = require("./db");
const cors = require("cors")

const app = express();

app.use(express.json())
app.use(cors())

/*
body= {
    title: string,
    description:string
    completed:boolean
}
*/

app.post("/todo", async (req,res)=>{
    const createPayload= req.body;
    const validatePayload = createTodo.safeParse(createPayload);
    if(!validatePayload.success){
        res.status(402).json({
            msg:"You sent the wrong inputs"
        })
        return;
    }
    //create todo in the db
    await todoModel2.create({
        title: createPayload.title,
        description: createPayload.description,
        completed: false
    })
    res.json({
    msg:"todo created successfully"
  })
})

app.get("/todos", async(req,res)=>{
    const todos = await todoModel2.find({})
    
    // res.json({
    //     todos
    // })
    //above code is displaying all todos 
    const todosWithIds = todos.map(todo => {
        return {
            _id: todo._id, // Access the object ID of the todo
            title: todo.title,
            description: todo.description,
            completed: todo.completed
        };
    });
    res.json({ todos: todosWithIds });
    //this code is dispplaying todos, witht their id and everythign according to format we want via MAP function
})


app.put("/completed", async(req,res)=>{
    const todoId= req.body;
    const validatePayload = updateTodo.safeParse(todoId);
    if(!validatePayload.success){
        res.status(402).json({
            msg:"You sent the wrong inputs"
        })
        return;
    }
    
    const doc = await todoModel2.updateOne({
        _id:req.body._id
    },
    {
        completed: true
    })
    res.json({
        msg: "todo updated succesfully"
    })
})




app.listen(3000)
