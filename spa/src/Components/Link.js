import * as React from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as MuiLink } from "@mui/material";


const Link = props => {
  return (
    <MuiLink {...props} component={ReactRouterLink} to={props.href ?? "#"} />
  );
};

export default Link;