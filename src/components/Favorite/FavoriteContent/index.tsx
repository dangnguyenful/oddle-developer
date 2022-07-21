import { Box } from "@mui/material";
import UserItem from "components/Users/UserItem";
import name_config from "config/name";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getUser } from "redux/sagas";
import DefaultFavorite from "../DefaultFavorite";
import "./index.scss"
function FavoriteContent(props: any) {
  const {sagaMiddleware} = props;
  const [listFavorite, setListFavorite] = useState([]);

  const getListFavorite = () => {
    const favoriteListLocal = localStorage.getItem(name_config.favoriteListLocal);
    return favoriteListLocal ? JSON.parse(favoriteListLocal) : null;
  }

  useEffect(() => {
    let currentData = getListFavorite();
    if (currentData) {
      setListFavorite(currentData);
      for (let index = 0; index < currentData.length; index++) {
        const element = currentData[index];
        sagaMiddleware.run(getUser, element);
      }
    }
  }, []);

  return (
    <Box className='favorite-content'>
      {listFavorite && listFavorite.length
        ? 
        <div style={{ width: '100%' }}>
          <Box
            sx={{
              display: 'grid',
              gap: 1,
              gridTemplateColumns: 'repeat(2, 1fr)',
            }}
          >
            {listFavorite.map((v: any) => {
              return (
                <UserItem key={v} userName={v} sagaMiddleware={sagaMiddleware}/>
              );
            })}
          </Box>
        </div>
        : <DefaultFavorite />
      }
    </Box>
  );
}
export default FavoriteContent