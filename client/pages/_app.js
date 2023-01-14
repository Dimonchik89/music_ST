import { useState, useEffect } from 'react';
import { Provider } from 'react-redux'
import store from '../store/store'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '../styles/reset.scss'
import '../styles/globals.scss'

import 'swiper/css';
import "swiper/css/grid";
import 'swiper/scss/navigation';

function MyApp({ Component, pageProps }) {

  const theme = createTheme({
    palette: {
      white: {
        main: "#fff",
      }
    },
    breakpoints: {
      values: {
        xl: 1300
      }
    }
  });

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  )
}

export default MyApp
