import Navbar from './navbar'
import Footer from './footer'
import RichHeader from './richheader'

/**
 * Contains RichHeader, Navbar and Footer as a wrapper
 * @example
 * <Layout>{children}</Layout>
 */
export default function Layout({ children }) {
  return (
    <>
      <RichHeader />
      <Navbar />

      {children}

      <Footer />
    </>
  )
}