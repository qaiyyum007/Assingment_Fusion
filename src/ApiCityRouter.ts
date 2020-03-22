import * as express from "express"
import { Database } from "./Database"
import { productSchema } from "./ApiCitySchema"

const citytype = express.Router()
import { Response, Request, request, response } from 'express'
import { ObjectID } from "mongodb"
import { query } from "express-validator"




class Product {
    citytype: any
    constructor() {
        this.citytype = express.Router()
        this.citytype.post("/city", productSchema.createproduct(), productSchema.handlesError, async (req: Request, res: Response, next: express.NextFunction) => {
            try {

              
                const docs: any = await new Database().createOne({
                    collection: "citydb",
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


        this.citytype.get("/city" ,async (req: Request, res: Response, next: express.NextFunction) => {
            try {           
                const docs: any = await new Database().read({
                    collection: "citydb",

                })
                res.status(200).send(docs)
            }
            catch (err) {
                res.status(500).send(`${err.message}-${err.stack}`);
                console.log(`${err.message}-${err.stack}`)
            }
        });


        this.citytype.get("/city", query ,async (req: Request, res: Response, next: express.NextFunction) => {
            try {
               
                
                const docs: any = await new Database().read({
                    collection: "citydb",

                })
                res.status(200).send(docs)
            }
            catch (err) {
                res.status(500).send(`${err.message}-${err.stack}`);
                console.log(`${err.message}-${err.stack}`)
            }
        });






        this.citytype.get("/city/:id", async (req: Request, res: Response, next: express.NextFunction) => {
            try {
                const doc: any = await new Database().readOne({
                    collection: "citydb",
                    criteria: { _id: new ObjectID(req.params.id) }
                })
                res.status(200).send(doc)
            }
            catch (err) {
                res.status(500).send(`${err.message}-${err.stack}`);
                console.log(`${err.message}-${err.stack}`)
            }
        });


        this.citytype.put("/city/:id",productSchema.updateData(),productSchema.handlesError ,async (req:Request,res:Response,next:express.NextFunction)=>{
            try {
                let dat:any ={$set: {
                    country:req.body.country,
                    state:req.body.state
                 }
                }
                const docs:any = await new Database().updateOne({
                    collection: "citydb",
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


            this.citytype.delete("/city/:id",  async (req:Request,res:Response,next:express.NextFunction)=>{
                try {
                    
                    const docs:any = await new Database().deleteOne({
                        collection: "citydb",
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












export { Product }