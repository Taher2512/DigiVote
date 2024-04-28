"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
// import * as fcl from "@onflow/fcl";
// import "../../../cadence/config";
// import { collection, query, where, getDocs } from "firebase/firestore";
// import { app, db } from "../../../firebase/config.js";
function Navbar() {
  const [user, setUser] = useState("");
  const router = useRouter();
  const [teacher, setTeacher] = useState();

  return (
    <>
      <div className="absolute z-10 left-1/4 mt-5 px-8 py-5 bg-white/30 w-1/2 rounded-xl backdrop-blur-sm flex items-center justify-between">
        <a href="#" className="text-white text-3xl font-extrabold ">
          DigiVote.
        </a>

        <span className="flex items-center justify-center gap-6">
          <Link href={"/register"}>
          <button
            type="button"
            
            className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
          >
            Register
          </button>
          </Link>
          <Link href={"/vote"}>
          <button
            type="button"

            className="text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-8 py-2.5 text-center inline-flex items-center"
          >
            Vote
          </button>
          </Link>

          
        </span>
      </div>
    </>
  );
}

export default Navbar;
