import React from "react";
import { render } from "react-dom";
import { Table, Col, Row } from "antd";
import FormLayoutDemo from "./Form";
import Positions from "./Positions";

const App = () => {
  return (
    <div>
      <Row justify="center">
        <Col span={20}>
          <div className="boxed">
            <h1 className="header" justify="left">
              <b>PORTFOLIO*</b>
            </h1>
          </div>
          <Positions />
          <FormLayoutDemo />
        </Col>
      </Row>
    </div>
  );
};

render(<App />, document.getElementById("root"));
