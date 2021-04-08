import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Layout() {
  return (
    <>
    <Head>
        <title>Maak het Persoonlijk</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className={styles.title}>
          Maak het Persoonlijk
        </h1>

    </>
  )
}