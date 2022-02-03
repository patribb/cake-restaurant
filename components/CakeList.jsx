import styles from "../styles/CakeList.module.css";
import CakeCard from "./CakeCard";

const CakeList = ({cakeList}) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Los Mejores Dulces de la ciudad</h1>
      <p className={styles.desc}>
        Pastelería y Panadería Artesana con una larga tradición en el pastelería
        cordobesa. Obrador Propio y fabricación diaria de todos nuestros
        productos. Especializados en Tartas a domicilio Córdoba.
      </p>
      <div className={styles.wrapper}>
        {cakeList.map((cake) => (
          <CakeCard key={cake.title} cake={cake} />
        ))}
      </div>
    </div>
  );
};

export default CakeList;
