import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./index.scss"

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  let location = useLocation();
  return (
    <Box className='menu-container'>
      <BottomNavigation
        showLabels
        value={location.pathname === '/liked' ? 1 : 0}
        onChange={(event, newValue) => {
          const page = newValue === 0 ? '/' : '/liked';
          setValue(newValue);
          navigate(page, {replace: true});
        }}
      >
        <BottomNavigationAction label="Search" icon={<SearchIcon />} />
        <BottomNavigationAction label="Favorite" icon={<FavoriteIcon />} />
      </BottomNavigation>
    </Box>
  );
}