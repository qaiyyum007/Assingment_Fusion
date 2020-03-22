import *  as express from "express"
import {Request ,Response} from "express"
const app:express.Application=express()
import * as jwt from "jsonwebtoken"
import { Product } from "./ApiCityRouter"
import {ApiLoginSignup} from './ApiLoginSignup'
import { Country } from "./ApiCountryRouter"
import { State } from "./ApiStateRouter"
app.use(express.json())
app.listen(7777)
console.log("server start");


app.all("/api/*",(req,res,next) => {
    try{
          const token:any=req.headers["token"]
          console.log(`token ${token}`)
          if(!token)
                res.status(403).send()
          else{
                jwt.verify(token,"secretKey",(err:Error,decoded:any) => {
                      if(!err)
                            next()
                      else res.status(500).send('token is not found')
                      })
                }
          } catch (err) {}  
    })

app.use('/', new ApiLoginSignup().dataRouter)
app.use("/api/v1",new Product().citytype )
app.use("/api/v1",new Country().countrytype)
app.use("/api/v1",new State().statetype)
export {app}


