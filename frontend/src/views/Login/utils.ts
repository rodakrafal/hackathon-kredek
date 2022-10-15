import { useState } from "react";
import { deafultUser, UserInfo } from "../../context/UserContext/utils";

export interface Token {
  accessToken: string;
  tokenType: string;
  username: string;
  error: string;
}

export interface State {
  username: string;
  password: string;
  showPassword: boolean;
}

export function validateUserData(user: State) {
  let error = "";
  let isCorrect = true;

  if (user.username?.length === 0) {
    isCorrect = false;
    error = "Username cannot be empty!";
  }

  return { error, isCorrect };
}

// const handleLogin = (username: string, password: string): LoginResponse => {
//   const auth = btoa(`${username}:${password}`);
//   const [error, setError] = useState<string>();
//   const [user, setUser] = useState<string>(deafultUser);

//   const {
//     data,
//     error: apolloError,
//     loading,
//   } = useLazyQuery<Token>(USER_LOGIN, {
//     variables: { username: username, auth: auth },
//   });

//   const [getCountries, { loading, data }] = useLazyQuery(GET_COUNTRIES);

//   if (data) {
//     const user = {
//       token: data.accesToken,
//       displayName: data.username,
//     };
//     // userContext?.login(userLogged);
//   }

//   return {};

//   // fetchUserJSON()
//   //   .then((user) => {
//   // const userLogged = {
//   //   username: values.username,
//   //   displayName: user.userFullName,
//   //   email: user.userMail,
//   // };
//   // userContext?.login(userLogged);
//   //   })
//   //   .catch((error) => {
//   //     console.log(error.message);
//   //   });
// };
