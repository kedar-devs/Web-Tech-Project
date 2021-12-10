const express=require('express')
const graphQlHttp=require('express-graphql')
const schema=require('./Schema/Root.Schema')
const app=express()
app.use('/graphQl',graphQlHttp({
    schema,
    graphiql
}))
app.listen(8080,()=>{
    console.log('Listen to 8080')
})
