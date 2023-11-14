import React, { useEffect } from "react";
import "./home.css";
import axios from "axios";
import Layout from "../../Component/Layout/layout";

export default function Home() {
  const getData = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8070/api/user/get-user-info-by-id",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      // console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);
  return (
    <Layout>
      <h1>Home Page</h1>
    </Layout>
  );
}
