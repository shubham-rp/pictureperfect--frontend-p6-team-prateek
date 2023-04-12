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

    dialogHeader: {
      textAlign: "center",
      color: theme.palette.primary.main,
      fontWeight: "bold",
    },
    dialogContentTextHeader: {
      fontWeight: "bold",
    },
    dialogContentTextHeader2: {
      fontSize: 20,
      fontWeight: "bold",
      color: theme.palette.primary.main,
    },
  };
});

const ClientBookingHistory = () => {
  const { user } = useAuthContext();
  const { classes } = useStyles();
  const [bookings, setBookings] = useState([]);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_API_URL}/api/bookings/all`,

        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
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
                  <TableCell>Studio Name</TableCell>
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
                    <TableCell>{booking.studio.userData.studioName}</TableCell>
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
                    Amount Paid:{" "}
                  </span>{" "}
                  {selectedBooking.totalAmount}
                  <br />
                  <br />
                  <span className={classes.dialogContentTextHeader}>
                    {" "}
                    Your Event Address:
                  </span>{" "}
                  {selectedBooking.userAddress} {selectedBooking.userPinCode}
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
                  <br />
                  <span className={classes.dialogContentTextHeader2}>
                    Studio Details
                  </span>
                  <br />
                  <br />{" "}
                  <span className={classes.dialogContentTextHeader}>
                    Name:
                  </span>{" "}
                  {selectedBooking.studio.userData.studioName}
                  <br />
                  <br />{" "}
                  <span className={classes.dialogContentTextHeader}>
                    Phone Number:
                  </span>{" "}
                  {selectedBooking.studio.userData.studioPhoneNumber}
                  <br />{" "}
                  <span className={classes.dialogContentTextHeader}>
                    WhatsApp Number:
                  </span>{" "}
                  {selectedBooking.studio.userData.studioWhatsAppNumber}
                  <br />
                  <br />{" "}
                  <span className={classes.dialogContentTextHeader}>
                    {" "}
                    Address :
                  </span>{" "}
                  {selectedBooking.studio.userData.studioAddress}
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
};

export default ClientBookingHistory;
