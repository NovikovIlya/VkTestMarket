import { DeleteOutlined } from "@ant-design/icons";
import styles from "./CardItem.module.css";
import { Card, message } from "antd";
import { useAppDispatch } from "../../hooks/redux";
import { changeQuantity, deleteProduct } from "../../store/sliceData";

const { Meta } = Card;

const CardItem = ({ id, image, name, description, price, count }: any) => {
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useAppDispatch();

  const info = () => {
    messageApi.info("Можно добавить только 10 товаров!");
  };

  const infoMinus = () => {
    messageApi.info("Должен быть хотя бы один товар!");
  };

  const plus = () => {
    if (count > 9) {
      info();
      return;
    }
    dispatch(changeQuantity({ id: id, operation: "plus" }));
  };

  const minus = () => {
    if (count < 2) {
      infoMinus()
      return;
    }
    dispatch(changeQuantity({ id: id, operation: "minus" }));
  };

  const deleteProductFn = (id: number) => {
    dispatch(deleteProduct({ id: id }));
  };

  return (
    <>
      {contextHolder}

      <Card
        className={styles.container}
        cover={
          <img
            style={{ height: 150, objectFit: "cover" }}
            alt="example"
            src={image}
          />
        }
        actions={[
          <div className={styles.znak} onClick={minus}>
            -
          </div>,
          <div className={styles.znak1}>{count} </div>,
          <div className={styles.znak} onClick={plus}>
            +
          </div>,
        ]}
      >
        <Meta title={name} description={description} />
        <div className={styles.price}>
          <div className={styles.priceChild}>Стоимость: {price} ₽</div>
          <div
            onClick={() => deleteProductFn(id)}
            className={styles.deleteIcon}
          >
            <DeleteOutlined />
          </div>
        </div>
      </Card>
    </>
  );
};

export default CardItem;
