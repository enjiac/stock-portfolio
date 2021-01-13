import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import { FetchPrice } from "./FetchPrice.js";
import "antd/dist/antd.css";
import { Table } from "antd";

const App = () => {
  const dataSource = [
    {
      key: "1",
      ticker: "SPOT",
      numShares: 25,
    },
    {
      key: "2",
      ticker: "FB",
      numShares: 24,
    },
    {
      key: "3",
      ticker: "BRK.B",
      numShares: 25,
    },
    {
      key: "4",
      ticker: "AAPL",
      numShares: 16,
    },
    {
      key: "5",
      ticker: "RH",
      numShares: 3,
    },
    {
      key: "6",
      ticker: "MO",
      numShares: 35,
    },
    {
      key: "7",
      ticker: "MNSO",
      numShares: 20,
    },
    {
      key: "8",
      ticker: "USD",
      psize: 2637,
    },
  ];
  var sum = 0;
  dataSource.forEach(getPrice);
  dataSource.forEach(calculatePositionSize);
  dataSource.forEach(calculatePercentage);

  function getPrice(item) {
    if (parseInt(item.key) === dataSource.length) {
      console.log("a");
    } else {
      const [p, setP] = useState(0);
      useEffect(() => {
        FetchPrice(item.ticker).then((data) => {
          setP(data);
        });
      }, []);
      item.price = p;
    }
  }

  function calculatePositionSize(item) {
    var temp;
    if (parseInt(item.key) === dataSource.length) {
      console.log("b");
      temp = item.psize;
    } else {
      temp = (item.price * item.numShares).toFixed(2);
      item.psize = temp;
    }
    sum = sum + parseFloat(temp);
  }

  function calculatePercentage(item) {
    item.percentage = parseFloat((item.psize / sum) * 100).toFixed(2);
  }

  const columns = [
    {
      title: "Ticker",
      dataIndex: "ticker",
      key: "ticker",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "No. Shares",
      dataIndex: "numShares",
      key: "numShares",
    },
    {
      title: "Position Size in $",
      dataIndex: "psize",
      key: "psize",
    },
    {
      title: "% of total",
      dataIndex: "percentage",
      key: "percentage",
    },
  ];

  return (
    <div>
      <h1 className="header">Portfolio</h1>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        bordered
      />
      <p> Total: {sum.toFixed(2)}</p>
    </div>
  );
};

render(<App />, document.getElementById("root"));
