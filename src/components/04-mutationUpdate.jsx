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
        <MutationUpdate />
      </div>
    </ApolloProvider>

  )
}

function MutationUpdate() {

  var updateFilm = gql`
        mutation updateFilm($id:String!, $input:FilmInput){
          updateFilm(id:$id,input:$input) {
                    name,
                    id,
                    price,
                    poster
                }
        }`
  return (
    <Mutation mutation={updateFilm}>
      {
        (updateFilm, { data }) => {
          console.log(data)
          return <div><button onClick={() => {
            updateFilm({
              variables: {
                id:"63253df16ef8e7b4db1aacfa",
                input: {
                  name: "777-xg",
                  poster: "http://777-xg",
                  price: 888
                }
              }
            })
          }} >update</button></div>
        }
      }
    </Mutation>
  )
}

