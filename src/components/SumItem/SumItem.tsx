import { useAppSelector } from "../../hooks/redux";
import styles from './SumItem.module.css'
import { Card } from 'antd';

function SumItem() {
  const totalPrice = useAppSelector((state)=>state.sliceData.totalPrice)
  
  return (
    <>
    <Card className={styles.cartStyle}>
      <div className={styles.container}>
       <div className={styles.text}> Итого:</div> <div className={styles.price}>{totalPrice}</div>
      </div>
      </Card>
    </>
  );
}

export default SumItem;
