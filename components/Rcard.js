import React from "react";

const Rcard = () => {
  return (
    <>
      <div className="w-full flex flex-col gap-8 items-center mb-12">
        <Card
          name="Tarif Hussain"
          votes="5000"
          perc="100%"
          img="/images/candidate.svg"
        />
        <Card
          name="Tarif Hussain"
          votes="5000"
          perc="50%"
          img="/images/candidate.svg"
        />
        <Card
          name="Tarif Hussain"
          votes="5000"
          perc="50%"
          img="/images/candidate.svg"
        />
        <Card
          name="Tarif Hussain"
          votes="5000"
          perc="50%"
          img="/images/candidate.svg"
        />
        <Card
          name="Tarif Hussain"
          votes="5000"
          perc="50%"
          img="/images/candidate.svg"
        />
        <Card
          name="Tarif Hussain"
          votes="5000"
          perc="50%"
          img="/images/candidate.svg"
        />
        <Card
          name="Tarif Hussain"
          votes="5000"
          perc="50%"
          img="/images/candidate.svg"
        />
      </div>
    </>
  );
};

const Card = ({ img, name, perc, votes }) => (
  <div className="w-3/4 py-4 bg-white/30 rounded-full flex items-center px-16 justify-between">
    <span>
      <div className="w-24 h-24  rounded-full">
        <img src={img} className="w-full h-full rounded-full" />
      </div>
    </span>
    <span className="w-1/2">
      <div className="flex justify-between mb-1">
        <span className=" text-lg gilroy-light text-white   ">
          {name}
        </span>
        <span className=" text-lg gilroy-light text-white   ">
          {perc}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div className="bg-blue-600 h-2.5 rounded-full" style={{width : `${perc}`}}></div>
      </div>
    </span>
    <div className="w-40 h-16 flex items-center justify-center px-4 gilroy-light text-white text-2xl">
      <p>{votes} Votes</p>
    </div>
  </div>
);

export default Rcard;
