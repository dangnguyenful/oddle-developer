import { Box } from "@mui/material";
import "./index.scss"
import PeopleIcon from '@mui/icons-material/People';

function DefaultFavorite() {
  return (
    <Box className='default-favorite'>
      <Box className="icon-item">
        <PeopleIcon style={{ fill: 'icons.primary', fontSize: '30px' }}/>
      </Box>
      <Box className="text-item" sx={{
        color: 'text.github',
      }}>
        <span>Once you like people, you'll see them here.</span>
      </Box>
    </Box>
  );
}

export default DefaultFavorite