import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import React, { useState } from "react";
import { app, db } from "../const/firebase/config";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Spinner } from "@nextui-org/react";
import Link from "next/link";

function Register() {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [uid, setUid] = useState("");
  const [uidExists, setUidExists] = useState(2);
  const [submitting, setSubmitting] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [verified, setVerified] = useState(false);

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

  const handleVerify = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const q = query(collection(db, "users"));
    const querySnapshot = await getDocs(q);
    let found = false;

    querySnapshot.forEach((doc) => {
      if (doc.data().uid === uid) {
        found = true;
      }
    });

    if (found) {
      setUidExists(1);
      setVerified(false);
    } else {
      setUidExists(0);
      setVerified(true);
    }

    setSubmitting(false);
  };

  const handleRegister = async (e) => {
    setSubmitting(true);
    e.preventDefault();
    const q = query(collection(db, "users"));
    getDocs(q).then(async (querySnapshot) => {
      if (uidExists === 1) {
        setSubmitting(false);
        return;
      } else {
        const storageRef = ref(storage, `images/${uid}`);
        const d = await uploadBytes(storageRef, image);
        console.log("Image uploaded successfully");

        await getDownloadURL(d.ref).then(async (url) => {
          let data = {
            uid: uid,
            address: address,
            verified: 0,
            imageUrl: url,
          };
          await addDoc(collection(db, "users"), data);
          setRegistered(true);
          setSubmitting(false);
        });
      }
    });
  };

  

  return (
    <div className="h-screen w-screen flex justify-center items-center overflow-hidden ">
      <div
        className="flex flex-col justify-center items-center w-1/3  border border-white border-4 rounded-xl p-8 bg-purple-700/15 backdrop-blur-xl"
        // onSubmit={handleSubmit}
      >
        {!registered ? (
          <>
            <h1 className="text-2xl font-medium text-white gilroy-bold">
              Upload photo and enter UID:
            </h1>
            <h1 className="self-start text-base font-medium text-white mt-6 mb-2 gilroy-light">
              Photo:
            </h1>
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-60 object-cover rounded-md mb-4 border"
              />
            )}
            <input
            accept="image/*"
            onChange={handleImageChange}
            class="block w-full  text-lg text-white rounded-lg cursor-pointer bg-white/10   focus:outline-none dark:placeholder-gray-400" id="file_input" type="file"/>


            <h1 className="self-start text-base font-medium text-white mt-4 mb-2 gilroy-light">
              UID:
            </h1>
            <input
              value={uid}
              onChange={handleUidChange}
              placeholder="eg : 012-345-6789"
              className="w-full py-2 px-4 rounded-md outline-none gilroy-light"
            />
            {uidExists === 1 && (
              <p className="self-start text-sm text-red-600 mt-2 gilory-light">
                This UID is already registered!
              </p>
            )}
            {uidExists === 0 && (
              <>
                <h1 className="self-start text-base font-medium text-white mt-4 mb-2 gilroy-light">
                  Connect Wallet:
                </h1>
                <ConnectWallet theme={"light"} style={{ width: "100%" }} className="bg-white"/>
                {address && (
                  <p className="text-white mt-2 font-medium text-base gilroy-light">
                    Connected as: {address}
                  </p>
                )}
              </>
            )}

            {!verified && (
              <button
                // type="submit"
                onClick={handleVerify}
                className="w-full mt-4 py-2 px-3 text-xl text-white rounded-md flex justify-center items-center bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 gilroy-light"
              >
                {submitting && <Spinner size="sm" className="mr-2" />}
                {submitting ? "Verifying..." : "Verify Voter ID"}
              </button>
            )}

            {verified && (
              <button
                // type="submit"
                onClick={handleRegister}
                className="w-full mt-4 py-2 px-3 text-white rounded-md flex justify-center items-center text-xl gilroy-light bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800"
              >
                {submitting && <Spinner size="sm" className="mr-2" />}
                {submitting ? "Registering..." : "Register"}
              </button>
            )}
          </>
        ) : (
          <Link href="/vote">
            <button className="text-white text-2xl rounded-md px-4 py-3  gilroy-light bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800">
              Proceed To Voting {"-->"}
            </button>
          </Link>
        )}
      </div>

      <div className="circle2 absolute top-0 right-20 z-0"></div>
      <div className="circle2 absolute bottom-20 left-0 z-0"></div>
      <div className="circle2 absolute left-20 -top-20 z-0"></div>
    </div>
  );
}

export default Register;
