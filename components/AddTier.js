import Image from 'next/image'
import styles from './global.module.css'

const AddTier = ({tiers, value, onValueChange}) => {
    return ( 
        <div>
        {tiers.map(tier => (
          <label key={tier.sys.id} >
            <Image
        src={"/assets/buttons/"+tier.fields.shape.replace(/\s+/g, '').toLowerCase()+".svg"}
        alt={tier.fields.shape}
        width={150}
        height={150}
      />
          <input className={styles.hidden} type="radio" checked={value===tier.fields.shape} name="tiers" value={tier.fields.shape} required onChange={(e) => onValueChange(e.target.value)}/>
        </label>
        ))}
        </div>
     );
}
 
export default AddTier;