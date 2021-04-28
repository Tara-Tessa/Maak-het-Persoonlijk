import styles from "./skeleton.module.css";

const Skeleton = () => {
    return ( 
        <div className={styles.container}>
            <p className={styles.title}>Loading...</p>
        </div>
     );
}
 
export default Skeleton;