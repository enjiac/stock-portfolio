import React from "react";
import { render } from "react-dom";
import { Col, Row } from "antd";
import FormLayoutDemo from "./Form";
import Positions from "./Positions";

const App = () => {
  return (
    <div>
      <Row justify="center">
        <Col span={22}>
          <div className="padding"></div>
          <div className="boxed">
            <div className="div-block"></div>
            <div className="header">PORTFOLIO*</div>
          </div>
          <div className="padding"></div>
          <Positions />
          <div className="padding"></div>
          {/* <FormLayoutDemo /> */}
        </Col>
      </Row>
    </div>
  );
};

render(<App />, document.getElementById("root"));
