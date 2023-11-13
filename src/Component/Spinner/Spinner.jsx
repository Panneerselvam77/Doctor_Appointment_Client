import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import "./spinner.css";

export default function Spinner() {
  return (
    <div className="spinner">
      <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />;
    </div>
  );
}
