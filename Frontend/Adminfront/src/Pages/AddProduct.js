import React, { useState, useRef, useEffect, forwardRef } from "react";
import { Formik, Form, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import Snackbar from "@mui/material/Snackbar";
import TextFieldWrapper from "../hooks/TextFieldWrapper";
import ProgressBar from "../components/ProgressBar";
import MuiAlert from "@mui/material/Alert";
import { DialogActions, IconButton, Stack, Tooltip } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import FileUploadRoundedIcon from "@mui/icons-material/FileUploadRounded";
import { auth } from "../firebase/config";
import { useSelector } from 'react-redux'

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

let types = ["image/webp"];

const ValidationSchema = Yup.object({
  planter: Yup.boolean(),
  Name: Yup.string().required("Required"),
  Price: Yup.number()
    .typeError("Amount Must be in Numbers")
    .required("Required"),
  Quantity: Yup.number()
    .typeError("Quantity Must be in Numbers")
    .required("Required"),
  Details: Yup.object().shape({
    Light: Yup.string(),
    Watering: Yup.string(),
    Maintenance: Yup.string(),
    WhereToGrow: Yup.string(),
    TimeTillHarvest: Yup.string(),
    Material: Yup.string(),
    Build: Yup.string(),
    PlanterHeight: Yup.string(),
    PlanterWidth: Yup.string(),
  }),
  BrowseImg: Yup.string().required("Browse Image is Required."),
  MainImg: Yup.string().required("Main Image is Required."),
  Tags: Yup.array().nullable(),
  Category: Yup.string().required("Required"),
  SubCategory: Yup.string().required("Required"),
});

const AddProduct = ({ Edit, Close }) => {
  const [browseFile, setBrowseFile] = useState(null);
  const [mainFile, setmainFile] = useState(null);
  const [browseURL, setBrowseURL] = useState("");
  const [mainURL, setmainURL] = useState("");
  const [disable, setDisable] = useState(false);
  const [browseError, setBrowseError] = useState("");
  const [mainError, setMainError] = useState("");
  const [data, setData] = useState([]);
  const [details, setDetails] = useState([]);
  const [progress, setProgress] = useState(0);
  const [snackState, setSnackState] = useState(false);
  const [resStatus, setResStatus] = useState(1);

  const tags = [
    "Plant",
    "Flowering",
    "Medicinal",
    "Cactus & Succulents",
    "Decor",
    "Office",
    "Low-Maintenance",
    "Gifting",
    "Air-Purifying",
    "Outdoor",
    "Pink",
    "Popular",
    "Gardening",
    "Fragrant",
    "Fruit",
    "Organic",
    "Palm",
    "Planters",
    "Seeds",
    "Shrubs",
    "Bonsai",
    "Vegetable",
    "Pot",
    "Ceramic",
    "Budget",
    "Manure & Soils",
    "Fertilizers",
    "Gardening Tools",
    "Vegetable Seed",
    "Fruit Seeds",
    "Ceramic Pots",
  ];

  const fixedTag = tags[0];

  const [tagValue, setTagValue] = useState([fixedTag]);

  const EditProd = !Edit;
  const ref = useRef();

  let baseURL = process.env.REACT_APP_BACK_URL;
  let token = localStorage.getItem("userToken");
  const user = useSelector((state) => state.user.value)

  useEffect(() => {
    if (!EditProd) {
      axios({
        url: `${baseURL}/product/${Edit}`,
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "Content-Type": "application/json",
        },
        method: "GET",
      })
        .then((res) => {
          setData(res.data);
          setDetails(res.data.Details);
          setBrowseURL(res.data.BrowseImg);
          setmainURL(res.data.MainImg);
        })
        .catch((e) => {
          console.log("Add Prod", e);
          if (e.response.status === 401 && user.userId !== null) {
            auth.currentUser.getIdToken(true).then((token) => {
              localStorage.setItem("userToken", token);
              window.location.reload(false)
            });
          }
        });
    }
  }, [EditProd, Edit, baseURL, user]);

  const initialValues = {
    Name: `${EditProd ? "" : data.Name === undefined ? "" : data.Name}`,
    Price: `${EditProd ? "" : data.Price === undefined ? "" : data.Price}`,
    Quantity: `${EditProd ? "" : data.Quantity === undefined ? "" : data.Quantity
      }`,
    Details: {
      Light: `${EditProd ? "" : details.Light === undefined ? "" : details.Light
        }`,
      Watering: `${EditProd ? "" : details.Watering === undefined ? "" : details.Watering
        }`,
      Maintenance: `${EditProd
          ? ""
          : details.Maintenance === undefined
            ? ""
            : details.Maintenance
        }`,
      WhereToGrow: `${EditProd
          ? ""
          : details.WhereToGrow === undefined
            ? ""
            : details.WhereToGrow
        }`,
      TimeTillHarvest: `${EditProd
          ? ""
          : details.TimeTillHarvest === undefined
            ? ""
            : details.TimeTillHarvest
        }`,
      Material: `${EditProd ? "" : details.Material === undefined ? "" : details.Material
        }`,
      Build: `${EditProd ? "" : details.Build === undefined ? "" : details.Build
        }`,
      PlanterHeight: `${EditProd
          ? ""
          : details.PlanterHeight === undefined
            ? ""
            : details.PlanterHeight
        }`,
      PlanterWidth: `${EditProd
          ? ""
          : details.PlanterWidth === undefined
            ? ""
            : details.PlanterWidth
        }`,
      Description: `${EditProd
          ? ""
          : details.Description === undefined
            ? ""
            : details.Description
        }`,
    },
    BrowseImg: `${EditProd ? "" : data.BrowseImg === "" ? "" : data.BrowseImg}`,
    MainImg: `${EditProd ? "" : data.MainImg === "" ? "" : data.MainImg}`,
    Tags: EditProd ? fixedTag : data.Tags,
    Category: `${EditProd ? "Plant" : data.Category === "" ? "" : data.Category
      }`,
    SubCategory: `${EditProd ? "" : data.SubCategory === "" ? "" : data.SubCategory
      }`,
  };

  const handleBrowseImg = (e) => {
    let selected = e.target.files[0];
    if (selected && types.includes(selected.type)) {
      setBrowseFile(selected);
      setBrowseError("");
    } else {
      setBrowseError("Please Upload Image in Webp Format");
    }
  };

  const handleMainImg = (e) => {
    let selected = e.target.files[0];
    if (selected && types.includes(selected.type)) {
      setmainFile(selected);
      setMainError("");
    } else {
      setMainError("Please Upload Image in Webp Format");
    }
  };

  useEffect(() => {
    if (browseURL && mainURL !== "" && progress !== 0) {
      setDisable(true);
    }
  }, [browseURL, mainURL, progress]);

  const handleSnackClick = () => {
    setSnackState(true);
  };

  const handleSnackClose = () => {
    setSnackState(false);
    Close(false)
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
          ml: 6,
        }}
      >
        {EditProd ? (
          <Typography
            fontWeight="fontWeightBold"
            component="div"
            variant="h4"
            sx={{ p: 0 }}
          >
            Add Product
          </Typography>
        ) : null}

        {/*//! FORMIK COMPONENT */}
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={ValidationSchema}
          validateOnBlur={false}
          validateOnChange={true}
          //! OnSUBMIT
          onSubmit={(values, { resetForm, setSubmitting }) => {
            values.BrowseImg = browseURL;
            values.MainImg = mainURL;
            setSubmitting(false);
            setResStatus(1);
            //!PATCH
            if (!EditProd) {
              axios({
                url: `${baseURL}/product`,
                headers: {
                  "X-Requested-With": "XMLHttpRequest",
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                data: {
                  pid: Edit,
                  values,
                },
                method: "PATCH",
              })
                .then((res) => {
                  setData(res.data.data);
                  setResStatus(res.status);
                  setDetails(res.data.data.Details);
                  setBrowseURL(res.data.data.BrowseImg);
                  setmainURL(res.data.data.MainImg);
                })
                .then(() => {
                  resetForm({ values: "" });
                })
                .catch((e) => {
                  setResStatus(e.request.status);
                  if (e.response.status === 401 && user.userId !== null) {
                    auth.currentUser.getIdToken(true).then((token) => {
                      localStorage.setItem("userToken", token);
                      window.location.reload(false)
                    });
                  }
                });
            }
            //!POST
            else {
              axios({
                url: `${baseURL}/product`,
                headers: {
                  "X-Requested-With": "XMLHttpRequest",
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                data: values,
                method: "POST",
              })
                .then((res) => {
                  setResStatus(res.status);
                })
                .then(() => {
                  resetForm({ values: "" });
                  setTagValue([fixedTag]);
                  setBrowseFile(null);
                  setmainFile(null);
                  setProgress(0);
                })
                .catch((e) => {
                  if (e.response.status === 401 && user.userId !== null) {
                    auth.currentUser.getIdToken().then((token) => {
                      localStorage.setItem("userToken", token);
                      window.location.reload(false)
                    });
                  }
                });
            }
          }}
        >
          {({ values, setFieldValue, isValid, dirty }) => {
            //! FORMIK FORM

            return (
              <Box sx={{ borderRadius: 2, boxShadow: 4, p: 4 }}>
                <Form>
                  <Grid container spacing={4}>
                    <Grid item xs={6}>
                      <TextFieldWrapper name="Name" label="Product Name" />
                    </Grid>

                    <Grid item xs={6}>
                      <TextFieldWrapper name="Price" label="Price" />
                    </Grid>

                    <Grid item xs={6}>
                      <TextFieldWrapper name="Quantity" label="Quantity" />
                    </Grid>

                    {/*//! DROPDOWN */}
                    <Grid item xs={6}>
                      <FormControl required>
                        <InputLabel id="select">Category</InputLabel>
                        <Select
                          labelId="select"
                          id="tags=select"
                          value={
                            values.Category !== "undefined"
                              ? values.Category
                              : ""
                          }
                          label="Category"
                          onChange={(e) => {
                            setFieldValue("Category", e.target.value);
                            setTagValue([e.target.value], [tags]);
                            setFieldValue("Details", {
                              Light: "",
                              Watering: "",
                              Maintenance: "",
                              WhereToGrow: "",
                              Material: "",
                              Build: "",
                              PlanterHeight: "",
                              PlanterWidth: "",
                              TimeTillHarvest: "",
                            });
                            setFieldValue("Tags", [e.target.value])
                          }}
                          autoWidth
                          name="Category"
                          defaultValue=""
                        >
                          <MenuItem value={"Plant"}>Plant</MenuItem>
                          <MenuItem value={"Planters"}>Planters</MenuItem>
                          <MenuItem value={"Seeds"}>Seeds</MenuItem>
                          <MenuItem value={"Care"}>Care</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    {/*//! DETAILS ARRAY */}

                    <FieldArray name="Details">
                      {values.Category && values.Category === "Plant" ? (
                        <Grid container spacing={2} sx={{ padding: "20px" }}>
                          <Grid item xs={12}>
                            <Typography fontWeight="fontWeightMedium">
                              Details
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <TextFieldWrapper
                              name={`Details.Light`}
                              label={`Light`}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <TextFieldWrapper
                              name={`Details.Watering`}
                              label={`Watering`}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <TextFieldWrapper
                              name={`Details.Maintenance`}
                              label={`Maintenance`}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <TextFieldWrapper
                              name={`Details.WhereToGrow`}
                              label={`Where To Grow`}
                            />
                          </Grid>
                        </Grid>
                      ) : values.Category && values.Category === "Seeds" ? (
                        <Grid container spacing={2} sx={{ padding: "20px" }}>
                          <Grid item xs={12}>
                            <Typography fontWeight="fontWeightMedium">
                              Details
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <TextFieldWrapper
                              name={`Details.Light`}
                              label={`Light`}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <TextFieldWrapper
                              name={`Details.Watering`}
                              label={`Watering`}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <TextFieldWrapper
                              name={`Details.Maintenance`}
                              label={`Maintenance`}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <TextFieldWrapper
                              name={`Details.WhereToGrow`}
                              label={`Where To Grow`}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <TextFieldWrapper
                              name={`Details.TimeTillHarvest`}
                              label={`Time Till Harvest`}
                            />
                          </Grid>
                        </Grid>
                      ) : values.Category && values.Category === "Planters" ? (
                        <Grid container spacing={2} sx={{ padding: "20px" }}>
                          <Grid item xs={12}>
                            <Typography fontWeight="fontWeightMedium">
                              Details
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <TextFieldWrapper
                              name={`Details.Material`}
                              label={`Material`}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <TextFieldWrapper
                              name={`Details.Build`}
                              label={`Build`}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <TextFieldWrapper
                              name={`Details.PlanterHeight`}
                              label={`Planter Height`}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <TextFieldWrapper
                              name={`Details.PlanterWidth`}
                              label={`Planter Width`}
                            />
                          </Grid>
                        </Grid>
                      ) : values.Category && values.Category === "Care" ? (
                        <Grid container spacing={2} sx={{ padding: "20px" }}>
                          <Grid item xs={12}>
                            <Typography fontWeight="fontWeightMedium">
                              Details
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <TextFieldWrapper
                              multiline
                              rows={3}
                              name={`Details.Description`}
                              label={`Description`}
                              inputProps={{
                                maxLength: 400,
                              }}
                            />
                          </Grid>
                        </Grid>
                      ) : null}
                    </FieldArray>

                    {/*//! IMAGES  */}
                    <Grid item xs={3}>
                      <Typography fontWeight="fontWeightMedium">
                        Browse Image
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <label htmlFor="BrowseImg">
                        <Input
                          style={{ display: "none" }}
                          accept="image/webp"
                          id="BrowseImg"
                          type="file"
                          onChange={(e) => {
                            setFieldValue("BrowseImg", e.target.files[0]);
                            handleBrowseImg(e);
                          }}
                        />
                        <Stack direction="column" spacing={3}>
                          <Button
                            startIcon={<FileUploadRoundedIcon />}
                            variant="contained"
                            component="span"
                          >
                            Upload
                          </Button>
                          {browseFile && (
                            <ProgressBar
                              file={browseFile}
                              setURL={setBrowseURL}
                              setProgress={setProgress}
                            />
                          )}
                        </Stack>
                        <Typography variant="subtitle2" sx={{ color: "red" }}>
                          <ErrorMessage name="BrowseImg" />
                          {browseError}
                        </Typography>
                      </label>
                    </Grid>

                    <Grid item xs={3}>
                      <Typography fontWeight="fontWeightMedium">
                        Main Image
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <label htmlFor="MainImg">
                        <Input
                          style={{ display: "none" }}
                          accept="image/webp"
                          id="MainImg"
                          type="file"
                          onChange={(e) => {
                            setFieldValue("MainImg", e.target.files[0]);
                            handleMainImg(e);
                          }}
                        />
                        <Stack direction="column" spacing={3}>
                          <Button
                            startIcon={<FileUploadRoundedIcon />}
                            variant="contained"
                            component="span"
                          >
                            Upload
                          </Button>
                          {mainFile && (
                            <ProgressBar
                              file={mainFile}
                              setURL={setmainURL}
                              setProgress={setProgress}
                            />
                          )}
                        </Stack>
                        <Typography variant="subtitle2" sx={{ color: "red" }}>
                          <ErrorMessage name="MainImg" />
                          {mainError}
                        </Typography>
                      </label>
                    </Grid>
                    {/*//! AUTOCOMPLETE TAGS */}
                    <Grid item xs={6}>
                      <Stack direction="row">
                        <Autocomplete
                          multiple
                          id="Tags"
                          // disableClearable
                          freeSolo
                          value={
                            EditProd
                              ? tagValue
                              : values.Tags === undefined
                                ? tagValue
                                : values.Tags
                          }
                          onChange={(event, newTag) => {
                            setTagValue(newTag);
                            setFieldValue("Tags", newTag);
                          }}
                          options={tags}
                          getOptionLabel={(option) => option}
                          renderTags={(tag, getTag) =>
                            tag.map((option, index) => (
                              <Chip label={option} {...getTag({ index })} />
                            ))
                          }
                          renderInput={(params) => (
                            <>
                              {EditProd ?
                                <TextFieldWrapper
                                  sx={{ width: 320 }}
                                  {...params}
                                  name="Tags"
                                  label="Tags"

                                />
                                :
                                <TextFieldWrapper
                                  sx={{ width: 320 }}
                                  {...params}
                                  name="Tags"
                                  label="Tags"
                                  onChange={(e) => { setTagValue(e)}}
                                />}
                            </>
                          )}
                        />
                        {EditProd ? (
                          <Tooltip title="Please include Product Category and Sub-Category in tags.">
                            <IconButton>
                              <InfoOutlinedIcon color="primary" />
                            </IconButton>
                          </Tooltip>
                        ) : null}
                      </Stack>
                    </Grid>
                    <Grid item xs={6}>
                      <TextFieldWrapper
                        name="SubCategory"
                        label="Sub Category"
                      />
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      sx={{ display: "flex", justifyContent: "center" }}
                    >
                      {EditProd ? (
                        <DialogActions>
                          <Button
                            sx={{ width: 300 }}
                            variant="contained"
                            type="submit"
                            disabled={!(disable && isValid)}
                            onClick={handleSnackClick}
                          >
                            Submit
                          </Button>
                          <Snackbar
                            open={snackState}
                            autoHideDuration={3000}
                            onClose={handleSnackClose}
                          >
                            {resStatus === 200 ? (
                              <Alert severity="success" sx={{ width: "100%" }}>
                                Success!
                              </Alert>
                            ) : resStatus === 400 || resStatus === 0 ? (
                              <Alert severity="error" sx={{ width: "100%" }}>
                                Failed! Please Try Again
                              </Alert>
                            ) : <Alert severity="info" sx={{ width: '100%' }}>
                              Please Wait
                            </Alert>}
                          </Snackbar>
                        </DialogActions>
                      ) : (
                        <>
                          <Button
                            ref={ref}
                            variant="contained"
                            type="submit"
                            disabled={!dirty}
                            onClick={handleSnackClick}
                          >
                            Submit
                          </Button>
                          <Snackbar
                            open={snackState}
                            autoHideDuration={1000}
                            onClose={handleSnackClose}
                          >
                            {resStatus === 200 ? (
                              <Alert severity="success" sx={{ width: "100%" }}>
                                Product Added!
                              </Alert>
                            ) : resStatus === 400 || resStatus === 0 ? (
                              <Alert severity="error" sx={{ width: "100%" }}>
                                Failed! Please Try Again
                              </Alert>
                            ) : <Alert severity="info" sx={{ width: '100%' }}>
                              Please Wait
                            </Alert>}
                          </Snackbar>
                        </>
                      )}
                    </Grid>
                  </Grid>
                </Form>
              </Box>
            );
          }}
        </Formik>
      </Box>
    </Container>
  );
};

export default React.memo(AddProduct);
