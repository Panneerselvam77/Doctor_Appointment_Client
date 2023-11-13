import React, { useState } from "react";
import "./login.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { message } from "antd";

//  Login Credential Validation Schema
const loginValidationSchema = yup.object({
  email: yup.string().required("Please provide email id"),
  password: yup.string().required("Provide password"),
});

export default function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { values, handleBlur, handleSubmit, touched, errors, handleChange } =
    useFormik({
      initialValues: { email: "", password: "" },
      validationSchema: loginValidationSchema,
      onSubmit: async (values) => {
        try {
          setLoading(true);
          const response = await axios.post(
            `http://localhost:8070/api/user/login`,
            values
          );
          setLoading(false);

          if (response.data) {
            message.success("Signed In Successfull");
            console.log(response.data);

            navigate("/");
          } else {
            message.error(response.data.message);
            console.log(response.data.message);
          }
        } catch (error) {
          setLoading(false);
          message.error(error.response.data.message);
          console.log(error);
        }
      },
    });

  return (
    <div className="Overall">
      <div className="container">
        <div className="Box">
          <h2>LoginPage</h2>
          <p>Welcome to Login page</p>
          <div>
            <form onSubmit={handleSubmit}>
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
                component={"form"}
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
                component={"form"}
              />
              <Button
                className="login-btn"
                type="submit"
                sx={{ width: 400, marginTop: "10px" }}
                variant="contained"
              >
                Login
              </Button>
            </form>
          </div>
          {/* <p className="text">Forgot password</p> */}
          <div className="alt-login">
            <div
              className="forgot-password"
              sx={{ marginTop: "10px" }}
              onClick={() => navigate("/emailVerify")}
            >
              Forgot Password
            </div>
            <div
              className="register"
              sx={{ marginTop: "10px" }}
              onClick={() => navigate("/register")}
            >
              Register
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
