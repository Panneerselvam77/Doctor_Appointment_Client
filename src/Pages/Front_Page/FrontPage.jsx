import React, { useEffect } from "react";
import "./frontpage.css";
import axios from "axios";

export default function FrontPage() {
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
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);
  return <div>FrontPage</div>;
}
