import { useEffect, useState } from "react";
import styles from "./Basket.module.css";
import { useFetchCartQuery } from "../../store/api";
import CardItem from "../../components/CardItem/CardItem";
import SumItem from "../../components/SumItem/SumItem";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getData, updateTotalPrice } from "../../store/sliceData";

function Basket() {
  // const { data, isLoading, error } = useFetchCartQuery({});
  const data = useAppSelector((state)=>state.sliceData.products)
  const dispatch = useAppDispatch()

  useEffect(()=>{
    dispatch(getData())
  },[])

  useEffect(()=>{
    dispatch(updateTotalPrice())
  },[data,dispatch])

  console.log(data);
  return (
    <>
      <div className={styles.container}>
        <div>
          {data?.map((item: any) => (
            <CardItem key={item.id} id={item.id} image={item.images[0]} name={item.title} description={item.description} price={item.price} />
          ))}
        </div>
        <div>
          <SumItem/>
        </div>
      </div>
    </>
  );
}

export default Basket;
