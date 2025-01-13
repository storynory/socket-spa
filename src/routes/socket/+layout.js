
export const ssr = false;
export const load = ({ url }) => {
    return { pathname: url.pathname };
  };