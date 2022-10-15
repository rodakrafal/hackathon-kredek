import React, { useContext, useState } from "react";

import { Button, Grid } from "@mui/material";

import { State, validateUserData } from "./utils";
import { PasswordInput } from "./components/PasswordInput";
import { UserNameInput } from "./components/UserNameInput";
import { UserContext } from "../../context/UserContext";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { UserInfo } from "../../context/UserContext/utils";

export const Login: React.FC = () => {
  const userContext = useContext(UserContext);

  const [values, setValues] = useState<State>({
    username: "",
    password: "",
    showPassword: false,
  });

  // const notify = (error: string) =>
  //   toast.error(error, {
  //     position: "top-center",
  //     autoClose: 5000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //   });

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  return (
    <>
      {/* <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
      /> */}
      <Grid
        container
        direction="column"
        alignContent="center"
        sx={{ height: "100vh" }}
        justifyContent="center"
      >
        <Grid item>
          <UserNameInput
            values={values}
            setValues={setValues}
            handleChange={handleChange("username")}
          />
          <PasswordInput
            values={values}
            setValues={setValues}
            handleChange={handleChange("password")}
          />
        </Grid>
        <Grid item alignContent="center" justifyContent="center" display="flex">
          <Button
            color="primary"
            // onClick={() =>
            //   handleLogin({
            //     variables: {
            //       username: values.username,
            //       auth: btoa(`${values.username}:${values.password}`),
            //     },
            //   })
            // }
            autoFocus={true}
            // onKeyDown={(event) => {
            //   if (event.ctrlKey && event.key === "Enter") {
            //     handleLogin({
            //       variables: {
            //         username: values.username,
            //         auth: btoa(`${values.username}:${values.password}`),
            //       },
            //     });
            //     console.log("click");
            //   }
            // }}
          >
            Login
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
