import React from 'react';
import Unita from "./unita";
import {useMutation} from '@apollo/react-hooks';
import gql from "graphql-tag";

import '../scss/bootstrap.scss';


const CREATE_MODULO = gql`
  mutation createModulo($id: ID!, $moduli: ModuloInput) {
    createModulo(id:$id, moduli: $moduli){
        moduli{
        id
          titolo
          slug
          completato
          materia
        }
    }
  }
`;


const REMOVE = gql`
  mutation deleteLezione( $id: ID!, $tipo: String) {
    deleteLezione( id: $id, tipo: $tipo)
  }
`;



function Modulo(props) {
    // let input;
    let inputModulo;
    // const {data, loading, error} = useQuery(READ_Corsi);
    // const [createTodo] = useMutation(CREATE_TODO);
    const [createModulo] = useMutation(CREATE_MODULO);

    const [deleteLezione] = useMutation(REMOVE);
    // const [deleteTodo] = useMutation(REMOVE_TODO);
    // const [updateLezione] = useMutation(UPDATE_TODO);

    // if (loading) return <p>loading...</p>;
    // if (error) return <p>ERROR</p>;
    // if (!data) return <p>Not found</p>;
    // console.log(props);

    return (
        <div className="p-2">

            <form className="pt-3 d-flex" onSubmit={e => {
                e.preventDefault();
                createModulo({
                    variables:
                        {
                            id: props.idMateria,
                            moduli: {
                                id: Math.random().toString(36).substr(2, 9),
                                titolo: inputModulo.value,
                                completato: false,
                                slug: inputModulo.value.replace(/\s/g, ""),
                                materia: props.slugMateria,
                                unita: []
                            }
                        }
                }, console.log(inputModulo.id));
                inputModulo.value = '';
                window.location.reload();
            }}>
                <input className="form-control p-1" type="text" placeholder='aggiungi modulo' ref={node => {
                    inputModulo = node;
                }}></input>
                <button className="btn btn-secondary ml-1" type="submit">Submit</button>
            </form>

            {props.modulo.length > 0 ? (
                <div className="modulo-container mt-4 row">
                    {props.modulo.map(modulo =>

                        <div key={modulo.slug} className='modulo col-md-12 p-2 col-lg-6'>
                            <div className="p-2 bg-light-gray">
                                <div className="d-flex mt-3">
                                    <h4>{modulo.titolo}</h4>
                                    <button className="btn btn-sm btn-danger btn-cancella ml-5" onClick={() => {
                                        deleteLezione({variables: {id: modulo.id, tipo: 'modulo'}});
                                        window.location.reload();
                                    }}>x
                                    </button>
                                </div>

                                {modulo.unita !== 'null' ? (
                                    <Unita unita={modulo.unita} idModulo={modulo.id} slugModulo={modulo.slug}
                                           slugMateria={props.slugMateria}/>
                                ) : ('')}
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <p className='alert alert-primary mt-3 p-1 pl-2'>Aggiungi un modulo per continuare.</p>
            )}


        </div>
    )
}

export default Modulo;