import { useEffect } from "react";
import styles from "./Basket.module.css";
import CardItem from "../../components/CardItem/CardItem";
import SumItem from "../../components/SumItem/SumItem";
import { Spin, Empty } from "antd";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getData } from "../../store/sliceData";
import { Product } from "../../types/types";

function Basket() {
  const { products, isLoad, isError } = useAppSelector((state) => state.sliceData);
  const dispatch = useAppDispatch();

  // Запрос на получение данных
  useEffect(() => {
    dispatch(getData());
  }, []);


  return (
    <>
      {!isLoad && !isError && (
        <>
          <div className={styles.container}>
            <div>
              {products.length > 0 &&
                products?.map((item: Product) => (
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
            {products.length > 0 && (
              <div className={styles.right}>
                <SumItem />
              </div>
            )}
          </div>
          {products.length === 0 && (
            <div className={styles.notData}>
              <Empty description={false} />
              <div className={styles.notText}>Нет данных</div>
            </div>
          )}
        </>
      )}

      {isLoad && (
        <div className={styles.loading}>
          <Spin />
          <div>Загрузка...</div>
        </div>
      )}
      {isError && (
        <div className={styles.error}>Произошла ошибка, попробуйте позже</div>
      )}
    </>
  );
}

export default Basket;
