import { useEffect } from "react";
import styles from "./Basket.module.css";
import CardItem from "../../components/CardItem/CardItem";
import SumItem from "../../components/SumItem/SumItem";
import { Spin, Empty } from "antd";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getData, updateTotalPrice } from "../../store/sliceData";

function Basket() {
  const data = useAppSelector((state) => state.sliceData.products);
  const load = useAppSelector((state) => state.sliceData.isLoad);
  const error = useAppSelector((state) => state.sliceData.isError);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getData());
  }, []);

  useEffect(() => {
    dispatch(updateTotalPrice());
  }, [data, dispatch]);

  return (
    <>
      {!load && !error && (
        <>
          <div className={styles.container}>
            <div>
              {data.length > 0 &&
                data?.map((item: any) => (
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
            {data.length > 0 && (
              <div className={styles.right}>
                <SumItem />
              </div>
            )}

          </div>
          {data.length === 0 && (
              <div className={styles.notData}>
                <Empty description={false} />
                <div className={styles.notText}>Нет данных</div>
              </div>
            )}
        </>
      )}
      
      {load && (
        <div className={styles.loading}>
          <Spin />
          <div>Загрузка...</div>
        </div>
      )}
      {error && (
        <div className={styles.error}>Произошла ошибка, попробуйте позже</div>
      )}
    </>
  );
}

export default Basket;
