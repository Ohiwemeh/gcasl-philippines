import React from 'react'

const PromoBanner = () => {
  return (
    <div className="mx-4 mt-4 mb-6">
      <h3 className="text-blue-800 font-semibold text-lg mb-2">Mega Deals</h3>

      <a
        href="https://www.disneyplus.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="https://www.wordstream.com/wp-content/uploads/2021/07/banner-ads-examples-ncino.jpg"
          alt="Disney+ Promo"
          className="w-full rounded-lg shadow-md hover:scale-[1.01] transition-transform duration-300"
        />
      </a>
    </div>
  );
};

export default PromoBanner;

