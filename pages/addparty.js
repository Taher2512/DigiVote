import React, { useState } from 'react';
import { app, db } from "../const/firebase/config";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import {getStorage,ref,uploadBytes,getDownloadURL} from 'firebase/storage'
const FormRepeater = () => {
  const [fields, setFields] = useState([{ image: '', name: '' }]);
 const [image, setimage] = useState([])
 const [login, setlogin] = useState(false)
 const [email, setemail] = useState('')
 const [password, setpassword] = useState('')
  const handleChange = (index, event) => {
    const values = [...fields];
    if (event.target.name === 'image') {
      values[index].image = event.target.files[0];
      
    } else {
      values[index][event.target.name] = event.target.value;
    }
    setFields(values);
  };

  const handleAddField = () => {
    setFields([...fields, { image: '', name: '' }]);
    console.log(fields)
  };

  const handleRemoveField = (index) => {
    const values = [...fields];
    values.splice(index, 1);
    setFields(values);
  };
const submit=async()=>{
    const storage = getStorage(app);
    const q = query(collection(db, "parties"));
         fields.map(async(field)=>{
            const storageRef = ref(storage, `parties/${field.name}`);
            const d=await uploadBytes(storageRef, image);
            console.log("Image uploaded successfully");
           await getDownloadURL(d.ref).then(async(url) => {
            let data={
              name:field.name,
                imageUrl:url,
                votes:0
            }
            await  addDoc(collection(db, "parties"), data);

           })
         })
    }
    const submitLogin=()=>{
        if(email==='mustafachaiwala2003@gmail.com' && password=='123abc'){
            setlogin(true)
        }
        else{
            alert("Invalid Credentials")
        }
    }
  return (
    <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', minHeight: '100vh',backgroundColor:"#1e293b" ,flexDirection:"column"}}>
    <h1 style={{color:"white",fontSize:40,fontWeight:"bold"}}>Add Parties</h1>
    {!login&&<div style={{padding:50,backgroundColor:'white',borderRadius:20,gap:20,display:'flex',flexDirection:"column",alignItems:"center"}}>
       <h1 style={{fontWeight:"bold",fontSize:30}}>Login </h1>
       <input style={{padding:10,marginBottom:20}} type="email" placeholder="Enter Email" value={email}  onChange={e=>setemail(e.target.value)}/>
       <input style={{padding:10,marginBottom:20}} type="password" placeholder="Enter Password"  value={password} onChange={e=>setpassword(e.target.value)} />
       <button  style={{width:"100%",backgroundColor:"#1e293b",padding:10,borderRadius:10,color:'white',fontWeight:'bold'}} type="button" onClick={submitLogin}>
          Submit
        </button>
    </div>}
    {login&&<div style={{padding:50,backgroundColor:'white',borderRadius:20,gap:20,display:'flex',flexDirection:"column"}}>
    <div style={{alignItems:"center",justifyContent:"center",display:'flex',flexDirection:"column",gap:10}} >
        {fields.map((field, index) => (
          <div style={{display:'flex',flexDirection:"row"}} key={index}>
            <input
               placeholder='Choose Party Logo'
              type="file"
              accept="image/*"
              name="image"
              onChange={(e) => handleChange(index, e)}
            />
            <div style={{flexDirection:"row",display:'flex',gap:20}}>
            {field.image && (
              <img style={{height:80,width:120,borderRadius:10}} src={URL.createObjectURL(field.image)} alt="Preview"  />
            )}
            <input
            
              type="text"
              name="name"
              placeholder="Name"
              value={field.name}
              onChange={(e) => handleChange(index, e)}
              style={{width:"100%",paddingRight:40,paddingLeft:40,padding:10,height:50,color:'black',marginRight:20}}
            />
            </div>
            
            <button style={{backgroundColor:"red",padding:10,borderRadius:10,color:"white",fontWeight:'bold',marginBottom:10,height:50}} type="button" onClick={() => handleRemoveField(index)}>
              Remove
            </button>
          </div>
        ))}
        </div>
        <button style={{width:"100%",backgroundColor:"#1e293b",padding:10,borderRadius:10,color:'white',fontWeight:'bold'}} type="button" onClick={handleAddField}>
          Add Field
        </button>
        <button  style={{width:"100%",backgroundColor:"#1e293b",padding:10,borderRadius:10,color:'white',fontWeight:'bold'}} type="button" onClick={submit}>
          Submit
        </button>
    </div>}
    
     
    </div>
  );
};

export default FormRepeater;
