import { useState } from "react";
import { useAppSelector } from "../../hooks/redux";



function SumItem() {
  const totalPrice = useAppSelector((state)=>state.sliceData.totalPrice)
  console.log(totalPrice)
  return (
    <>
      <div>
        Итого: {totalPrice}
      </div>
    </>
  );
}

export default SumItem;
