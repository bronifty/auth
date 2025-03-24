import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/App.js";

ReactDOM.render(
    <App />,
  document.getElementById('book-club-app')
);

// ReactDOM.render(
//   <OIDCProvider
//     domain="localhost:9443"
//     tokenEp="https://localhost:9443/oauth2/token"
//     authzEp="https://localhost:9443/oauth2/authorize"
//     clientId="D4ZoMSpsxqgvUuiC6j5ROnEYea0a"
//     issuer="https://localhost:9443/oauth2/token"
//     redirectUri={window.location.origin}
//   >
//   <App />
// </OIDCProvider>,
// document.getElementById('book-club-app')
// );


