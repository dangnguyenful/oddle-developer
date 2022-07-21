import Box from "@mui/material/Box";
import "./index.scss"
import SearchIcon from '@mui/icons-material/Search';

function NotFound(props: any) {
  const {searchString} = props;
  return (
    <Box className='not-found'>
      <Box>
        <SearchIcon />
      </Box>
      No search result found for <br/><Box sx={{ fontWeight: 'bold' }}>{searchString}</Box>
    </Box>
  );
}

export default NotFound