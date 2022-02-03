import axios from 'axios'
import Head from 'next/head'
import { useState } from 'react'
import Add from '../components/Add'
import AddButton from '../components/AddButton'
import CakeList from '../components/CakeList'
import Featured from '../components/Featured'
import styles from '../styles/Home.module.css'

export default function Home({cakeList, admin}) {

  const [close, setClose] = useState(true);

  return (
    <div className={styles.container}>
      <Head>
        <title>Cake Corner</title>
        <meta name="description" content="Los mejores pasteles de la ciudad" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
      {admin && <AddButton setClose={setClose} />}
      <CakeList cakeList={cakeList} />
      {!close && <Add setClose={setClose} />}
    </div>
  )
}

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";
  let admin = false;

  if (myCookie.token === process.env.TOKEN) {
    admin = true;
  }

  const res = await axios.get("https://cake-restaurant.vercel.app/api/products");
  return {
    props: {
      cakeList: res.data,
      admin,
    },
  };
};
