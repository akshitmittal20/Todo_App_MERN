const mongoose = require("mongoose")

//schema looks like thsi 
/*
todo:{
    tittle: "",
    description: "",
    completed: true/false
}
*/

mongoose.connect("mongodb+srv://akshitmittal20:pSD9tpjvHdOlEVax@290224.dl6gadx.mongodb.net/revise")
const todoSchema = mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean
})

const todoModel2 = mongoose.model("todoModel2", todoSchema)

module.exports = {
    todoModel2
}