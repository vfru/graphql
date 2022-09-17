import React,{useState} from 'react'
import { ApolloProvider, Query } from 'react-apollo'
import ApolloClient from 'apollo-boost'
import gql from 'graphql-tag'

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql'
})

export default function App() {
  return (
    <ApolloProvider client={client} >
      <div>
        <MyQuery />
      </div>
    </ApolloProvider>

  )
}

function MyQuery() {

 var query = gql`
          query idgetDB($id:String!){
            idgetDB(id:$id) {
                      name,
                      id,
                      price,
                      poster
                  }
              }`

    const[id,setid]= useState("6322e5fdea9f5e1a115dcf37")

  return (
    <div>
      <input type="text" onChange={(event)=>{
        setid(event.target.value)
      }} />

      <Query query={query} variables={{id}} >
        {
          ({ loading, data }) => {
            // console.log(data)
            // console.log(loading)
            return loading ? <div>loading...</div> : <div>{
              data.idgetDB.map((i) => <div key={i.id}>
                <div>名称：{i.name}</div>
                <div>价格：{i.price}</div>
                <div>地址：{i.poster}</div>
              </div>)
            }</div>
          }
        }
      </Query>
    </div>

  )
}

