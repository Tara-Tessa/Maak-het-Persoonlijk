import styles from "./AddCake.module.css";

const AddCake = ({data, tiers, cakes, deco, fondants, onSubmit}) => {

    const handleSubmit = (e) => {
    const test = e.target.decoration;
    const array = Array.from(test)
    const deco = array.map(item => {
      if (item.checked) 
      {
        console.log(item.value);
         return item.value
      } else {
        return 0;
      }
    })
    console.log(deco)
    e.preventDefault();
    const data = {
      Title: e.target.title.value,
      Message: e.target.message.value,
      tier: e.target.tiers.value,
      cake: e.target.cake.value,
      decoration: deco,
      fondant: e.target.fondant.value,
    };
    e.target.reset();
    onSubmit(data);
  };

    return ( 
        <>
        <form  onSubmit={(e) => handleSubmit(e)}>
        <label>
          Title:
          <input type="text" name="title" required />
        </label>
        <label>
          Message:
          <input type="textarea" name="message" required maxLength="500"/>
        </label>
        <div>
        <p>Shape of tiers:</p>
        {tiers.map(tier => (
          <label key={tier.id} className={styles[tier.Shape.replace(/\s+/g, '').toLowerCase()]} >
          {tier.Shape}
          <input type="radio" name="tiers" value={tier.id} required />
        </label>
        ))}
        </div>
        <div>
          {cakes.map(cake => (
          <label key={cake.id} className={styles[cake.name.replace(/\s+/g, '').toLowerCase()]}>
          {cake.name}
          <input type="radio" name="cake" value={cake.id} required />
        </label>
        ))}
        </div>
        <div>
          {deco.map(decoration => (
          <label key={decoration.id} className={styles[decoration.Type.replace(/\s+/g, '').toLowerCase()]}>
          {decoration.Type}
          <input type="checkbox" name="decoration" value={decoration.id} />
        </label>
        ))}
        </div>
        <div>
          {fondants.map(fondant => (
          <label key={fondant.id} className={styles[fondant.Type.replace(/\s+/g, '').toLowerCase()]}>
          {fondant.Type}
          <input type="radio" name="fondant" value={fondant.id} required />
        </label>
        ))}
        </div>
        <input type="submit" value="Send" />
      </form>

        </>
     );
}
 
export default AddCake;
