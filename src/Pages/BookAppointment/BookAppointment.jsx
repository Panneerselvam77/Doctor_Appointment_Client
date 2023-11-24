import React, { useEffect, useState } from "react";
import Layout from "../../Component/Layout/layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { hideLoading, showLoading } from "../../Redux/feature/alertSlice";
import axios from "axios";
import { Button, Col, DatePicker, Row, TimePicker, message } from "antd";
import moment from "moment";

export default function BookAppointment() {
  // eslint-disable-next-line
  const [isAvailable, setIsAvailable] = useState(false);
  const navigate = useNavigate();
  const [date, setDate] = useState();
  const [time, setTime] = useState("");
  const { user } = useSelector((state) => state.user);
  const [doctor, setDoctor] = useState();
  const params = useParams();
  const dispatch = useDispatch();
  console.log(time);
  const onChange = (time, timeString) => {
    setIsAvailable(false);
    setTime(timeString);
  };

  /* Get Doctor Data */
  const getDoctorData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "http://localhost:8070/api/doctor/get-doctor-info-by-id",
        {
          doctorId: params.doctorId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        setDoctor(response.data.data);
      }
    } catch (error) {
      console.log(error);
      dispatch(hideLoading());
    }
  };
  /* Checking Time Availability  */
  /* const checkAvailability = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "http://localhost:8070/api/user/check-booking-avilability",
        {
          doctorId: params.doctorId,
          date: date,
          time: time,
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
        setIsAvailable(true);
      } else {
        console.log(response.data);
        message.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Error booking appointment");
      dispatch(hideLoading());
    }
  }; */

  /* Booking */
  const bookNow = async () => {
    setIsAvailable(false);
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "http://localhost:8070/api/user/book-appointment",
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctor,
          userInfo: user,
          date: date,
          time: time,
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
        navigate("/appoinments");
      }
    } catch (error) {
      message.error("Error booking appointment");
      dispatch(hideLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    getDoctorData();
    // eslint-disable-next-line
  }, []);
  return (
    <Layout>
      {doctor && (
        <div>
          {/* Doctor Name */}
          <h1 className="page-title">
            {doctor.firstName} {doctor.lastName}
          </h1>
          <h6>{doctor.specialization}</h6>
          <hr />
          <Row gutter={20} className="mt-5" align="middle">
            <Col span={8} sm={24} xs={24} lg={8}>
              <img
                src="https://thumbs.dreamstime.com/b/finger-press-book-now-button-booking-reservation-icon-online-149789867.jpg"
                alt=""
                width="100%"
                height="400"
              />
            </Col>
            <Col span={8} sm={24} xs={24} lg={8}>
              <h1 className="normal-text">
                <b>Timings :</b> {doctor.fromTime}:00 AM - {doctor.toTime}:00PM
              </h1>
              <p>
                <b>Phone Number : </b>
                {doctor.phoneNumber}
              </p>
              <p>
                <b>Address : </b>
                {doctor.address}
              </p>
              <p>
                <b>Fee per Visit : </b>
                {doctor.feePerConsultation}
              </p>
              <p>
                <b>Website : </b>
                {doctor.website}
              </p>
              <div className="d-flex flex-column pt-2 mt-2">
                <DatePicker
                  format="DD-MM-YYYY"
                  onChange={(value) => {
                    setDate(moment(value).format("DD-MM-YYYY"));
                    setIsAvailable(false);
                  }}
                />
                <TimePicker
                  use12Hours
                  format="h:mm a"
                  className="mt-3"
                  onChange={onChange}
                />

                <Button
                  className="primary-button mt-3 full-width-button"
                  onClick={bookNow}
                >
                  Book Now
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      )}
    </Layout>
  );
}
