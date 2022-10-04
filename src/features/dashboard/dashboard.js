import React, { useState } from "react";
import "./dashboard.css";
import { Box, Card, CardContent, CardMedia, IconButton } from "@mui/material";
import { Button, Drawer, Typography } from "antd";
import AddLocationForm from "../forms/AddLocationForm";
import addLogoImage from "../../assets/images/iconadd.png";
import { CloseCircleOutlined } from "@ant-design/icons";
import dashboard_1 from "./dashboard_1.svg"
const userInfo = JSON.parse(localStorage.getItem("userInfo"));
const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
   <Box
        style={{
          marginTop: "10px",
          flexWrap: "wrap",
        }}
      >

   <div className="dashboard-headcard" style={{height: "450px"}}>
          <div>
            <p
              className="dashboard-headTitle"
              style={{ fontSize: "16px", fontWeight: "700" }}
            >
              Hi {userInfo?.first_name || userInfo?.username}, Welcome to
              PlanSpace.
            </p>
            <p className="dashboard-description">
              We are glad to have you onbard. Here is your quick start guide to
              setup the system
            </p>
          </div>
          <div className="flex-container">
          <div> <img src={dashboard_1}/><span style={{marginLeft: "15px"}}> Finish Company Details </span></div>
          <div> <img src={dashboard_1}/><span style={{marginLeft: "15px"}}> Add Location </span></div>
          <div><img src={dashboard_1}/> <span style={{marginLeft: "15px"}}> Add Pakages </span></div>
          <div><img src={dashboard_1}/> <span style={{marginLeft: "15px"}}> Add Add-On Pakages </span></div>

             </div>
        </div>

        </Box>
      {/* <div className="img-dashboard"></div> */}
      <Button
        style={{
          width: "250px",
          height: "207px",
          color: "gray",
          border: "none",
          marginTop: "30px",
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "4px",
          fontWeight: "bold",
        }}
        icon={<img src={addLogoImage} />}
        onClick={handleClickOpen}
      >
        <Typography style={{ marginTop: "12px" }}>Add New Venue</Typography>
      </Button>

      <Drawer
        title="New Location Name"
        width={window.innerWidth > 1900 ? 1250 : 900}
        onClose={handleClose}
        visible={open}
        closable={false}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <IconButton
            edge="start"
            sx={{ color: "white" }}
            onClick={handleClose}
            aria-label="close"
          >
            <CloseCircleOutlined />
          </IconButton>
        }
      >
        <AddLocationForm
          setOpen={setOpen}
          //   sendChildToParent={gettingDataFromChild}
        />
      </Drawer>
    </>
  );
};

export default Dashboard;
