import Image from "next/image";
import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <Image src="/img/bg.jpg" priority objectFit="cover" layout="fill" alt="" />
      </div>
      <div className={styles.item}>
        <div className={styles.card}>
          <h2 className={styles.motto}>
          OH SÍ, LO HICIMOS. CAKE CORNER, LA TARTA BIEN HORNEADA.
          </h2>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>ENCUÉNTRANOS</h1>
          <p className={styles.text}>
            1654 R. Don Road #304.
            <br /> Córdoba, 14005
            <br /> (611) 466-108
          </p>
       
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>HORARIO</h1>
          <p className={styles.text}>
            LUNES A VIERNES
            <br /> 9:00 – 22:00
          </p>
          <p className={styles.text}>
            SABADO - DOMINGO
            <br /> 12:00 – 24:00
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;

