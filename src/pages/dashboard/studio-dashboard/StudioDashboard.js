import { useEffect, useState } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

import StudioDashboardLayout from "../../../components/studio-dashboard/StudioDashboardLayout";

function StudioDashboard() {
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(true);
  const [studioData, setStudioData] = useState({});

  useEffect(() => {
    const fetchStudioData = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_API_URL}/api/studios/`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const userData = response.data;

      setStudioData(userData);
    };

    if (user) {
      fetchStudioData();
      setIsLoading(false);
    }
  }, [user]);

  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <StudioDashboardLayout {...studioData} />
      )}
    </>
  );
}

export default StudioDashboard;
