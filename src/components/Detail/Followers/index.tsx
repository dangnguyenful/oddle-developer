import { Box, CircularProgress, Pagination } from "@mui/material";
import "./index.scss";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import paging_config from "config/paging";
import { getFollowers } from "redux/sagas";
import UserItem from "components/Users/UserItem";

function Followers(props: any) {
  const {sagaMiddleware, totalPage, userName, followers} = props;
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(10);
  const [totalDataNumber, setTotalDataNumber] = useState(0);
  const PER_PAGE = paging_config.per_page;
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any, p: any) => {
    setLoading(true);
    setPage(p);
    sagaMiddleware.run(getFollowers, userName, p, PER_PAGE);
  };

  const isShowPaging = () => {
    return totalDataNumber > PER_PAGE;
  }
  
  useEffect(() => {
    setLoading(true);
    if (totalPage) {
      setCount(Math.ceil(totalPage / PER_PAGE));
      setTotalDataNumber(totalPage);
    }
    if (userName) sagaMiddleware.run(getFollowers, userName, 1, PER_PAGE);
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [followers]);

  const isShowData = () => {
    return !loading;
  }

  return (
    <Box className='followers'>

      <Box sx={{ display: 'flex' }} className={loading ? 'loading' : 'hide'}>
        <CircularProgress />
      </Box>

      <div style={{ width: '100%' }} className={isShowData() ? '' : 'hide'}>
        <Box
          sx={{
            display: 'grid',
            gap: 1,
            gridTemplateColumns: 'repeat(2, 1fr)',
          }}
        >
          {followers.data.map((v: any) => {
            return (
              <UserItem key={v.id} userName={v.login} sagaMiddleware={sagaMiddleware}/>
            );
          })}
        </Box>
      </div>

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
  ({ followers }) => ({ followers })
)(Followers);