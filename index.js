const express = require("express")
const uuid = require('uuid') // instalei a biblioteca para criar id

const app = express()
app.use(express.json()) // Estou avisando pro express que eu quero usar o json por padrão no meu body  //

      // Método Query Params //

// app.get('/users', (request, response) => {
    //const name = request.query.name // 
   // const age = request.query.age 
   //ou const { name , age } = request.query

   //return response.send('Hello Express')
    //return response.json({name: name, age: age})
     // ou json ({name, age })
//})

//app.listen(3000, () => {
   // console.log('🚀🚀 Server started on port 3000')
//})


   // Método Route Params //

// app.get('/users/:id', (request, response) => {
    // const { id } = request.params
    // console.log(id)

    //return response.send('Hello Express')
   //  return response.json({id})
// })

// app.listen(3000, () => {
    // console.log('🚀🚀 Server started on port 3000')
// })


     // Método Body Params //

// app.get('/users', (request, response) => {

    // console.log(request.body)
    // return response.json({ message: "Ok" })

    // const { name, age } = request.body

    // return response.json({ name, age })

// })
    
// app.listen(3000, () => {
        // console.log('🚀🚀 Server started on port 3000')
// })
    

                 // MIDDLEWARES //


// const myFirstMiddlewares = (request, response, next) => {
   //  console.log('Fui chamado')
                
    // next() // pra que a minha aplicação continue rodando eu chamo o next()
                
    // console.log('Finalizamos')
// }
                
// app.use(myFirstMiddlewares) // estou chamando o middlewares



 // Treinando Métodos GET, POST, PUT E DELETE //

const users = []

const checkUserId = (request, response, next) => {
    const { id } = request.params // estou pegando o id do meu usuario

    const index = users.findIndex(user => user.id === id) // estou percorrendo o array pra encontrar o usuario com o mesmo id e manda a sua posição

    if(index < 0) {
        return response.status(404).json({ message: "User not found"}) // estou retornando quando o usuario não é encontrado
    }

    request.userIndex = index
    request.userId = id

    next()
}


app.get('/users', (request, response) => {
    return response.json(users)
})

app.post('/users', (request, response) => {
    const { name, age } = request.body // estou recebendo o nome e a idade que esta sendo enviado 

    const user = { id: uuid.v4(), name, age }  // estou criando um usuario com nome, idade e id

    users.push(user)  // estou guardando o usuario que criei dentro da variavel

    return response.status(201).json(user)

})

app.put('/users/:id', checkUserId, (request, response) => {

    
    const { name, age } = request.body // estou pegando as informações novas do meu usuario

    const index = request.userIndex
    const id = request.userId

    const updateUser = { id, name, age } // estou montando o meu usuario atualizado

    users[index] = updateUser // estou atualizando as informaçoes do meu usuario

    
    return response.json(updateUser)

})

app.delete('/users/:id', checkUserId, (request, response) => {
    const index = request.userIndex

    users.splice(index,1) // estou deletando o meu usuario

    return response.status(204).json(users)

})







    
app.listen(3000, () => {
        console.log('🚀🚀 Server started on port 3000')
})