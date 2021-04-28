import React, { useState, useEffect } from 'react';
import styles from "./AddCake.module.css";

const ChangeClass = ({stateValue, stateFondant, stateCake, stateTiers, stateDeco, candles, meringue, icing, buttercream, setCandles, setMeringue, setIcing, setButtercream}) => {
  
    if (stateDeco) {
    const deco = stateValue
    useEffect(() => {
    if (deco == "Candles"){
      if (stateTiers == "Straight"){
        setCandles("candles_straight");
      } else {
        setCandles("candles_stairs");
      }
    } else if (deco.includes("Meringue")){
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
  }

    return ( 
        <div className={styles.plateau}>
          <div className={styles.container}>
          <div className={styles[stateFondant.replace(/\s+/g, '').toLowerCase()]}></div>
          <div className={styles[stateTiers.replace(/\s+/g, '').toLowerCase()]}></div>
          <div className={styles[stateCake.replace(/\s+/g, '').toLowerCase()]}></div>
          <div className={styles[meringue]}></div>
          <div className={styles[icing]}></div>
          <div className={styles[candles]}></div>
          <div className={styles[buttercream]}></div>
          </div>
        </div>
     );
}
 
export default ChangeClass;