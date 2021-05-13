import React from "react";
// import { Typography } from "@material-ui/core";
import SignUpForm from "~/components/signUp/SignUpForm";
import { withRouter } from "react-router";
const SignUp = (props) => {

  const comeBack = () => {
    props.history.push("/login");
  };

  return (
    <>
      <SignUpForm comeback={comeBack}/>
    </>
  );
};

export default withRouter(SignUp);