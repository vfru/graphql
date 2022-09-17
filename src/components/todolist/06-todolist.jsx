import React,{useState} from 'react'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'
import MyQuery from './MyQuery'
import MutationCreate from './MutationCreate'

const client = new ApolloClient({
    uri: 'http://localhost:5000/graphql'
})

export default function App() {
    
    const getrefetch = function(refetch){
         
    }
    
    return (
        <ApolloProvider client={client}>
            <MyQuery getrefetch={getrefetch} />
            <MutationCreate  />
        </ApolloProvider>
    )
}


