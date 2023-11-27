import React from "react";
import "./notification.css";
// import Layout from "../../Component/Layout/layout";
import { Tabs, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../../Redux/feature/alertSlice";
import axios from "axios";
import { setUser } from "../../Redux/feature/userSlice";
import UserLayout from "../../Component/Layout/UserLayout";

export default function Notification() {
  const { user } = useSelector((state) => state.user);
  // console.log(user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /* MArk All Function */
  const markAllAsSeen = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "http://localhost:8070/api/user/mark-all-notification-as-seen",
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        dispatch(setUser(response.data.data));
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error("Something went wrong");
    }
  };
  /* Delete Function */
  const deleteAll = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "http://localhost:8070/api/user/delete-all-notification",
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        dispatch(setUser(response.data.data));
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error("Something went wrong");
    }
  };

  return (
    <UserLayout>
      <div className="notification">
        <h1 className="page-title">Notifications</h1>
        <hr />

        <Tabs>
          <Tabs.TabPane tab="Unseen" key={0}>
            <div className="d-flex justify-content-end flex-direction-row">
              <h1 className="anchor" onClick={() => markAllAsSeen()}>
                Mark all as seen
              </h1>
            </div>

            {user?.unseenNotification.map((notification) => (
              <div
                className="card p-2 mt-2"
                onClick={() => navigate(notification.onClickPath)}
              >
                <div className="card-text">{notification.message}</div>
              </div>
            ))}
          </Tabs.TabPane>
          <Tabs.TabPane tab="seen" key={1}>
            <div className="d-flex justify-content-end">
              <h1 className="anchor" onClick={() => deleteAll()}>
                Delete all
              </h1>
            </div>
            {user?.seenNotification.map((notification) => (
              <div
                className="card p-2 mt-2"
                onClick={() => navigate(notification.onClickPath)}
              >
                <div className="card-text">{notification.message}</div>
              </div>
            ))}
          </Tabs.TabPane>
        </Tabs>
      </div>
    </UserLayout>
  );
}
