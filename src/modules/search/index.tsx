import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import TextField from "@mui/material/TextField";
import "./index.scss"

export default function SearchBox(props: any) {
  const { enter } = props;
  return (
    <Box>
      <TextField onKeyPress={enter} className="search-container" id="outlined-basic" label="Enter GitHub username, i.e. gaearon" variant="outlined" />
    </Box>
  );
}