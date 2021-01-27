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
    // {
    //   key: "7",
    //   ticker: "TCEHY",
    //   numShares: "15",
    //   price: 82.25,
    //   MarketValue: 1233.75,
    // },
    {
      key: "8",
      ticker: "MNSO",
      numShares: 20,
    },
    {
      key: "9",
      ticker: "USD",
      MarketValue: 3724.15,
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
      title: "%Change",
      dataIndex: "percentChange",
      key: "percentChange",
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

  var batchSymbols = "";
  dataSource.forEach((position) => {
    if (position.ticker != "USD" && position.ticker != "TCEHY") {
      if (batchSymbols != "") {
        batchSymbols = batchSymbols + "," + position.ticker;
      } else {
        batchSymbols += position.ticker;
      }
    }
  });

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(async () => {
    const result = await axios.get(
      `https://cloud.iexapis.com/stable/stock/market/batch?symbols=${batchSymbols}&types=quote&token=pk_fae69adeb4724a188d13877e90dbce7b`
    );
    setData(result.data);
    setLoading(false);
    console.log(result.data);
  }, []);

  function setEverything(dSource, database) {
    dSource.forEach((position) => {
      if (position.ticker != "USD" && position.ticker != "TCEHY") {
        position.price = database[position.ticker].quote.latestPrice;
        position.percentChange =
          (
            (+database[position.ticker].quote.latestPrice /
              +database[position.ticker].quote.previousClose -
              1) *
            100
          ).toFixed(2) + "%";
        position.MarketValue = (position.price * position.numShares).toFixed(2);
      }
    });

    var sum = dSource.reduce((currentTotalValue, position) => {
      return +position.MarketValue + currentTotalValue;
    }, 0);

    dSource.forEach((position) => {
      position.percentage = parseFloat(
        (position.MarketValue / sum) * 100
      ).toFixed(2);
    });
    return dSource;
  }

  function getSum(dSource) {
    var sum = dSource.reduce((currentTotalValue, position) => {
      return parseFloat(position.MarketValue) + currentTotalValue;
    }, 0);
    return sum;
  }

  if (loading) {
    return (
      <Table
        className="table"
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        bordered
        loading={true}
        scroll={{ x: 500 }}
      />
    );
  }
  return (
    <div>
      <Table
        className="table"
        dataSource={setEverything(dataSource, data)}
        columns={columns}
        pagination={false}
        bordered
        loading={false}
        scroll={{ x: 500 }}
      />
      <div className="total">
        <b>TOTAL: {getSum(dataSource)}</b>
      </div>
    </div>
  );
};

export default Positions;
