import React, { useState } from "react";
import {
  Autocomplete,
  TextField,
  Button,
  Container,
  Grid,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
} from "@mui/material";
// import cityList from "./cityList.json";
import axios from "axios";
import SnackToast from "../../components/SnackToast/Index";
import Loading from "../../components/Loading/Loading";
import { useEffect } from "react";

const baseUrl = 'http://localhost:8080'

function AddBus() {
  const [busNumber, setBusNumber] = useState(null);
  const [busName, setBusName] = useState(null);
  const [driverName, setDriverName] = useState("");
  const [busType, setBusType] = useState("");
  const [totalSeat, setTotalSeat] = useState("");
  const [fair, setFair] = useState("");
  const [routes, setRoutes] = useState([]);
  const [routeId, setRouteId] = useState();

  const [openSnack, setOpenSnack] = useState(false);
  const [loading, setLoading] = useState();
  const [severity, setSeverity] = useState('success');
  const [message, setMessage] = useState('');

  const handleBusNameChange = (event) => {
    setBusName(event.target.value);
  }

  const handleDriverNameChange = (event) => {
    setDriverName(event.target.value);
  }

  const handleTotalSeatChange = (event) => {
    setTotalSeat(event.target.value);
  }

  const handleBusTypeChange = (event) => {
    setBusType(event.target.value);
  }

  const handleFairChange = (event) => {
    setFair(event.target.value);
  }
  
  const handleBusNumberChange = (event) => {
    setBusNumber(event.target.value);
  }
  
  const handleClose = () => {
    setOpenSnack(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    let request = {
      busNumber: busNumber,
      busName: busName,
      driverName: driverName,
      busType: busType,
      seats: totalSeat,
    }
    axios.post(`${baseUrl}/addBus/${routeId}`, request)
    .then(res => {
      setLoading(false);
      setOpenSnack(true);
      setSeverity('success');
      setMessage("Bus Added Successfully");
    })
    .catch(err => {
      setLoading(false)
      setOpenSnack(true);
      setSeverity('error');
      setMessage(err.response.data.message);

    })
    .catch(err => {
      setLoading(false);
      setOpenSnack(true);
      setSeverity('error');
      setMessage("Error in adding bus, please try again later.");
    })
  };

  useEffect(() => {
    axios.get(`${baseUrl}/getAllRoute`)
    .then(res => {
      setRoutes(res.data);
    })
    .catch(err => {
      setOpenSnack(true);
      setSeverity('error');
      setMessage("Error in getting routes.");
    })
  },[])

  const handleRouteChange = (event) => {
    setRouteId(event.target.value);
  }

  return (
    <Container maxWidth="sm">
      {Loading ? <Loading open={loading} /> : ""}
      <h2>Add New Bus</h2>
      <SnackToast open={openSnack} onClose={handleClose} severity={severity} message={message} />
      <form onSubmit={handleSubmit}>
        <Grid container spacing={4}>
        <Grid item={true} xs={12}>
            <FormControl fullWidth>
              <InputLabel>Select Route</InputLabel>
              <Select
                onChange={handleRouteChange} input={<OutlinedInput label="Select Route" />}>
                {routes.map((route, index) => {
                  return <MenuItem 
                            key={index} 
                            value={route.routeID}>
                            {route.routeFrom.toUpperCase()} TO {route.routeTo.toUpperCase()}
                          </MenuItem>})}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Bus Number"
              variant="outlined"
              value={busNumber}
              onChange={handleBusNumberChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Bus Name"
              variant="outlined"
              value={busName}
              onChange={handleBusNameChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Driver Name"
              variant="outlined"
              value={driverName}
              onChange={handleDriverNameChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Bus Type"
              variant="outlined"
              value={busType}
              onChange={handleBusTypeChange}
            />
          </Grid>
         
          <Grid item xs={12}>
            <TextField
              label="Total Seats"
              variant="outlined"
              value={totalSeat}
              onChange={handleTotalSeatChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Fair"
              variant="outlined"
              value={fair}
              onChange={handleFairChange}
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

export default AddBus;
