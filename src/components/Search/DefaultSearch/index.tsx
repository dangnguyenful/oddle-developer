import { Box, Typography } from "@mui/material";
import "./index.scss";
import GitHubIcon from '@mui/icons-material/GitHub';

function DefaultSearch() {
  return (
    <Box className='default-search'>
      <Box className="icon-item" sx={{ color: 'icons.primary' }}>
        <GitHubIcon style={{ fill: 'icons.primary', fontSize: '8em' }}/>
      </Box>
      <Box className="logo-item" sx={{ color: 'icons.primary' }}>
        <Typography variant="h3" gutterBottom component="div" className="github">
          GitHub
        </Typography>
      </Box>
      <Box className="text-item" sx={{
        color: 'text.github',
      }}>
        <span>Enter GitHub username and search users matching the input like Google Search, click avatars to view more details, including repositories, followers and following.</span>
      </Box>
    </Box>
  );
}

export default DefaultSearch