import Image from 'next/image'
import styles from './global.module.css'

const AddTier = ({tiers, value, onValueChange}) => {
    return ( 
        <div>
        {tiers.map(tier => (
          <label key={tier.id} >
            <Image
        src={"/assets/buttons/"+tier.Shape.replace(/\s+/g, '').toLowerCase()+".svg"}
        alt={tier.Shape}
        width={200}
        height={200}
      />
          <input className={styles.hidden} type="radio" checked={value===tier.id} name="tiers" value={tier.id} required onChange={(e) => onValueChange(e.target.value)}/>
        </label>
        ))}
        </div>
     );
}
 
export default AddTier;