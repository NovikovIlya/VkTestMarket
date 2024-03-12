import { useEffect } from "react";
import styles from "./Basket.module.css";
import CardItem from "../../components/CardItem/CardItem";
import SumItem from "../../components/SumItem/SumItem";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getData, updateTotalPrice } from "../../store/sliceData";

function Basket() {
  const data = useAppSelector((state) => state.sliceData.products);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getData());
  }, []);

  useEffect(() => {
    dispatch(updateTotalPrice());
  }, [data, dispatch]);

  return (
    <>
      <div className={styles.container}>
        <div>
          {data?.map((item: any) => (
            <CardItem
              key={item.id}
              id={item.id}
              image={item.images[0]}
              name={item.title}
              description={item.description}
              price={item.price}
              count={item.count}
            />
          ))}
        </div>
        <div className={styles.right}>
          <SumItem />
        </div>
      </div>
    </>
  );
}

export default Basket;
