import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`


  * {
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
  }
  
  body {
    background: #fff;
    font-family: 'Roboto', sans-serif;
    margin: 0;
    overflow: hidden;
    padding: 0;
  }
  
  a {
    color: inherit;
    text-decoration: none;
  }
  
  h1, h2, h3, main, button {
    all: unset;
  }

  .Toastify__toast-body {
    margin-right: 20px;
  } 
`;
