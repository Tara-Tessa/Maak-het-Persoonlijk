import styles from "./AddCake.module.css";
import { useState } from "react";
import AddTier from "./AddTier";
import AddInnerCake from "./AddInnerCake";
import AddDecoration from "./AddDecoration";
import AddFondant from "./AddFondant";

const fetchForm = async () => {
  const test = await fetch(`https://api.getform.io/v1/forms/8a6b2b59-3f0f-4d2b-a62e-dfb5fd667777?token=8dKAgXGNfEWDDCgodxx5ugCKFwucEgonExfJvMZV7P6T2ucgXO9fTK5ozgtH`)
  const toast = await test.json()
  console.log(toast.data.submissions);
}


const AddCake = ({data, tiers, cakes, deco, fondants, onSubmit}) => {

  fetchForm()

  const [stateTiers, setTiers] = useState(1);
  const [stateCake, setCake] = useState(1);
  const [stateDeco, setDeco] = useState([]);
  const [stateFondant, setFondant] = useState(1);

  console.log(stateTiers)
  console.log(stateCake)
  console.log(stateDeco)
  console.log(stateFondant)

    const handleTierChange = (value) => {
      setTiers(parseInt(value));
    }

    const handleCakeChange = (value) => {
      setCake(parseInt(value))
    }

    const handleDecoChange = (value) => {
      const tmp = [...stateDeco];
      tmp.push(parseInt(value));
      setDeco(tmp);
    }

    const handleFondantChange = (value) => {
      setFondant(parseInt(value));
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
        <>
        <form action="https://getform.io/f/8a6b2b59-3f0f-4d2b-a62e-dfb5fd667777" method="POST" /* onSubmit={(e) => handleSubmit(e)} */>
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
        <p>{stateTiers}</p>
        <p>{stateCake}</p>
        <p>{stateDeco}</p>
        <p>{stateFondant}</p>
        </>
     );
}
 
export default AddCake;
