import { createClient as deliveryClient } from "contentful";
import styles from "./cake.module.css";
import React, { useState } from 'react';
import Layout from "../../components/layout";
import copy from 'copy-to-clipboard'
import Skeleton from "../../components/Skeleton";
import ChangeClass from "../../components/ChangeClass";

const Cake = (cake) => {
  if (!cake.cake) return <Skeleton/>

    const [candles, setCandles] = useState("");
    const [meringue, setMeringue] = useState("");
    const [icing, setIcing] = useState("");
    const [buttercream, setButtercream] = useState("");
    const [text, setText] =useState("Click to copy and send it to your Birthday Friend!")

    const changeText = () => {
      setText("Successfully copied!");
    }


    const stateTiers = cake.cake.fields.tier;
    const stateFondant = cake.cake.fields.fondant;
    const stateCake = cake.cake.fields.cake;
    const decoration = cake.cake.fields.decorations;
    const stateDeco = decoration/* .split(","); */
    const [stateValue, setValue] = useState("");
    
    return ( 
        <div className={styles.container}>
            <Layout />
            <div className={styles.detail}>
            <ChangeClass stateValue={stateValue} stateDeco={stateDeco} stateTiers={stateTiers} stateCake={stateCake} stateFondant={stateFondant} candles={candles} meringue={meringue} icing={icing} buttercream={buttercream} setCandles={(candles) => setCandles(candles)} setMeringue={(meringue) => setMeringue(meringue)} setIcing={(icing) => setIcing(icing)} setButtercream={(buttercream) => setButtercream(buttercream)} />
            <div className={styles.text}>
            <h2 className={styles.title}>{cake.cake.fields.title}</h2>
            <p className={styles.message}>{cake.cake.fields.message}</p>
            <p className={styles.clickcopy}>{text}</p>
            <div className={styles.link}>
            <a
         onClick={() => {
           copy(`https://maak-het-persoonlijk-lime.vercel.app/cakes/${cake.cake.fields.nanoid}`)
           changeText()
         }} >{`https://maak-het-persoonlijk-lime.vercel.app/cakes/${cake.cake.fields.nanoid}`}</a>
         </div>
            </div>
        </div>
        </div>
     );
}
 
export default Cake;

const client = deliveryClient({
accessToken: process.env.CONTENTFUL_ACCES_KEY,
space: process.env.CONTENTFUL_SPACE_ID,
});

export const getStaticPaths = async () => {
  const r = await client.getEntries({content_type: 'total'});

  const paths = r.items.map(item => {
      return {
          params: {nanoid: item.fields.nanoid}
      }
  })

  return {
    paths,
    fallback: true
  };
}

export const getStaticProps = async ({params}) => {
    const {items} = await client.getEntries({
        content_type: 'total',
        'fields.nanoid' : params.nanoid
    })

    console.log(items);

    if (!items.length) {
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      }
    }

    return {
        props: { cake: items[0]},
        revalidate: 1
    }
}