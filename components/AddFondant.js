import Image from 'next/image'
import styles from './global.module.css'

const AddFondant = ({fondants, value, onValueChange}) => {
    return ( 
        <div>
          {fondants.map(fondant => (
          <label key={fondant.id} >
            <Image
        src={"/assets/buttons/"+fondant.Type.replace(/\s+/g, '').toLowerCase()+".svg"}
        alt={fondant.Type}
        width={200}
        height={200}
      />
          <input className={styles.hidden} type="radio" checked={value===fondant.id} name="fondant" value={fondant.id} required onChange={(e) => onValueChange(e.target.value)}/>
        </label>
        ))}
        </div>
     );
}
 
export default AddFondant;