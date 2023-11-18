import React from "react";
import "./applyDoctor.css";
import Layout from "../../../Component/Layout/layout";
import { Button, Col, Form, Input, Row, TimePicker } from "antd";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../../../Redux/feature/alertSlice";
import axios from "axios";

export default function ApplyDoctor() {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const onFinish = async (value) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "http://localhost:8070/api/user/apply-doctor-account",
        { ...value, userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        console.log(response.data);

        // navigate("/home");
      } else {
        message.error(response.data.message);
        console.log(response.data);
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error(error);
      console.log(error);
    }
  };

  return (
    <Layout>
      <h1 className="page-title">Apply Doctor</h1>
      <hr />
      <Form layout="vertical" onFinish={onFinish}>
        <h1 className="card-title">Personal information</h1>
        <Row gutter={20}>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[{ required: true }]}
              required
            >
              <Input placeholder="First Name" />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[{ required: true }]}
              required
            >
              <Input placeholder="Last Name" />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              label="Phone Number"
              name="phoneNumber"
              rules={[{ required: true }]}
              required
            >
              <Input placeholder="Phone Number" />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              label="Website"
              name="website"
              rules={[{ required: true }]}
              required
            >
              <Input placeholder="Website" />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true }]}
              required
            >
              <Input placeholder="Address" />
            </Form.Item>
          </Col>
        </Row>
        <hr />
        <h1 className="card-title">Professional information</h1>
        <Row gutter={20}>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              label="Specialization"
              name="specialization"
              rules={[{ required: true }]}
              required
            >
              <Input placeholder="Specialization" />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              label="Experience"
              name="experience"
              rules={[{ required: true }]}
              required
            >
              <Input placeholder="Experience" type="Number" />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              label="Fee Per Hour Consultation"
              name="feePerConsultation"
              rules={[{ required: true }]}
              required
            >
              <Input placeholder="Fee Per Hour Consultation" type="Number" />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              label="Timings"
              name="timings"
              rules={[{ required: true }]}
              required
            >
              <TimePicker.RangePicker />
            </Form.Item>
          </Col>
        </Row>
        <div className="d-flex justify-content-end">
          <Button type="primary" htmlType="submit" style={{ width: 150 }}>
            SUBMIT
          </Button>
        </div>
      </Form>
    </Layout>
  );
}
