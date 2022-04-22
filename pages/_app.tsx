import Footer from '@/components/Footer'
import NavBar from '@/components/NavBar'
import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'

import { Provider, useDispatch } from 'react-redux'
import { store } from '@/store'
import { autoLoginReducer, wax } from '@/store/userSlice'
import { useTypedSelector } from '@/hooks/useTypedSelector'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <NavBar/>
      <Component {...pageProps} />
      <Footer/>
    </Provider>
  )
}

export default MyApp
