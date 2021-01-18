import React, { useEffect, useState } from "react";
import { Table } from "antd";
import axios from "axios";

const Positions = () => {
  const dataSource = [
    {
      key: "1",
      ticker: "SPOT",
      numShares: 25,
    },
    {
      key: "2",
      ticker: "FB",
      numShares: 25,
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
      ticker: "TCEHY",
      numShares: "15",
      price: 82.25,
      MarketValue: 1233.75,
    },
    {
      key: "8",
      ticker: "MNSO",
      numShares: 20,
    },
    {
      key: "9",
      ticker: "USD",
      MarketValue: 2392,
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
      title: "#",
      dataIndex: "numShares",
      key: "numShares",
    },
    {
      title: "Market Value",
      dataIndex: "MarketValue",
      key: "MarketValue",
    },
    {
      title: "%",
      dataIndex: "percentage",
      key: "percentage",
    },
  ];

  dataSource.forEach((position) => {
    if (position.ticker != "USD" && position.ticker != "TCEHY") {
      const [data, setData] = useState(0);
      useEffect(async () => {
        const result = await axios.get(
          `https://data.alpaca.markets/v1/last/stocks/${position.ticker}`,
          {
            headers: {
              "APCA-API-KEY-ID": "PKPGDVLWWRB8TR64AJXM",
              "APCA-API-SECRET-KEY": "zpAlXSlqRuTUIRdsQVropFrSBqUDerwMh7VJv43J",
            },
          }
        );
        setData(result.data.last.price);
      }, []);
      console.log(data);
      position.price = data;
      position.MarketValue = (position.price * position.numShares).toFixed(2);
    }
  });

  var sum = dataSource.reduce((currentTotalValue, position) => {
    return parseFloat(position.MarketValue) + currentTotalValue;
  }, 0);

  dataSource.forEach((position) => {
    position.percentage = parseFloat(
      (position.MarketValue / sum) * 100
    ).toFixed(2);
  });

  return (
    <>
      <Table
        className="table"
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        bordered
        loading={false}
        scroll={{ x: 500 }}
      />
      <div className="total">
        <b>TOTAL: {sum}</b>
      </div>
    </>
  );
};

export default Positions;
