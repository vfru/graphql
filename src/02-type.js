const express = require("express")
const { buildSchema } = require('graphql')
const { graphqlHTTP } = require('express-graphql')
const app = express()

const Schema = buildSchema(`

    type Account{
        name:String,
        Age:Int,
        location:String,
    }

    type Query{
        hello:String,
        getName:String,
        getAge:Int,
        getAllNames:[String],
        getAllAge:[Int],
        getAccountInfo:Account,
    }

`)

const root = {
    hello: () => {
        const result = 'hello-graphQL'
        return result
    },
    getName: () => {

        return "Ksann"
    },
    getAge: () => {

        return 38
    },
    getAllNames: () => {
        return ["KMsann", "takahashi", "Msann"]
    },
    getAllAge: () => {
        return [38, 39, 22]
    },
    getAccountInfo() {
        return {
            name: "KMsann",
            Age: 39,
            location: "nihonn",
        }
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