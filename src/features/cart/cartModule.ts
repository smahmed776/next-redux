export {};

interface CartItem {
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

interface Cart {
  items: CartItem[];
  discount: string[];
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

const cart: Cart = {
  items: [],
  discount: []
};

const addItem = (product: CartItem): void => {
  const isExist = cart.items.find(item => item.id === product.id);
  if(isExist){
    isExist.quantity++;
    console.log("Quantity increamented for this product", isExist);
  } else {
    cart.items.push(product);
    console.log(
      "New Product Added",
      cart.items.find((item) => item.id === product.id)
    );
  }
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



const removeItem = (id: number): void => {
  const isExist = cart.items.find(item => item.id === id && item.quantity >= 1)
  if(isExist) {
    isExist.quantity = 0;
    console.log(
      "item removed from CartStore",
      isExist
    );
  } else {
    console.log("item does not available in cart")
  }
};
removeItem(1);

// fucntion for applying discount codes

const addDiscount = (discountCode: string): void => {
  const checkCode = discountCodes.find((item) => item.code === discountCode);
  if (checkCode) {
    if (checkCode.type === "cart") {
      // check if this code is applied before
      const isApplied = cart.discount.includes(checkCode.code);
      if (!isApplied) {
        cart.discount.push(checkCode.code);
        console.log("discount added to whole cart", cart.discount);
      } else {
        console.log("This Code is applied already!");
        return;
      }
    } else {
      const product =
        cart.items[cart.items.findIndex((item) => item.id === checkCode.itemId)];
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

const getCartItemPrice = (item: CartItem): number => {
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

console.log(getCartItemPrice(cart.items[2]));

// get total price of product store

const getTotalPrice = (): number => {
  const codeApplied = cart.discount.length > 0;
  console.log(codeApplied);
  let totalPrice = 0;
  if (codeApplied) {
    const codeValue = discountCodes.filter((code) =>
      cart.discount.includes(code.code)
    );
    const totalDiscount = codeValue.reduce(
      (total, item) => total + item.value,
      0
    );
    totalPrice =
      (cart.items.reduce((total, item) => total + item.quantity * item.price, 0) *
        totalDiscount) /
      100;
  } else {
    totalPrice = cart.items.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
  }
  return totalPrice;
};

console.log(getTotalPrice());

// show all cart items

const getCartItems = (): CartItem[] => {
  return cart.items.filter((product) => product.quantity >= 1);
};

console.log(getCartItems());
