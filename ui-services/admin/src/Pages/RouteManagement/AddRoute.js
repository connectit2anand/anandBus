import React, { useState } from "react";
import {
  Autocomplete,
  TextField,
  Button,
  Container,
  Grid,
} from "@mui/material";
import cityList from "./cityList.json";
import axios from "axios";
import SnackToast from "../../components/SnackToast/Index";
import Loading from "../../components/Loading/Loading";

const baseUrl = 'http://localhost:8080'

function AddRoute() {
  const [fromCity, setFromCity] = useState(null);
  const [toCity, setToCity] = useState(null);
  const [distance, setDistance] = useState("");

  const [openSnack, setOpenSnack] = useState(false);
  const [loading, setLoading] = useState();
  const [severity, setSeverity] = useState('success');
  const [message, setMessage] = useState('');
  

  const handleFromCityChange = (event, newValue) => {
    setFromCity(newValue);
  };

  const handleToCityChange = (event, newValue) => {
    setToCity(newValue);
  };

  const handleDistanceChange = (event) => {
    setDistance(event.target.value);
  };

  const handleClose = () => {
    setOpenSnack(false);
  };

  const handleSubmit = (event) => {
    setLoading(true);
    event.preventDefault();
    let requestObj = {
      routeFrom: fromCity.city,
      routeTo: toCity.city,
      distance: distance
    }
    axios.post(`${baseUrl}/addRoute`, requestObj)
    .then(res => {
      setLoading(false);
      setOpenSnack(true);
      setSeverity('success');
      setMessage("Route Added Successfully");
      window.location.reload(true);
    })
    .catch(err => {
      setLoading(false);
      setOpenSnack(true);
      setSeverity('error');
      setMessage("Error in adding route, please try again later.");
    })
  };

  return (
    <Container maxWidth="sm">
      {Loading ? <Loading open={loading} /> : ""}
      <h2>Add New Route</h2>
      <SnackToast open={openSnack} onClose={handleClose} severity={severity} message={message} />
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Autocomplete
              options={cityList}
              getOptionLabel={(option) => option.city}
              value={fromCity}
              onChange={handleFromCityChange}
              renderInput={(params) => (
                <TextField {...params} label="From (City)" variant="outlined" />
              )}
            />
          </Grid>

          <Grid item xs={8}>
            <Autocomplete
              options={cityList}
              getOptionLabel={(option) => option.city}
              value={toCity}
              onChange={handleToCityChange}
              renderInput={(params) => (
                <TextField {...params} label="To (City)" variant="outlined" />
              )}
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              label="Distance between"
              variant="outlined"
              value={distance}
              onChange={handleDistanceChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default AddRoute;
