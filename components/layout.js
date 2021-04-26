import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from "next/link";

export default function Layout() {
  return (
    <>
    <Head>
        <title>Make it Personal</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>


    <h1 className={styles.title}>
          <Link href="/">
            <a>Make it Personal</a>
          </Link>
        </h1>

    </>
  )
}