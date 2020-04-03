//import the packages installed in the previous step.
// We use the cors package because we want to be able to make requests from other origins.

//    npm install --save express apollo-server-express cors

const express = require('express');
const {ApolloServer, gql} = require('apollo-server-express');
const cors = require('cors');

let corsi = [
    {
        id: 0,
        text: 'Hello from GraphQL',
        completato: false,
    },
];
let lezioni = [{
    id: '1sa96iswk',
    titolo: 'premesse per il corso',
    completato: false,
    fruizione: 15,
    tipo: 'videolezione',
    unita: 'origini-della-programmazione',
    materia: 'programmazione',
    modulo: 'fondamenti-di-programmazione'
},
    {
        id: '1io96iswk',
        titolo: 'origini della programmazione',
        completato: false,
        fruizione: 9,
        tipo: 'videolezione',
        unita: 'origini-della-programmazione',
        materia: 'programmazione',
        modulo: 'fondamenti-di-programmazione'
    },
    {
        id: '1sa96adak',
        titolo: 'origini della programmazione',
        completato: false,
        fruizione: 12,
        tipo: 'videolezione',
        unita: 'origini-della-programmazione',
        materia: 'programmazione',
        modulo: 'fondamenti-di-programmazione'
    },
    {
        id: 'afshjalaa',
        titolo: 'test di fine unita',
        completato: false,
        fruizione: 10,
        tipo: 'test',
        unita: 'origini-della-programmazione',
        materia: 'programmazione',
        modulo: 'fondamenti-di-programmazione'
    }];

let unita = [{
    id: '7ft96iswk',
    titolo: 'le origini della programmazione',
    slug: 'origini-della-programmazione',
    completato: false,
    lezione: lezioni
}]

let moduli = [{
    id: '1sa96isad',
    titolo: 'Fondamenti di programmazione',
    slug: 'fondamenti-di-programmazione',
    completato: false,
    materia: 'programmazione',
    unita: unita
}];

let materie = [
    {
        id: 0,
        titolo: 'Programmazione',
        slug: 'programmazione',
        path: '/programmazione',
        completato: false,
        percentualeCompletamento: 10,
        moduli: moduli
    }
];

const typeDefs = gql`
  type Materie {
    id: ID!
    titolo: String
    slug: String
    path: String
    completato: Boolean
    percentualeCompletamento: String
    moduli: [Modulo] 
  }
  type Modulo {
    id: ID
    titolo: String
    completato: Boolean
    slug: String
    materia: String
    unita: [Unita]
  }
  input ModuloInput {
    id: ID
    titolo: String
    completato: Boolean
    slug: String
    materia: String
    unita: [UnitaInput]
  }
  type Unita {
    id: ID!
    titolo: String
    completato: Boolean
    slug: String
    modulo: String
    materina: String
    lezione: [Lezione]
  }
  input UnitaInput {
    id: ID
    titolo: String
    completato: Boolean
    slug: String
    modulo: String
    materia: String
    lezione: [LezioneInput]
  }
   type Lezione {
    id: ID!
    titolo: String
    slug: String
    completato: Boolean
    fruizione: String
    tipo: String
    unita: String
    materia: String
    modulo: String
  }
  input LezioneInput {
    id: ID!
    titolo: String
    slug: String
    completato: Boolean
    fruizione: String
    tipo: String
    unita: String
    materia: String
    modulo: String
  }
  type Query {
    materie: [Materie]!
  }
  type Mutation {
    createTodo(titolo: String!, slug: String!):String
    createModulo(id: ID!, moduli: ModuloInput):Materie
    createUnita(id: ID!, unita: UnitaInput):Modulo
    createLezione(id: ID!, lezione: LezioneInput):Unita
    removeTodo(id: String!):String
    updateLezione(lezione: LezioneInput):Unita
    deleteLezione(id: ID!, tipo: String):String
  }
`;

const resolvers = {
    Query: {
        materie: () => materie,
    },
    Mutation: {
        createTodo: (parent, args, context, info) => {
            return materie.push({
                id: Date.now().toString(),
                titolo: args.titolo,
                slug: args.slug,
                path: '/' + args.slug,
                completato: false,
                percentualeCompletamento: 0,
                moduli: []
            });
        },
        createModulo: (parent, args, context, info) => {
            // console.log('args')
            // console.log(args)
            for (let i in materie) {
                // console.log('moduli')
                // console.log(moduli)
                // console.log('modulislug '+materie[i].slug + ' - args moduli materia: ' + args.moduli.materia);
                if (materie[i].slug == args.moduli.materia) {
                    materie[i].moduli.push(args.moduli);
                }
            }
            return args.id;
        },
        createUnita: (parent, args, context, info) => {
            // console.log('args')
            // console.log(args)
            // console.log(materie)
            for (let j in materie) {
                // console.log(materie[j].slug + ' - ' + args.unita.materia);
                if (materie[j].slug == args.unita.materia) {
                    for (let i in materie[j].moduli) {
                        // console.log('moduli')
                        // console.log(materie[j].moduli);
                        //  console.log(materie[j].moduli[i].slug + ' - ' + args.unita.modulo)
                        if (materie[j].moduli[i].slug == args.unita.modulo) {
                            materie[j].moduli[i].unita.push(args.unita);
                            // console.warn('inserita unita')
                        }
                    }
                }
            }
            return args.id;
        },
        createLezione: (parent, args, context, info) => {
            // console.log('args');
            // console.log(args);
            for (let j in materie) {
                // console.log(materie[j]);
                // console.log(materie[j].slug + ' - ' + args.lezione.materia);
                // if (materie[j].slug == args.lezione.materia) {
                for (let i in materie[j].moduli) {
                    // console.log(materie[j].moduli[i].slug + ' - ' + args.lezione.modulo)
                    // if (materie[j].moduli[i].slug == args.lezione.modulo) {
                    for (let n in materie[j].moduli[i].unita) {
                        // console.log(materie[j].moduli[i].slug + ' - ' + args.lezione.modulo)
                        if (materie[j].moduli[i].unita[n].slug == args.lezione.unita) {
                            materie[j].moduli[i].unita[n].lezione.push(args.lezione);
                            // console.warn('inserita lezione')
                        }
                        // }
                        // }
                    }
                }
            }
            return args.id;
        },
        removeTodo: (parent, args, context, info) => {
            for (let i in corsi) {
                if (corsi[i].id === args.id) {
                    corsi.splice(i, 1);
                }
            }
            return args.id;
        },
        deleteLezione: (parent, args, context, info) => {
            console.log(args);
            for (let j in materie) {
                if (args.tipo === 'materia' && materie[j].id === args.id) {
                    materie.splice(j, 1);
                } else {
                    for (let i in materie[j].moduli) {
                        if (args.tipo === 'modulo' && materie[j].moduli[i].id === args.id) {
                            materie[j].moduli.splice(i, 1);
                        } else {
                            for (let n in materie[j].moduli[i].unita) {
                                if (args.tipo === 'unita' && materie[j].moduli[i].unita[n].id === args.id) {
                                    materie[j].moduli[i].unita.splice(n, 1);
                                } else if (args.tipo === 'lezione') {
                                    for (let l in materie[j].moduli[i].unita[n].lezione) {
                                        if (materie[j].moduli[i].unita[n].lezione[l].id === args.id) {
                                            materie[j].moduli[i].unita[n].lezione.splice(l, 1);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

            // for (let i in corsi) {
            //     if (corsi[i].id === args.id) {
            //         corsi.splice(i, 1);
            //     }
            // }
            return args.id;
        },
        updateLezione: (parent, args, context, info) => {
            for (let j in materie) {
                for (let i in materie[j].moduli) {
                    for (let n in materie[j].moduli[i].unita) {
                        for (let l in materie[j].moduli[i].unita[n].lezione) {
                            if (materie[j].moduli[i].unita[n].lezione[l].id == args.lezione.id) {
                                materie[j].moduli[i].unita[n].lezione[l].completato = !materie[j].moduli[i].unita[n].lezione[l].completato;
                            }
                        }
                    }
                }
            }
            return args.id;
        }
    }
};

const server = new ApolloServer({typeDefs, resolvers});

const app = express();
server.applyMiddleware({app});

app.use(cors());

app.listen({port: 4000}, () =>
    console.log('Now browse to http://localhost:4000' + server.graphqlPath)
);

// exports.handler = server.createHandler();