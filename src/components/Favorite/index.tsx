import { Box, FormControlLabel, Grid } from "@mui/material";
import IOSSwitch from "themes/ios-switch";
import FavoriteContent from "./FavoriteContent";

function Favorite(props: any) {
  const { colorMode, mode, sagaMiddleware } = props;
  return (
    <Box>
      <Box className='header'>
        <Grid container spacing={0}>
          <Grid item sm={6} md={6} lg={6} xl={6} xs={6}>
            <div className="page-title">favorite</div>
          </Grid>
          <Grid item sm={6} md={6} lg={6} xl={6} xs={6} className='right-content'>
            <FormControlLabel
              control={<IOSSwitch sx={{ m: 1 }} />} checked={ mode === 'dark' ? true : false } onChange={colorMode.toggleColorMode}
              label=""
            />
          </Grid>
        </Grid>
      </Box>
      <Box className='body-container'>
        <FavoriteContent sagaMiddleware={sagaMiddleware}/>
      </Box>
    </Box>
  );
}

export default Favorite