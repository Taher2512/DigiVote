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
          if (address) {
            localStorage.setItem("walletAddress", address);
          }
          setRegistered(true);
          setSubmitting(false);
        });
      }
    });
  };

  return (
    <div className="h-full w-full flex justify-center items-center bg-slate-800">
      <div
        className="flex flex-col justify-center items-center w-1/3 h-screen"
        // onSubmit={handleSubmit}
      >
        {!registered ? (
          <>
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
            {uidExists === 1 && (
              <p className="self-start text-sm text-red-600 mt-2">
                This UID is already registered!
              </p>
            )}
            {uidExists === 0 && (
              <>
                <h1 className="self-start text-base font-medium text-white mt-4 mb-2">
                  Connect Wallet:
                </h1>
                <ConnectWallet theme={"light"} style={{ width: "100%" }} />
                {address && (
                  <p className="text-white mt-2 font-medium text-base">
                    Connected as: {address}
                  </p>
                )}
              </>
            )}

            {!verified && (
              <button
                // type="submit"
                onClick={handleVerify}
                className="w-full mt-4 py-2 px-3 bg-transparent text-white rounded-md border-2 hover:bg-slate-700 flex justify-center items-center"
              >
                {submitting && <Spinner size="sm" className="mr-2" />}
                {submitting ? "Verifying..." : "Verify Voter ID"}
              </button>
            )}

            {verified && (
              <button
                // type="submit"
                onClick={handleRegister}
                className="w-full mt-4 py-2 px-3 bg-transparent text-white rounded-md border-2 hover:bg-slate-700 flex justify-center items-center"
              >
                {submitting && <Spinner size="sm" className="mr-2" />}
                {submitting ? "Registering..." : "Register"}
              </button>
            )}
          </>
        ) : (
          <Link href="/vote">
            <button className="text-white border-2 rounded-md p-3 hover:bg-slate-700">
              Proceed To Voting {"-->"}
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Register;
