import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { notifyError, notifySuccess } from "../Utils";
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
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [mobilenumber, setMobilenumber] = useState("");
  const [mobilenumberError, setmobilenumberError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loadingStatus, setLoadingStatus] = useState(false);

  const navigateTo = useNavigate();

  useEffect(() => {
    let value = sessionStorage.getItem("value");
    if (value == "true") {
      navigateTo("/dashboard");
    }
  }, []);

  const mobileRegex = /^\d{10}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (mobilenumber == "" || mobilenumber == null) {
      setmobilenumberError("Empty mobile number");
    } else if (!mobileRegex.test(mobilenumber)) {
      setmobilenumberError("Invalid mobile number");
    }

    if (password == "" || password == null) {
      setPasswordError("Empty password ");
    } else if (password.length < 6) {
      setPasswordError("Invalid password");
    }

    if (password.length >= 6 && mobileRegex.test(mobilenumber)) {
      setLoadingStatus(true);
      try {
        const URL =
          "https://developmentapi.videocrypt.in/data_model/users/login_auth";

        const formData = new FormData();
        formData.append("device_id", 0);
        formData.append("mobile", mobilenumber);
        formData.append("is_social", 0);
        formData.append("c_code", 91);
        formData.append("password", password);

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
        sessionStorage.setItem("value", "true");
        setLoadingStatus(false);
        console.log(response);

        if (response.data.status === true) {
          notifySuccess("Valid mobile number and password");
          setMobilenumber("");
          setmobilenumberError("");
          setPassword("");
          setPasswordError("");
          navigateTo("/dashboard");
        } else {
          notifyError(response.data.message);
        }
      } catch (error) {
        setLoadingStatus(false);
        notifyError("Invalid mobile number or password");
      }
    }
  };

  const mobilenumberOnchange = (e) => {
    setMobilenumber(e.target.value.replaceAll(/\s+/g, ""));
    setmobilenumberError("");
  };

  const passwordOnchange = (e) => {
    setPassword(e.target.value.replaceAll(/\s+/g, ""));
    setPasswordError("");
  };

  return (
    <div className="mainDiv">
      <Row className="justify-content-center align-items-center min-vh-100">
        <Col sm="10" md="4" lg="4">
          <Card className="cardStyle">
            <CardHeader className="border-bottom d-flex justify-content-center">
              <CardTitle style={{ fontWeight: "bold", fontSize: "20px" }}>
                ACCOUNT LOGIN
              </CardTitle>
            </CardHeader>

            <CardBody className="pt-1">
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col sm="12" md="12" lg="12" className="mb-1 mt-2">
                    <Label for="mobilenumber">Mobile Number</Label>
                    <Input
                      autoFocus
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
                      className="input-group-merge"
                      id="new-password"
                      value={password}
                      onChange={passwordOnchange}
                    />

                    <div className="errorMessage">{passwordError}</div>
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
                Don't have an account?{" "}
                <Link className="ms-2" to="/signup">
                  Sign up here
                </Link>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <ToastContainer></ToastContainer>
      {loadingStatus && <LoadingMain showLoading={loadingStatus} />}
    </div>
  );
};

export default LoginPage;
