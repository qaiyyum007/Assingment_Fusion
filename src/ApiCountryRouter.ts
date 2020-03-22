import * as express from "express"
import { Database } from "./Database"
import { productSchema } from "./ApiCitySchema"

const countrytype = express.Router()
import { Response, Request, request, response } from 'express'
import { ObjectID } from "mongodb"
import { query } from "express-validator"
import { CountrySchema } from "./ApiCountrySchema"




class Country {
    
    countrytype: any
    constructor() {
        this.countrytype = express.Router()
        this.countrytype.post("/country", CountrySchema.createCountry(), productSchema.handlesError, async (req: Request, res: Response, next: express.NextFunction) => {
            try {
      
                const docs: any = await new Database().createOne({
                    collection: "countryDb",
                    data: req.body,
                    criteria:{}
                })
                res.status(200).send(docs)
            }
            catch (err) {
                res.status(500).send(`${err.message}-${err.stack}`);
                console.log(`${err.message}-${err.stack}`)
            }


            
        });
           

        
        


        this.countrytype.get("/country" ,async (req: Request, res: Response, next: express.NextFunction) => {
            try {

               
                
                const docs: any = await new Database().read({
                    collection: "countryDb",

                })
                res.status(200).send(docs)
            }
            catch (err) {
                res.status(500).send(`${err.message}-${err.stack}`);
                console.log(`${err.message}-${err.stack}`)
            }
        });


        this.countrytype.get("/country", query ,async (req: Request, res: Response, next: express.NextFunction) => {
            try {

                const pageNo=parseInt(req.query.pageNo)
                const size=parseInt(req.query.size)
                
                const query ={}
                if (pageNo<0||pageNo===0){
                    const pageResult ={"error":true,"message":"invalid page Number"};
                    return res.send(pageResult)
                    
                } 
                //  query.skip=size*(pageNo-1)
              //query.limit=size
                
                const docs: any = await new Database().readWithSkipAndLimit({
                    collection: "countryDb",
                    criteria:{"country" : Country}

                })
               
                if(docs){
                    return docs;
                } else {
                    return false;
                }
            }
            catch (err) {
                res.status(500).send(`${err.message}-${err.stack}`);
                console.log(`${err.message}-${err.stack}`)
            }
        });






        this.countrytype.get("/country/:id", async (req: Request, res: Response, next: express.NextFunction) => {
            try {
                const doc: any = await new Database().readOne({
                    collection: "countryDb",
                    criteria: { _id: new ObjectID(req.params.id) }
                })
                res.status(200).send(doc)
            }
            catch (err) {
                res.status(500).send(`${err.message}-${err.stack}`);
                console.log(`${err.message}-${err.stack}`)
            }
        });
         


        

        this.countrytype.put("/country/:id",CountrySchema.createCountry(),productSchema.handlesError ,async (req:Request,res:Response,next:express.NextFunction)=>{
            try {
                let dat:any ={$set: {
                    country:req.body.country,
                   
                 }
                }
                const docs:any = await new Database().updateOne({
                    collection: "countryDb",
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


            this.countrytype.delete("/country/:id",  async (req:Request,res:Response,next:express.NextFunction)=>{
                try {
                    
                    const docs:any = await new Database().deleteOne({
                        collection: "countryDb",
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












export { Country }