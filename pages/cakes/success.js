import { createClient as deliveryClient } from "contentful";
import React, { useState } from 'react';
import styles from "./cake.module.css";
import Layout from "../../components/layout";
import copy from 'copy-to-clipboard';
import ChangeClass from "../../components/ChangeClass";

const success = (data) => {

    const cake = data.data.items[0];

    console.log(cake);

    const [candles, setCandles] = useState("");
    const [meringue, setMeringue] = useState("");
    const [icing, setIcing] = useState("");
    const [buttercream, setButtercream] = useState("");
    const [text, setText] =useState("Click to copy and send it to your Birthday Friend!")

    const changeText = () => {
      setText("Successfully copied!");
    }


    const stateTiers = cake.fields.tier;
    const stateFondant = cake.fields.fondant;
    const stateCake = cake.fields.cake;
    const decoration = cake.fields.decorations;
    const stateDeco = decoration;
    const [stateValue, setValue] = useState("");

    return ( 
        <div className={styles.container}>
            <Layout />
            <h2 className={styles.success}>You have successfully made a birthday Cake</h2>
            <div className={styles.detail}>
            <ChangeClass stateValue={stateValue} stateDeco={stateDeco} stateTiers={stateTiers} stateCake={stateCake} stateFondant={stateFondant} candles={candles} meringue={meringue} icing={icing} buttercream={buttercream} setCandles={(candles) => setCandles(candles)} setMeringue={(meringue) => setMeringue(meringue)} setIcing={(icing) => setIcing(icing)} setButtercream={(buttercream) => setButtercream(buttercream)} />
            <div className={styles.text}>
            <h2 className={styles.title}>{cake.fields.title}</h2>
            <p className={styles.message}>{cake.fields.message}</p>
            <p className={styles.clickcopy}>{text}</p>
            <div className={styles.link}>
            <a
         onClick={() => {
           copy(`https://maak-het-persoonlijk-lime.vercel.app/cakes/${cake.fields.nanoid}`)
           changeText()
         }} >{`https://maak-het-persoonlijk-lime.vercel.app/cakes/${cake.fields.nanoid}`}</a>
         </div>
            </div>
        </div>
        </div>
     );
}
 
export default success;


export async function getStaticProps() {
  // Get external data from the file system, API, DB, etc.

  const client = deliveryClient({
    accessToken: process.env.CONTENTFUL_ACCES_KEY,
    space: process.env.CONTENTFUL_SPACE_ID,
  });


  const data = await client.getEntries({content_type: 'total'});

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
      //revalidate: 1
    }, // will be passed to the page component as props
  }
}