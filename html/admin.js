async function onLoadHandler(){
    await setToken();
    await getCountry();
}
function handleError(msg){
    document.getElementById("view").innerHTML=msg
}   
async function setToken(){
    try{
        let user = {
            "email": "aleem@gmail.com",
            "password": "aleem"
        };
        let response=await fetch("http://localhost:7777/login",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        if(response.status !==200)
            handleError("did not get Token")
        else {
                response= await response.text()
                console.error(response)
                localStorage.setItem("token",response)
            }
        }catch (err){
            console.error(`${err.message}-${err.stack}`)
            handleError(`${err.message}-${err.stack}`)
        }
    }
    async function getCountry(){
        try {
            let response=await fetch("http://localhost:7777/api/v1/country",{headers:{"token":localStorage.getItem("token")}})
            if(response.status !==200)
            handleError("Did not get todos")
            else{
                let rows = `<tr><td colspan="4">No Country</td></tr>`;
                response=await response.json()
                if(Array.isArray(response) && response.length > 0){
                    response=response.map(data=>
                        
                    `<tr><td>${data.country}</td>
                    <td>${data.description}</td>
                    <td><button onclick="editCountry('${data._id}')">Edit</button></td>
                    <td><button onclick="deleteCountry('${data._id}')">Delete</button></td>
                    </tr>`)
                rows=response.reduce((acc,curr)=> acc+curr)
                }
                const html=`<input type="button" onClick="showAddCountry()" value="Add Country"/><br/>
                          
                
                            <table class="table table-sm">
                            <thead class="thead-dark">
                 
                  <tr>
                    <th scope="col">Country</th>
                    <th scope="col">Description</th>
                    <th scope="col">Action</th>
                    <th scope="col">Action</th>

                    </tr>  
                </thead>
                ${rows}
                </table>`                                              
                document.getElementById("view").innerHTML=html
            }
        } catch (err){
            console.error(`${err.message}-${err.stack}`)
            handleError(`${err.message}-${err.stack}`)
        }
}

async function showAddCountry(id){
    const html=`
  <div class="form-group">
    <label for="exampleInputEmail1">Country</label>
    <input type="Text" class="form-control" id="country" aria-describedby="emailHelp">
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Descrption</label>
    <input type="Text" class="form-control" id="descrpition">
  </div>
  
  <button type="Button" OnClick="showAddCountry()" class="btn btn-primary">Submit</button>`

  document.getElementById("view").innerHTML=html
}
async function addCoutry(){

          const data={
              task:document.getElementById("country").value,
              description:document.getElementById("descrpition").value
          }

let response=await fetch("http://localhost:7777/api/v1/country",{
    method: "Post",
    headers: {
        'Content-Type': 'application/json',
       'token' :localStorage.getItem('token')
    },
    body: JSON.stringify(data)
});
if(response.status !==200)
    handleError("can not post")
else {
        response= await response.text()
        console.error(response)
        await getCountry();
    }


}

async function editCountry(id){
    console.log(id)
   let response=await fetch (`http://localhost:7777/api/v1/country/${id}`,{headers: {
      'token' :localStorage.getItem('token')
   }}
   )
   if(response.status !==200)
   handleError("can not put")
else {
       response= await response.json()
   
   }
   const html=`
 <div class="form-group">
   <label for="exampleInputEmail1">Country</label>
   <input type="Text" class="form-control" id="updateCountry"  value="${response.country}" aria-describedby="emailHelp">
 </div>
 
 
 <button type="Button" OnClick="updateCountry('${response._id}')" class="btn btn-primary">Submit</button>`

 document.getElementById("view").innerHTML=html
}

async function updateCountry(id){

    const editCountry={
        country:document.getElementById("updateCountry").value,
       
    }

let response=await fetch(`http://localhost:7777/api/v1/country/${id}`,{
method: "Put",
headers: {
  'Content-Type': 'application/json',
 'token' :localStorage.getItem('token')
},
body: JSON.stringify({
  "Country":document.getElementById("updateCountry").value,
 
})
});
if(response.status !==200)
handleError("can not put")
else {
  response= await response.text()
  console.error(response)
  await getCountry();
}
}
