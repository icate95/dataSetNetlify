import React from 'react';
import {useMutation} from '@apollo/react-hooks';
import gql from "graphql-tag";


import '../scss/bootstrap.scss';

const CREATE_LEZIONE = gql`
  mutation createLezione($id: ID!, $lezione: LezioneInput) {
    createLezione(id:$id, lezione: $lezione){
        lezione{
          id
          titolo
          slug
          completato
          fruizione
          tipo
        }
    }
  }
`;
// const SET_LEZIONE = gql`
//   mutation setLezione($id: String!) {
//     setLezione(id: $id)
//   }
// `;
const UPDATE_TODO = gql`
  mutation updateLezione( $lezione: LezioneInput) {
    updateLezione( lezione: $lezione){
       lezione{
          id
          unita
          materia
          modulo
        }
      }
  }
`;
const REMOVE_LEZIONE = gql`
  mutation deleteLezione( $id: ID!, $tipo: String) {
    deleteLezione( id: $id, tipo: $tipo)
  }
`;


function Lezione(props) {
    let inputlezione;
    let inputlezioneTempo;
    let inputlezioneTipo;
    const [createLezione] = useMutation(CREATE_LEZIONE);
    const [updateLezione] = useMutation(UPDATE_TODO);
    const [deleteLezione] = useMutation(REMOVE_LEZIONE);

     console.log(props.lezioni);
    return (
        <div className="">
            <form className="py-2 d-flex" onSubmit={e => {
                e.preventDefault();
                createLezione({
                    variables:
                        {
                            id: props.idUnita,
                            lezione: {
                                id: Math.random().toString(36).substr(2, 9),
                                titolo: inputlezione.value,
                                completato: false,
                                slug: inputlezione.value.replace(/\s/g, ""),
                                unita: props.slugUnita,
                                materia: props.slugMateria,
                                modulo: props.slugModulo,
                                fruizione: inputlezioneTempo.value,
                                tipo: inputlezioneTipo.value
                            }
                        }
                }, console.log(inputlezione.id));
                inputlezione.value = '';
                window.location.reload();
            }}>
                <input className="form-control p-2 mr-1" type="text" placeholder='titolo lezione' ref={node => {
                    inputlezione = node;
                }}></input>
                <input className="form-control p-2 mr-1" type="number" placeholder='tempo' ref={node => {
                    inputlezioneTempo = node;
                }}></input>
                <select className="form-control p-2 mr-1"
                        name="tipoLezione"
                        ref={node => {
                            inputlezioneTipo = node;
                        }}>
                    <option value="videolezione">videolezione</option>
                    <option value="esercitazione">esercitazione</option>
                    <option value="test">test</option>
                    <option value="dispensa">dispensa</option>
                </select>

                <button className="btn btn-secondary ml-1" type="submit">Submit</button>
            </form>

            {props.lezioni.length > 0 ? (
                <ul className="list-group list-group-flush bg-transparent">
                    {props.lezioni.map(lez =>
                            <li className="lista-lezioni bg-transparent p-1 list-group-item d-flex justify-content-between align-items-center"
                                key={lez.id}>
                                {lez.titolo}
                                <span className="d-flex main-span">
                                     <button className="btn btn-sm btn-danger btn-cancella mr-2" onClick={() => {
                                         deleteLezione({variables: {id: lez.id, tipo: 'lezione'}});
                                         window.location.reload();
                                     }}>x
                                </button>
                                    <span className="">{lez.fruizione}</span>
                                    <span className="">{lez.tipo.charAt(0)}</span>
                                    <input type="checkbox" checked={lez.completato ? "checked" : ""} onChange={() => {
                                        updateLezione({variables: {
                                                // id: lez.id,
                                                lezione: {
                                                    id: lez.id,
                                                    unita: lez.unita,
                                                    materia: lez.materia,
                                                    modulo: lez.modulo
                                                }
                                            }});
                                        window.location.reload();
                                    }}></input>
                            </span>
                            </li>
                    )}
                </ul>
            ) : (
                <p className='alert alert-primary p-1 pl-2'>Aggiungi delle lezioni per continuare.</p>
            )}

        </div>
    )
}

export default Lezione;