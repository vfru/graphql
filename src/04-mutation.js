const express = require('express')
const {buildSchema} = require('graphql')
//v0.10.0 之后，需要使用{graphqlHTTP}
const {graphqlHTTP} = require('express-graphql')
const app = express()
const Schema = buildSchema(`
        type Film{
            id:Int,
            name:String,
            price:Int,
            poster:String
        }
        input FilmInput{
            name:String,
            price:Int,
            poster:String
        }
        type Query{
            getDB:[Film]
        }
        type Mutation{
            createFilm(input:FilmInput):Film,
            updateFilm(id:Int!, input:FilmInput):Film,
            deleteFilm(id:Int!):Int
        }
`)
let fakeDB = [
    {id: 1,name: '111',poster:'http://111',price:100},
    {id: 2,name: '222',poster:'http://222',price:200},
    {id: 3,name: '333',poster:'http://333',price:300}
]
const root = {
    getDB:() =>{
        return fakeDB
    },
    createFilm:({input})=>{
        fakeDB.push({...input,id:fakeDB.length+1})
        return {...input,id:fakeDB.length}
    },
    updateFilm:({id,input})=>{
       fakeDB = fakeDB.map(item=>{
            if(item.id === id){
                 current = {...item,...input}
                return {...item,...input}
            }
            return item
        })
        return current
    },
    deleteFilm:({id})=>{
        fakeDB = fakeDB.filter(item=>item.id !== id)
        return 1
    }
}
app.use('/graphql',graphqlHTTP({
    schema:Schema,
    rootValue:root,
    graphiql:true
}))
app.listen(5000, () => {
    console.log("监听成功")
})