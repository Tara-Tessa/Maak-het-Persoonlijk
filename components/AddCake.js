const AddCake = ({data, tiers, cakes, deco, fondants, onSubmit}) => {

    const handleSubmit = (e) => {
    console.log(e);
    e.preventDefault();
    const data = {
      title: e.target.title.value,
      message: e.target.message.value,
      tiers: e.target.tiers.value,
      cake: e.target.cake.value,
      decoration: e.target.decoration.value,
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
          <label key={tier.id}>
          {tier.Shape}
          <input type="radio" name="tiers" value={tier.Shape} required />
        </label>
        ))}
        </div>
        <div>
          {cakes.map(cake => (
          <label key={cake.id}>
          {cake.name}
          <input type="radio" name="cake" value={cake.name} required />
        </label>
        ))}
        </div>
        <div>
          {deco.map(decoration => (
          <label key={decoration.id}>
          {decoration.Type}
          <input type="radio" name="decoration" value={decoration.Type} required />
        </label>
        ))}
        </div>
        <div>
          {fondants.map(fondant => (
          <label key={fondant.id}>
          {fondant.Type}
          <input type="radio" name="fondant" value={fondant.Type} required />
        </label>
        ))}
        </div>
        <input type="submit" value="Send" />
      </form>

        </>
     );
}
 
export default AddCake;
