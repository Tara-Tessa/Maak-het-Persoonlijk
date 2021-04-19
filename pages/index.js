import Head from 'next/head'
import Layout from '../components/layout'
import { useState } from "react";
import styles from '../styles/Home.module.css'
import AddCake from '../components/AddCake';

export default function Home({data, tiers, cakes, deco, fondants}) {
  const [totals, setTotals] = useState(data);
  //console.log(totals, tiers, cakes, deco, fondants);

  const handleSubmit = async (input) => {
    input.article = data.id;
    //console.log(process.env.NEXT_PUBLIC_STRAPI_URL);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/totals/`,
      {
        method: "POST",
        body: JSON.stringify(input),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      const result = await response.json();
      const tmp = [...totals, result];
      setTotals(tmp);
    }
  };
  
  return (
    <div className={styles.container}>
      <Layout/>
      <ul>
        {totals.map(total => (
          <li key={total.id}>{total.cake.name}</li>
        ))}
      </ul>
      <p>{totals[0].cake.name}</p>
      <AddCake data={data} tiers={tiers} cakes={cakes} deco={deco} fondants={fondants} onSubmit={handleSubmit} />
    </div>
  )
}

export async function getStaticProps() {
  // Get external data from the file system, API, DB, etc.
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/totals`);
  const data = await res.json()

  const resTiers = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/tiers`);
  const tiers = await resTiers.json()

  const resCakes = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/cakes`);
  const cakes = await resCakes.json()

  const resDeco = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/decorations`);
  const deco = await resDeco.json()

  const resFondants = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/fondants`);
  const fondants = await resFondants.json()

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
      fondants: fondants
    }, // will be passed to the page component as props
  }
}