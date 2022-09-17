const express = require("express")
const { buildSchema } = require('graphql')
const { graphqlHTTP } = require('express-graphql')
const app = express()

const Schema = buildSchema(`

    type Film{
        id:Int,
        name:String,
        poster:String,
        price:Int
    }

    type Query{
        getNowplayingList:[Film]
        getFilmDetail(id:Int!):Film
    }

`)

const faskDb = [
    {
        id:1,
        name:"111",
        poster:"http://1111",
        price:100
    },
    {
        id:2,
        name:"222",
        poster:"http://222",
        price:200
    },
    {
        id:3,
        name:"333",
        poster:"http://333",
        price:333
    },
]


const root = {
    getNowplayingList(){
        return faskDb
    },
    getFilmDetail({id}){
        console.log(id)

        return faskDb.filter(i=>i.id===id)[0]
    }
}

app.use('/graphql', graphqlHTTP({
    schema: Schema,
    rootValue: root,
    graphiql: true

}))


app.listen(5000, () => {
    console.log("监听成功")
})