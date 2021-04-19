import Image from 'next/image'
import styles from './global.module.css'

const AddDecoration = ({deco, value, onValueChange}) => {
    return ( 
        <div>
          {deco.map(decoration => (
          <label key={decoration.id} >
            <Image
        src={"/assets/buttons/"+decoration.Type.replace(/\s+/g, '').toLowerCase()+".svg"}
        alt={decoration.Type}
        width={200}
        height={200}
      />
          <input className={styles.hidden} type="checkbox" checked={value===decoration.id} name="decoration" value={decoration.id} onChange={(e) => onValueChange(e.target.value)} />
        </label>
        ))}
        </div>
     );
}
 
export default AddDecoration;