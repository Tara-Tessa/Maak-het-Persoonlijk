import Image from 'next/image'
import styles from './global.module.css'

const AddDecoration = ({deco, value, onValueChange}) => {
    return ( 
        <div>
          {deco.map(decoration => (
          <label key={decoration.sys.id} >
            <Image
        src={"/assets/buttons/"+decoration.fields.type.replace(/\s+/g, '').toLowerCase()+".svg"}
        alt={decoration.fields.type}
        width={200}
        height={200}
      />
          <input className={styles.hidden} type="checkbox" checked={value===decoration.fields.type} name="decoration" value={decoration.fields.type} onChange={(e) => onValueChange(e.target.value)} />
        </label>
        ))}
        </div>
     );
}
 
export default AddDecoration;