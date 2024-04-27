import React, { useState } from "react";

function Register() {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [uid, setUid] = useState("");

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
    const formData = new FormData();
    formData.append("image", image);
    formData.append("uid", uid);

    try {
      const response = await fetch(
        "https://your-backend-url.com/api/register",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();

      console.log("Success:", data);
      alert("Registration successful!");
    } catch (error) {
      console.error("Error:", error);
      alert("Registration failed!");
    }
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
