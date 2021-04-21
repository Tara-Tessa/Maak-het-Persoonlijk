import Image from 'next/image'
import styles from './global.module.css'

const AddFondant = ({fondants, value, onValueChange}) => {
    return ( 
        <div>
          {fondants.map(fondant => (
          <label key={fondant.sys.id} >
            <Image
        src={"/assets/buttons/"+fondant.fields.type.replace(/\s+/g, '').toLowerCase()+".svg"}
        alt={fondant.fields.type}
        width={200}
        height={200}
      />
          <input className={styles.hidden} type="radio" checked={value===fondant.fields.type} name="fondant" value={fondant.fields.type} required onChange={(e) => onValueChange(e.target.value)}/>
        </label>
        ))}
        </div>
     );
}
 
export default AddFondant;