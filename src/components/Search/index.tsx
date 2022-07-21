import { Box, CircularProgress, FormControlLabel, Grid } from "@mui/material";
import IOSSwitch from "themes/ios-switch";
import SearchBox from "modules/search";
import SearchResult from "./SearchResult";
import {getUsers} from "redux/sagas";
import { useState } from "react";
import paging_config from "config/paging";
import { checkStringNull } from "utils/stringUtil";

function Search(props: any) {
  const { colorMode, mode, sagaMiddleware } = props;
  const [loading, setLoading] = useState(false);
  const [searchString, setSearchString] = useState('');
  const onKeyPress = (e: any) => {  if (e.which == 13) {
    const valueSearch = e.target.value;
    if (checkStringNull(valueSearch)) return;
    setLoading(true);
    setSearchString(valueSearch);
    sagaMiddleware.run(getUsers, valueSearch, 1, paging_config.per_page);
  }};
  
  return (
    <Box >
      <Box className='header'>
        <Grid container spacing={0}>
          <Grid item sm={6} md={6} lg={6} xl={6} xs={6}>
            <div className="page-title">search</div>
          </Grid>
          <Grid item sm={6} md={6} lg={6} xl={6} xs={6} className='right-content'>
            <FormControlLabel
              control={<IOSSwitch sx={{ m: 1 }} />} checked={ mode === 'dark' ? true : false } onChange={colorMode.toggleColorMode}
              label=""
            />
          </Grid>
        </Grid>
      </Box>
      <Box className="search-box">
        <SearchBox enter={onKeyPress}/>
      </Box>
      <Box className='body-container'>
        <SearchResult loading={loading} 
        setLoading={setLoading} 
        sagaMiddleware={sagaMiddleware} 
        getUsers={getUsers}
        searchString={searchString}/>
      </Box>
    </Box>
  );
}

export default Search
