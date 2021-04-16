const AddCake = ({data, tiers, cakes, deco, fondants, onSubmit}) => {

    const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      Title: e.target.title.value,
      Message: e.target.message.value,
      tier: e.target.tiers.value,
      cake: e.target.cake.value,
      decoration: e.target.decoration.forEach(item => {if (item.checked){return item.value}}),
      fondant: e.target.fondant.value,
    };
    console.log(data);
    //e.target.reset();
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
          <label key={tier.id}>
          {tier.Shape}
          <input type="radio" name="tiers" value={tier.id} required />
        </label>
        ))}
        </div>
        <div>
          {cakes.map(cake => (
          <label key={cake.id}>
          {cake.name}
          <input type="radio" name="cake" value={cake.id} required />
        </label>
        ))}
        </div>
        <div>
          {deco.map(decoration => (
          <label key={decoration.id}>
          {decoration.Type}
          <input type="checkbox" name="decoration" value={decoration.id} />
        </label>
        ))}
        </div>
        <div>
          {fondants.map(fondant => (
          <label key={fondant.id}>
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
