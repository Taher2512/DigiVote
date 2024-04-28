import React, { useState } from "react";
import { app, db } from "../const/firebase/config";
import { addDoc, collection, query } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FormRepeater = () => {
  const [fields, setFields] = useState([{ image: "", name: "", desc: "" }]);
  const [login, setlogin] = useState(false);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const handleChange = (index, event) => {
    const values = [...fields];
    if (event.target.name === "image") {
      values[index].image = event.target.files[0];
    } else if (event.target.name === "name") {
      values[index][event.target.name] = event.target.value;
    } else {
      values[index]["desc"] = event.target.value;
    }
    setFields(values);
  };

  const handleAddField = () => {
    setFields([...fields, { image: "", name: "", desc: "" }]);
    console.log(fields);
  };

  const handleRemoveField = (index) => {
    const values = [...fields];
    values.splice(index, 1);
    setFields(values);
  };
  const submit = async () => {
    const storage = getStorage(app);
    const q = query(collection(db, "parties"));
    fields.map(async (field) => {
      const storageRef = ref(storage, `parties/${field.name}`);
      const d = await uploadBytes(storageRef, field.image);
      console.log("Image uploaded successfully");

      await getDownloadURL(d.ref).then(async (url) => {
        const id = Math.floor(1000 + Math.random() * 9000);
        let data = {
          name: field.name,
          imageUrl: url,
          votes: 0,
          id,
          desc: field.desc,
        };
        await addDoc(collection(db, "parties"), data);
        toast.success("Party has been added!", {
          position: "top-right",
          autoClose: 5000,
        });
      });
    });
  };
  const submitLogin = () => {
    if (email === "mustafachaiwala2003@gmail.com" && password == "123abc") {
      setlogin(true);
    } else {
      alert("Invalid Credentials");
    }
  };
  return (
    <div className="w-screen h-screen px-40 flex flex-col gap-8 py-36 items-center">
      <ToastContainer position="top-right" autoClose={5000} />
      <h1 className="gilroy-bold text-white text-4xl ">Add Parties</h1>
      {!login && (
        <div className="w-2/3  flex flex-col items-center gap-4 px-20 rounded-xl py-8 border-4 border-purple-700 bg-purple-900/15">
          <h1 className="text-white gilroy-light text-2xl">Login </h1>
          <input
            className="w-full h-10 rounded-full px-4 gilroy-light bg-white/30 text-white focus:outline-none"
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
          <input
            className="w-full h-10 rounded-full px-4 gilroy-light bg-white/30 text-white focus:outline-none"
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
          <button
            className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-bold rounded-full text-xl px-10 py-2.5 text-center gilroy-bold"
            type="button"
            onClick={submitLogin}
          >
            Submit
          </button>
        </div>
      )}
      {login && (
        <div className="w-2/3  flex flex-col items-center gap-4 px-20 rounded-xl py-8 border-4 border-purple-700 bg-purple-900/15">
          <div className="flex flex-col items-center justify-center gap-6">
            {fields.map((field, index) => (
              <div
                className="flex gap-4 items-center justify-between"
                key={index}
              >
                <input
                  className="block w-34  text-lg gilroy-light text-white rounded-lg cursor-pointer bg-white/10   focus:outline-none dark:placeholder-gray-400"
                  placeholder="Choose Party Logo"
                  type="file"
                  accept="image/*"
                  name="image"
                  onChange={(e) => handleChange(index, e)}
                />
                <div className="flex gap-4 items-center">
                  {field.image && (
                    <img
                      className="w-20 h-16 rounded-full"
                      src={URL.createObjectURL(field.image)}
                      alt="Preview"
                    />
                  )}
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={field.name}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full gilroy-light px-4 focus: outline-none py-3 rounded-xl bg-white/30 text-white"
                  />
                  <input
                    type="text"
                    name="Description"
                    placeholder="Description"
                    value={field.desc}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full gilroy-light px-4 focus: outline-none py-3 rounded-xl bg-white/30 text-white"
                  />
                </div>

                <button
                  className="py-2 px-4 text-md text-white rounded-md flex justify-center items-center bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 gilroy-light"
                  type="button"
                  onClick={() => handleRemoveField(index)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <button
            className="text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-bold rounded-full text-xl px-10 py-2.5 text-center gilroy-bold w-full"
            type="button"
            onClick={handleAddField}
          >
            Add Field
          </button>
          <button
            className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-bold rounded-full text-xl px-10 py-2.5 text-center gilroy-bold w-full"
            type="button"
            onClick={submit}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default FormRepeater;
