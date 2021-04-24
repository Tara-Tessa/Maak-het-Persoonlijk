import Image from 'next/image'
import styles from './global.module.css'

const AddInnerCake = ({cakes, value, onValueChange}) => {
  //console.log(cakes)
    return ( 
        <div>
          {cakes.map(cake => (
          <label key={cake.sys.id}>
            <Image
        src={"/assets/buttons/"+cake.fields.name.replace(/\s+/g, '').toLowerCase()+".svg"}
        alt={cake.fields.name}
        width={150}
        height={150}
      />
          <input className={styles.hidden} type="radio" checked={value===cake.fields.name} name="cake" value={cake.fields.name} required onChange={(e) => onValueChange(e.target.value)}/>
        </label>
        ))}
        </div>
     );
}
 
export default AddInnerCake;