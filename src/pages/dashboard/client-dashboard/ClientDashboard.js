import { useEffect, useState } from "react";
import { makeStyles } from "tss-react/mui";
import { useAuthContext } from "../../../hooks/useAuthContext";
import CircularProgress from "@mui/material/CircularProgress";

import ClientDashboardLayout from "../../../components/client-dashboard/ClientDashboardLayout";

const useStyles = makeStyles()((theme) => {
  return {
    loadingComponent: {
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  };
});

function ClientDashboard() {
  const { classes } = useStyles();
  const { user } = useAuthContext();
  const [isLoading, setIsloading] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_API_URL}/api/clients`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const userData = await response.json();

      if (response.ok) {
        setFirstName(userData.firstName);
        setLastName(userData.lastName);
      }
    };

    if (user) {
      fetchUserData();
      setIsloading(false);
    }
  }, [user]);

  return (
    <>
      {isLoading ? (
        <div className={classes.loadingComponent}>
          <CircularProgress />
        </div>
      ) : (
        <ClientDashboardLayout
          clientFirstName={firstName}
          clientLastName={lastName}
        />
      )}
    </>
  );
}

export default ClientDashboard;
