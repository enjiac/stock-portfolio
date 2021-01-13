import React from "react";
import FetchPrice from "./FetchPrice";

const LookUp = () => {
  return (
    <div>
      <p> Ticker: AAPL, Price: {FetchPrice("AAPL")[1]}</p>
    </div>
  );
};

export default LookUp;
