import React from 'react';

const Features = () => (
  <>
    <h1 className="gilroy-bold text-slate-300 text-6xl text-center font-bold mt-20 mb-20">
      Features
    </h1>
    <div className="h-96 relative grid grid-cols-3 px-40 gap-16 w-screen mb-40">
      <FeatureCard
        title="Secure and Transparent"
        description="This ensures that the data is immutable—once recorded, no single party can alter it. The transparency of blockchain also allows voters to verify that their votes were recorded accurately, enhancing trust in the electoral process."
        bgColor="bg-white/30"
        borderColor="border-white"
      />
      <FeatureCard
        title="Inclusive & Accessible"
        description="voting can be made accessible from any location. The system can be designed to operate on various devices, including smartphones, making it more inclusive and allowing a broader range of voters "
        bgColor="bg-blue-700/30"
        borderColor="border-blue-700"
      />
      <FeatureCard
        title="Reduced Costs and Efficiency"
        description="Decentralized systems can significantly reduce the costs associated with organizing and conducting elections. Additionally, blockchain can streamline the counting process and deliver faster, real-time results."
        bgColor="bg-white/30"
        borderColor="border-white"
      />
      <div className="circle2 absolute -top-20 z-0"></div>
      <div className="circle2 absolute top-0 right-20 z-0"></div>
      <div className="circle2 absolute -bottom-20 left-1/2 z-0"></div>
      <div className="circle2 absolute -top-20 z-0"></div>
    </div>
  </>
);

const FeatureCard = ({ title, description, bgColor, borderColor }) => (
  <div className={`${bgColor} backdrop-blur-sm rounded-xl flex flex-col items-center justify-center py-16 px-16 z-10 border-2 ${borderColor}`}>
    <h1 className="gilroy-bold text-white text-2xl mb-10">
      {title}
    </h1>
    <p className="gilroy-light text-white text-lg">
      {description}
    </p>
  </div>
);

export default Features;
