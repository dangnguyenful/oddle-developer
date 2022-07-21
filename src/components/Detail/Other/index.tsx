import { Box, Typography } from "@mui/material";
import "./index.scss";
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Repositories from "../Repositories";
import Followers from "../Followers";
import Followings from "../Followings";
import { SyntheticEvent, useEffect, useState } from "react";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function Other(props: any) {
  const {user, sagaMiddleware} = props;
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box>
      {user && user.data ? 
        <Box sx={{ width: '100%' }} className='other'>
          <Box>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label={'Repositories' + '(' + user.data.public_repos + ')'} {...a11yProps(0)} className='tab-item' />
              <Tab label={'Followers' + '(' + user.data.followers + ')'} {...a11yProps(1)} className='tab-item' />
              <Tab label={'Followings' + '(' + user.data.following + ')'} {...a11yProps(2)} className='tab-item' />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Repositories userName={user.data.login} totalPage={user.data.public_repos} sagaMiddleware={sagaMiddleware}/>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Followers userName={user.data.login} totalPage={user.data.followers} sagaMiddleware={sagaMiddleware}/>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Followings userName={user.data.login} totalPage={user.data.following} sagaMiddleware={sagaMiddleware}/>
          </TabPanel>
        </Box>
        : null
      }
    </Box>
  );
}
export default Other