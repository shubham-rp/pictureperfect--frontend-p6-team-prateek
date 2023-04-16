import { useAuthContext } from "../../hooks/useAuthContext";
import { CircularProgress } from "@mui/material";
import React, { useState, useEffect } from "react";
import { makeStyles } from "tss-react/mui";
import {
  Box,
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
  Typography,
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
    dialogHeader: {
      textAlign: "center",
      fontWeight: "bold",
      color: theme.palette.primary.main,
    },
    dialogContentTextHeader: {
      fontWeight: "bold",
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
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
                    <TableCell>{booking.bookingId}</TableCell>
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
              <DialogTitle className={classes.dialogHeader}>
                Booking Details
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  <span className={classes.dialogContentTextHeader}>
                    {" "}
                    Booking ID:
                  </span>{" "}
                  {selectedBooking.bookingId}
                  <br />
                  <br />
                  <span className={classes.dialogContentTextHeader}>
                    Event:
                  </span>{" "}
                  {selectedBooking.userSelectCategory}
                  <br />
                  <br />
                  <span className={classes.dialogContentTextHeader}>
                    Client Name:
                  </span>{" "}
                  {selectedBooking.userName}
                  <br />
                  <br />
                  <span className={classes.dialogContentTextHeader}>
                    Amount Paid:{" "}
                  </span>{" "}
                  {selectedBooking.totalAmount}
                  <br />
                  <br />
                  <span className={classes.dialogContentTextHeader}>
                    {" "}
                    Event Address:
                  </span>{" "}
                  {selectedBooking.userAddress} {selectedBooking.userPinCode}
                  <br />
                  <br />
                  <span className={classes.dialogContentTextHeader}>
                    Contact Number:
                  </span>{" "}
                  {selectedBooking.userContactNumber}
                  <br />
                  <span className={classes.dialogContentTextHeader}>
                    Alternate Contact Number:
                  </span>{" "}
                  {selectedBooking.userAlternateContactNumber}
                  <br />
                  <span className={classes.dialogContentTextHeader}>
                    {" "}
                    Email :
                  </span>{" "}
                  {selectedBooking.userEmail}
                  <br />
                  <br />
                  <span className={classes.dialogContentTextHeader}>
                    From Date:
                  </span>{" "}
                  {handleDateDisplay(selectedBooking.fromDate)}
                  <br />
                  <span className={classes.dialogContentTextHeader}>
                    To Date:
                  </span>{" "}
                  {handleDateDisplay(selectedBooking.toDate)}
                  <br />
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
