import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "react-bootstrap/Button";

const LoginButton = () => {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <React.Fragment>
      {!isAuthenticated && (
        <Button variant="outline-light" onClick={() => loginWithRedirect()}>
          Log In
        </Button>
      )}
      {isAuthenticated && (
        <Button variant="outline-light" onClick={() => logout()}>
          {user.name} - Log out
        </Button>
      )}
    </React.Fragment>
  );
};

export default LoginButton;
