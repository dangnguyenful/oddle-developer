import { Box, CircularProgress, Pagination } from "@mui/material";
import "./index.scss";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import paging_config from "config/paging";
import { getFollowing } from "redux/sagas";
import UserItem from "components/Users/UserItem";

function Followings(props: any) {
  const {sagaMiddleware, totalPage, userName, following} = props;
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(10);
  const [totalDataNumber, setTotalDataNumber] = useState(0);
  const PER_PAGE = paging_config.per_page;
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any, p: any) => {
    setLoading(true);
    setPage(p);
    sagaMiddleware.run(getFollowing, userName, p, PER_PAGE);
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
    if (userName) sagaMiddleware.run(getFollowing, userName, 1, PER_PAGE);
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [following]);

  const isShowData = () => {
    return !loading;
  }

  return (
    <Box className='followings'>

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
          {following.data.map((v: any) => {
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
  ({ following }) => ({ following })
)(Followings);