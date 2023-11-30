import React from "react";
import Button from "@mui/material/Button";

import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { message } from "antd";
import "./emailverify.css";
import { TextField } from "@mui/material";
import { URL } from "../../../GlobalUrl";

const loginValidationSchema = yup.object({
  email: yup.string().required("Please provide email id"),
});

export default function EmailVerify() {
  const navigate = useNavigate();

  const { values, handleBlur, handleSubmit, touched, errors, handleChange } =
    useFormik({
      initialValues: { email: "" },
      validationSchema: loginValidationSchema,
      onSubmit: async (values) => {
        try {
          const response = await axios.post(
            `${URL}/api/user/otp-generating`,
            values
          );

          if (response.data) {
            message.success("Email Verified Successfull");
            console.log(response.data);
            localStorage.setItem("token", response.data.token);
            navigate("/Otp-verify");
          } else {
            message.error(response.data.message);
            console.log(response.data.message);
          }
        } catch (error) {
          message.error(error);
          console.log(error);
        }
      },
    });

  return (
    <div className="Overall">
      <form onSubmit={handleSubmit}>
        <div className="container">
          <div className="Box">
            <h2>Verify your Email</h2>

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

            <Button
              className="login-btn"
              type="submit"
              sx={{ width: 400, marginTop: "10px" }}
              variant="contained"
            >
              verify email
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
