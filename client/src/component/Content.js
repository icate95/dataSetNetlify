import React from 'react';
import Modulo from './modulo';

class Content extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: this.props,
            materia: {
                materia: this.props.mat,
                sommaLezioni: 0,
                completato: 0,
                totale: 0,
                percentuale: 0
            }
        }

        this.percentualeCompletamento = this.percentualeCompletamento.bind(this);

    }

    percentualeCompletamento() {
        let sommaLezioni = 0;
        let completato = 0;
        if (this.props.mat.moduli[0]) {
            for (let i in this.props.mat.moduli) {
                for (let j in this.props.mat.moduli[i].unita) {
                   sommaLezioni += this.props.mat.moduli[i].unita[j].lezione.length;
                    for (let n in this.props.mat.moduli[i].unita[j].lezione) {
                        if (this.props.mat.moduli[i].unita[j].lezione[n].completato)
                            completato++
                    }

                }
            }
        }
        let totale = sommaLezioni
        let percentuale = (100 * completato) / sommaLezioni;
        return (this.setState(state => ({
            materia: {
                sommaLezioni: sommaLezioni,
                completato: completato,
                totale: totale,
                percentuale: percentuale + '%'
            }
        }))
        )
    }

    componentDidMount() {
        if (document.getElementById(window.location.href.split('/')[3])) {
            document.getElementById(window.location.href.split('/')[3]).classList.add('active');
        }
        // console.log(this.state)
        this.percentualeCompletamento();
    }

    componentWillUnmount() {

    }

    render() {
        // console.log(this.state.data)
        var mat = this.state.data.mat
        return (

            <div key={mat.id} id={mat.slug}
                 className="corso-content bg-dark mt-3 p-2">
                <div className="info-corso d-flex justyfy-space-around align-items-center">
                    <div className="progress m-3 w-100">
                        <div className="progress-bar" role="progressbar"
                             style={{width: this.state.materia.percentuale}}
                             aria-valuenow={this.state.materia.percentuale}
                             aria-valuemin="0" aria-valuemax="100">
                            {this.state.materia.percentuale}
                        </div>

                    </div>
                    {/*<button className="btn btn-sm btn-danger rounded-circle btn-cancella mr-2" onClick={() => {*/}
                    {/*    deleteTodo({variables: {id: mat.id}});*/}
                    {/*    window.location.reload();*/}
                    {/*}}>X*/}
                    {/*</button>*/}
                    {/*<button className={`btn btn-sm float-right ${mat.completato ? "btn-success" : "btn-info"}`}*/}
                    {/*        onClick={() => {*/}
                    {/*            updateLezione({variables: {id: mat.id}});*/}
                    {/*            window.location.reload();*/}
                    {/*        }}>{mat.completato ? <span>Completed</span> : <span>Not completed</span>}</button>*/}
                </div>
                <div className="content" aria-labelledby={mat.slug}>
                    <Modulo modulo={mat.moduli} idMateria={mat.id} slugMateria={mat.slug}/>

                </div>
            </div>
        )
    }

}

export default Content;