import {addItem, removeItem, addDiscount, getCartItemPrice, getTotalPrice, getCartItems, cart, discountCodes} from "./cartModule"


test("addItem increaments quantity given existing item", () => {

    // Given 
    const item1 = {
            id: 1, 
            title: "Item 1",
            price: 5,
            quantity: 1,
            discountApplied : []
        
    }
    cart.items.push(item1)

    // when 
    addItem(item1)

    // effect

    expect(cart.items[0].quantity).toEqual(2)
})

test("addItem adds item to cart given non-existing item", () => {
    // Given 
    const item = {
        id: 2,
        title: "item 2",
        price: 10,
        quantity: 5,
        discountApplied: []
    }

    // when 
    addItem(item)

    //effect
    expect(cart.items).toContain(item)

})

test("removeItem decreaments quantity given item with more than 1 quantity", () => {
    //Given
    const id = 1;

    // when 

    removeItem(id);

    // effect
    expect(cart.items[0].quantity).toBe(1)
})

test("removeItem removes item given item quantity only 1", () => {
    //Given
    const id = 1;

    // when 

    removeItem(id);
    

    //effect
    expect(cart.items).not.toContain({id: 1})
})


test("addDiscount reduces cart price 50% given code halfDiscount", () => {
    //Given
    const code = discountCodes[0].code;

    // when 

    addDiscount(code);
    

    //effect
    expect(cart.discount).toContain("halfDiscount")
})

test("addDiscount reduces Item 3 price 25% given code tfiveDiscount", () => {
    //Given
    cart.items.push({
        id: 3,
        title: "Item 3",
        quantity: 1,
        price: 100,
        discountApplied: []
    })
    const code = discountCodes[2].code;

    // when 

    addDiscount(code);
    

    //effect
    expect(cart.items[1].discountApplied).toContain("tfiveDiscount")
})

test("getCartItemPrice returns total price given item id", () => {
    //Given
   
    const id = cart.items[1]

    // when 

   const price = getCartItemPrice(id);
    

    //effect
    expect(price).toEqual(75)
})


test("getTotalPrice returns cart price", () => {
    //Given
   

    // when 

   const price = getTotalPrice();
    

    //effect
    expect(price).toEqual(125 / 2)
})


test("getCartItem returns all items in cart", () => {
    //Given
   

    // when 

   const cartItems = getCartItems();
    

    //effect
    expect(cartItems.length).toEqual(2)
})

