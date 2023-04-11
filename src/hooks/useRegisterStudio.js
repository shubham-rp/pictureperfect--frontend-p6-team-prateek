import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useRegisterStudio = () => {
  const [registerStudioError, setRegisterStudioError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const { dispatch } = useAuthContext();

  const register = async (signUpData) => {
    const {
      studioName,
      studioEmail,
      password,
      studioAddress,
      studioCity,
      studioPincode,
      studioPhoneNumber,
      studioWhatsAppNumber,
      studioProfilePicture,
      studioCategory,
      studioAbout,
      studioDailyRate,
    } = signUpData;
    setIsLoading(true);
    setRegisterStudioError(null);

    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_API_URL}/api/user/register-studio`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studioName,
          studioEmail,
          password,
          studioAddress,
          studioCity,
          studioPincode,
          studioPhoneNumber,
          studioWhatsAppNumber,
          studioProfilePicture,
          studioCategory,
          studioAbout,
          studioDailyRate,
        }),
      }
    );

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setRegisterStudioError(json.error);
    }
    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));
      // update the auth context
      dispatch({ type: "LOGIN", payload: json });
      // update loading state
      setIsLoading(false);
    }
  };

  return { register, isLoading, registerStudioError };
};
