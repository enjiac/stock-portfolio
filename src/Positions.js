import React, { useEffect, useState } from "react";
import { Table } from "antd";
import axios from "axios";

const Positions = () => {
  const dataSource = [
    {
      key: "1",
      ticker: "ROKU",
      numShares: 15,
    },
    {
      key: "2",
      ticker: "GOOS",
      numShares: 105,
    },
    {
      key: "3",
      ticker: "AMZN",
      numShares: 1,
    },
    {
      key: "4",
      ticker: "WB",
      numShares: 60,
    },
    {
      key: "5",
      ticker: "TCEHY",
      numShares: 30,
      price: 89.48,
      MarketValue: 2684.4,
      previousCloseValue: 2684.4,
    },
    {
      key: "6",
      ticker: "DAL",
      numShares: 20,
    },
    {
      key: "7",
      ticker: "UAL",
      numShares: 17,
    },
    {
      key: "8",
      ticker: "USD",
      MarketValue: 6712.27,
      previousCloseValue: 6712.27,
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

  const [tableSize, setTableSize] = useState(
    window.innerWidth < 500 ? "middle" : ""
  );

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(async () => {
    const result = await axios.get(
      `https://cloud.iexapis.com/stable/stock/market/batch?symbols=${batchSymbols}&types=quote&token=pk_fae69adeb4724a188d13877e90dbce7b`
    );
    window.addEventListener("resize", () => {
      if (window.innerWidth < 500) {
        setTableSize("middle");
      } else {
        setTableSize("");
      }
    });
    setData(result.data);
    setLoading(false);
    console.log(result.data);
  }, []);

  function setEverything(dSource, database) {
    dSource.forEach((position) => {
      if (position.ticker != "USD" && position.ticker != "TCEHY") {
        position.price = database[position.ticker].quote.latestPrice;
        position.previousClose = database[position.ticker].quote.previousClose;
        position.percentChange =
          ((+position.price / +position.previousClose - 1) * 100).toFixed(2) +
          "%";
        position.MarketValue = (position.price * position.numShares).toFixed(2);
        position.previousCloseValue = (
          +position.previousClose * position.numShares
        ).toFixed(2);
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
    var todaySum = dSource.reduce((currentTotalValue, position) => {
      return parseFloat(position.MarketValue) + currentTotalValue;
    }, 0);
    return todaySum.toFixed(2);
  }

  function getChange(dSource) {
    var previousCloseSum = dSource.reduce((currentTotal, position) => {
      return parseFloat(position.previousCloseValue) + currentTotal;
    }, 0);
    var change =
      (+(getSum(dSource) / +previousCloseSum - 1) * 100).toFixed(2) + "%";
    if (parseFloat(change) > 0) {
      change = "+" + change;
    }
    return change;
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
        size={tableSize}
      />
      <div className="total">
        <b>TOTAL: {getSum(dataSource)}</b>
        <b> ({getChange(dataSource)})</b>
      </div>
    </div>
  );
};

export default Positions;
