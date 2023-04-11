import { useAuthContext } from "../../hooks/useAuthContext";
import { CircularProgress } from "@mui/material";
import React, { useState, useEffect } from "react";
import { makeStyles } from "tss-react/mui";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import axios from "axios";

const useStyles = makeStyles()((theme) => {
  return {
    tableHead: {
      color: "white",
      backgroundColor: "#D9D9D9",
    },
    table: {
      minWidth: 650,
    },
  };
});

function BookingTable() {
  const { classes } = useStyles();
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_API_URL}/api/bookings/all`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        setBookings(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [user]);

  const handleDateDisplay = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const formattedDate = date.toLocaleDateString("en-US", options);

    return formattedDate;
  };

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedBooking(null);
  };

  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="bookings table">
              <TableHead className={classes.tableHead}>
                <TableRow>
                  <TableCell>Serial Number</TableCell>
                  <TableCell>Booking ID</TableCell>
                  <TableCell>Client Name</TableCell>
                  <TableCell>Event Category</TableCell>
                  <TableCell>From Date</TableCell>
                  <TableCell>To Date</TableCell>

                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookings.map((booking, index) => (
                  <TableRow key={booking._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{booking._id}</TableCell>
                    <TableCell>{booking.userName}</TableCell>
                    <TableCell>{booking.userSelectCategory[0]}</TableCell>
                    <TableCell>
                      {" "}
                      {handleDateDisplay(booking.fromDate)}
                    </TableCell>
                    <TableCell> {handleDateDisplay(booking.toDate)}</TableCell>

                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleViewDetails(booking)}
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {selectedBooking && (
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Booking Details</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Booking ID: {selectedBooking._id}
                  <br />
                  From Date: {handleDateDisplay(selectedBooking.fromDate)}
                  <br />
                  To Date: {handleDateDisplay(selectedBooking.toDate)}
                  <br />
                  Studio Name: {selectedBooking.studioName}
                  <br />
                  {/* add additional fields here */}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary" autoFocus>
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          )}
        </>
      )}
    </>
  );
}

export default BookingTable;
