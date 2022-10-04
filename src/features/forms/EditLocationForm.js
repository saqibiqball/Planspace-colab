import React, { useState, useEffect } from "react";
import { Upload, message } from "antd";
import LoadingButton from "@mui/lab/LoadingButton";
import { TextField, Button, Paper, Box } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import { ReactComponent as spaceIcon } from "./space.svg";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import space from "./space.svg";
import Amenitities from "./Amentities.svg";
import cermony from "./cermony.svg";
import FormControlLabel from "@mui/material/FormControlLabel";
import addLogoImage from "../../assets/images/iconadd.png";
import SearchIcon from "@mui/icons-material/Search";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import AddRoomCard from "./AddRoomCard";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import MuiAlert from "@mui/material/Alert";
import EditRoomCard from "./EditRoomCard";
import Autocomplete from "@mui/material/Autocomplete";
import PhoneInput from "../../common/phoneNumber";
import ZipCodeInput from "../../common/zipcodeInput";
import { toast } from "react-toastify";
import clarityimageline from "../../assets/images/clarity_image-line.png";

import { useFormik } from "formik";
import * as Yup from "yup";
import Location from "../../models/Locations/Location";
import Room from "../../models/Locations/Room";
import "./AddLocationForm.css";
import UpdateRoomForm from "./UpdateRoomForm";
import AddRoomForm from "./AddRoomForm";

const EditLocationForm = ({
  company,
  handleClose,
  editLocVal,
  popUp,
  callback,
}) => {
  const [openAddRoom, setOpenAddRoom] = useState(false);
  const [openEditRoom, setOpenEditRoom] = useState(false);
  const [roomData, setRoomData] = useState({});
  const [copyIsChecked, setCopyIsChecked] = useState();
  const innerWidth = window.innerWidth;
  const leftInputWidth = innerWidth > 1900 ? "98ch" : "70ch";
  const [file, setFile] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const initialRoomValues = editLocVal.rooms ? editLocVal.rooms : [];

  const [roomValues, setRoomValues] = useState([]);
  const [updatedRoomValues, setUpdatedRoomValues] = useState([]);

  const dummyRequest = async ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const props = {
    name: "file",
    multiple: false,
    customRequest: dummyRequest,

    beforeUpload(file, fileList) {
      setFile(file);
    },
    onChange(info) {
      const { status } = info.file;

      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
        setFile(info.file.originFileObj);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: editLocVal.id ? editLocVal.id : "",
      name: editLocVal.name ? editLocVal.name : "",
      address_line1: editLocVal.address_line1 ? editLocVal.address_line1 : "",
      address_line2: editLocVal.address_line2 ? editLocVal.address_line2 : "",
      city: editLocVal.zip_code.city ? editLocVal.zip_code.city : "",
      state: editLocVal.zip_code.state ? editLocVal.zip_code.state : "",
      zip_code: editLocVal.zip_code.zip_code
        ? editLocVal.zip_code.zip_code
        : "",
      phone: editLocVal.phone ? editLocVal.phone : "",
      email: editLocVal.email ? editLocVal.email : "",
      logo: "",
    },
    validator: () => {},
    onSubmit: (values) => {
      setLoading(true);
      let formData = new FormData();
      formData.append("name", values.name);
      formData.append("address_line1", values.address_line1);
      formData.append("address_line2", values.address_line2);
      formData.append("city", values.city);
      formData.append("state", values.state);
      formData.append("zip_code", values.zip_code);
      formData.append("phone", values.phone);
      formData.append("email", values.email);
      let rooms = [];
      formData.append("rooms", roomValues);

      if (file) {
        formData.append("image", file ? file : new File([], ""));
      }
      Location.UpdateLocation(editLocVal.id, formData)
        .then((result) => {
          if (roomValues.length > 0) {
            roomValues.map((room) => {
              let roomData = new FormData();
              roomData.append("name", room.name);
              roomData.append("base_price", room.base_price);
              roomData.append("max_guests", room.max_guests);
              roomData.append("image", room.image);

              roomData.append(
                "spaces",
                JSON.stringify(room.options.spaces ? room.options.spaces : [])
              );
              roomData.append(
                "amenities",
                JSON.stringify(
                  room.options.amenities ? room.options.amenities : []
                )
              );
              roomData.append(
                "ceremony_types",
                JSON.stringify(
                  room.options.ceremony_types ? room.options.ceremony_types : []
                )
              );
              Room.CreateRoom(roomData);
              console.log("rooms", rooms);
            });
          }

          if (updatedRoomValues.length > 0) {
            updatedRoomValues.map((room) => {
              let roomData = new FormData();
              roomData.append("name", room.name);
              roomData.append("base_price", room.base_price);
              roomData.append("max_guests", room.max_guests);
              roomData.append("image", room.image);

              roomData.append(
                "spaces",
                JSON.stringify(room.options.spaces ? room.options.spaces : [])
              );
              roomData.append(
                "amenities",
                JSON.stringify(
                  room.options.amenities ? room.options.amenities : []
                )
              );
              roomData.append(
                "ceremony_types",
                JSON.stringify(
                  room.options.ceremony_types ? room.options.ceremony_types : []
                )
              );
              Room.UpdateRoom(room.id, roomData);

              console.log("rooms", rooms);
            });
          }

          setTimeout(() => {
            setLoading(false);
            formik.handleReset();
            popUp(result.message);
            handleClose();
            callback();
            setCopyIsChecked(false);
          }, 3000);

          // roomValues.map((room) => {
          //   let roomData = new FormData()
          //   roomData.append("name", room.name)
          //   roomData.append("base_price", room.base_price)
          //   roomData.append("max_guests", room.max_guests)
          //   roomData.append("image", room.image)
          //   rooms.push(roomData)
          //   console.log("rooms", rooms)
          // })
        })
        .catch((e) => {
          console.log("E", e);
          setLoading(false);
          formik.setSubmitting(false);
        });
      // sendChildToParent(formValues);
    },
  });

  const handleCheckBox = (event) => {
    console.log("event", event);
    setCopyIsChecked(event.target.checked);
    if (event.target.checked && company) {
      formik.values.address_line1 = company.address_line1;
      formik.values.address_line2 = company.address_line2;
      formik.values.city = company.city;
      formik.values.state = company.state;
      formik.values.zip_code = company.zip_code;
      formik.values.phone = company.phone;
      formik.values.email = company.email;
    } else {
      formik.values.address_line1 = editLocVal?.address_line1;
      formik.values.address_line2 = editLocVal?.address_line2;
      formik.values.city = editLocVal?.city;
      formik.values.state = editLocVal?.state;
      formik.values.zip_code = editLocVal?.zip_code?.zip_code;
      formik.values.phone = editLocVal?.phone;
      formik.values.email = editLocVal?.email;
    }
  };

  const theme = createTheme({
    components: {
      MuiFormLabel: {
        styleOverrides: {
          asterisk: { color: "red" },
        },
      },
    },
  });

  const handleEditRoom = (room) => {
    setRoomData(room);
    setOpenEditRoom(true);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <form onSubmit={formik.handleSubmit}>
          <Box
            sx={{
              "& .MuiTextField-root": { width: "50ch" },
            }}
          >
            <FormControlLabel
              sx={{}}
              control={
                <Checkbox onChange={handleCheckBox} checked={copyIsChecked} />
              }
              label="Copy address & contacts from company profile"
            />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 265px" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                  paddingRight: "16px",
                }}
              >
                <TextField
                  id="name"
                  name="name"
                  label="Enter the location name"
                  placeholder="Enter the location name"
                  type="text"
                  required
                  style={{ width: "-webkit-fill-available" }}
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={Boolean(formik.touched.name && formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                  // autoComplete="current"
                />

                <TextField
                  id="address_line1"
                  name="address_line1"
                  style={{ width: "-webkit-fill-available", margin: "25px 0" }}
                  label="Address line"
                  type="text"
                  value={formik.values.address_line1}
                  error={Boolean(
                    formik.touched.address_line1 && formik.errors.address_line1
                  )}
                  helperText={
                    formik.touched.address_line1 && formik.errors.address_line1
                  }
                  onChange={formik.handleChange}
                  // autoComplete="current"
                />

                <div style={{ display: "flex" }}>
                  <TextField
                    id="city"
                    label="City*"
                    type="text"
                    value={formik.values.city}
                    error={Boolean(formik.touched.city && formik.errors.city)}
                    helperText={formik.touched.city && formik.errors.city}
                    onChange={formik.handleChange}
                    sx={{
                      marginLeft: "0",
                      width: "-webkit-fill-available !important",
                      paddingRight: "8px",
                    }}
                    // autoComplete="current"
                  />
                  <TextField
                    id="state"
                    label="State*"
                    type="text"
                    style={{ width: "-webkit-fill-available" }}
                    value={formik.values.state}
                    error={Boolean(formik.touched.state && formik.errors.state)}
                    helperText={formik.touched.state && formik.errors.state}
                    onChange={formik.handleChange}
                    // autoComplete="current"
                  />
                </div>
              </div>

              <Upload {...props}>
                <Paper
                  elevation={3}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "center",
                    height: innerWidth > 1900 ? "250px" : "220px",
                    width: "-webkit-fill-available",

                    borderRadius: "8px",
                    cursor: "pointer",
                    border: "2px dashed #ccc",
                    boxShadow: "none",
                  }}
                >
                  <Typography variant="p">Add Location Image </Typography>
                  <img src={clarityimageline} />
                  <Typography variant="p" sx={{ fontSize: "10px" }}>
                    Supports , JPG, JPG2000, PNG Less than 2 MB
                  </Typography>
                  <Typography
                    variant="p"
                    sx={{
                      fontSize: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    Drop your images here or <a>Browse</a>
                  </Typography>
                </Paper>
              </Upload>
            </div>
            <br />

            <div
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}
            >
              <div>
                <TextField
                  id="zip_code"
                  label="Zip code*"
                  type="number"
                  value={formik.values.zip_code}
                  error={Boolean(
                    formik.touched.zip_code && formik.errors.zip_code
                  )}
                  style={{ width: "-webkit-fill-available" }}
                  helperText={formik.touched.zip_code && formik.errors.zip_code}
                  onChange={formik.handleChange}
                  // autoComplete="current"
                />
              </div>

              <div>
                <TextField
                  id="phone"
                  label="Enter phone number"
                  type="tel"
                  value={formik.values.phone}
                  error={Boolean(formik.touched.phone && formik.errors.phone)}
                  helperText={formik.touched.phone && formik.errors.phone}
                  onChange={formik.handleChange}
                  style={{ margin: "0 8px", width: "-webkit-fill-available" }}
                  // autoComplete="current"
                />
              </div>

              <div>
                <TextField
                  id="email"
                  label="Enter email address"
                  type="email"
                  style={{ marginLeft: 0, width: "-webkit-fill-available" }}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={Boolean(formik.touched.email && formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  // autoComplete="current"
                />
              </div>
            </div>
          </Box>

          <div className="heading">Add Room(s)</div>

          {openAddRoom || openEditRoom ? (
            <>
              {openAddRoom && (
                <AddRoomForm
                  close={() => setOpenAddRoom(false)}
                  RoomValues={(values) =>
                    setRoomValues([...roomValues, values])
                  }
                />
              )}
              {openEditRoom && (
                <UpdateRoomForm
                  close={() => setOpenEditRoom(false)}
                  RoomValues={(values) =>
                    setUpdatedRoomValues([...roomValues, values])
                  }
                  defaultVal={roomData}
                />
              )}
            </>
          ) : (
            <div className="rooms">
              <div style={{ display: "flex", width: "311px" }}>
                <Button
                  style={{
                    height: "230px",
                    color: "gray",
                    display: "flex",
                    flexWrap: "wrap",
                    flexDirection: "column",
                    alignItems: "center",
                    margin: "8px",
                    width: "-webkit-fill-available",
                    justifyContent: "center",
                    borderRadius: "4px",
                    fontWeight: "bold",
                    background: "#FFFFFF",
                    border: "1px solid #ECEFF3",
                    boxShadow: "1px 1px 4px rgba(0, 0, 0, 0.06)",
                  }}
                  onClick={() => setOpenAddRoom(true)}
                >
                  <span>
                    <svg
                      width="42"
                      height="43"
                      viewBox="0 0 42 43"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20.9997 0.576172C20.5377 0.576172 20.0809 0.591922 19.6268 0.620797L19.7948 3.24055C20.5972 3.18869 21.4021 3.18869 22.2045 3.24055L22.3725 0.620797C21.9155 0.591164 21.4577 0.576281 20.9997 0.576172V0.576172ZM16.9047 0.975172C15.9964 1.1563 15.1092 1.39517 14.2482 1.68392L15.0908 4.17242C15.8442 3.91517 16.6185 3.7078 17.4113 3.5503L16.9047 0.977797V0.975172ZM27.7512 1.68655C26.8831 1.39224 25.9965 1.15548 25.0973 0.977797L24.588 3.5503C25.3808 3.7078 26.1552 3.9178 26.9085 4.17242L27.7512 1.68655V1.68655ZM32.6678 4.11467C31.9059 3.60475 31.1115 3.14527 30.2895 2.73917L29.1267 5.09117C29.8485 5.44817 30.5442 5.85242 31.2083 6.29605L32.6678 4.11467V4.11467ZM11.7072 2.73917C10.8829 3.14605 10.0902 3.60542 9.33155 4.11467L10.791 6.29342C11.4582 5.84811 12.1535 5.44652 12.8727 5.09117L11.7072 2.73917ZM7.1528 5.7868C6.46505 6.39055 5.81405 7.04155 5.2103 7.7293L7.1843 9.4618C7.71455 8.85805 8.28155 8.29105 8.8853 7.7608L7.1528 5.7868ZM36.789 7.7293C36.1843 7.04039 35.5355 6.39152 34.8465 5.7868L33.114 7.7608C33.7178 8.29105 34.2874 8.85805 34.815 9.4618L36.789 7.7293ZM39.8367 12.2837C39.4306 11.4626 38.9711 10.669 38.4612 9.90805L36.2824 11.3675C36.726 12.0317 37.1277 12.7273 37.4847 13.4492L39.8367 12.2863V12.2837ZM3.53817 9.90805C3.02892 10.6667 2.56692 11.4594 2.16267 12.2863L4.51467 13.4492C4.87167 12.7273 5.27592 12.0317 5.71955 11.3675L3.53817 9.90805V9.90805ZM1.11005 14.8247C0.815734 15.6928 0.57897 16.5793 0.401297 17.4785L2.9738 17.9878C3.1313 17.195 3.3413 16.4207 3.59592 15.6673L1.11005 14.8247V14.8247ZM41.6007 17.4812C41.4231 16.581 41.1864 15.6936 40.8919 14.8247L38.4034 15.6673C38.6607 16.4207 38.868 17.195 39.0255 17.9878L41.598 17.4785L41.6007 17.4812ZM0.0442969 20.2033C-0.0147656 21.1176 -0.0147656 22.0347 0.0442969 22.949L2.66405 22.781C2.61219 21.9786 2.61219 21.1737 2.66405 20.3713L0.0442969 20.2033V20.2033ZM41.9997 21.5762C41.9996 21.1182 41.9847 20.6603 41.955 20.2033L39.3353 20.3713C39.3872 21.1737 39.3872 21.9786 39.3353 22.781L41.955 22.949C41.9847 22.492 41.9996 22.0342 41.9997 21.5762V21.5762ZM0.398672 25.6712C0.579797 26.5794 0.818672 27.4667 1.10742 28.3277L3.59592 27.485C3.33774 26.7261 3.12992 25.9509 2.9738 25.1645L0.401297 25.6738L0.398672 25.6712ZM40.8893 28.3277C41.1833 27.4667 41.4195 26.5794 41.598 25.6738L39.0255 25.1645C38.868 25.9573 38.658 26.7317 38.4034 27.485L40.8893 28.3277V28.3277ZM2.16267 30.8687C2.56887 31.6897 3.02835 32.4833 3.53817 33.2443L5.71692 31.7848C5.27116 31.1179 4.86955 30.4225 4.51467 29.7032L2.16267 30.866V30.8687ZM38.4612 33.2443C38.9704 32.4857 39.4324 31.6929 39.8367 30.866L37.4847 29.7032C37.1277 30.425 36.7234 31.1207 36.2798 31.7848L38.4612 33.2443V33.2443ZM5.2103 35.423C5.81405 36.1108 6.46505 36.7618 7.1528 37.3655L8.8853 35.3915C8.28199 34.8621 7.71379 34.2939 7.1843 33.6905L5.2103 35.423V35.423ZM34.8465 37.3655C35.5343 36.7618 36.1853 36.1108 36.789 35.423L34.815 33.6905C34.2874 34.2943 33.7178 34.8639 33.114 35.3915L34.8465 37.3655ZM30.2922 40.4132C31.1164 40.0063 31.9092 39.5469 32.6678 39.0377L31.2083 36.8589C30.5411 37.3042 29.8458 37.7058 29.1267 38.0612L30.2895 40.4132H30.2922ZM9.33155 39.0377C10.0902 39.5469 10.8829 40.0089 11.7098 40.4132L12.8727 38.0612C12.1532 37.7055 11.4579 37.303 10.791 36.8563L9.33155 39.0377V39.0377ZM14.2482 41.4658C15.1092 41.7598 15.9964 41.996 16.902 42.1745L17.4113 39.602C16.625 39.4459 15.8498 39.238 15.0908 38.9799L14.2482 41.4658V41.4658ZM25.0947 42.1772C25.9948 41.9996 26.8822 41.7629 27.7512 41.4684L26.9085 38.9799C26.1495 39.238 25.3744 39.4459 24.588 39.602L25.0973 42.1745L25.0947 42.1772ZM19.6268 42.5315C20.5411 42.5907 21.4583 42.5907 22.3725 42.5315L22.2045 39.9118C21.4021 39.9637 20.5972 39.9637 19.7948 39.9118L19.6268 42.5315V42.5315ZM22.3122 12.3887C22.3122 12.0406 22.1739 11.7067 21.9278 11.4606C21.6816 11.2145 21.3478 11.0762 20.9997 11.0762C20.6516 11.0762 20.3177 11.2145 20.0716 11.4606C19.8255 11.7067 19.6872 12.0406 19.6872 12.3887V20.2637H11.8122C11.4641 20.2637 11.1302 20.402 10.8841 20.6481C10.638 20.8942 10.4997 21.2281 10.4997 21.5762C10.4997 21.9243 10.638 22.2581 10.8841 22.5043C11.1302 22.7504 11.4641 22.8887 11.8122 22.8887H19.6872V30.7637C19.6872 31.1118 19.8255 31.4456 20.0716 31.6918C20.3177 31.9379 20.6516 32.0762 20.9997 32.0762C21.3478 32.0762 21.6816 31.9379 21.9278 31.6918C22.1739 31.4456 22.3122 31.1118 22.3122 30.7637V22.8887H30.1872C30.5353 22.8887 30.8691 22.7504 31.1153 22.5043C31.3614 22.2581 31.4997 21.9243 31.4997 21.5762C31.4997 21.2281 31.3614 20.8942 31.1153 20.6481C30.8691 20.402 30.5353 20.2637 30.1872 20.2637H22.3122V12.3887Z"
                        fill="#676879"
                      />
                    </svg>
                  </span>

                  <Typography
                    style={{ marginTop: "12px", textTransform: "capitalize" }}
                  >
                    Add Room
                  </Typography>
                </Button>
              </div>

              {editLocVal.rooms.map((room) =>
                updatedRoomValues.length > 0 ? (
                  updatedRoomValues?.map(
                    (updatedRoom) =>
                      room.id === updatedRoom.id && (
                        <EditRoomCard
                          onClick={() => handleEditRoom(room)}
                          value={updatedRoom}
                        />
                      )
                  )
                ) : (
                  <EditRoomCard
                    onClick={() => handleEditRoom(room)}
                    value={room}
                  />
                )
              )}
              {/* {updatedRoomValues?.map((room) => (
                <EditRoomCard
                  onClick={() => handleEditRoom(room)}
                  value={room}
                />
              ))} */}

              {roomValues.map((room) => (
                <AddRoomCard is_add={false} value={room} />
              ))}
            </div>
          )}
          <Stack
            spacing={2}
            direction="row"
            sx={{
              mt: 5,
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              variant="outlined"
              style={{ textTransform: "capitalize" }}
              onClick={handleClose}
            >
              cancel
            </Button>
            <LoadingButton
              loading={loading}
              style={{ textTransform: "capitalize" }}
              variant="contained"
              type="submit"
            >
              Save changes
            </LoadingButton>
          </Stack>
        </form>
      </ThemeProvider>
    </>
  );
};

export default EditLocationForm;
