import React from "react";
import "./applyDoctor.css";
import Layout from "../../../Component/Layout/layout";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../../../Redux/feature/alertSlice";
import DoctorForm from "../../../Component/DoctorForm/DoctorForm.jsx";
import { message } from "antd";
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
        {
          ...value,
          userId: user._id,
        },
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
      <DoctorForm onFinish={onFinish} />
    </Layout>
  );
}
