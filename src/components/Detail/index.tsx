import { Box, FormControlLabel, Grid } from "@mui/material";
import IOSSwitch from "themes/ios-switch";
import HomeIcon from '@mui/icons-material/Home';
import { Link, useParams } from "react-router-dom";
import "./index.scss"
import { useEffect } from "react";
import { getUser } from "redux/sagas";
import { connect } from "react-redux";
import Information from "./Information";
import React, { useState } from "react";
import Other from "./Other";

function Detail(props: any) {
  const { colorMode, mode, sagaMiddleware, user } = props;
  const { username } = useParams();
  const [userInfor, setUserInfo] = useState({});

  useEffect(() => {
    if (username) sagaMiddleware.run(getUser, username);
  }, [username]);

  useEffect(() => {
    if (user.data.login === username) {setUserInfo(user);}
  }, [user]);

  return (
    <Box>
      <Box className='header'>
        <Grid container spacing={0}>
          <Grid item sm={6} md={6} lg={6} xl={6} xs={6}>
            <div className="page-title">
              <Link to="/">
                <HomeIcon style={{ fontSize: '30px' }}/>
              </Link>
            </div>
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
        <Information user={userInfor}/>
        <Other user={userInfor} sagaMiddleware={sagaMiddleware}/>
      </Box>
    </Box>
  );
}

export default connect(
  ({ user }) => ({ user })
)(Detail);