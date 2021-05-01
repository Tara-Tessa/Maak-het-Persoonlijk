import React, { useState, useEffect } from 'react';
import styles from "./AddCake.module.css";

const ChangeClass = ({stateValue, stateFondant, stateCake, stateTiers, stateDeco, candles, meringue, icing, buttercream, setCandles, setMeringue, setIcing, setButtercream}) => {
    
  const [deco, setDeco] = useState(["start"]);
  
    if (stateDeco) {
    useEffect(() => {
      //console.log(deco);

      if (stateValue.length < 1) {
        //console.log(stateDeco);
        setDeco(stateDeco);
        //console.log(deco);
      } else {
        const tmp = stateValue;
        setDeco(tmp);
      }
   
    
    if (deco.includes("Candles")){
      if (stateTiers == "Straight"){
        setCandles("candles_straight");
      } else {
        setCandles("candles_stairs");
      }
    } 
    
    if (deco.includes("Meringue")){
      if (stateTiers == "Straight" && deco.includes("Meringue with Strawberries")){
        setMeringue("meringuewithstrawberries_straight");
      } else if (stateTiers == "Straight" && deco.includes("Meringue with Cherries")){
        setMeringue("meringuewithcherries_straight");
      } else if (stateTiers == "Stairs" && deco.includes("Meringue with Strawberries")){
        setMeringue("meringuewithstrawberries_stairs");
      } else {
        setMeringue("meringuewithcherries_stairs");
      }
    } 
    if (deco.includes("Icing")) {
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
    } 
    if (deco.includes("Butter Cream")) {
      setButtercream("buttercream");
    }
  })
  }

    return ( 
        <div className={styles.plateau}>
          <div className={styles.container}>
           {stateFondant &&
            <div className={styles[stateFondant.replace(/\s+/g, '').toLowerCase()]}></div> 
            }
            {stateTiers &&
            <div className={styles[stateTiers.replace(/\s+/g, '').toLowerCase()]}></div> 
            }
            {stateCake &&
            <div className={styles[stateCake.replace(/\s+/g, '').toLowerCase()]}></div> 
            }
            {meringue &&
          <div className={styles[meringue]}></div>
            }
            {icing &&
          <div className={styles[icing]}></div>
            }
            {candles &&
          <div className={styles[candles]}></div>
            }
            {buttercream &&
          <div className={styles[buttercream]}></div>
            }
          </div>
        </div>
     );
}
 
export default ChangeClass;