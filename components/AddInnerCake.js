import Image from 'next/image'
import styles from './global.module.css'

const AddInnerCake = ({cakes, value, onValueChange}) => {
    return ( 
        <div>
          {cakes.map(cake => (
          <label key={cake.id}>
            <Image
        src={"/assets/buttons/"+cake.name.replace(/\s+/g, '').toLowerCase()+".svg"}
        alt={cake.name}
        width={200}
        height={200}
      />
          <input className={styles.hidden} type="radio" checked={value===cake.id} name="cake" value={cake.id} required onChange={(e) => onValueChange(e.target.value)}/>
        </label>
        ))}
        </div>
     );
}
 
export default AddInnerCake;