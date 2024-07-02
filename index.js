import express from "express";
import { v4 } from "uuid"; // instalei a biblioteca para criar id
import cors from "cors"


const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.json()); // Estou avisando pro express que eu quero usar o json por padrão no meu body  //
app.use(cors());
console.log(PORT)
     

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

    const user = { id: v4(), name, age }  // estou criando um usuario com nome, idade e id

    users.push(user)  // estou guardando o usuario que criei dentro da variavel

    return response.status(201).json(user)

})

app.put('/users/:id', checkUserId, (request, response) => {

    
    const { name, age } = request.body // estou pegando as informações novas do meu usuario

    const index = request.userIndex
    const id = request.userId

    const updateUser = { id, name, age } // estou montando o meu usuario atualizado

    users[index] = updateUser // estou atualizando as informaçoes do meu usuario

    
    return response.json(users)
    // return response.json(updateUser)

})

app.delete('/users/:id', checkUserId, (request, response) => {
    const index = request.userIndex

    users.splice(index,1) // estou deletando o meu usuario

    return response.status(204).json(users)

})

   
app.listen(PORT, () => {
        console.log(`🚀🚀 Server started on port ${PORT}`)
})