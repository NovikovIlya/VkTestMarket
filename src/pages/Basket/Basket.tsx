import { useState } from "react";
import styles from "./Basket.module.css";
import { useFetchCartQuery } from "../../store/api";

function Basket() {
  const { data, isLoading, error } = useFetchCartQuery({});
  console.log(data);
  return (
    <>
      <div className={styles.container}>
        <div>
          {data?.products?.map((item: any) => (
            <div key={item.id}>
              <img src={item.images[0]} />
              {item.title}
            </div>
          ))}
        </div>
        <div></div>
      </div>
    </>
  );
}

export default Basket;
