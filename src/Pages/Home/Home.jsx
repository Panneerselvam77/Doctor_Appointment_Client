import React, { useEffect, useState } from "react";
import "./home.css";
import axios from "axios";
import Layout from "../../Component/Layout/layout";
import { Col, Row } from "antd";
import DoctorComp from "../../Component/Doctor/DoctorComp";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../Redux/feature/alertSlice.jsx";

export default function Home() {
  const [doctors, setDoctors] = useState([]);
  const dispatch = useDispatch();
  const getData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get(
        "http://localhost:8070/api/user/get-all-approved-doctors",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        console.log(response.data);
        setDoctors(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);
  return (
    <Layout>
      <h1 className="page-title">Home Page</h1>
      <Row gutter={20}>
        {doctors.map((doctor, index) => (
          <div key={index} className="doclist pt-2">
            <Col span={8} xs={24} sm={24} lg={8}>
              <DoctorComp doctor={doctor} />
            </Col>
          </div>
        ))}
      </Row>
    </Layout>
  );
}
