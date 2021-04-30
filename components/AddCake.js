import styles from "./AddCake.module.css";
import { useState, useEffect } from "react";
import AddTier from "./AddTier";
import AddInnerCake from "./AddInnerCake";
import AddDecoration from "./AddDecoration";
import AddFondant from "./AddFondant";
import ChangeClass from "./ChangeClass";
import { nanoid } from 'nanoid'
import { useRouter } from 'next/router'
import { route } from "next/dist/next-server/server/router";

const AddCake = ({total, tiers, cakes, deco, fondants, onSubmit}) => {
  const [stateTiers, setTiers] = useState("");
  const [stateCake, setCake] = useState("");
  const [stateDeco, setDeco] = useState([]);
  const [stateFondant, setFondant] = useState("");
  const [stateValue, setValue] = useState("start");

  const [candles, setCandles] = useState("");
  const [meringue, setMeringue] = useState("");
  const [icing, setIcing] = useState("");
  const [buttercream, setButtercream] = useState("");

  const router = useRouter();
  const id = nanoid();

    const handleTierChange = (value) => {
      setTiers(value);

      if (stateDeco.includes("Candles")){
        if (value == "Straight"){
        setCandles("candles_straight");
      } else {
        setCandles("candles_stairs");
      }
      }

      if (candles) {
        if (value == "Straight"){
        setCandles("candles_straight");
      } else {
        setCandles("candles_stairs");
      }
      } 
      
      if (meringue) {
        if (value == "Straight" && meringue=="meringuewithstrawberries_stairs"){
        setMeringue("meringuewithstrawberries_straight");
      } else if (value == "Straight" && meringue=="meringuewithcherries_stairs"){
        setMeringue("meringuewithcherries_straight");
      } else if (value == "Stairs" && meringue=="meringuewithstrawberries_straight"){
        setMeringue("meringuewithstrawberries_stairs");
      } else {
        setMeringue("meringuewithcherries_stairs");
      }
      } 
      
      if (icing){
        const icing_tier = icing.split("_")[2];
        const icing_color = icing.split("_")[1];
        if (value == "Straight" && icing_tier == "stairs"){
          setIcing(`icing_${icing_color}_straight`);
        } else if (value == "Stairs" && icing_tier == "straight") {
          setIcing(`icing_${icing_color}_stairs`);
        }
      }

    }

    const handleCakeChange = (value) => {
      setCake(value);
      setValue(value);
    }

    const handleDecoChange = (value) => {
      const tmp = [...stateDeco];
      setValue(value);
        if(tmp.includes("Meringue with Cherries") && value == "Meringue with Strawberries") {
          const index = tmp.indexOf("Meringue with Cherries");
          tmp.splice(index,1);
          tmp.push(value);
          setDeco(tmp);
        } else if (tmp.includes("Meringue with Strawberries") && value == "Meringue with Cherries"){
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
        }
    }

    const handleFondantChange = (value) => {
      setFondant(value);
      setValue(value);
      console.log(icing)
      if (icing){
          setIcing(`icing_${value.replace(/\s+/g, '').toLowerCase()}_${stateTiers.replace(/\s+/g, '').toLowerCase()}`);
      }
    }

    const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      Title: e.target.title.value,
      Message: e.target.message.value,
      tier: stateTiers,
      cake: stateCake,
      decorations: stateDeco.toString(),
      fondant: stateFondant,
      nanoid: id,
    };
    e.target.reset();
    const res = onSubmit(data);
    await res;
    router.push('/cakes/success', res);
  };

    return ( 
        <div className={styles.addCake}>
        <form onSubmit={(e) => handleSubmit(e)}> 
        <div className={styles.form}>
        <label className={styles.text}>
          Title:
          <input type="text" name="title" required />
        </label>
        </div>
        <div className={styles.form}>
        <label className={styles.text}>
          Message:
          <input type="textarea" name="message" required maxLength="500"/>
        </label>
        </div>
        <AddTier tiers={tiers} value={stateTiers} onValueChange={(value) => handleTierChange(value)}/>
        <AddInnerCake cakes={cakes} value={stateCake} onValueChange={(value) => handleCakeChange(value)}/>
        <AddDecoration deco={deco} value={stateDeco} onValueChange={(value) => handleDecoChange(value)}/>
        <AddFondant fondants={fondants} value={stateFondant} onValueChange={(value) => handleFondantChange(value)}/>
        <button type="submit" value="Send">Send</button>
      </form>
      <ChangeClass stateValue={stateValue} stateDeco={stateDeco} stateTiers={stateTiers} stateCake={stateCake} stateFondant={stateFondant} candles={candles} meringue={meringue} icing={icing} buttercream={buttercream} setCandles={(candles) => setCandles(candles)} setMeringue={(meringue) => setMeringue(meringue)} setIcing={(icing) => setIcing(icing)} setButtercream={(buttercream) => setButtercream(buttercream)} />
        </div>
     );
}
 
export default AddCake;
