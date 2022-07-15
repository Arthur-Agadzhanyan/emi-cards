import Footer from '@/widgets/footer'
import NavBar from '@/widgets/nav-bar'
import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'

import { Provider, useDispatch } from 'react-redux'
import { store } from '@/store'
import { autoLoginReducer, wax } from '@/store/userSlice'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
        <DndProvider backend={HTML5Backend}>
              <NavBar/>
                <Component {...pageProps} />
              <Footer/>
        </DndProvider>
    </Provider>
  )
}

export default MyApp
