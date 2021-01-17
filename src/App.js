import React from "react";
import { render } from "react-dom";
//import "antd/dist/antd.css";
import { Table, Col, Row } from "antd";
import FormLayoutDemo from "./Form";
import Positions from "./Positions";

const App = () => {
  return (
    <div>
      <Row justify="center">
        <Col span={20}>
          <h1 className="header" justify="left">
            Portfolio
          </h1>
          <Positions />
          <FormLayoutDemo />
        </Col>
      </Row>
    </div>
  );
};

render(<App />, document.getElementById("root"));
