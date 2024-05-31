import React, { useEffect, useState } from "react";
import { CheckCircle } from "react-feather";
import { useNavigate } from "react-router-dom";
import { Row, Col, Card, Button, CardTitle, CardHeader } from "reactstrap";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { notifyError, notifySuccess } from "../Utils";
import LoadingMain from "../../LoadingMain";
const Dashboard = () => {
  const [loadingStatus, setLoadingStatus] = useState(false);

  const navigateTo = useNavigate();

  useEffect(() => {
    let value = sessionStorage.getItem("value");
    if (value != "true") {
      navigateTo("/");
    }
  }, []);

  const handleLogout = async (e) => {
    e.preventDefault();

    setLoadingStatus(true);
    try {
      const URL =
        "https://developmentapi.videocrypt.in/data_model/users/logout";
      const headers = {
        headers: {
          Userid: 15523,
          Version: 1998,
          Lang: 1,
          Devicetype: 4,
          Appid: 427,
        },
      };
      const response = await axios.post(URL, {}, headers);
      setLoadingStatus(false);
      console.log(response);
      sessionStorage.setItem("value", "false");
      navigateTo("/");
    } catch (error) {
      setLoadingStatus(false);
      notifyError("Data not found");
    }
  };

  return (
    <div>
      <Row className="justify-content-center align-items-center min-vh-100">
        <Col sm="10" md="4" lg="4">
          <Card>
            <div className="d-flex justify-content-end me-2 mt-2 mb-2">
              <Button
                color="secondary"
                className="mt-2 me-2 mb-2"
                outline
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
            <CardHeader className="border-bottom d-flex justify-content-center">
              <div
                style={{
                  borderRadius: "50%",
                  background: "#d9d7d2",
                  padding: "20px",
                }}
              >
                <CheckCircle size={91} style={{ color: "green" }} />
              </div>
            </CardHeader>
            <CardTitle className="text-center mt-3">
              <div
                style={{
                  fontWeight: "bold",
                  fontSize: "34px",
                  color: "green",
                }}
              >
                You have Successfully Logged In
              </div>
            </CardTitle>
          </Card>
        </Col>
      </Row>

      <ToastContainer></ToastContainer>
      {loadingStatus && <LoadingMain showLoading={loadingStatus} />}
    </div>
  );
};

export default Dashboard;
