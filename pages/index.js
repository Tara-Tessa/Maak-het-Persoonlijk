import Head from 'next/head'
import Layout from '../components/layout'
import { useState } from "react";
import styles from '../styles/Home.module.css'
import AddCake from '../components/AddCake'
import { createClient as deliveryClient } from "contentful";
import Link from "next/link";

export default function Home({data, tiers, cakes, deco, fondants}) {

  const handleSubmit = async (input) => {
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
    }
  };
  
  return (
    <div className={styles.container}>
      <Layout/>
      <AddCake total={data} tiers={tiers.items} cakes={cakes.items} deco={deco.items} fondants={fondants.items} onSubmit={handleSubmit}/>                                                                             
      <div className={styles.previous}>
      {data.items.map(total => (
        <Link key={total.sys.id} href={`/cakes/${total.fields.nanoid}`}>
          <a >
            <div className={styles.others}></div>
            <p className={styles.text}>{total.fields.title}</p>
            </a>
            </Link>
        ))}
      </div>
    </div>
  )
}

export async function getStaticProps() {

  const client = deliveryClient({
    accessToken: process.env.CONTENTFUL_ACCES_KEY,
    space: process.env.CONTENTFUL_SPACE_ID,
  });


  const data = await client.getEntries({content_type: 'total'});

  const tiers = await client.getEntries({content_type: 'tiers'});

  const cakes = await client.getEntries({content_type: 'cake'});

  const deco = await client.getEntries({content_type: 'decoration'});

  const fondants = await client.getEntries({content_type: 'fondant'});

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
    },
  }
}