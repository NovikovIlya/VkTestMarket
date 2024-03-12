import React, { useEffect, useState } from "react";
import {
  EllipsisOutlined,
} from "@ant-design/icons";
import { Avatar, Card } from "antd";

const { Meta } = Card;

const CardItem = ({ image, name, description, price, count = 1 }: any) => {
  const [itemCount, setItemCount] = useState(count); // State for item count





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
          <span >-</span> <span>Кол-во: {count}</span> <span >+</span>
        </div>,
        <EllipsisOutlined key="ellipsis" />,
      ]}
    >
      <Meta title={name} description={description} />
    </Card>
  );
};

export default CardItem;
