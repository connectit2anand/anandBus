import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
} from "@mui/material";
import axios from "axios";
import SnackToast from "../../components/SnackToast/Index";

const columns = [
  { id: "routeFrom", label: "From", minWidth: 150 },
  { id: "routeTo", label: "To", minWidth: 150 },
  { id: "distance", label: "Distance", minWidth: 150 },
];

// const rows = [
//   { id: 1, to: "City A", from: "City B", distance: "100 km" },
//   { id: 2, to: "City C", from: "City D", distance: "150 km" },
// ];

const baseUrl = 'http://localhost:8080'

function Routes() {

  const [rows, setRows] = useState([]);
  
  const [openSnack, setOpenSnack] = useState(false);
  const [loading, setLoading] = useState();
  const [severity, setSeverity] = useState('success');
  const [message, setMessage] = useState('');

  const handleClose = () => {
    setOpenSnack(false);
  };

  useEffect(() => {
    axios.get(`${baseUrl}/getAllRoute`)
    .then(res => {
      setRows(res.data);
    })
    .catch(res => {
      setOpenSnack(true);
      setSeverity('error');
      setMessage("Error in getting routes.");
    })
  },[])

  return (
    <Box>
      <SnackToast open={openSnack} onClose={handleClose} severity={severity} message={message} />
      <h2>Existing Routes</h2>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id} style={{ minWidth: column.minWidth }}>
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              {columns.map((column) => (
                <TableCell key={column.id}>{row[column.id]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}

export default Routes;
