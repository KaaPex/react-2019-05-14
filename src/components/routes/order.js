import React from "react";
import OrderList from "../order-list";
import UserForm from "../user-form";

function OrderPage(props) {
  return (
    <div>
      <OrderList />
      <UserForm setUser={props.setUser} />
    </div>
  );
}

export default OrderPage;
