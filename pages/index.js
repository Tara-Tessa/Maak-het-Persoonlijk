import Head from 'next/head'
import Layout from '../components/layout'

import styles from '../styles/Home.module.css'
import Tiers from './tiers';

export default function Home(data) {
  const total = data.data;
  return (
    <div className={styles.container}>
      <Layout/>
      <Tiers />
      <p>{total[0].cake.name}</p>
{/*       <form>
        <label for="name">Name:</label>
        <input type="text" id="name" name="name"/>
        <label for="message">Message:</label>
        <input type="text" id="message" name="message"/>
        <input type="submit" value="Submit"/>
      </form> */}
    </div>
  )
}

export async function getStaticProps() {
  // Get external data from the file system, API, DB, etc.
  const res = await fetch(`${process.env.STRAPI_URL}/totals`);
  const data = await res.json()

  // The value of the `props` key will be
  //  passed to the `Home` component
    if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: { data }, // will be passed to the page component as props
  }
}