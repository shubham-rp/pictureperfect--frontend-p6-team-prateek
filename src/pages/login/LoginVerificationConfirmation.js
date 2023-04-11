import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { useLogout } from "../../hooks/useLogout";
function LoginVerificationConfirmation() {

    const {logout} = useLogout();

  return (
    <div>
      <Link to="/">
        <Button onClick={()=>{logout()}}>Return To Login</Button>
      </Link>
      <Button>Resend Verification Mail</Button>
      <Link to="/contact-us">Contact Us</Link>
    </div>
  );
}

export default LoginVerificationConfirmation;
