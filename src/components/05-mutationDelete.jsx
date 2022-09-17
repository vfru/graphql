import React from 'react'
import { ApolloProvider, Mutation } from 'react-apollo'
import ApolloClient from 'apollo-boost'
import gql from 'graphql-tag'

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql'
})

export default function App() {
  return (
    <ApolloProvider client={client} >
      <div>
        <MutationDelete />
      </div>
    </ApolloProvider>

  )
}

function MutationDelete() {

  var deleteFilm = gql`
        mutation deleteFilm($id:String!){
          deleteFilm(id:$id) 
        }`
  return (
    <Mutation mutation={deleteFilm}>
      {
        (deleteFilm, { data }) => {
          console.log(data)
          return <div><button onClick={() => {
            deleteFilm({
              variables: {
                id:"63253df16ef8e7b4db1aacfa",
              }
            })
          }} >Delete</button></div>
        }
      }
    </Mutation>
  )
}

