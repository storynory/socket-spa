
export const ssr = false;
// src/routes/+layout.js
export const load = ({ url }) => {
    return { pathname: url.pathname };
  };