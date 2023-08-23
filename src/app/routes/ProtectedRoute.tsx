import React, {  useState } from "react";
import { Navigate,  } from "react-router-dom";
import { getItem } from "@app/helper/localstorage.helper";
import moment from "moment";

export const AuthCheck = (): any => {
  let auth = false

  const userLoggedIn = getItem('credentials')

  if (userLoggedIn && userLoggedIn.hasOwnProperty("access_token")) {
    const prevAccepted = getItem("accepted");

    const expirationDuration = 1000 * 60 * 60 * 24 * 7; // 1 days default if remember 3 weeks
    const currentTime: any = moment().valueOf();
    const notAccepted = prevAccepted?.time == undefined;
    const prevAcceptedExpired = prevAccepted?.time != undefined && currentTime - prevAccepted?.time > expirationDuration;

    if (notAccepted || prevAcceptedExpired) {
      auth = false
      localStorage.clear()
    } else {
      auth = true
    }

  }

  return auth
}

interface Props {
  children: JSX.Element
  path?: string
}

const ProtectedRoutes: React.FC<Props> = ({ children }) => {
  const isAuthenticated = AuthCheck() // get from state
  const [path] = useState<string>("/signin")

  if (isAuthenticated) {
    return children
  }

  if (!isAuthenticated) {
    return <Navigate to={path} />
  }


  // if (isAuthenticated) {
  //   return <Container><Error500 /></Container>
  // }

  return <></>;
}

export default ProtectedRoutes