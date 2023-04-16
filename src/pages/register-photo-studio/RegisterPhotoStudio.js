import axios from "axios";
import React, { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/material";
import StudioSignUp from "../../components/signup/StudioSignUp";

function RegisterPhotoStudio() {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_API_URL}/api/categories/all`
        );

        setCategories(response.data);

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };

    const fetchCityData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_API_URL}/api/cities/all`
        );

        setCities(response.data);

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };

    setIsLoading(true);
    fetchCategoryData();
    fetchCityData();
  }, [setIsLoading, setCategories, setCities]);

  return (
    <Box
      sx={{
        background: `linear-gradient(to left, rgb(161, 255, 206, 0.3), rgb(250, 255, 209, 0.3))`,
      }}
    >
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
        <StudioSignUp categories={categories} cities={cities} />
      )}
    </Box>
  );
}

export default RegisterPhotoStudio;
