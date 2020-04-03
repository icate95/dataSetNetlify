import React from 'react';
// import Content from './component/Content';
// import {
//     BrowserRouter as Router,
//     Switch,
//     Route,
//     Link
// } from "react-router-dom";


import {useQuery, useMutation} from '@apollo/react-hooks';
import gql from "graphql-tag";
import './scss/bootstrap.scss';
import Content from "./component/Content";
import Loading from "./component/Loading";

import imgErrore from './img/oops.gif';

const READ_Corsi = gql`
  query{
   materie{
     id 
     titolo
     slug
     path
     moduli {
       id
       titolo
       completato
       slug
       unita{
         id
         titolo
         slug
         lezione {
           id
           titolo
           slug
           completato
           fruizione
           tipo
           unita
           materia
           modulo
          }
      }
     }
    }
  }
`;

const CREATE_TODO = gql`
  mutation CreateTodo($titolo: String!, $slug: String!) {
    createTodo(titolo: $titolo, slug: $slug)
  }
`;

const REMOVE = gql`
  mutation deleteLezione( $id: ID!, $tipo: String) {
    deleteLezione( id: $id, tipo: $tipo)
  }
`;

function App() {
    let input;
    const {data, loading, error} = useQuery(READ_Corsi);
    const [createTodo] = useMutation(CREATE_TODO);
    const [deleteLezione] = useMutation(REMOVE);

    if (loading) return <Loading />;
    if (error) return <div className='text-center w-100'> <h5>Errore caricamento</h5><img src={imgErrore} alt="errore" className='w-100'/></div>;
    if (!data) return <p>Not found</p>;
    // console.log(data.materie)

    function setUrl(e) {
        window.location.href = window.location.origin + '/?page=' + e.target.getAttribute("aria-label");
        console.log('setUrl');
    }

    return (
        <div className="app container-fluid bg">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3 p-0 pr-2">
                        <div className="mt-3 bg-dark p-2 ">
                            <p className="p-2 m-0">Aggiungi nuovi corsi:</p>

                            <form className=" d-flex" onSubmit={e => {
                                e.preventDefault();
                                createTodo({
                                    variables: {
                                        titolo: input.value,
                                        slug: input.value.replace(/\s/g, "")
                                    }
                                });
                                input.value = '';
                                window.location.reload();
                            }}>
                                <input className="form-control" type="text" placeholder="Inserisci corso"
                                       ref={node => {
                                           input = node;
                                       }}></input>
                                <button className="btn btn-primary ml-1" type="submit">Submit</button>
                            </form>
                        </div>
                        <div className="corsi bg-dark mt-3 py-3">
                            {data.materie.map((mat) =>
                                <div key={mat.id}
                                     className="corso m-2 px-2 pt-2" onClick={setUrl} aria-label={mat.slug}>
                                    <h2 key={mat.id}>{mat.titolo}
                                    </h2>
                                    <button className="btn btn-sm btn-danger btn-cancella ml-5" onClick={() => {
                                        deleteLezione({variables: {id: mat.id, tipo: 'materia'}});
                                        window.location.reload();
                                    }}>x
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="col-md-9 p-0">

                        {data.materie.map((mat) =>
                            <Content key={mat.id} mat={mat}/>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default App;