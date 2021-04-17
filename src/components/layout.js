import React from "react";
import { BodyStyle } from "../styled";

function Layout(props) {
  return <BodyStyle>{props.children}</BodyStyle>;
}

export default Layout;
