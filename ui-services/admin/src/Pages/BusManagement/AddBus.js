import React, { useState } from "react";
import {
  Autocomplete,
  TextField,
  Button,
  Container,
  Grid,
} from "@mui/material";
// import cityList from "./cityList.json";
import axios from "axios";
import SnackToast from "../../components/SnackToast/Index";
import Loading from "../../components/Loading/Loading";

const baseUrl = 'http://localhost:8080'

function AddBus() {
  const [busNumber, setBusNumber] = useState(null);
  const [busName, setBusName] = useState(null);
  const [driverName, setDriverName] = useState("");
  const [busType, setBusType] = useState("");
  const [totalSeat, setTotalSeat] = useState("");
  const [fair, setFair] = useState("");

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
    setLoading(true);
  };

  return (
    <Container maxWidth="sm">
      {Loading ? <Loading open={loading} /> : ""}
      <h2>Add New Bus</h2>
      <SnackToast open={openSnack} onClose={handleClose} severity={severity} message={message} />
      <form onSubmit={handleSubmit}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <TextField
              label="Bus Number"
              variant="outlined"
              value={busNumber}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Bus Name"
              variant="outlined"
              value={busName}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Driver Name"
              variant="outlined"
              value={driverName}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Bus Type"
              variant="outlined"
              value={busType}
            />
          </Grid>
         
          <Grid item xs={12}>
            <TextField
              label="Total Seats"
              variant="outlined"
              value={totalSeat}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Fair"
              variant="outlined"
              value={fair}
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
