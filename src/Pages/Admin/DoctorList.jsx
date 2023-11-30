import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../Redux/feature/alertSlice";
import { Table } from "antd";
import moment from "moment";
import Layout from "../../Component/Layout/layout";
import { URL } from "../../GlobalUrl";

export default function DoctorList() {
  const [doctors, setDoctors] = useState();
  const dispatch = useDispatch();

  /* Get all Doctor Data */
  const getDoctorsData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get(`${URL}/api/admin/get-all-doctors`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      dispatch(hideLoading());
      if (response.data.success) {
        setDoctors(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  /* Change Doctor Status */
  const changeDoctorStatus = async (record, status) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        `${URL}/api/admin/change-doctor-account-status`,
        { doctorId: record._id, userId: record.userId, status: status },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        getDoctorsData();
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    getDoctorsData();
    // eslint-disable-next-line
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <h1 className="normal-text">
          {record.firstName} {record.lastName}
        </h1>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (text, record) => moment(record.createdAt).format("DD-MM-YYYY"),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => {
        return (
          <div className="d-flex">
            {record.status === "pending" && (
              <h1
                className="anchor"
                onClick={() => changeDoctorStatus(record, "approved")}
              >
                Approve
              </h1>
            )}
            {record.status === "approved" && (
              <h1
                className="anchor"
                onClick={() => changeDoctorStatus(record, "blocked")}
              >
                Block
              </h1>
            )}
          </div>
        );
      },
    },
  ];
  return (
    <Layout>
      <div style={{ width: "90%" }}>
        <h1 className="page-title d-flex justify-content-center mt-3">
          Doctors List
        </h1>
        <hr />
        <Table columns={columns} dataSource={doctors} />
      </div>
    </Layout>
  );
}
