import * as express from "express"
import { Database } from "./Database"
import { productSchema } from "./ApiCitySchema"

const City = express.Router()
import { Response, Request, request, response } from 'express'
import { ObjectID } from "mongodb"
import { query } from "express-validator"
import { CountrySchema } from "./ApiCountrySchema"
import { StateSchema } from "./ApiStateSchema"




class State {
    
    statetype: any
    constructor() {
        this.statetype = express.Router()
        this.statetype.post("/state", StateSchema.createState(), StateSchema.handlesError, async (req: Request, res: Response, next: express.NextFunction) => {
            try {

              
                const docs: any = await new Database().createOne({
                    collection: "stateDb",
                    data: req.body,
                    criteria:{unique: true}
                })
                res.status(200).send(docs)
            }
            catch (err) {
                res.status(500).send(`${err.message}-${err.stack}`);
                console.log(`${err.message}-${err.stack}`)
            }
        });


        this.statetype.get("/state" ,async (req: Request, res: Response, next: express.NextFunction) => {
            try {

               
                
                const docs: any = await new Database().read({
                    collection: "stateDb",
                    criteria:{"state":" State"}

                })
                if (docs){
                    return docs
                }
                else {
                    return false;
                }
            }
            catch (err) {
                res.status(500).send(`${err.message}-${err.stack}`);
                console.log(`${err.message}-${err.stack}`)
            }
        });


       



        this.statetype.get("/state", query ,async (req: Request, res: Response, next: express.NextFunction) => {
            try {

                
                
                const docs: any = await new Database().readWithSkipAndLimit({
                    collection: "stateDb",

                })
                res.status(200).send(docs)
            }
            catch (err) {
                res.status(500).send(`${err.message}-${err.stack}`);
                console.log(`${err.message}-${err.stack}`)
            }
        });






        this.statetype.get("/state/:id", async (req: Request, res: Response, next: express.NextFunction) => {
            try {
                const doc: any = await new Database().readOne({
                    collection: "stateDb",
                    criteria: { _id: new ObjectID(req.params.id) }
                })
                res.status(200).send(doc)
            }
            catch (err) {
                res.status(500).send(`${err.message}-${err.stack}`);
                console.log(`${err.message}-${err.stack}`)
            }
        });


        this.statetype.put("/state/:id",StateSchema.createState(),StateSchema.handlesError ,async (req:Request,res:Response,next:express.NextFunction)=>{
            try {
                let dat:any ={$set: {
                    country:req.body.country,
                   
                 }
                }
                const docs:any = await new Database().updateOne({
                    collection: "stateDb",
                    criteria:{ "_id": new ObjectID(req.params.id)},
                    projection:{},
                    data:dat
                })
                res.status(200).send(docs) 
            }         
                catch (err) {
                res.status(500).send(`${err.message}-${err.stack}`);
                console.log(`${err.message}-${err.stack}`)   
        }
            });


            this.statetype.delete("/state/:id",  async (req:Request,res:Response,next:express.NextFunction)=>{
                try {
                    
                    const docs:any = await new Database().deleteOne({
                        collection: "stateDb",
                        criteria:{ "_id": new ObjectID(req.params.id)},
                        projection:{},
                    }) 
                    res.status(200).send(docs) 
                }         
                    catch (err) {
                    res.status(500).send(`${err.message}-${err.stack}`);
                    console.log(`${err.message}-${err.stack}`)   
            }
                });
                }
    }





export { State }