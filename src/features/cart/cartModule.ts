interface ProductsType {
  id: number;
  title: string;
  price: number;
  quantity: number;
  discountApplied: boolean;
}

interface DiscountCodeType {
  code: string;
  applied: string;
  value: number;
}

const discountCodes: Array<DiscountCodeType> = [
  {
    code: "halfDiscount",
    value: 50,
    applied: "all",
  },
  {
    code: "fullDiscount",
    value: 100,
    applied: "all",
  },
  {
    code: "tfiveDiscount",
    value: 25,
    applied: "Item 3",
  },
];

const product: ProductsType = {
  id: 1,
  title: "item 1",
  price: 120,
  quantity: 1,
  discountApplied: false,
};

let ProductStore: Array<ProductsType> = [];

const addItem = (product: ProductsType): void => {
  ProductStore.push(product);
  console.log(
    "New Product Added",
    ProductStore.find((item) => item.id === product.id)
  );
};

addItem({
  id: 1,
  title: "Item 1",
  price: 120,
  quantity: 1,
  discountApplied: false,
});
addItem({
  id: 2,
  title: "Item 2",
  price: 120,
  quantity: 1,
  discountApplied: false,
});
addItem({
  id: 3,
  title: "Item 3",
  price: 120,
  quantity: 1,
  discountApplied: false,
});
addItem({
  id: 4,
  title: "Item 4",
  price: 120,
  quantity: 1,
  discountApplied: false,
});
addItem({
  id: 5,
  title: "Item 5",
  price: 120,
  quantity: 0,
  discountApplied: false,
});

console.log(ProductStore);

const increamentQuantity = (id: number): void => {
  const selectProduct = ProductStore.find((item) => item.id === id);
  if (selectProduct) {
    selectProduct.quantity++;
    console.log("Quantity increamented for this product", selectProduct);
  }
};

increamentQuantity(1);

const decreamentQuantity = (id: number): void => {
  const selectProduct = ProductStore.find((item) => item.id === id);
  if (selectProduct) {
    if (selectProduct.quantity > 1) {
      selectProduct.quantity--;
    }
    console.log("Quantity decreamented for this product", selectProduct);
  }
};

decreamentQuantity(1);

const removeItem = (id: number): void => {
  ProductStore = ProductStore.filter((item) => item.id !== id);
  console.log("Product removed from CartStore", ProductStore);
};
removeItem(1);

// fucntion for applying discount codes

const applyDiscount = (code: string): void => {
  const checkCode = discountCodes.find((item) => item.code === code);
  if (checkCode) {
    if (checkCode.applied === "all") {
      const totalPrice = ProductStore.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      console.log(totalPrice, checkCode.value);
      const discountedPrice = (totalPrice * checkCode.value) / 100;
      console.log(discountedPrice);
    } else {
      const product =
        ProductStore[
          ProductStore.findIndex((item) => item.title === checkCode.applied)
        ];
      console.log(product.price, checkCode.value);
      product.price = (product.price * checkCode.value) / 100;
      product.discountApplied = true;

      console.log(ProductStore);
    }
  }
};

applyDiscount("tfiveDiscount");

// get total price of a single item

const singleItemPrice = (product: ProductsType): number => {
  const totalPrice = product.quantity * product.price;
  return totalPrice;
};

console.log(singleItemPrice(ProductStore[1]));

// get total price of product store

const totalPrice = (store: Array<ProductsType>): number => {
  const finalPrice = store.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );
  return finalPrice;
};

console.log(totalPrice(ProductStore));

// show all cart items

const showAllItems = (cart: Array<ProductsType>): void => {
  const allItems = cart.filter((product) => product.quantity >= 1);
  console.log(allItems);
};

showAllItems(ProductStore);
