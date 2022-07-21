import Box, { BoxProps } from "@mui/material/Box";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import "./index.scss"
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderSharpIcon from '@mui/icons-material/FavoriteBorderSharp';
import name_config from "config/name";
import { useNavigate } from "react-router-dom";
import { checkMultiCount } from "utils/stringUtil";
import { getUser } from "redux/sagas";

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
function UserItem(props: any) {
  const { userName, user, sagaMiddleware} = props;
  const [follower, setFollower] = useState('');
  const [following, setFollowing] = useState('');
  const [avatar, setAvatar] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    sagaMiddleware.run(getUser, userName);
  }, [userName]);

  useEffect(() => {
    if (user.data.login === userName) {
      const textFollower = checkMultiCount(user.data.followers, 'follower');
      const textFollowing = checkMultiCount(user.data.following, 'following');
      if (checkFavorite(userName)) setIsFavorite(true);
      setAvatar(user.data.avatar_url);
      setFollower(textFollower);
      setFollowing(textFollowing);
    }
  }, [user]);

  const checkFavorite = (userName: string) => {
    if (!localStorage) return;
    let favoriteList = [];
    const favoriteListLocal = localStorage.getItem(name_config.favoriteListLocal);
    if (favoriteListLocal) favoriteList = JSON.parse(favoriteListLocal);
    return favoriteList.indexOf(userName) !== -1;
  }

  const setFavorite = (userName: string, isAdd: boolean, event: any) =>{
    event.stopPropagation();
    if (!localStorage) return;
    let favoriteList = [];
    const favoriteListLocal = localStorage.getItem(name_config.favoriteListLocal);
    if (favoriteListLocal) favoriteList = JSON.parse(favoriteListLocal);
    if (favoriteList.indexOf(userName) === -1 && isAdd) {
      favoriteList.push(userName)
    } else {
      favoriteList.splice(favoriteList.indexOf(userName), 1);
    }
    localStorage.setItem(name_config.favoriteListLocal, JSON.stringify(favoriteList));
    setIsFavorite(isAdd);
  }

  const goToDetailPage = (userName: string) => {
    navigate('/users/' + userName, { replace: true });
  }

  return (
    <Item className='item' onClick={() => goToDetailPage(userName)}>
      <Box sx={{ display: 'inline' }}><img className="avatar" src={avatar} /></Box>
      <Box sx={{ display: 'inline' }} className='information'>
        <p className="user-name">{userName}</p>
        <p className="follower">{follower}</p>
        <p className="following">{following}</p>
      </Box>
      <span className="favorite">
        {isFavorite
          ? <FavoriteIcon style={{ fill: '#F44336' }} onClick={(e) => setFavorite(userName, false, e)}/>
          : <FavoriteBorderSharpIcon style={{ fill: '#F44336' }} onClick={(e) => setFavorite(userName, true, e)} />
        }
      </span>
    </Item>
  );
}

export default connect(
  ({ user }) => ({ user })
)(UserItem);