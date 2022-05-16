import Header from './partials/header'
import Footer from './partials/footer'
import Head from 'next/head'


export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>StreamBox</title>
        <meta name="description" content="Generated  streamInfo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      < Header />
      <main className="px-20 py-5">{children}</main>
      <Footer />
    </>
  )
}
