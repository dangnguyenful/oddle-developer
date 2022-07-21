import "./index.scss"
import Box from "@mui/material/Box";
import UserItem from "components/Users/UserItem";
import { useEffect } from "react";
import { getUser } from "redux/sagas";
function SearchContent(props: any) {
  const {currentData, sagaMiddleware} = props;

  useEffect(() => {
    for (let index = 0; index < currentData.length; index++) {
      const element = currentData[index];
      sagaMiddleware.run(getUser, element.login);
    }
  }, [currentData]);

  return (
    <Box className='search-content'>
      <div style={{ width: '100%' }}>
        <Box
          sx={{
            display: 'grid',
            gap: 1,
            gridTemplateColumns: 'repeat(2, 1fr)',
          }}
        >
          {currentData.map((v: any) => {
            return (
              <UserItem key={v.id} userName={v.login} sagaMiddleware={sagaMiddleware}/>
            );
          })}
        </Box>
      </div>
    </Box>
  );
}

export default SearchContent