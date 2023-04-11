import axios from "axios";
import React, { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
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
    <>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <StudioSignUp categories={categories} cities={cities} />
      )}
    </>
  );
}

export default RegisterPhotoStudio;
