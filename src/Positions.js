import React, { useEffect, useState } from "react";
import { FetchPrice } from "./FetchPrice.js";
import { Table } from "antd";

const Positions = () => {
  var sum = 0;

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

  for (let i = 0; i < dataSource.length; i++) {
    var temp = 0;
    if (i === dataSource.length - 1) {
      console.log("a");
      temp = dataSource[i].psize;
    } else {
      const [p, setP] = useState(0);
      useEffect(() => {
        FetchPrice(dataSource[i].ticker).then((price) => {
          setP(price);
          console.log("b");
        });
      }, []);
      console.log("c");
      dataSource[i].price = p;
      temp = (dataSource[i].price * dataSource[i].numShares).toFixed(2);
      dataSource[i].psize = temp;
    }
    sum += parseFloat(temp);
  }
  console.log(sum);
  dataSource.forEach((item) => {
    item.percentage = parseFloat((item.psize / sum) * 100).toFixed(2);
  });

  return (
    <>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        bordered
      />
      <h3 className="total"> Total: {sum}</h3>
    </>
  );
};

export default Positions;
