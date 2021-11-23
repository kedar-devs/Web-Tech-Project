const graphql = require('graphql')
const dater = require('graphql-iso-date')
const User = require('../Models/User.model')
const { GraphQLString,
    GraphQLFloat,
    GraphQLInt,
    GraphQLID,
    GraphQLList,
    GraphQLObjectType,
    GraphQLSchema } = graphql
const { GraphQLDate } = dater
const userType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        address: { type: GraphQLString },
        lat: { type: GraphQLFloat },
        lon: { type: GraphQLFloat },
        DOB: { type: GraphQLDate },
        parentName: { type: GraphQLString },
        phoneNumber: { type: GraphQLInt },
        email: { type: GraphQLString },
        vaccine:{
            type:new GraphQLList(Vaccinator),
            resolve(parent,args){

            }
        }
    })
})
const Vaccinator = new GraphQLObjectType({
    name: 'Vaccine',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        status: { type: graphql.GraphQLBoolean },
        date: { type: GraphQLDate },
        uid:{type:GraphQLID},
        
    })
})
const Doctor = new GraphQLObjectType({
    name: 'Doctor',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        address: { type: GraphQLString },
        phoneNumber: { type: GraphQLInt },
        lat: { type: GraphQLFloat },
        lon: { type: GraphQLFloat },
        type: { type: GraphQLString },
        timeDiff: { type: GraphQLInt },
        appointment:{
            type:new GraphQLList(Appointment),
            resolve(parent,args){

            }
        }
    })
})
const Appointment = new GraphQLObjectType({
    name: 'Appointment',
    fields: () => ({
        id: { type: GraphQLID },
        docId: { type: GraphQLID },
        userId: { type: GraphQLID },
        slot: { type: GraphQLString },
        timing: { type: GraphQLString },
        doctor:{
            type:Doctor,
            resolve(parent,args){

            }
        },
        users:{
            type:userType,
            resolve(parent,args){
                
            }
        }
    })
})
const Mutation=new GraphQLObjectType({
    name:"Mutation",
    fields:{
        addUser:{
            type:userType,
            args:{
                id: { type: GraphQLID },
                name: { type: GraphQLString },
                address: { type: GraphQLString },
                lat: { type: GraphQLFloat },
                lon: { type: GraphQLFloat },
                DOB: { type: GraphQLDate },
                parentName: { type: GraphQLString },
                phoneNumber: { type: GraphQLInt },
                email: { type: GraphQLString }
            },
            resolve(parent,args){

            }
        }
    }
})
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: userType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {

            }
        },
        vaccinate:{
            type:Vaccinator,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){

            }
        },
        doctor:{
            type:Doctor,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){

            }
        },
        appointment:{
            type:Appointment,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){

            }
        },
        users:{
            type:new GraphQLList(userType),
            resolve(parent,args){

            }
        },
        doctors:{
            type:new GraphQLList(Doctor),
            resolve(parent,args){

            }

        }

    }
})
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation:Mutation
})