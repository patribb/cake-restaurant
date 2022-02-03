import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import styles from "../../styles/Admin.module.css";

const Index = ({orders, products}) => {
  const [cakeList, setCakeList] = useState(products);
  const [orderList, setOrderList] = useState(orders);
  const status = ["preparando", "de camino", "entregado"];

  const handleDelete = async (id) => {
    console.log(id);
    try {
      const res = await axios.delete(
        "https://cake-restaurant.vercel.app/api/products/" + id
      );
      setPizzaList(pizzaList.filter((pizza) => pizza._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleStatus = async (id) => {
    const item = orderList.filter((order) => order._id === id)[0];
    const currentStatus = item.status;

    try {
      const res = await axios.put("https://cake-restaurant.vercel.app/api/orders/" + id, {
        status: currentStatus + 1,
      });
      setOrderList([
        res.data,
        ...orderList.filter((order) => order._id !== id),
      ]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <h1 className={styles.title}>Productos</h1>
        <table className={styles.table}>
          <thead>
            <tr className={styles.trTitle}>
              <th>Imagen</th>
              <th>Id</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          
          {cakeList.map((product) => (
            <tbody key={product._id}>
            <tr  className={styles.trTitle}>
              <td>
                <Image
                  src={product.image}
                  width={50}
                  height={50}
                  alt="cake"
                  objectFit="cover"
                />
              </td>
              <td>{product._id.slice(0, 5)}...</td>
              <td>{product.title}</td>
              <td>{product.prices[0]} €</td>
              <td>
                <button className={styles.button}>Editar</button>
                <button
                  className={styles.button}
                  onClick={() => handleDelete(product._id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
            </tbody>
          ))}
            
         
        </table>
      </div>
      <div className={styles.item}>
      <h1 className={styles.title}>Pedidos</h1>
      <table className={styles.table}>
          <thead>
            <tr className={styles.trTitle}>
              <th>Id</th>
              <th>Cliente</th>
              <th>Total</th>
              <th>Pago</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          {orderList.map((order)=>(
            <tbody key={order._id}>
            <tr className={styles.trTitle}>
              <td>{order._id.slice(0, 5)}...</td>
              <td>{order.customer}</td>
              <td>{order.total} €</td>
              <td>{order.method === 0 ? (<span>efectivo</span>) : <span>pagado</span>}</td>
              <td>{status[order.status]}</td>
              <td>
                <button onClick={() => handleStatus(order._id)} className={styles.button}>Siguiente paso</button>
              </td>
            </tr>
          </tbody>
          ))}
          
        </table>
      </div>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";

  if (myCookie.token !== process.env.TOKEN) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }

  const productRes = await axios.get("https://cake-restaurant.vercel.app/api/products");
  const orderRes = await axios.get("https://cake-restaurant.vercel.app/api/orders");

  return {
    props: {
      orders: orderRes.data,
      products: productRes.data,
    },
  };
};

export default Index;
