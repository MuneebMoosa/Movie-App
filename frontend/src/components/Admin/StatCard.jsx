import React from 'react';
const StatCard = ({ pill, content, info, gradient }) => {
  return (
    <div className="relative overflow-hidden rounded-xl p-6 text-white bg-white bg-opacity-10 backdrop-blur-md shadow-lg hover:shadow-2xl transition-shadow duration-300">
      <div className={`absolute top-2 right-2 px-3 py-1 text-xs font-medium rounded-full ${gradient} bg-opacity-20`}> {pill} </div>
      <h3 className="text-4xl font-bold">{content ?? '--'}</h3>
      <p className="mt-2 text-sm opacity-80">{info}</p>
    </div>
  );
};

export default StatCard;
