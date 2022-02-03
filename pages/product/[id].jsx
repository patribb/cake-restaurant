import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "../../styles/Product.module.css";
import {addProduct} from '../../redux/cartSlice';

const Product = ({ cake }) => {
  const [price, setPrice] = useState(cake.prices[0]);
  const [size, setSize] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [extras, setExtras] = useState([]);
  const dispatch = useDispatch()

  const changePrice = (number) => {
    setPrice(price + number);
  };

  const handleSize = (sizeIndex) => {
    const difference = cake.prices[sizeIndex] - cake.prices[size];
    setSize(sizeIndex);
    changePrice(difference);
  };

  const handleChange = (e, option) => {
    const checked = e.target.checked;

    if (checked) {
      changePrice(option.price);
      setExtras((prev) => [...prev, option]);
    } else {
      changePrice(-option.price);
      setExtras(extras.filter((extra) => extra._id !== option._id));
    }
  };

  const handleClick = () => {
    dispatch(addProduct({...cake, extras, price, quantity}));
  }

  return (
    <div className={styles.container}>
    <div className={styles.left}>
      <div className={styles.imgContainer}>
        <Image src={cake.image} objectFit="contain" layout="fill" alt="" />
      </div>
    </div>
    <div className={styles.right}>
      <h1 className={styles.title}>{cake.title}</h1>
      <span className={styles.price}>{price} €</span>
      <p className={styles.desc}>{cake.desc}</p>
      <h3 className={styles.choose}>Elige tamaño</h3>
      <div className={styles.sizes}>
        <div className={styles.size} onClick={() => handleSize(0)}>
          <Image src="/img/size.png" layout="fill" alt="" />
          <span className={styles.number}>Pequeña</span>
        </div>
        <div className={styles.size} onClick={() => handleSize(1)}>
          <Image src="/img/size.png" layout="fill" alt="" />
          <span className={styles.number}>Mediana</span>
        </div>
        <div className={styles.size} onClick={() => handleSize(2)}>
          <Image src="/img/size.png" layout="fill" alt="" />
          <span className={styles.number}>Grande</span>
        </div>
      </div>
      <h3 className={styles.choose}>Elige los extras opcionales</h3>
      <div className={styles.ingredients}>
        {cake.extraOptions.map((option) => (
          <div className={styles.option} key={option._id}>
            <input
              type="checkbox"
              id={option.text}
              name={option.text}
              className={styles.checkbox}
              onChange={(e) => handleChange(e, option)}
            />
            <label htmlFor="double">{option.text}</label>
          </div>
        ))}
      </div>
      <div className={styles.add}>
        <input
          onChange={(e) => setQuantity(e.target.value)}
          type="number"
          defaultValue={1}
          className={styles.quantity}
        />
        <button className={styles.button} 
        onClick={handleClick}
        >
          Añadir
        </button>
      </div>
    </div>
  </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(
    `http://localhost:3000/api/products/${params.id}`
  );
  return {
    props: {
      cake: res.data,
    },
  };
};

export default Product;
