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
        <MutationCreate />
      </div>
    </ApolloProvider>

  )
}

function MutationCreate() {

  var createFilm = gql`
        mutation createFilm($input:FilmInput){
          createFilm(input:$input) {
                    name,
                    id,
                    price,
                    poster
                }
        }`
  return (
    <Mutation mutation={createFilm}>
      {
        (createFilm, { data }) => {
          console.log(data)
          return <div><button onClick={() => {
            createFilm({
              variables: {
                input: {
                  name: "777",
                  poster: "http://777",
                  price: 777
                }
              }
            })
          }} >add</button></div>
        }
      }
    </Mutation>
  )
}

