
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
    type: "cart",
    value: 50
  },
  {
    code: "fullDiscount",
    type: "cart",
    value: 100
  },
  {
    code: "tfiveDiscount",
    type: "item",
    value: 25,
    itemId: 3
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


const removeItem = (id: number): void => {
  const isExist = cart.items.find(item => item.id === id && item.quantity >= 1)

  if(isExist.quantity > 1) {
    isExist.quantity--;
    console.log(
      "item quantity decreased !",
      isExist
      );
    } else if (isExist.quantity === 1) {
    cart.items = cart.items.filter(item => item.id !== isExist.id)
    console.log("Item removed from cart!")
  }  else {
    console.log("item does not available in cart")
  }
};

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
    totalPrice =(item.price * item.quantity) - ((item.price * item.quantity * totalDiscount) / 100);
  } else {
    totalPrice = item.quantity * item.price;
  }
  return totalPrice;
};


// get total price of product store

const getTotalPrice = (): number => {
  // check if any item has discounted price 
  const haveDiscount = cart.items.filter(item => item.discountApplied.length > 0);
  let totalDiscountedItemPrice : number = 0;
  if(haveDiscount){
    const discountedItemPrice : number[] = [];
    // get discounted price of these items 
    haveDiscount.forEach(item => {
     const price =  getCartItemPrice(item);
     discountedItemPrice.push(price)
    })
    totalDiscountedItemPrice = discountedItemPrice.reduce((total, item) => total + item, 0)
  }
  const codeApplied = cart.discount.length > 0;
  let totalPrice = 0;
  if (codeApplied) {
    const codeValue = discountCodes.filter((code) =>
      cart.discount.includes(code.code)
    );
    const totalDiscount = codeValue.reduce(
      (total, item) => total + item.value,
      0
    );
    const cartPrice = cart.items.reduce((total, item) => {
      if(item.discountApplied.length === 0){
        return total + item.quantity * item.price
      } else {
        return total
      }
    }, 0);
    const finalPrice = cartPrice + totalDiscountedItemPrice;

    totalPrice = finalPrice - (finalPrice * totalDiscount / 100);
  } else {
    const cartPrice = cart.items.reduce((total, item) => {
      if(item.discountApplied.length === 0){
        return total + item.quantity * item.price
      } else {
        return total
      }
    }, 0);
    totalPrice = cartPrice + totalDiscountedItemPrice;
    
  }
  return totalPrice;
};



// show all cart items

const getCartItems = (): CartItem[] => {
  return cart.items.filter((product) => product.quantity >= 1);
};


export { addItem, removeItem, addDiscount, getCartItemPrice, getTotalPrice, getCartItems, cart, discountCodes };
