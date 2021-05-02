import React, { useState, useEffect } from 'react';
import styles from "./cake.module.css";
import Layout from "../../components/layout";
import copy from 'copy-to-clipboard';
import ChangeClass from "../../components/ChangeClass";
import { useRouter } from 'next/router';

const success = () => {
    const router = useRouter()
    const [cake, setCake] = useState({});

    useEffect(() => {
      if (router.isReady){
      setCake(router.query);
    }
    })

    const [candles, setCandles] = useState("");
    const [meringue, setMeringue] = useState("");
    const [icing, setIcing] = useState("");
    const [buttercream, setButtercream] = useState("");
    const [text, setText] =useState("Click to copy and send it to your Birthday Friend!")

    const changeText = () => {
      setText("Successfully copied!");
    }


    const stateTiers = cake.tier;
    const stateFondant = cake.fondant;
    const stateCake = cake.cake;
    const decoration = cake.decorations;
    const stateDeco = decoration;
    const [stateValue, setValue] = useState("");

    const url = `https://maak-het-persoonlijk-lime.vercel.app/cakes/${cake.nanoid}`;

    return ( 
        <div className={styles.container}>
            <Layout />
            <h2 className={styles.success}>You have successfully made a birthday Cake</h2>
            <div className={styles.detail}>
            <ChangeClass stateValue={stateValue} stateDeco={stateDeco} stateTiers={stateTiers} stateCake={stateCake} stateFondant={stateFondant} candles={candles} meringue={meringue} icing={icing} buttercream={buttercream} setCandles={(candles) => setCandles(candles)} setMeringue={(meringue) => setMeringue(meringue)} setIcing={(icing) => setIcing(icing)} setButtercream={(buttercream) => setButtercream(buttercream)} />
            <div className={styles.text}>
            <h2 className={styles.title}>{cake.Title}</h2>
            <p className={styles.message}>{cake.Message}</p>
            <p className={styles.clickcopy}>{text}</p>
            <div className={styles.link}>
            <a
         onClick={() => {
           copy(url)
           changeText()
         }} >{url}</a>
         </div>
            </div>
        </div>
        </div>
     );
}
 
export default success;
