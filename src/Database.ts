import { MongoClient } from "mongodb";

class Database {
    client :MongoClient
    db :any
    constructor(){
        const url ="mongodb://localhost:27017"
        this.client=new MongoClient(url ,{useNewUrlParser:true,useUnifiedTopology:true})
        this.db='product'
        
    }

    async readOne (readOne:any){
        try{

            const conn= await this.client.connect()
            const  db=conn.db(this.db)
            const  collection =db.collection(readOne.collection)
            const docs =await collection.findOne(readOne.projection,readOne.criteria)
            return docs
    

        }
        catch (err){
          throw err
        }
    }


    async read(readParams:any){
        try {
            const conn = await this.client.connect()
            const db = conn.db(this.db)
            const collection =  db.collection(readParams.collection)
            const docs = await collection.find(readParams.criteria,readParams.projection).toArray();
            return docs; 
        }catch(err) {
            throw err
        }    
      }
      async readWithSkipAndLimit(readWith:any){
        try {
            const conn = await this.client.connect()
            const db = conn.db(this.db)
            const collection =  db.collection(readWith.collection)
            const docs = await collection.find(readWith.criteria,readWith.projection).skip(readWith.skip).limit(readWith.limit).sort({"columnName":-1}).toArray();
            return docs; 
        }catch(err) {
            throw err
        }    
      }
    
    async createOne(createOneParams:any){
        try {
            const conn = await this.client.connect()
            const db = conn.db(this.db)
            const collection =  db.collection(createOneParams.collection)
            const docs = await collection.insertOne(createOneParams.data ,createOneParams.criteria );
            return docs; 
        }catch(err) {
            throw err
        }    
      }


      async updateOne(updateOneParams:any){
        try {
            const conn = await this.client.connect()
            const db = conn.db(this.db)
            const collection =  db.collection(updateOneParams.collection)
            const docs = await collection.updateOne(updateOneParams.criteria,updateOneParams.data);
            return docs; 
        }catch(err) {
            throw err
        }    
      }


      async deleteOne(deleteOneParams:any){
        try{
          const conn = await this.client.connect()
          const db = conn.db(this.db)
          const collection =  db.collection(deleteOneParams.collection)
          const docs = await collection.deleteOne(deleteOneParams.criteria);
          return docs;
        }
        catch(err) {
          throw err
    }
  }

    }

export {Database}