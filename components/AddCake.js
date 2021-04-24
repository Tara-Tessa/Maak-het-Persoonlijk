import styles from "./AddCake.module.css";
import { useState } from "react";
import AddTier from "./AddTier";
import AddInnerCake from "./AddInnerCake";
import AddDecoration from "./AddDecoration";
import AddFondant from "./AddFondant";




const AddCake = ({tiers, cakes, deco, fondants, onSubmit}) => {


  const [stateTiers, setTiers] = useState("");
  const [stateCake, setCake] = useState("");
  const [stateDeco, setDeco] = useState([]);
  const [stateFondant, setFondant] = useState("");
  const [candles, setCandles] = useState("");
  const [meringue, setMeringue] = useState("");
  const [icing, setIcing] = useState("");
  const [buttercream, setButtercream] = useState("");

  const changeClasses = (value) => {
    if (stateDeco) {
    const deco = value
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
  }
  }
    const handleTierChange = (value) => {
      setTiers(value);
    }

    const handleCakeChange = (value) => {
      setCake(value)
    }

    const handleDecoChange = (value) => {
      const tmp = [...stateDeco];
        if(tmp.includes("Meringue with Cherries") && value == "Meringue with Strawberries") {
          console.log("Cherries already in");
          const index = tmp.indexOf("Meringue with Cherries");
          console.log(index);
          tmp.splice(index,1);
          tmp.push(value);
          setDeco(tmp);
        } else if (tmp.includes("Meringue with Strawberries") && value == "Meringue with Cherries"){
          console.log("Strawberries already in");
          const index = tmp.indexOf("Meringue with Strawberries");
          tmp.splice(index,1);
          tmp.push(value);
          setDeco(tmp);
        } else {
          if (!tmp.includes(value)) {
            tmp.push(value);
            setDeco(tmp);
          } else {
            const index = tmp.indexOf(value);
            tmp.splice(index,1);
            setDeco(tmp);
          }
          changeClasses(value);
        }
      /* if (!tmp.includes(value)) {
        if(tmp.includes("Mirengue with Cherries")) {
          console.log("Cherries")
        } else if (tmp.includes("Mirengue with Strawberries")){
          console.log("Strawberries")
        } else {
          tmp.push(value);
          setDeco(tmp);
        }
      } */
    }

    const handleFondantChange = (value) => {
      setFondant(value);
    }

    const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      Title: e.target.title.value,
      Message: e.target.message.value,
      tier: stateTiers,
      cake: stateCake,
      decorations: stateDeco,
      fondant: stateFondant,
    };
    //e.target.reset();
    onSubmit(data);
  };

    return ( 
        <div className={styles.addCake}>
        <form onSubmit={(e) => handleSubmit(e)}>
        <label>
          Title:
          <input type="text" name="title" required />
        </label>
        <label>
          Message:
          <input type="textarea" name="message" required maxLength="500"/>
        </label>
        <AddTier tiers={tiers} value={stateTiers} onValueChange={(value) => handleTierChange(value)}/>
        <AddInnerCake cakes={cakes} value={stateCake} onValueChange={(value) => handleCakeChange(value)}/>
        <AddDecoration deco={deco} value={stateDeco} onValueChange={(value) => handleDecoChange(value)}/>
        <AddFondant fondants={fondants} value={stateFondant} onValueChange={(value) => handleFondantChange(value)}/>
        <button type="submit" value="Send">Send</button>
      </form>
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
        
        </div>
     );
}
 
export default AddCake;
