import React, { useEffect, useState } from "react";
import Layout from "../../Component/Layout/layout";
import axios from "axios";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../Redux/feature/alertSlice";
import { Table } from "antd";
import moment from "moment";

export default function UserList() {
  const [user, setUsers] = useState();
  const dispatch = useDispatch();

  const getUserData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get(
        "http://localhost:8070/api/admin/get-all-users",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        setUsers(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };
  useEffect(() => {
    getUserData();
    // eslint-disable-next-line
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (text, record) => moment(record.createdAt).format("DD-MM-YYYY"),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => {
        return (
          <div className="d-flex">
            <h1 className="anchor">Block</h1>
          </div>
        );
      },
    },
  ];
  return (
    <Layout>
      <h1 className="page-header">User List</h1>
      <hr />
      <Table columns={columns} dataSource={user} />
    </Layout>
  );
}
