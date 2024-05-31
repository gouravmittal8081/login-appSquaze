import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { notifyError } from "../Utils";
import "react-toastify/dist/ReactToastify.css";
import SweetAlert from "react-bootstrap-sweetalert";
import LoadingMain from "../../LoadingMain";
import {
  Button,
  Form,
  Label,
  Input,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardHeader,
} from "reactstrap";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [mobilenumber, setMobilenumber] = useState("");
  const [mobilenumberError, setmobilenumberError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [otp, setOtp] = useState("");

  const [defaultAlert, setDefaultAlert] = useState(false);
  const [sweetInput, setSweetInput] = useState("");
  const [msgShowFor_sweetAlert, setMsgShowFor_sweetAlert] = useState("");
  const [loadingStatus, setLoadingStatus] = useState(false);

  const navigateTo = useNavigate();
  const mobileRegex = /^\d{10}$/;

  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-z0-9._%+-]+\.[a-zA-Z]{1,}/;
  const nameRegex = /^[a-zA-Z0-9 ]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*():|".<>/]).{6,20}$/;

  useEffect(() => {
    let value = sessionStorage.getItem("value");
    if (value == "true") {
      navigateTo("/dashboard");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name == "" || name == null) {
      setNameError("Required field");
    } else if (!nameRegex.test(name)) {
      setNameError("Name should be alphanumeric only");
    }

    if (mobilenumber == "" || mobilenumber == null) {
      setmobilenumberError("Required field");
    } else if (!mobileRegex.test(mobilenumber)) {
      setmobilenumberError("Invalid mobile number");
    }

    if (email == "" || email == null) {
      setEmailError("Required field");
    } else if (!emailRegex.test(email)) {
      setEmailError(" Invalid email format");
    }

    if (password == "" || password == null) {
      setPasswordError("Required field");
    } else if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must contain at least 6 & max 20 characters , including one uppercase letter, one lowercase letter, and one number."
      );
    }

    if (confirmPassword == "" || confirmPassword == null) {
      setConfirmPasswordError("Required field");
    } else if (!passwordRegex.test(confirmPassword)) {
      setConfirmPasswordError(
        "Confirm Password must contain at least 6 & max 20 characters , including one uppercase letter, one lowercase letter, and one number."
      );
    }

    if (password && confirmPassword) {
      if (password != confirmPassword) {
        setConfirmPasswordError("Password mismatch");
      }
    }

    if (
      nameRegex.test(name) &&
      emailRegex.test(email) &&
      mobileRegex.test(mobilenumber) &&
      password == confirmPassword &&
      passwordRegex.test(password) &&
      passwordRegex.test(confirmPassword)
    ) {
      setLoadingStatus(true);
      try {
        const URL =
          "https://developmentapi.videocrypt.in/data_model/users/send_verification_otp";

        const formData = new FormData();
        formData.append("mobile", mobilenumber);
        formData.append("resend", 0);
        formData.append("is_registration", 1);
        formData.append("c_code", +91);
        
        const headers = {
          headers: {
            Userid: 15523,
            Version: 1998,
            Lang: 1,
            Devicetype: 4,
            Appid: 427,
          },
        };
        const response = await axios.post(URL, formData, headers);
        setLoadingStatus(false);
        setDefaultAlert(true);
        console.log(response);
      } catch (error) {
        setLoadingStatus(false);
        setDefaultAlert(false);
        notifyError("Data not found");
      }
    }
  };

  const registeredApiCall = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("mobile", mobilenumber);
      formData.append("country", 91);
      formData.append("state", "Andhra Pradesh");
      formData.append("city", "Amadalavalasa");
      formData.append("device_id", 0);
      formData.append("is_social", 0);
      formData.append("device_token", 0);
      formData.append("otp", data);

      const response = await axios.post(
        "https://developmentapi.videocrypt.in/data_model/users/registration",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Userid: "",
            Version: 1998,
            Lang: 1,
            Devicetype: 4,
            Appid: 427,
          },
        }
      );
      console.log(response);
      setLoadingStatus(false);
      setDefaultAlert(false);

      if (response?.data?.status == "true") {
        navigateTo("/login");
        setSweetInput("");
      } else {
        notifyError(response?.data?.message);
      }
    } catch (error) {
      setLoadingStatus(false);
      setDefaultAlert(false);
      notifyError("Data not found");
    }
  };

  const nameOnchange = (e) => {
    setName(e.target.value);
    setNameError("");
  };
  const emailOnchange = (e) => {
    setEmail(e.target.value.replaceAll(/\s+/g, ""));
    setEmailError("");
  };
  const mobilenumberOnchange = (e) => {
    setMobilenumber(e.target.value.replaceAll(/\s+/g, ""));
    setmobilenumberError("");
  };
  const passwordOnchange = (e) => {
    setPassword(e.target.value.replaceAll(/\s+/g, ""));
    setPasswordError("");
  };
  const confirmPasswordOnchange = (e) => {
    setConfirmPassword(e.target.value.replaceAll(/\s+/g, ""));
    setConfirmPasswordError("");
  };

  const sweetOnchange = (e) => {
    setSweetInput(e.target.value.replaceAll(/\s+/g, ""));
    setMsgShowFor_sweetAlert("");
  };

  const onReceiveInput = () => {
    if (sweetInput == "" || sweetInput == null) {
      setMsgShowFor_sweetAlert("Please enter OTP");
    } else if (sweetInput.length == 6) {
      registeredApiCall(sweetInput);
      setDefaultAlert(false);
      setLoadingStatus(true);
    } else {
      setMsgShowFor_sweetAlert("Incorrect OTP");
    }
  };
  const forCancelBtn = () => {
    setLoadingStatus(false);
    setDefaultAlert(false);
    setMsgShowFor_sweetAlert("");
    setSweetInput("");
  };

  return (
    <div className="mainDiv">
      <Row className="justify-content-center align-items-center min-vh-100">
        <Col sm="10" md="4" lg="4">
          <Card className="cardStyle">
            <CardHeader className="border-bottom d-flex justify-content-center">
              <CardTitle style={{ fontWeight: "bold", fontSize: "20px" }}>
                SIGN UP ACCOUNT
              </CardTitle>
            </CardHeader>

            <CardBody className="pt-1">
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col sm="12" md="12" lg="12" className="mb-1 mt-2">
                    <Label for="name">Name</Label>
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      value={name}
                      onChange={nameOnchange}
                      autoFocus
                    />
                    <div className="errorMessage">{nameError}</div>
                  </Col>

                  <Col sm="12" md="12" lg="12" className="mb-1 mt-2">
                    <Label for="email">Email</Label>
                    <Input
                      type="text"
                      name="email"
                      id="email"
                      value={email}
                      onChange={emailOnchange}
                    />
                    <div className="errorMessage">{emailError}</div>
                  </Col>

                  <Col sm="12" md="12" lg="12" className="mb-1 mt-2">
                    <Label for="mobilenumber">Mobile Number</Label>
                    <Input
                      type="text"
                      name="mobilenumber"
                      id="mobilenumber"
                      value={mobilenumber}
                      onChange={mobilenumberOnchange}
                    />
                    <div className="errorMessage">{mobilenumberError}</div>
                  </Col>

                  <Col sm="12" md="12" lg="12" className="mb-1 mt-2">
                    <Label for="password">Password</Label>
                    <Input
                      type="password"
                      name="password"
                      id="password"
                      value={password}
                      onChange={passwordOnchange}
                    />
                    <div className="errorMessage">{passwordError}</div>
                  </Col>

                  <Col sm="12" md="12" lg="12" className="mb-1 mt-2">
                    <Label for="confirmPassword">Confirm Password</Label>
                    <Input
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={confirmPasswordOnchange}
                    />
                    <div className="errorMessage">{confirmPasswordError}</div>
                  </Col>

                  <Col sm="12" md="12" lg="12" className="mt-2">
                    <Button
                      type="submit"
                      className="glow-on-hover mt-2"
                      color="primary"
                      block
                    >
                      Submit
                    </Button>
                  </Col>
                </Row>
              </Form>
              <div
                className="d-flex justify-content-end mt-3"
                style={{ fontSize: "12px" }}
              >
                Already have an account?{" "}
                <Link className="ms-2" to="/">
                  Login here
                </Link>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <ToastContainer></ToastContainer>

      <SweetAlert show={defaultAlert} showConfirm={false}>
        <div>
          <h2>Enter your OTP</h2> <br />
          <Input
            autoFocus
            autoComplete="new-password"
            value={sweetInput}
            onChange={sweetOnchange}
            htmlFor="basic-default-password"
          />
          <div className="errorMessage mb-3 mt-3">{msgShowFor_sweetAlert}</div>
          <div className="d-flex justify-content-center">
            <Button onClick={onReceiveInput} color="primary" caret>
              Submit
            </Button>
            <div style={{ marginLeft: "21px" }}></div>
            <Button onClick={forCancelBtn} color="danger" caret>
              Cancel
            </Button>
          </div>
        </div>{" "}
      </SweetAlert>
      {loadingStatus && <LoadingMain showLoading={loadingStatus} />}
    </div>
  );
};

export default SignupPage;
