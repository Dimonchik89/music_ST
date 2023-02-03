import { useState, useEffect } from 'react';
import { Provider } from 'react-redux'
import store from '../store/store'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Router from 'next/router';
import NProgress from 'nprogress';

import 'nprogress/nprogress.css';
import '../styles/reset.scss'
import '../styles/globals.scss'

import 'swiper/css';
import "swiper/css/grid";
import 'swiper/scss/navigation';

Router.events.on('routeChangeStart', () => NProgress.start()); 
Router.events.on('routeChangeComplete', () => NProgress.done()); 
Router.events.on('routeChangeError', () => NProgress.done());

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
