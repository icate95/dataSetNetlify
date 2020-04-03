import React from 'react';

import Lezione from "./lezione";
import {useMutation} from '@apollo/react-hooks';
import gql from "graphql-tag";


import '../scss/bootstrap.scss';

const CREATE_UNITA = gql`
  mutation createUnita($id: ID!, $unita: UnitaInput) {
    createUnita(id:$id, unita: $unita){
        unita{
        id
          titolo
          slug
          completato
        
        }
    }
  }
`;

const REMOVE = gql`
  mutation deleteLezione( $id: ID!, $tipo: String) {
    deleteLezione( id: $id, tipo: $tipo)
  }
`;

function Unita(props) {

    let inputunita;
    const [createUnita] = useMutation(CREATE_UNITA);
    const [deleteLezione] = useMutation(REMOVE);
  //  console.log(props);


    return (

        <div className="">

            <form className="d-flex" onSubmit={e => {
                e.preventDefault();
                createUnita({
                    variables:
                        {
                            id: props.idModulo,
                            unita: {
                                id: Math.random().toString(36).substr(2, 9),
                                titolo: inputunita.value,
                                completato: false,
                                slug: inputunita.value.replace(/\s/g, ""),
                                modulo: props.slugModulo,
                                materia: props.slugMateria,
                                lezione: []
                            }
                        }
                }, console.log(inputunita.id));
                inputunita.value = '';
                window.location.reload();
            }}>
                <input className="form-control p-1" type="text" placeholder='aggiungi unita' ref={node => {
                    inputunita = node;
                }}></input>
                <button className="btn btn-secondary ml-1" type="submit">Submit</button>
            </form>

            {props.unita.length > 0 ? (
                <div className="row mx-1">
                    {props.unita.map(unita =>

                        <div key={unita.slug} className='unita p-1'>
                            <div className="d-flex mt-3">
                            <h6 key={unita.id}>{unita.titolo}</h6>

                            <button className="btn btn-sm btn-danger btn-cancella ml-5" onClick={() => {
                                deleteLezione({variables: {id: unita.id, tipo: 'unita'}});
                                window.location.reload();
                            }}>x
                            </button>
                            </div>

                            <Lezione lezioni={unita.lezione} idUnita={unita.id} slugUnita={unita.slug} slugModulo={props.slugModulo} slugMateria={props.slugMateria}/>

                        </div>
                    )}

                </div>
            ) : (
                <p className='alert alert-primary mt-3 p-1 pl-2'>Aggiungi delle unita per continuare.</p>
            )}


        </div>
    )
}

export default Unita;