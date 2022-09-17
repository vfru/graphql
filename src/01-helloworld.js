const express = require("express")
const {buildSchema} = require('graphql')
const {graphqlHTTP} = require('express-graphql')
const app = express()

const Schema = buildSchema(`
    type Query{
        hello:String,
        getName:String,
        getAge:Int
    }

`)

const root = {
    hello:()=>{
        const result = 'hello-graphQL'
        return result
    },
    getName:()=>{
        
        return "Ksann"
    },
    getAge:()=>{
        
        return 38
    }

}

app.use('/graphql',graphqlHTTP({
    schema:Schema,
    rootValue:root,
    graphiql:true

}))


app.listen(5000,()=>{
    console.log("监听成功")
})