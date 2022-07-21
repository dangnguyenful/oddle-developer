import Search from './components/Search';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Detail from './components/Detail';
import Favorite from './components/Favorite';
import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Root from './themes/media-queries';
import './App.scss';
import { Box, PaletteMode } from '@mui/material';
import SimpleBottomNavigation from './modules/bottom-navigation';

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });


function App(props: any) {
  const {mode, sagaMiddleware} = props;
  const colorMode = React.useContext(ColorModeContext);
  return (
    <Root className='root-container'>
      <Box
          sx={{
          bgcolor: 'background.default',
          color: 'text.primary',
      }} className='page-container'>
        <Router>
          <Routes>
            <Route path='/' element={<Search colorMode={colorMode} mode={mode} sagaMiddleware={sagaMiddleware}/>} />
            <Route path='/users/:username' element={<Detail colorMode={colorMode} mode={mode} sagaMiddleware={sagaMiddleware}/>} />
            <Route path='/liked' element={<Favorite colorMode={colorMode} mode={mode} sagaMiddleware={sagaMiddleware}/>} />
          </Routes>
          <SimpleBottomNavigation />
        </Router>
      </Box>
    </Root>
  );
}

function ToggleColorMode(props: any) {
  const {sagaMiddleware} = props;
  const [mode, setMode] = React.useState<PaletteMode>('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === 'light' ? 'dark' : 'light',
        );
      },
    }),
    [],
  );

  const getDesignTokens = (mode: PaletteMode) => ({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
          background: {
            default: '#fff'
          }
          }
        : {
          background: {
            default: '#000'
          }
        }),
      icons: {
        ...(mode === 'light'
        ? {
          primary: 'rgba(0, 0, 0, 0.5)',
        }
        : {
          primary: '#fff'
        }),
      },
      text: {
        ...(mode === 'light'
        ? {
          primary: '#000',
          github: 'rgba(0, 0, 0, 0.5)'
        }
        : {
          primary: '#fff',
          github: '#fff'
        }),
      },
    },
  });
  
  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <App mode={mode} sagaMiddleware={sagaMiddleware}/>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default ToggleColorMode;
