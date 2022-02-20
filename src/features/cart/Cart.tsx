import React, { useEffect, useState } from "react";
import styles from "../counter/Counter.module.css";
import { discountCodes } from "./data";

interface cartStoreType {
  id: number;
  name: string;
  price: number;
  quantity: number;
  discountApplied: boolean;
}

const Cart = (): JSX.Element => {
  const [cartStore, setCartStore] = useState<Array<cartStoreType>>([]);
  const [idNumber, setIdNumber] = useState<number>(1);
  const [discountCode, setDiscountCode] = useState<string>("");
  const [totalPrice, setTotalPrice] = useState<number>();

  const handleForm = (event) => {
    event.preventDefault();
    const discountObj =
      discountCodes[
        discountCodes.findIndex((code) => code.code === discountCode)
      ];
    if (discountObj) {
      if (discountObj.applicable === "all") {
        setTotalPrice(discountedPrice(totalPrice, discountObj));
        console.log(`discount code "${discountObj.code}" is applied to whote cart. An amount of ${discountObj.value}% will deducted from total amount`)
      } else {
        setCartStore((prev) => {
          const item =
          prev[
            prev.findIndex((item) => item.name === discountObj.applicable)
          ];
          item.price = discountedPrice(item.price, discountObj);
          console.log(`discount code "${discountObj.code}" is applied to "${discountObj.applicable}". An amount of ${discountObj.value}% will deducted from ${discountObj.applicable}'s total amount`)
          return [...prev];
        });
      }
      setDiscountCode("");
    }
    return;
  };
  const discountedPrice = (
    price: number,
    discountCode: { value: number }
  ): number => {
    const discount = (price * discountCode.value) / 100;
    const totalPrice = price - discount;
    return totalPrice;
  };

  const addItem = (): void => {
    setCartStore((prev) => {
      console.log("new Item added", {
        id: prev.length,
        name: `Item ${prev.length === 0 ? 1 : prev.length + 1}`,
        price: 120,
        quantity: 1,
        discountApplied: false,
      });
      return [
        ...prev,
        {
          id: prev.length,
          name: `Item ${prev.length === 0 ? 1 : prev.length + 1}`,
          price: 120,
          quantity: 1,
          discountApplied: false,
        },
      ];
    });
  };
  const removeItem = (): void => {
    setCartStore((prev) => {
      prev.pop();
      console.log("last item removed", prev)
      return [...prev];
    });
  };
  const increamentQuantity: (id: number) => void = (id) => {
    if (!cartStore.find((item) => item.id === id)) return;
    setCartStore((prev) => {
      prev[prev.findIndex((item) => item.id === Number(id))].quantity++;
      console.log("quantity increamented: ", prev[prev.findIndex((item) => item.id === Number(id))])
      return [...prev];
    });
  };
  const decreamentQuantity = (id: number): void => {
    if (!cartStore.find((item) => item.id === id)) return;
    setCartStore((prev) => {
      const item = prev[prev.findIndex((item) => item.id === Number(id))];
      if (item.quantity > 1) {
        item.quantity--;
        console.log("quantity decreamented :",item)
      }
      return [...prev];
    });
  };

  useEffect(() => {
    setTotalPrice(
      cartStore.reduce((total, item) => total + item.price * item.quantity, 0)
    );
    console.log("total price :", cartStore.reduce((total, item) => total + item.price * item.quantity, 0))
  }, [cartStore]);

  return (
    <div style={{ marginTop: "5px", marginBottom: "20px" }}>
      <p
        className={styles.value}
        style={{ fontSize: "1.5rem", marginTop: "8px", marginBottom: "8px" }}
      >
        You have {cartStore.length} items in your cart.
      </p>
      {cartStore.length > 0 &&
        cartStore.map((item, index) => (
          <ul
            key={index}
            style={{
              display: "flex",
              justifyContent: "flex-start",
              flexDirection: "column",
            }}
          >
            <li>Id: {item.id}</li>
            <li>name: {item.name}</li>
            <li>quantity: {item.quantity}</li>
            <li>unit price: {item.price}</li>
            <li>total price: {item.price * item.quantity}</li>
            <hr />
          </ul>
        ))}
      <p
        className={styles.value}
        style={{ fontSize: "1.5rem", marginTop: "8px", marginBottom: "8px" }}
      >
        Total price: {totalPrice} .
      </p>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => removeItem()}
        >
          Remove Item
        </button>

        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => addItem()}
        >
          Add Item
        </button>
      </div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          type="number"
          aria-label="Set increment amount"
          value={idNumber}
          onChange={(e) => setIdNumber(Number(e.target.value))}
        />
        <button
          className={styles.button}
          onClick={() => increamentQuantity(idNumber)}
        >
          Increament quantity
        </button>
        <button
          className={styles.asyncButton}
          onClick={() => decreamentQuantity(idNumber)}
        >
          Decreament quantity
        </button>
      </div>
      <div>
        <p>Apply a discount code</p>
        {discountCodes.map((code) => (
          <div key={code.code}>
            <p>
              code: <strong>{code.code}</strong>, applicable to:{" "}
              <strong>{code.applicable}</strong>
            </p>
          </div>
        ))}
        <form onSubmit={handleForm}>
          <input
            type={"text"}
            onChange={(e) => setDiscountCode(e.target.value)}
            value={discountCode}
          />
          <button type="submit">Apply</button>
        </form>
      </div>
    </div>
  );
};

export default Cart;
