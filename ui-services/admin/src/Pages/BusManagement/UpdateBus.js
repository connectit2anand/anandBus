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
import { DesktopDatePicker, LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { min } from "date-fns";

const baseUrl = 'http://localhost:8080'

function UpdateBus() {
  const [busNumber, setBusNumber] = useState(null);
  const [busName, setBusName] = useState(null);
  const [driverName, setDriverName] = useState("");
  const [busType, setBusType] = useState("");
  const [totalSeat, setTotalSeat] = useState("");
  const [fair, setFair] = useState("");
  const [routes, setRoutes] = useState([]);
  const [routeId, setRouteId] = useState();
  const [dateOfJourney, setDateOfJourney] = useState(null)
  const [busList, setBusList] = useState([]);

  const [openSnack, setOpenSnack] = useState(false);
  const [loading, setLoading] = useState();
  const [severity, setSeverity] = useState('success');
  const [message, setMessage] = useState('');
  const [departureTime, setDepartureTime] = useState(null);
  const [arrivalTime, setArrivalTime] = useState(null);

  const handleArrivalTimeChange = (event) => {
    setArrivalTime(event);
  }

  const handleBusNameChange = (event) => {
    setBusName(event.target.value);
  }

  const handleDriverNameChange = (event) => {
    setDriverName(event.target.value);
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

  const getDate = (date) => {
    let dd = new Date(date).getDate() + "";
    if (dd.length == 1) {
        dd = 0 + dd;
    }
    let mm = (+new Date(date).getMonth() + 1) + "";
    if (mm.length == 1) {
        mm = 0 + mm;
    }
    let yyyy = new Date(date).getFullYear();
    let updatedDate = `${yyyy}-${mm}-${dd}`
    return updatedDate;
}

const getTime = (time) => {
  let hours = time.getHours() + '';
  let mins = time.getMinutes() + '';
  if(hours.length == 1) {
    hours = 0 + hours;
  }
  if(mins.length == 1) {
    mins = 0 + mins;
  }
  return `${hours}:${mins}:00`;
}

  const handleSubmit = (event) => {
    event.preventDefault();
    let date = getDate(dateOfJourney);
    let dTime = getTime(departureTime);
    let aTime = getTime(arrivalTime);
    setLoading(true);
    let request = {
      busName: busName,
      driverName: driverName,
      busJourneyDate: date,
      departureTime: dTime,
      arrivalTime: aTime,
      fair: fair
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
    axios.get(`${baseUrl}/getAllBuses`)
    .then(res => {
      setBusList(res.data);
    })
    .catch(err => {
      setOpenSnack(true);
      setSeverity('error');
      setMessage("Error in getting bus list.");
    })
  },[])

  const handleRouteChange = (event) => {
    setRouteId(event.target.value);
  }

  const handleDateOfJourneyChange = (event) => {
    setDateOfJourney(event);
  }

  const handleTimeChange = (event) => {
    setDepartureTime(event);
  }

  return (
    <Container maxWidth="sm">
      {Loading ? <Loading open={loading} /> : ""}
      <h2>Update Bus</h2>
      <SnackToast open={openSnack} onClose={handleClose} severity={severity} message={message} />
      <form onSubmit={handleSubmit}>
      <Grid container mb={2} spacing={2} >
          <Grid xs={12} item={true} sm={6} lg={6}>
            <FormControl fullWidth>
              <InputLabel>Select Bus Number</InputLabel>
              <Select
                onChange={handleBusNumberChange} input={<OutlinedInput label="Select Bus Number" />}>
                {busList.map((bus, index) => {
                  return <MenuItem 
                            key={index} 
                            value={bus.busId}>
                            {bus.busNumber}
                          </MenuItem>})}
              </Select>
            </FormControl>
          </Grid>
          <Grid xs={12} item={true} sm={6} lg={6}>
            <FormControl fullWidth>
              <InputLabel>Select New Route</InputLabel>
              <Select
                onChange={handleRouteChange} input={<OutlinedInput label="Select New Route" />}>
                {routes.map((route, index) => {
                  return <MenuItem 
                            key={index} 
                            value={route.routeID}>
                            {route.routeFrom.toUpperCase()} TO {route.routeTo.toUpperCase()}
                          </MenuItem>})}
              </Select>
            </FormControl>
          </Grid>
          <Grid xs={12} item={true} sm={6} lg={6}>
            <TextField fullWidth
              label="Bus Name"
              variant="outlined"
              value={busName}
              onChange={handleBusNameChange}
            />
          </Grid>
          <Grid xs={12} item={true} sm={6} lg={6}>
            <TextField fullWidth
              label="Driver Name"
              variant="outlined"
              value={driverName}
              onChange={handleDriverNameChange}
            />
          </Grid>

          <Grid xs={12} item={true} sm={6} lg={6}>
            <TextField fullWidth
              label="Fair"
              variant="outlined"
              value={fair}
              onChange={handleFairChange}
            />
          </Grid>

          <Grid xs={12} item={true} sm={6} lg={6}>
                            <FormControl fullWidth>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DesktopDatePicker id="effDate"
                                        label="Date Of Journey"
                                        inputFormat="YYYY/MM/DD"
                                        value={dateOfJourney}
                                        onChange={handleDateOfJourneyChange}
                                        name="effectiveDate"
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </FormControl>
                        </Grid>

                        <Grid xs={12} item={true} sm={6} lg={6}>
                            <FormControl fullWidth>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <TimePicker
                              label="Arrival Time"
                              value={arrivalTime}
                              onChange={handleArrivalTimeChange}
                              renderInput={(params) => <TextField {...params} />}
                            />
                          </LocalizationProvider>
                            </FormControl>
                        </Grid>

                        <Grid xs={12} item={true} sm={6} lg={6}>
                            <FormControl fullWidth>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <TimePicker
                              label="Departure Time"
                              value={departureTime}
                              onChange={handleTimeChange}
                              renderInput={(params) => <TextField {...params} />}
                            />
                          </LocalizationProvider>
                            </FormControl>
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

export default UpdateBus;
