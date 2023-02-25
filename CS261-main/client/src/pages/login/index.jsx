import { textAlign } from "@mui/system";
import React, { useState } from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import "./index.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { loginAction } from "../../actions/index";
import { useSelector, useDispatch } from "react-redux";

const LoginPage = () => {
  const navigate = useNavigate();
  const emailSelector = useSelector((state) => state.email);

  const dispatch = useDispatch();

  return (
    <body className="waveBg">
      <div className="login-container">
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email address")
              .required("Email is required"),
            password: Yup.string()
              .required("Password is required")
              .min(8, "Password must be at least 8 characters"),
          })}
          onSubmit={(values, { setSubmitting, setErrors }) => {
            fetch("http://localhost:5000/api/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(values),
            })
              .then((response) => {
                return response.json();
              })
              .then((data) => {
                console.log(data);
                if (data.loggedIn) {
                  dispatch(loginAction(data.email));
                  navigate("/admin");
                } else {
                  setErrors({
                    email: " ",
                    password: "Invalid email or password",
                  });
                }
              });

            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="loginForm">
              <h1 className="loginH1">Login</h1>
              <div className="loginForm-group">
                <label className="caption" htmlFor="email">
                  Email:
                </label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  className="loginForm-control"
                />
                <div class="error">
                  <ErrorMessage name="email" className="error" />
                </div>
              </div>
              <div className="loginForm-group">
                <label className="caption" htmlFor="password">
                  Password:
                </label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  className="loginForm-control"
                />
                <div class="error">
                  <ErrorMessage name="password" className="error" />
                </div>
                <div className="resetLabel">
                  <label className="resetLabel">Forgot password?</label>
                </div>
              </div>
              <button
                type="submit"
                className="submit-button"
                disabled={isSubmitting}
              >
                Sign In
              </button>
              <div>
                <label className="signupLabel">
                  No account? <a href="/signup">Sign Up</a>
                </label>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </body>
  );
};

export default LoginPage;
