import React, { useEffect, useState } from "react";
import { EllipsisOutlined } from "@ant-design/icons";
import { Avatar, Card } from "antd";
import { useAppDispatch } from "../../hooks/redux";
import { changeQuantity } from "../../store/sliceData";

const { Meta } = Card;

const CardItem = ({ id, image, name, description, price, count }: any) => {
 
  const dispatch = useAppDispatch();

  const plus = () => {
    dispatch(changeQuantity({ id: id, operation: "plus" }));
  };

  const minus = () => {
    if(count < 2){
      return
    }
    dispatch(changeQuantity({ id: id, operation: "minus" }));
  };

  return (
    <Card
      style={{ width: 300 }}
      cover={
        <img
          style={{ height: 150, objectFit: "cover" }}
          alt="example"
          src={image}
        />
      }
      actions={[
        `Стоимость:  ${price}`,
        <div>
          <span onClick={minus}>-</span> <span>Кол-во: {count}</span>{" "}
          <span onClick={plus}>+</span>
        </div>,
        <EllipsisOutlined key="ellipsis" />,
      ]}
    >
      <Meta title={name} description={description} />
    </Card>
  );
};

export default CardItem;
