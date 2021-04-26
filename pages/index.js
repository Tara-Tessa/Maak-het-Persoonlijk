import Head from 'next/head'
import Layout from '../components/layout'
import { useState } from "react";
import styles from '../styles/Home.module.css'
import AddCake from '../components/AddCake'
import { createClient as deliveryClient } from "contentful";
import Link from "next/link";

export default function Home({data, tiers, cakes, deco, fondants}) {
  const [totals, setTotals] = useState(data);
  //console.log(totals, tiers, cakes, deco, fondants);
  console.log(totals)

  const handleSubmit = async (input) => {
    console.log(input);
    if(input) {
      const response = await fetch(`/api/post`, 
      {
        method: "POST",
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({input}),
      });
      const d = await response.json();
      console.log(d);
    }
  };
  
  return (
    <div className={styles.container}>
      <Layout/>
      <AddCake tiers={tiers.items} cakes={cakes.items} deco={deco.items} fondants={fondants.items} onSubmit={handleSubmit} />                                                                             
      <div className={styles.previous}>
      {data.items.map(total => (
          <a key={total.sys.id} href={`/cakes/${total.sys.id}`}>
            <div className={styles.others}></div>
            <p className={styles.text}>{total.fields.title}</p>
            </a>
        ))}
      </div>
    </div>
  )
}

export async function getStaticProps() {
  // Get external data from the file system, API, DB, etc.

  const client = deliveryClient({
    accessToken: process.env.CONTENTFUL_ACCES_KEY,
    space: process.env.CONTENTFUL_SPACE_ID,
  });


  const data = await client.getEntries({content_type: 'total'});

  const tiers = await client.getEntries({content_type: 'tiers'});

  const cakes = await client.getEntries({content_type: 'cake'});

  const deco = await client.getEntries({content_type: 'decoration'});

  const fondants = await client.getEntries({content_type: 'fondant'});

  // The value of the `props` key will be
  //  passed to the `Home` component
    if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: { 
      data: data,
      tiers: tiers,
      cakes: cakes,
      deco: deco,
      fondants: fondants,
      revalidate: 1
    }, // will be passed to the page component as props
  }
}