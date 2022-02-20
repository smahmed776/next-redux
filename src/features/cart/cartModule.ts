export {};

interface cartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  discountApplied: string[];
}

interface DiscountCode {
  code: string;
  type: "cart" | "item";
  value: number;
  itemId?: number;
}

const discountCodes: Array<DiscountCode> = [
  {
    code: "halfDiscount",
    value: 50,
    type: "cart",
  },
  {
    code: "fullDiscount",
    value: 100,
    type: "cart",
  },
  {
    code: "tfiveDiscount",
    value: 25,
    type: "item",
    itemId: 3,
  },
];

const cart: Array<cartItem> = [];
const cartDiscount: string[] = [];

const addItem = (product: cartItem): void => {
  cart.push(product);
  console.log(
    "New Product Added",
    cart.find((item) => item.id === product.id)
  );
};

addItem({
  id: 1,
  title: "Item 1",
  price: 120,
  quantity: 1,
  discountApplied: [],
});
addItem({
  id: 2,
  title: "Item 2",
  price: 120,
  quantity: 1,
  discountApplied: [],
});
addItem({
  id: 3,
  title: "Item 3",
  price: 120,
  quantity: 1,
  discountApplied: [],
});
addItem({
  id: 4,
  title: "Item 4",
  price: 120,
  quantity: 1,
  discountApplied: [],
});
addItem({
  id: 5,
  title: "Item 5",
  price: 120,
  quantity: 0,
  discountApplied: [],
});

const increamentQuantity = (id: number): void => {
  const selectProduct = cart.find((item) => item.id === id);
  if (selectProduct) {
    selectProduct.quantity++;
    console.log("Quantity increamented for this product", selectProduct);
  } else {
    console.log("Item not found in cart");
  }
};

increamentQuantity(5);

const decreamentQuantity = (id: number): void => {
  const selectProduct = cart.find((item) => item.id === id);
  if (selectProduct) {
    if (selectProduct.quantity > 1) {
      selectProduct.quantity--;
      console.log("Quantity decreamented for this product", selectProduct);
    } else {
      console.log(
        "This item has minimum quantity of 1, it can't be decreamented",
        selectProduct
      );
    }
  } else {
    console.log("item not found in cart.");
  }
};

decreamentQuantity(1);

const removeItem = (id: number): void => {
  cart[cart.findIndex((item) => item.id === id)].quantity = 0;
  console.log(
    "item removed from CartStore",
    cart[cart.findIndex((item) => item.id === id)]
  );
};
removeItem(1);

// fucntion for applying discount codes

const addDiscount = (discountCode: string): void => {
  const checkCode = discountCodes.find((item) => item.code === discountCode);
  if (checkCode) {
    if (checkCode.type === "cart") {
      // check if this code is applied before
      const isApplied = cartDiscount.includes(checkCode.code);
      if (!isApplied) {
        cartDiscount.push(checkCode.code);
        console.log("discount added to whole cart", cartDiscount);
      } else {
        console.log("This Code is applied already!");
        return;
      }
    } else {
      const product =
        cart[cart.findIndex((item) => item.id === checkCode.itemId)];
      // check if already applied this code before
      const isApplied = product.discountApplied.includes(checkCode.code);
      if (!isApplied) {
        product.discountApplied.push(checkCode.code);
        console.log("discount applied to corresponding item", product);
      } else {
        console.log("This Code is applied already!");
        return;
      }
    }
  } else {
    console.log("Given code is not valid as discount code.");
  }
};

addDiscount("halfDiscount");

// get total price of a single item

const getCartItemPrice = (item: cartItem): number => {
  const codeApplied = item.discountApplied.length > 0;
  let totalPrice = 0;
  if (codeApplied) {
    // get code and then its value from discountCodes
    const codeValue = discountCodes.filter((code) =>
      item.discountApplied.includes(code.code)
    );
    console.log(codeValue);
    const totalDiscount = codeValue.reduce(
      (total, item) => total + item.value,
      0
    );
    console.log(totalDiscount);
    totalPrice = (item.price * item.quantity * totalDiscount) / 100;
  } else {
    totalPrice = item.quantity * item.price;
  }
  return totalPrice;
};

console.log(getCartItemPrice(cart[2]));

// get total price of product store

const getTotalPrice = (): number => {
  const codeApplied = cartDiscount.length > 0;
  console.log(codeApplied);
  let totalPrice = 0;
  if (codeApplied) {
    const codeValue = discountCodes.filter((code) =>
      cartDiscount.includes(code.code)
    );
    const totalDiscount = codeValue.reduce(
      (total, item) => total + item.value,
      0
    );
    totalPrice =
      (cart.reduce((total, item) => total + item.quantity * item.price, 0) *
        totalDiscount) /
      100;
  } else {
    totalPrice = cart.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
  }
  return totalPrice;
};

console.log(getTotalPrice());

// show all cart items

const getCartItems = (): cartItem[] => {
  return cart.filter((product) => product.quantity >= 1);
};

console.log(getCartItems());
