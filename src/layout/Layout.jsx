import React, { Fragment } from 'react'
import { Outlet } from 'react-router'
import Footer from './Footer'
import Header from './Header'

export default function Layout() {
  return (
    <Fragment>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </Fragment>
  )
}