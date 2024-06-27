// ItemRow.js
import React from 'react';
import styles from "./assets/itemRow.module.css";

const ItemRow = ({ item }) => {
  const calculateNetAmount = (item) => item.unitPrice * item.quantity - item.discount;
  const calculateTaxAmount = (item) => calculateNetAmount(item) * (item.taxRate / 100);
  const totalAmount = calculateNetAmount(item) + calculateTaxAmount(item);

  return (
    <tr className={styles.row}>
      <td>{item.description}</td>
      <td>{item.unitPrice}</td>
      <td>{item.quantity}</td>
      <td>{item.discount}</td>
      <td>{calculateNetAmount(item)}</td>
      <td>{item.taxRate}%</td>
      <td>{item.taxType}</td>
      <td>{calculateTaxAmount(item)}</td>
      <td>{totalAmount}</td>
    </tr>
  );
};

export default ItemRow;
