import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { user, dispatch } = useAuthContext();

  const logout = () => {
    // remove city & category from local storage for Client user
    if (user.role === "Client") {
      localStorage.removeItem("city");
      localStorage.removeItem("category");
    }

    // remove user from storage
    localStorage.removeItem("user");

    // dispatch logout action
    dispatch({ type: "LOGOUT" });
  };

  return { logout };
};
