import { createClient as deliveryClient } from "contentful";
import styles from "./cake.module.css";
import React, { useState, useEffect } from 'react';
import Layout from "../../components/layout";
import copy from 'copy-to-clipboard'

const Cake = (cake) => {
    const [candles, setCandles] = useState("");
    const [meringue, setMeringue] = useState("");
    const [icing, setIcing] = useState("");
    const [buttercream, setButtercream] = useState("");

    console.log(cake)

    const stateTiers = cake.cake.fields.tier;
    const stateFondant = cake.cake.fields.fondant;
    const decoration = cake.cake.fields.decorations;
    const arrDeco = decoration.split(",");
    console.log(arrDeco);
    arrDeco.map(deco => {
        console.log(deco);
        useEffect(() => {
        if (deco == "Candles"){
          if (stateTiers == "Straight"){
            setCandles("candles_straight");
          } else {
            setCandles("candles_stairs");
          }
        }  else if (deco.includes("Meringue")){
          if (stateTiers == "Straight" && deco== "Meringue with Strawberries"){
            setMeringue("meringuewithstrawberries_straight");
          } else if (stateTiers == "Straight" && deco== "Meringue with Cherries"){
            setMeringue("meringuewithcherries_straight");
          } else if (stateTiers == "Stairs" && deco== "Meringue with Strawberries"){
            setMeringue("meringuewithstrawberries_stairs");
          } else {
            setMeringue("meringuewithcherries_stairs");
          }
        } else if (deco == "Icing") {
          if (stateTiers == "Stairs") {
            if (stateFondant == "Pistachio") {
              setIcing("icing_pistachio_stairs");
            } else if (stateFondant == "Blueberry") {
              setIcing("icing_blueberry_stairs");
            } else if (stateFondant == "Vanilla") {
              setIcing("icing_vanilla_stairs");
            } else if (stateFondant == "Strawberry") {
              setIcing("icing_strawberry_stairs");
            } else {
              setIcing("icing_chocolate_stairs");
            }
          } else {
            if (stateFondant == "Pistachio") {
              setIcing("icing_pistachio_straight");
            } else if (stateFondant == "Blueberry") {
              setIcing("icing_blueberry_straight");
            } else if (stateFondant == "Vanilla") {
              setIcing("icing_vanilla_straight");
            } else if (stateFondant == "Strawberry") {
              setIcing("icing_strawberry_straight");
            } else {
              setIcing("icing_chocolate_straight");
            }
          }
        } else if (deco == "Butter Cream") {
          setButtercream("buttercream");
        }
        })
    });
    return ( 
        <div className={styles.container}>
            <Layout />
            <div className={styles.detail}>
            <div className={styles.plateau}>
              <div className={styles.box}>
                  <div className={styles[cake.cake.fields.fondant.replace(/\s+/g, '').toLowerCase()]}></div>
                  <div className={styles[cake.cake.fields.tier.replace(/\s+/g, '').toLowerCase()]}></div>
                  <div className={styles[cake.cake.fields.cake.replace(/\s+/g, '').toLowerCase()]}></div>
                  <div className={styles[meringue]}></div>
                  <div className={styles[icing]}></div>
                  <div className={styles[candles]}></div>
                  <div className={styles[buttercream]}></div>
              </div>
            </div>
            <div className={styles.text}>
            <h2 className={styles.title}>{cake.cake.fields.title}</h2>
            <p className={styles.message}>{cake.cake.fields.message}</p>
            <p className={styles.clickcopy}>Click to copy and send it to your Birthday Friend!</p>
            <a href="javascript:void(0)"
         onClick={() => {
           copy(`https://maak-het-persoonlijk-le13tej7v-tara-tessa.vercel.app/cakes/${cake.cake.sys.id}`)
         }} className={styles.link}>{`https://maak-het-persoonlijk-le13tej7v-tara-tessa.vercel.app/cakes/${cake.cake.sys.id}`}</a>
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
          params: {id: item.sys.id}
      }
  })

  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps = async ({params}) => {
    const {items} = await client.getEntries({
        content_type: 'total',
        'sys.id' : params.id
    })

    return {
        props: { cake: items[0]}
    }
}