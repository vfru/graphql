import React,{useRef} from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

export default function MutationCreate(props) {

    var createFilm = gql`
          mutation createFilm($input:FilmInput){
            createFilm(input:$input) {
                      name,
                      id,
                      price,
                      poster
                  }
          }`

          const nameRef = useRef()
          const priceRef = useRef()
          const posterRef = useRef()
    return (
        <Mutation mutation={createFilm}>
            {
                (createFilm, { data },) => {
                    // console.log(data)
                    return <div>
                        <p>名字：<input type="text" ref={nameRef}/></p>
                        <p>海报：<input type="text" ref={posterRef}/></p>
                        <p>价格: <input type="text" ref={priceRef}/></p>
                        <button onClick={() => {
                            createFilm({
                                variables: {
                                    input: {
                                        name: nameRef.current.value,
                                        poster: posterRef.current.value,
                                        price: Number(priceRef.current.value),
                                    }
                                }
                            })
                            console.log(props)
                        }} >add</button></div>
                }
            }
        </Mutation>
    )
}

