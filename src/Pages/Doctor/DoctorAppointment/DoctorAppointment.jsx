import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import moment from "moment";
import { Table, message } from "antd";
import {
  hideLoading,
  showLoading,
} from "../../../Redux/feature/alertSlice.jsx";
import Layout from "../../../Component/Layout/layout.jsx";
import { URL } from "../../../GlobalUrl.js";

function DoctorAppointments() {
  const [appointments, setAppointments] = useState([]);
  const dispatch = useDispatch();

  /* Get All Appointment Data */
  const getAppointmentsData = async () => {
    try {
      dispatch(showLoading());
      const resposne = await axios.get(
        `${URL}/api/doctor/get-appointments-by-doctor-id`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (resposne.data.success) {
        setAppointments(resposne.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  /* Change the Appointment Status */
  const changeAppointmentStatus = async (record, status) => {
    try {
      dispatch(showLoading());
      const resposne = await axios.post(
        `${URL}/api/doctor/change-appointment-status`,
        { appointmentId: record._id, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (resposne.data.success) {
        message.success(resposne.data.message);
        getAppointmentsData();
      }
    } catch (error) {
      message.error("Error changing doctor account status");
      dispatch(hideLoading());
    }
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Patient",
      dataIndex: "name",
      render: (text, record) => <span>{record.userInfo.name}</span>,
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      render: (text, record) => <span>{record.doctorInfo.phoneNumber}</span>,
    },
    {
      title: "Date & Time",
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
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" && (
            <div className="d-flex">
              <h1
                className="anchor px-2"
                onClick={() => changeAppointmentStatus(record, "approved")}
              >
                Approve
              </h1>
              <h1
                className="anchor"
                onClick={() => changeAppointmentStatus(record, "rejected")}
              >
                Reject
              </h1>
            </div>
          )}
        </div>
      ),
    },
  ];

  useEffect(() => {
    getAppointmentsData();
    // eslint-disable-next-line
  }, []);
  return (
    <Layout>
      <div className="">
        <h1 className="page-title"> Patients Appointments</h1>
        <hr />
        <Table columns={columns} dataSource={appointments} />
      </div>
    </Layout>
  );
}

export default DoctorAppointments;
