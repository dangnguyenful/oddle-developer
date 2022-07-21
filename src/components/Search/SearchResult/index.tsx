import React, { useState } from "react";
import { Box, CircularProgress, Pagination } from "@mui/material";
import "./index.scss"
import { connect } from 'react-redux';
import { useEffect } from "react";
import paging_config from "config/paging";
import DefaultSearch from "../DefaultSearch";
import { checkStringNull } from "utils/stringUtil";
import NotFound from "../NotFound";
import SearchContent from "../SearchContent";

function SearchResult(props: any) {
  const { users, loading, setLoading, sagaMiddleware, getUsers, searchString } = props;
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(10);
  const [currentData, setCurrentData] = useState([]);
  const [totalDataNumber, setTotalDataNumber] = useState(0);
  const PER_PAGE = paging_config.per_page;

  const handleChange = (e: any, p: any) => {
    setLoading(true);
    setPage(p);
    sagaMiddleware.run(getUsers, searchString, p, PER_PAGE);
  };

  useEffect(() => {
    setLoading(false)
    if (!users.data) return;
    if (users.data.items) setCurrentData(users.data.items);
    const itemsLength = users.data.total_count;
    setTotalDataNumber(itemsLength);
    const totalDataLength = itemsLength ? itemsLength : 0;
    if (totalDataLength) setCount(Math.ceil(itemsLength / PER_PAGE));
  }, [users]);

  useEffect(() => {
    setCurrentData([]);
  }, []);

  const isDefault = () => {
    return checkStringNull(searchString) && !currentData.length && !loading;
  }

  const isNotFound = () => {
    return !currentData.length && !checkStringNull(searchString) && !loading;
  }

  const isSearchFound = () => {
    return !loading && currentData.length && !checkStringNull(searchString);
  }

  const isShowPaging = () => {
    return currentData.length && !loading && totalDataNumber > PER_PAGE;
  }

  return (
    <Box className='search-result'>
      <Box className={ isSearchFound() ? 'total-users' : 'hide'}>
        {totalDataNumber} Github users found
      </Box>

      <Box sx={{ display: 'flex' }} className={loading ? 'loading' : 'hide'}>
        <CircularProgress />
      </Box>

      <Box className={ isDefault() ? "" : "hide"}>
        <DefaultSearch />
      </Box>

      <Box className={ isNotFound() ? "" : "hide"}>
        <NotFound searchString={searchString}/>
      </Box>

      <Box className={ isSearchFound() ? "" : "hide"}>
        <SearchContent currentData={currentData} sagaMiddleware={sagaMiddleware}/>
      </Box>

      <Pagination
        className={`pagination-customize ${isShowPaging() ? "" : "hide"}`}
        count={count}
        size="medium"
        page={page}
        variant="outlined"
        shape="rounded"
        onChange={handleChange}
      />
    </Box>
  );
}

export default connect(
  ({ users }) => ({ users })
)(SearchResult);
