import React, { useEffect, useState } from "react";
import { Upload, message } from "antd";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  TextField,
  Button,
  Paper,
  Box
} from "@mui/material";
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
import Autocomplete from "@mui/material/Autocomplete";
import PhoneInput from "../../common/phoneNumber";
import ZipCodeInput from "../../common/zipcodeInput"
import { toast } from "react-toastify";
import clarityimageline from "../../assets/images/clarity_image-line.png";

import { useFormik } from "formik";
import * as Yup from "yup";
import Location from "../../models/Locations/Location";
import Room from "../../models/Locations/Room";
import "./AddLocationForm.css";

const MyChip = (props) => {
    // const classes = useStyles();
  
    return (
      <Chip style={{ background: "#CCE5FF", borderRadius: "4px" }} {...props} />
    );
  };
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  
  const TabDiv = (props) => {
  
    return (
      <div className={`tab-div ${props.showDropdown ? "tab-div-height" : ""}`}>
        <p>Describe what kind of {props.tabName} you are offering </p>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            width: "-webkit-fill-available",
          }}
        >
          <Autocomplete
            multiple
            id="checkboxes-tags-demo"
            options={props.options}
            disableCloseOnSelect
            includeInputInList
            value={props.selectedValues}
            getOptionLabel={(option) => option}
            sx={{
              overflow: "visible",
              "&  .MuiOutlinedInput-root": {
                padding: "0px",
              },
  
              "& .MuiAutocomplete-input": {
                padding: "15px !important",
              },
              "& .MuiAutocomplete-root": {
                overflow: "visible",
              },
            }}
            limitTags={2}
            onChange={(event, values) => props.values(values)}
            fullWidth
            renderTags={(tagValue, getTagProps) => {
              return tagValue.map((option, index) => (
                <MyChip {...getTagProps({ index })} label={option} />
              ));
            }}
            forcePopupIcon={true}
            popupIcon={<SearchIcon />}
            // sx={{ overflow: "auto" }}
            disablePortal={true}
            onOpen={() => props.setShowDropdown(true)}
            freeSolo
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option}
              </li>
            )}
            style={{}}
            renderInput={(params) => (
              <TextField
                onBlur={() => props.setShowDropdown(false)}
                {...params}
                label={`Search and add ${props.tabName}`}
              />
            )}
          />
        </div>
      </div>
    );
  };
  
  const AddRoomForm = ({ close, RoomValues }) => {
    const [image, setImage] = useState();
    const [active1, setActive1] = useState(true);
    const [active2, setActive2] = useState(false);
    const [active3, setActive3] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
  
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
        formik.values.image = file;
        formik.values.file = URL.createObjectURL(file);
        // setImage(file);
      },
      onChange(info) {
        const { status } = info.file;
        if (status === "done") {
          message.success(`${info.file.name} file uploaded successfully.`);
          // setImage(info.file.originFileObj);
          formik.values.image = info.file.originFileObj;
          formik.values.file = URL.createObjectURL(info.file.originFileObj);
        } else if (status === "error") {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };
  
    const spaces = [
      "Barns & Farms",
      "Vineyard & Winery",
      "Restaurants",
      "Beach",
      "Gardens",
      "Brewery",
      "Distllery"
    ]
  
    const amenities = [
      "Child Daycare",
      "Bike Racks",
      "Lobby Reception",
      "Fitness Facility",
      "Covered Parking",
      "Building Signage"
    ]
  
    const ceremony_types = [
      "Corportate Party",
      "General Birthday Party",
      "Sweet Sixteen Party",
      "Quinceañera Party",
      "Bar Mitzvah",
      "Bat Mitzvah",
      "Wedding Party",
      "Engagement Party",
      "Indian Wedding",
      "Japanese Wedding",
      "Chinesse Wedding",
      "Divorce Party",
      "Reunion",
      "Anniversary",
      "Baby Shower",
      "Bridal Shower",
      "Bachelor Party",
      "Bachelorette Party",
      "Other"
    ]
  
    const formik = useFormik({
      initialValues: {
        name: "",
        base_price: "",
        max_guests: "",
        image: new File([], ""),
        file: new File([], ""),
        options: {}
      },
      validationSchema: Yup.object({
        name: Yup.string().required("Room Name is required"),
      }),
      onSubmit: (values) => {
        RoomValues(values);
        close();
      },
    });
  
    const theme = createTheme({
      components: {
        MuiFormLabel: {
          styleOverrides: {
            asterisk: { color: "red" },
          },
        },
      },
    });
  
    return (
      <>
        <ThemeProvider theme={theme}>
          <form onSubmit={formik.handleSubmit}>
            <div style={{ display: "grid", gridTemplateColumns: " 1fr 200px" }}>
              <div>
                {" "}
                <TextField
                  id="name"
                  label="Room Name"
                  placeholder="Room Name"
                  type="text"
                  required
                  sx={{
                    width: "-webkit-fill-available",
                    margin: "28px 9px 0px 0px",
                  }}
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={Boolean(formik.touched.name && formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                // autoComplete="current"
                />
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    margin: "25px 0px",
                  }}
                >
                  <TextField
                    id="base_price"
                    name="base_price"
                    label="Base Price"
                    placeholder="Base Price"
                    type="number"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          {" "}
                          <strong
                            style={{ fontWeight: "bolder", fontSize: "20px" }}
                          >
                            $
                          </strong>
                        </InputAdornment>
                      ),
                    }}
                    error={Boolean(
                      formik.touched.base_price && formik.errors.base_price
                    )}
                    helperText={
                      formik.touched.base_price && formik.errors.base_price
                    }
                    value={formik.values.base_price}
                    onChange={formik.handleChange}
                    sx={{
                      width: "auto",
                      margin: "0px 17px 0px 0px",
                      background: "#F4F6F9",
                    }}
                  />
                  <TextField
                    id="max_guests"
                    label="Number of Guests"
                    placeholder="Number of Guests"
                    type="number"
                    sx={{ width: "auto", margin: "0px 5px" }}
                    value={formik.values.max_guests}
                    onChange={formik.handleChange}
                    error={Boolean(
                      formik.touched.max_guests && formik.errors.max_guests
                    )}
                    helperText={
                      formik.touched.max_guests && formik.errors.max_guests
                    }
                  // autoComplete="current"
                  />
                </div>
              </div>
              <div>
                <Upload {...props} accept=".jpg, .jpeg, .png">
                  <Paper
                    elevation={3}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      flexWrap: "wrap",
                      alignItems: "center",
                      justifyContent: "center",
  
                      height: window.innerWidth > 1900 ? "268px" : "267px",
                      // width: window.innerWidth > 1900 ? "300px" : "231px",
                      mt: window.innerWidth > 1900 ? "20px" : "27px",
                      borderRadius: "8px",
                      cursor: "pointer",
                      border: "2px dashed #ccc",
                      boxShadow: "none",
                      width: "auto",
                      height: "150px",
                    }}
                  >
                    <Typography variant="p">Add Company Logo </Typography>
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
            </div>
  
            <div style={{ display: "flex", gap: "3px" }}>
              <div
                className={`add-room-tab ${active1 ? "packages-nav-active" : ""
                  }  `}
                onClick={() => {
                  setActive1(true);
                  setActive2(false);
                  setActive3(false);
                }}
              >
                <img src={space} alt="logo" />
                Define Space{" "}
              </div>
              <div
                className={`add-room-tab ${active2 ? "packages-nav-active" : ""
                  }  `}
                onClick={() => {
                  setActive1(false);
                  setActive2(true);
                  setActive3(false);
                }}
              >
                <img src={Amenitities} alt="logo" />
                Define Amenities
              </div>
              <div
                className={`add-room-tab ${active3 ? "packages-nav-active" : ""
                  }  `}
                onClick={() => {
                  setActive1(false);
                  setActive2(false);
                  setActive3(true);
                }}
              >
                <img src={cermony} alt="logo" />
                Ceremony Type
              </div>
            </div>
            {active1 && (
              <TabDiv
                setShowDropdown={setShowDropdown}
                showDropdown={showDropdown}
                tabName={"space"}
                options={spaces}
                selectedValues={formik.values.options.spaces}
                group="space"
                values={(values) => formik.values.options.spaces = values}
              />
            )}
            {active2 && (
              <TabDiv
                setShowDropdown={setShowDropdown}
                showDropdown={showDropdown}
                tabName={"amenities"}
                options={amenities}
                selectedValues={formik.values.options.amenities}
                group="amenity"
                values={(values) => formik.values.options.amenities = values}
              />
            )}
            {active3 && (
              <TabDiv
                setShowDropdown={setShowDropdown}
                showDropdown={showDropdown}
                tabName={"cermony type"}
                options={ceremony_types}
                selectedValues={formik.values.options.ceremony_types}
                group="ceremony_type"
                values={(values) => formik.values.options.ceremony_types = values}
              />
            )}
            <button type="submit" className="add-room-btn-room">
              Add Room
            </button>
          </form>
        </ThemeProvider>
      </>
    );
  };

export default AddRoomForm;