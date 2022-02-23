import {
  addItem,
  removeItem,
  addDiscount,
  getCartItemPrice,
  getTotalPrice,
  getCartItems,
  cart,
  discountCodes,
} from "./cartModule";


const getInitialCart = () => {
  cart.items.length = 0;
  cart.discount.length = 0;
};

afterEach(() => getInitialCart());

describe("cart", () => {
  describe("addItem", () => {
    it("increaments quantity given existing item", () => {
      // given
      const item1 = {
        id: 1,
        title: "Item 1",
        price: 5,
        quantity: 1,
        discountApplied: [],
      };
      cart.items.push(item1);

      // when
      addItem(item1);

      // then
      expect(cart.items[0].quantity).toEqual(2);
    });
    it("adds item to cart given non-existing item", () => {
      // given
      const item = {
        id: 1,
        title: "item 1",
        price: 10,
        quantity: 1,
        discountApplied: [],
      };

      // when
      addItem(item);

      // then
      expect(cart.items).toContain(item);
    });
  });

  describe("removeItem", () => {
    it("decreaments quantity given item with more than 1 quantity", () => {
      // given
      cart.items.push({
        id: 1,
        title: "Item 1",
        quantity: 3,
        price: 120,
        discountApplied: [],
      });

      // when
      removeItem(1);

      // then
      expect(cart.items[0].quantity).toBe(2);
    });

    it("removes item given item quantity only 1", () => {
      // given
      cart.items.push({
        id: 1,
        title: "Item 1",
        quantity: 1,
        price: 120,
        discountApplied: [],
      });

      // when
      removeItem(1);

      // then
      expect(cart.items).not.toContain({ id: 1 });
    });
  });

  describe("addDiscount", () => {
    it("reduces cart price 50% given code halfDiscount", () => {
      // given
      const code = "halfDiscount";

      // when
      addDiscount(code);

      // then
      expect(cart.discount).toContain("halfDiscount");
    });

    it("reduces Item 3 price 25% given code tfiveDiscount", () => {
      // given
      cart.items.push({
        id: 3,
        title: "Item 3",
        quantity: 1,
        price: 100,
        discountApplied: [],
      });
      const code = "tfiveDiscount";

      // when
      addDiscount(code);

      // then
      expect(
        cart.items.find((item) => item.id === 3).discountApplied
      ).toContain("tfiveDiscount");
    });
  });

  describe("getItemPrice", () => {
    it("returns total price given item not contain discount", () => {
      // given
      cart.items.push({
        id: 4,
        title: "Item 4",
        price: 120,
        quantity: 5,
        discountApplied: [],
      });

      // when

      const price = getCartItemPrice(cart.items[0]);

      // then
      expect(price).toEqual(600);
    });

    it("returns total price given item having discount", () => {
      // given
      cart.items.push({
        id: 4,
        title: "Item 4",
        price: 120,
        quantity: 5,
        discountApplied: ["tfiveDiscount"],
      });

      // when
      const price = getCartItemPrice(cart.items[0]);

      // then
      expect(price).toEqual(450);
    });
  });

  describe("getTotalPrice", () => {
    it("returns total price given cart have discount of 50% ", () => {
      // given
      cart.items.push(
        {
          id: 1,
          title: "Item 1",
          price: 100,
          quantity: 1,
          discountApplied: [],
        },
        {
          id: 2,
          title: "Item 4",
          price: 200,
          quantity: 1,
          discountApplied: [],
        }
      );
      cart.discount.push("halfDiscount");

      // when
      const price = getTotalPrice();

      // then
      expect(price).toEqual(150);
    });
    it("returns total price given cart have no discount", () => {
      // given
      cart.items.push(
        {
          id: 1,
          title: "Item 1",
          price: 100,
          quantity: 1,
          discountApplied: [],
        },
        {
          id: 2,
          title: "Item 4",
          price: 200,
          quantity: 1,
          discountApplied: [],
        }
      );

      // when
      const price = getTotalPrice();

      // then
      expect(price).toEqual(300);
    });
    it("returns total price given cart item have discount", () => {
      // given
      cart.items.push(
        {
          id: 1,
          title: "Item 1",
          price: 100,
          quantity: 1,
          discountApplied: ["tfiveDiscount"],
        },
        {
          id: 2,
          title: "Item 4",
          price: 200,
          quantity: 1,
          discountApplied: [],
        }
      );

      // when
      const price = getTotalPrice();

      // then
      expect(price).toEqual(275);
    });
  });
  describe("getCartItem", () => {
    it("returns all items in cart having at least quantity of 1", () => {
      // given
      cart.items.push(
        {
          id: 1,
          title: "Item 1",
          price: 100,
          quantity: 1,
          discountApplied: ["tfiveDiscount"],
        },
        {
          id: 2,
          title: "Item 2",
          price: 200,
          quantity: 1,
          discountApplied: [],
        },
        {
          id: 3,
          title: "Item 3",
          price: 200,
          quantity: 0,
          discountApplied: [],
        }
      );

      // when
      const cartItems = getCartItems();

      // then
      expect(cartItems.length).toEqual(2);
    });
    it("returns all items with no duplicates", () => {
      // given
      cart.items.push(
        {
          id: 1,
          title: "Item 1",
          price: 100,
          quantity: 1,
          discountApplied: ["tfiveDiscount"],
        },
        {
          id: 2,
          title: "Item 2",
          price: 200,
          quantity: 1,
          discountApplied: [],
        },
        {
          id: 2,
          title: "Item 2",
          price: 200,
          quantity: 1,
          discountApplied: [],
        }
      );

      // when
      const cartItems = getCartItems();

      // then
      expect(cartItems.length).toEqual(2);
    });
  });
});
