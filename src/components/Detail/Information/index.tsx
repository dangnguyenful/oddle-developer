import { Box, Typography } from "@mui/material";
import "./index.scss";
import ApartmentIcon from '@mui/icons-material/Apartment';

function Information(props: any) {
  const {user} = props;
  return (
    <Box className='information-detail'>
      {user && user.data ? 
        <Box>
          <Box className="avatar">
            <img src={user.data.avatar_url}/>
          </Box>

          <Box className={user.data.login ? "" : "hide"}>
            <Typography variant="h3" gutterBottom component="div" className="login">
              {user.data.login}
            </Typography>
          </Box>
          
          <Box className={user.data.bio ? "" : "hide"}>
            <Typography variant="h4" gutterBottom component="div" className="bio">
              {user.data.bio}
            </Typography>
          </Box>
          
          <Box className={user.data.company ? "" : "hide"}>
            <Typography variant="h5" gutterBottom component="div" className="company">
              <ApartmentIcon style={{ display: 'inline', verticalAlign: 'sub' }}/>
              {user.data.company}
            </Typography>
          </Box> 
        </Box>
        : null
      }
      
    </Box>
  );
}
export default Information