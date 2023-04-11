import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";
import ClientBookingCard from "./ClientBookingCard";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.primary.main,

  borderColor: theme.palette.primary.main,
}));

const ClientBookingHistory = () => {
  const { user } = useAuthContext();
  const [bookingData, setBookingData] = useState([]);

  useEffect(() => {
    const getBookingData = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_API_URL}/api/bookings/all`,

        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      setBookingData(response.data);
    };
    if (user) {
      getBookingData();
    }
  }, [user]);

  return (
    <div>
      <Toolbar />
      <Typography paragraph>Client Booking History</Typography>
      <Box sx={{ width: "100%" }}>
        <Stack spacing={2}>
          {bookingData.map((item, index) => {
            return (
              <Item key={index}>
                {" "}
                <ClientBookingCard {...item} />{" "}
              </Item>
            );
          })}
        </Stack>
      </Box>
    </div>
  );
};

export default ClientBookingHistory;
