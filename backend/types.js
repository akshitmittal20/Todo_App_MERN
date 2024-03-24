const zod = require("zod")

//enter all the inputs needed fron user in every kind of rquests
/*
{
    title :string,
    description: string,
}
{
    _id: string
}
*/

const createTodo = zod.object({
    title:zod.string(),
    description: zod.string()
})

const updateTodo = zod.object({
    _id: zod.string()
})

module.exports = {
    createTodo,
    updateTodo
}