const express = require('express')
const {buildSchema} = require('graphql')
//v0.10.0 之后，需要使用{graphqlHTTP}
const {graphqlHTTP} = require('express-graphql')
//----连接数据库
const mongoose = require('mongoose')
//useNewUrlParser这个属性会在url里识别验证用户所需的db
//useUnifiedTopology解决弃用警告，使用新的服务器发现和监视引擎
mongoose.connect("mongodb://localhost:27017/maizuo",{useNewUrlParser:true,useUnifiedTopology:true})
//----定义模型(model)
//定义 Schema ，Schema为数据库对象的集合。可以理解为表结构的定义
//model 是由 Schema 生成的模型，可以对数据库的操作
const FilmModel = mongoose.model('film',mongoose.Schema({
    name:String,
    price:Number,
    poster:String
}))
const app = express()
const Schema = buildSchema(`
        type Film{
            id:ID,
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
            getDB:[Film],
            getDBById(id:String!):[Film]
        }
        type Mutation{
            createFilm(input:FilmInput):Film,
            updateFilm(id:String!,input:FilmInput):Film,
            deleteFilm(id:String!):Int
        }
`)
const root = {
    getDB:() =>{
        //find：根据条件查询，返回的是数组
        return FilmModel.find()
    },
    getDBById:({id}) =>{
        return FilmModel.find({_id:id})
    },
    createFilm:({input})=>{
      //增加(create)
      return FilmModel.create({...input})
    },
    updateFilm:({id,input})=>{
        return FilmModel.updateOne({_id:id},{...input})
            .then(res=>FilmModel.find({_id:id})).then(res=>res[0])
    },
    deleteFilm:({id})=>{
        return FilmModel.deleteOne({_id:id}).then(res=>1)
    }
}
app.all("*",function(req,res,next){
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin","*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers","*");
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.send(200); //让options尝试请求快速结束
    else
        next()
})
app.use('/graphql',graphqlHTTP({
    schema:Schema,
    rootValue:root,
    graphiql:true
}))
app.use(express.static('public'))
app.listen(4001)