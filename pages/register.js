import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import React, { useState } from "react";
import { app, db } from "../const/firebase/config";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
function Register() {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [uid, setUid] = useState("");
  const storage = getStorage(app);
  const address = useAddress();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUidChange = (e) => {
    setUid(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Image:", image);
    console.log("UID:", uid);
    console.log("Address:", address);
    const q = query(collection(db, "users"));
    getDocs(q).then(async (querySnapshot) => {
      let f = 0;
      querySnapshot.forEach((doc) => {
        if (doc.data().uid === uid) {
          f = 1;
        }
      });
      if (f === 1) {
        alert("User already exists");
        return;
      } else {
        const storageRef = ref(storage, `images/${uid}`);
        const d = await uploadBytes(storageRef, image);
        console.log("Image uploaded successfully");
        //how to get image url
        //copilot tell me how to get image url
        await getDownloadURL(d.ref).then(async (url) => {
          let data = {
            uid: uid,
            address: address,
            verified: 0,
            imageUrl: url,
          };
          await addDoc(collection(db, "users"), data);
          alert("User registered successfully");
        });
      }
    });
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-slate-800">
      <form
        className="flex flex-col justify-center items-center w-1/3"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-medium text-white">
          Upload Photo And Enter UID:
        </h1>
        <h1 className="self-start text-base font-medium text-white mt-6 mb-2">
          Photo:
        </h1>
        {previewUrl && (
          <img
            src={previewUrl}
            alt="Preview"
            className="w-full h-60 object-cover rounded-md mb-4"
          />
        )}
        <input
          type="file"
          accept="image/*"
          className="py-2 px-3 rounded-md outline-none w-full text-white border-2 hover:bg-slate-700"
          onChange={handleImageChange}
        />
        <h1 className="self-start text-base font-medium text-white mt-4 mb-2">
          UID:
        </h1>
        <input
          value={uid}
          onChange={handleUidChange}
          placeholder="012-345-6789"
          className="w-full py-2 px-3 rounded-md outline-none"
        />
        <h1 className="self-start text-base font-medium text-white mt-4 mb-2">
          Connect Wallet:
        </h1>
        <ConnectWallet theme={"light"} style={{ width: "100%" }} />
        {address && (
          <p className="text-white mt-2 font-medium text-base">
            Connected as: {address}
          </p>
        )}
        <button
          type="submit"
          className="w-full mt-4 py-2 px-3 bg-transparent text-white rounded-md border-2 hover:bg-slate-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Register;
