import { MongoClient } from "mongodb";
declare class Database {
    client: MongoClient;
    db: any;
    constructor();
    readOne(readOne: any): Promise<void>;
    read(readParams: any): Promise<any[]>;
    readWithSkipAndLimit(readWith: any): Promise<any[]>;
    createOne(createOneParams: any): Promise<void>;
    updateOne(updateOneParams: any): Promise<import("mongodb").UpdateWriteOpResult>;
    deleteOne(deleteOneParams: any): Promise<import("mongodb").DeleteWriteOpResultObject>;
}
export { Database };
