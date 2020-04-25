import React from "react";

function footer(){
  const date = new Date();
  const year = date.getFullYear();

  return <footer><p>Copyright © {year} Samuel Simogiarto</p></footer>
  ;
}

export default footer;
