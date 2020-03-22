import * as request from 'supertest';
import {app} from '../src/app';
import { Database } from '../src/Database';
let token="";
describe("API Spec Test Suite",() => {
    beforeAll(async ()=>{
        await new Database().deleteOne({collection:"logindb",criteria:{email:"aleem@gmail.com"}})
    })

    test("POST /signup should  create , if schema is valid",async done=>{
        const response =await request(app).post("/signup").send({
            "name":"qaiyyum",
            "email":"aleem@gmail.com",
            "password":"aleem",
            "country":"India",
            "state":"Maharastra",
            "city":"Mumbai"
        })
        const {status,body}=response
        console.log(body)
        
        expect (status).toEqual(200)
        done()
    })

    test("Post /login api must issue valid token", async done =>{
    const response= await request(app).post("/login").send({"email":"aleem@gmail.com","password":"aleem"})
    const {status,body,text} = response
    token=response.text;
    console.error(body)
    expect(status).toEqual(200)
    done()
})





test("Post /login should not issue token if schema is invalid", async done =>{
    const response= await request(app).post("/login").send({"email":"aleem@gmail.com","password":"ale"})
    const {status,body,text} = response
    expect(status).toEqual(422)
    done()
});






// country


test("Api must not create City table, if token absent", async done=>{
    const response= await request(app).post("/api/v1/country").send({"country":"china"});;
    const {status,body,text} = response
    expect(status).toEqual(403)
    done()



});


test("Api must not create Country Table, if schema is invalid", async done=>{
    const response= await request(app).post("/api/v1/country").set({'token':token})
    .send({"country":""});
    const {status,body,text} = response
    console.error(body)
    expect(status).toEqual(422)
    done()

    

});


test("Api must  create City, if schema is valid", async done=>{
    const response= await request(app).post("/api/v1/country").set({'token':token})
    .send({"country":"Japan"});
    const {status,body,text} = response
    console.error(body)
    expect(status).toEqual(200)
    done()
  

});



test("Api must get not country Table, if token is absent.", async done=>{
    const response= await request(app).get("/api/v1/country")
    const {status,body,text} = response
    expect(status).toEqual(403)
    done()
});

test("Api must get country Table, if token is present.", async done=>{
    const response= await request(app).get("/api/v1/city").set({'token':token}).send();
    const {status,body,text} = response
    console.error(body)
    expect(status).toEqual(200)
    done()
});


test("Api must get country Table, if token is present.", async done=>{
    const response= await request(app).get("/api/v1/city").set({'token':token}).send();
    const {status,body,text} = response
    console.log(body)
    console.error(body)
    expect(status).toEqual(200)
    done()
});


test("Api must get data From Country table, if token is present .", async done=>{
    const response= await request(app).get("/api/v1/city").set({'token':token});
    const {status,body,text} = response
    expect(status).toEqual(200)
    done()
});

test("Api must get data From Country table, if token is present .", async done=>{
    const response= await request(app).get("/api/v1/city").set({'token':token});
    const {status,body,text} = response
    expect(status).toEqual(200)
    done()
});


test("api must update data Country table, if token present and schema is valid.", async done=>{
    const response= await request(app).put("/api/v1/country/5e691a2517dd24427b045565").set({'token':token}).send({"country":"Austria"});
    const {status,body,text} = response
    console.error(body)
    expect(status).toEqual(200)
    done()
});

test(" api must not update data in Country table, if token absent.", async done=>{
    const response= await request(app).put("/api/v1/country/5e691a2517dd24427b045565").send({"country":"America"});
    const {status,body,text} = response
    expect(status).toEqual(403)
    done()
});

test("api must not update data in Country table, if token present, but  schema is not valid", async done=>{
    const response= await request(app).put("/api/v1/city/5e691a2517dd24427b045565").set({'token':token}).send({"country":" "});
    const {status,body,text} = response
    console.error(body)
    expect(status).toEqual(422)
    done()
});

test("api must not delete data from Country table, if token absent.", async done=>{
    const response= await request(app).delete("/api/v1/city/5e691a6fadf65f43bf88f48c");
    const {status,body,text} = response
    expect(status).toEqual(403)
    done()
});



test("api must delete from Country Data, if token present.", async done=>{
    const response= await request(app).delete("/api/v1/country/5e6934d0c270e25fde7e0ab7").set({'token':token});
    const {status,body,text} = response
    expect(status).toEqual(200)
    done()
});

///   state
test("Api must not create state table, if token absent", async done=>{
    const response= await request(app).post("/api/v1/state").send({"state":"Maharashtra"});;
    const {status,body,text} = response
    expect(status).toEqual(403)
    done()



});


test("Api must not create state Table, if schema is invalid", async done=>{
    const response= await request(app).post("/api/v1/state").set({'token':token})
    .send({"state":""});
    const {status,body,text} = response
    console.error(body)
    expect(status).toEqual(422)
    done()

    

});


test("Api must  create City, if schema is valid", async done=>{
    const response= await request(app).post("/api/v1/state").set({'token':token})
    .send({"state":"Maharashtra"});
    const {status,body,text} = response
    console.error(body)
    expect(status).toEqual(200)
    done()
  

});



test("Api must get not state Table, if token is absent.", async done=>{
    const response= await request(app).get("/api/v1/state")
    const {status,body,text} = response
    expect(status).toEqual(403)
    done()
});



test("Api must get  state Table, if token is Present.", async done=>{
    const response= await request(app).get("/api/v1/state").set({'token':token})
    const {status,body,text} = response
    expect(status).toEqual(200)
    done()
});





test("api must update data State table, if token present and schema is valid.", async done=>{
    const response= await request(app).put("/api/v1/state/5e691a2517dd24427b045565").set({'token':token}).send({"state":"Maharastra"});
    const {status,body,text} = response
    console.error(body)
    expect(status).toEqual(200)
    done()
});

test(" api must not update data in State table, if token absent.", async done=>{
    const response= await request(app).put("/api/v1/state/5e691a2517dd24427b045565").send({"state":"Assam"});
    const {status,body,text} = response
    expect(status).toEqual(403)
    done()
});

test("api must not update data in State table, if token present, but  schema is not valid", async done=>{
    const response= await request(app).put("/api/v1/state/5e691a2517dd24427b045565").set({'token':token}).send({"State":" "});
    const {status,body,text} = response
    console.error(body)
    expect(status).toEqual(422)
    done()
});

test("api must not delete data from State table, if token absent.", async done=>{
    const response= await request(app).delete("/api/v1/state/5e691a6fadf65f43bf88f48c");
    const {status,body,text} = response
    expect(status).toEqual(403)
    done()
});



test("api must delete from State Data, if token present.", async done=>{
    const response= await request(app).delete("/api/v1/state/5e6934d0c270e25fde7e0ab7").set({'token':token});
    const {status,body,text} = response
    expect(status).toEqual(200)
    done()
});

/*
test("Put / api must change the password", async done =>{
    const response= await request(app).put("/change_password").send({"password":"kaleem"})
    const {status,body,text} = response
    token=response.text;
    console.error(body)
    expect(status).toEqual(200)
    done()
})*/



test("Api must not create City table, if token absent", async done=>{
    const response= await request(app).post("/api/v1/city").send({"city":"Mumbai"});;
    const {status,body,text} = response
    expect(status).toEqual(403)
    done()



});


test("Api must not create City Table, if schema is invalid", async done=>{
    const response= await request(app).post("/api/v1/city").set({'token':token})
    .send({"city":""});
    const {status,body,text} = response
    console.error(body)
    expect(status).toEqual(422)
    done()

    

});


test("Api must  create City, if schema is valid", async done=>{
    const response= await request(app).post("/api/v1/city").set({'token':token})
    .send({"city":"hunsu"});
    const {status,body,text} = response
    console.error(body)
    expect(status).toEqual(200)
    done()
  

});



test("Api must get not City Table, if token is absent.", async done=>{
    const response= await request(app).get("/api/v1/city")
    const {status,body,text} = response
    expect(status).toEqual(403)
    done()
});

test("Api must get City Table, if token is present.", async done=>{
    const response= await request(app).get("/api/v1/city").set({'token':token}).send();
    const {status,body,text} = response
    console.error(body)
    expect(status).toEqual(200)
    done()
});


test("Api must get  List City Table, if token is present.", async done=>{
    const response= await request(app).get("/api/v1/city").set({'token':token}).send();
    const {status,body,text} = response
    console.error(body)
    expect(status).toEqual(200)
    done()
});


test("Api must get data From City table, if token is present .", async done=>{
    const response= await request(app).get("/api/v1/city").set({'token':token});
    const {status,body,text} = response
    expect(status).toEqual(200)
    done()
});


test("api must update data in City table, if token present and schema is valid.", async done=>{
    const response= await request(app).put("/api/v1/city/5e691a2517dd24427b045565").set({'token':token}).send({"city":"mumbasa"});
    const {status,body,text} = response
    expect(status).toEqual(200)
    done()
});

test(" api must not update data in City table, if token absent.", async done=>{
    const response= await request(app).put("/api/v1/city/5e691a2517dd24427b045565").send({"city":"hunsu"});
    const {status,body,text} = response
    expect(status).toEqual(403)
    done()
});

test("api must not update data in City table, if token present, but  schema is not valid", async done=>{
    const response= await request(app).put("/api/v1/city/5e691a2517dd24427b045565").set({'token':token}).send({"city":" "});
    const {status,body,text} = response
    console.error(body)
    expect(status).toEqual(422)
    done()
});

test("api must not delete data from City table, if token absent.", async done=>{
    const response= await request(app).delete("/api/v1/city/5e691a6fadf65f43bf88f48c");
    const {status,body,text} = response
    expect(status).toEqual(403)
    done()
});



test("api must delete from City Data, if token present.", async done=>{
    const response= await request(app).delete("/api/v1/city/5e6934d0c270e25fde7e0ab7").set({'token':token});
    const {status,body,text} = response
    expect(status).toEqual(200)
    done()
});


});