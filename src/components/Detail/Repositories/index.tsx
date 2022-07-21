import { Box, BoxProps, CircularProgress, Pagination } from "@mui/material";
import "./index.scss";
import { useEffect, useState } from "react";
import paging_config from "config/paging";
import { getRepos } from "redux/sagas";
import { connect } from "react-redux";
import { checkMultiCount } from "utils/stringUtil";

function Item(props: BoxProps) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
        color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
        border: '1px solid',
        borderColor: (theme) =>
          theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
        p: 1,
        borderRadius: 2,
        fontSize: '0.875rem',
        fontWeight: '700',
        ...sx,
      }}
      {...other}
    />
  );
}
function Repositories(props: any) {
  const {userName, sagaMiddleware, repos, totalPage} = props;
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(10);
  const [totalDataNumber, setTotalDataNumber] = useState(0);
  const PER_PAGE = paging_config.per_page;
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any, p: any) => {
    setLoading(true);
    setPage(p);
    sagaMiddleware.run(getRepos, userName, p, PER_PAGE);
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
    if (userName) sagaMiddleware.run(getRepos, userName, 1, PER_PAGE);
  }, [userName]);

  useEffect(() => {
    setLoading(false);
  }, [repos]);

  const isShowData = () => {
    return !loading;
  }

  return (
    <Box className='repositories'>

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
          {repos.data.map((v: any) => {
            return (
              <Item className='item' key={v.id}>
                <Box sx={{ display: 'inline' }} className='item-information'>
                  <p className='repo-name'>{v.name}</p>
                  <p className={`forks ${v.forks_count ? "" : "hide"}`}>{checkMultiCount(v.forks_count, 'fork')}</p>
                  <p className={`stargazers ${v.stargazers_count ? "" : "hide"}`}>{checkMultiCount(v.stargazers_count, 'stargazer')}</p>
                </Box>
              </Item>
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
  ({ repos }) => ({ repos })
)(Repositories);