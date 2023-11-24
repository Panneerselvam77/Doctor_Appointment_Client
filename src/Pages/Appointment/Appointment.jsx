import React, { useEffect, useState } from "react";
import Layout from "../../Component/Layout/layout.jsx";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../Redux/feature/alertSlice.jsx";
import axios from "axios";
import moment from "moment";
import { Table } from "antd";
import { useNavigate } from "react-router-dom";

export default function DoctorAppointment() {
  const [appointments, setAppointmnets] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* Get Doctor Appointment Data */
  const getAppointmentData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get(
        "http://localhost:8070/api/user/get-appointments-by-user-id",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        console.log(response.data);
        setAppointmnets(response.data.data);
        navigate("/appoinments");
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  const columns = [
    {
      title: "Doctor",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.doctorInfo.firstName} {record.doctorInfo.lastName}
        </span>
      ),
    },
    {
      title: "specialist",
      dataIndex: "specialization",
      render: (text, record) => <span>{record.doctorInfo.specialization}</span>,
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      render: (text, record) => <span>{record.doctorInfo.phoneNumber}</span>,
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      render: (text, record) => (
        <span>{moment(record.date).format("DD-MM-YYYY")}</span>
      ),
    },
    {
      title: "Time",
      dataIndex: "createdAt",
      render: (text, record) => <span>{record.time}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  ];

  useEffect(() => {
    getAppointmentData();
    // eslint-disable-next-line
  }, []);
  return (
    <Layout>
      <h1 className="page-title"> Doctor Appointments</h1>
      <hr />
      <Table columns={columns} dataSource={appointments} />
    </Layout>
  );
}
