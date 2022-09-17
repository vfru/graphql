import React,{useState} from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

export default function MyQuery(props) {

    var query = gql`
             query idgetDB($id:String!){
               idgetDB(id:$id) {
                         name,
                         id,
                         price,
                         poster
                     }
                 }`
   
       const[id,setid]= useState("")
   
     return (
       <div>
         <input type="text" onChange={(event)=>{
           setid(event.target.value)
         }} />
   
         <Query query={query} variables={{id}} >
           {
             ({ loading, data,refetch }) => {
               // console.log(data)
               // console.log(loading)
               props.getrefetch(refetch)
               
               return loading ? <div>loading...</div> : <div>{
                 data.idgetDB.map((i) => <div key={i.id}>
                   <div>名称：{i.name}</div>
                   <div>价格：{i.price}</div>
                   <div>地址：{i.poster}</div>
                   <hr />
                 </div>)
               }</div>
             }
           }
         </Query>
       </div>
   
     )
   }