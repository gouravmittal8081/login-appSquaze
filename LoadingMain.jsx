import React, { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import "./src/App.css";
export default function LoadingMain(props) {
  const [open, setOpen] = useState(props.showLoading);
  const [opengif, setOpengif] = useState(props.showupi);

  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <div className="loader"></div>
    </Backdrop>
  );
}
