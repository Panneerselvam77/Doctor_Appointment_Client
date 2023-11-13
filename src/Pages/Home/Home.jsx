import React from "react";
import "./home.css";
import Lottie from "lottie-react";
import { Link, useNavigate } from "react-router-dom";
import Doctor_Anime from "../../Asset/Animation - Doctor.json";
//
//
//
//

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="home">
      <div className="row justify-content-left">
        <div className="col-md-5 mx-5 pl-5">
          <h2 className="mb-5 ">My Health partner</h2>
          <p>
            At <strong> My Health partner</strong>, we understand that your
            health is your most valuable asset. Our team of experienced and
            dedicated healthcare professionals is here to help you achieve and
            maintain your best possible health. We also have a strong focus on
            patient education, so you can make informed decisions about your
            health. We are committed to making healthcare affordable and
            accessible for everyone.
          </p>
          <div className="d-flex justify-content-between align-items-center">
            <Link
              to="/register"
              style={{ color: "black", textDecoration: "underline" }}
            >
              {" "}
              Don't Have Account ?, Click Here To Register
            </Link>
            or
            <button
              style={{ border: "none" }}
              className="primary"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>
        </div>
      </div>
      <div className="row row1">
        <div className="col-md-5">
          <Lottie className="lottie" animationData={Doctor_Anime} loop={true} />
        </div>
      </div>
    </div>
  );
}
