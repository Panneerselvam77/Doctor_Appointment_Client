import React from "react";
import "./register.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { message } from "antd";

// Validation Schema for Inputs
const loginValidationSchema = yup.object({
  email: yup.string().required("Please provide email id"),
  password: yup.string().required("Provide password"),
  name: yup.string().required("Please provide name"),
});

export default function Register() {
  const navigate = useNavigate();

  const { values, handleBlur, handleSubmit, touched, errors, handleChange } =
    useFormik({
      initialValues: { name: "", email: "", password: "" },
      validationSchema: loginValidationSchema,
      onSubmit: async (values) => {
        console.log(values);
        try {
          const response = await axios.post(
            `http://localhost:8070/api/user/register`,
            values
          );
          // console.log(response.data);
          if (response.data === true) {
            // localStorage.setItem("token");
            message.success("LoggedIn Successfull");
            console.log(response.data);
            navigate("/login");
          }
        } catch (error) {
          message.error(error.response.data.message);
          console.log(error);
        }
      },
    });
  return (
    <div className="Overall">
      <form onSubmit={handleSubmit}>
        <div className="container">
          <div className="Box">
            <h2>Register Here!!</h2>
            <p>Welcome to My Health Partner</p>

            {/* Name */}
            <TextField
              id="name"
              label="name"
              type="name"
              placeholder="Name"
              sx={{ width: 400 }}
              margin="dense"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.name && errors.name}
              helperText={touched.name && errors.name ? errors.name : ""}
            />
            {/* Email */}
            <TextField
              id="email"
              label="email"
              type="email"
              placeholder="Email"
              sx={{ width: 400 }}
              margin="dense"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && errors.email}
              helperText={touched.email && errors.email ? errors.email : ""}
            />
            {/* Password */}
            <TextField
              id="password"
              label="password"
              type="password"
              placeholder="Password"
              sx={{ width: 400 }}
              margin="dense"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password && errors.password}
              helperText={
                touched.password && errors.password ? errors.password : ""
              }
            />
            <Button
              className="login-btn"
              type="submit"
              sx={{ width: 400, marginTop: "10px" }}
              variant="contained"
              // onClick={handleSignin}
            >
              Signup
            </Button>

            <div className="alt-login">
              <div className="Sign-up" onClick={() => navigate("/login")}>
                Sign-in
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
