"use client"

// Referenced:
//     github.com/jeffrylew/hockeyrats/blob/master/public/javascripts/cart.js

/**
 * Cart Item
 */
class Item {
  constructor(name, price, qty) {
    this.name = name
    this.price = price
    this.qty = qty
  }
}

/**
 * Cart
 */
export default class Cart {
  constructor() {
    // <item_id, Item>
    this.cart = new Map()
    this.totalItems = 0
    this.totalPrice = 0.0
  }

  getTotalItems() {
    return Number(this.totalItems)
  }

  getTotalPrice() {
    this.totalPrice.toLocaleString("en-US", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    })
  }

  /**
   * Helper function to stringify Map
   * stackoverflow.com/questions/29085197/how-do-you-json-stringify-an-es6-map
   * @param {string} key
   * @param {object} value
   */
  static replacer(key, value) {
    if (value instanceof Map) {
      return {
        dataType: "Map",
        value: [...value],
      }
    } else {
      return value
    }
  }

  /**
   * Helper function to parse Map from string
   * stackoverflow.com/questions/29085197/how-do-you-json-stringify-an-es6-map
   * @param {string} key
   * @param {object} value
   */
  static reviver(key, value) {
    if (typeof value === "object" && value !== null) {
      if (value.dataType === "Map") {
        return new Map(value.value)
      }
    }
    return value
  }

  loadFromSessionStorage() {
    const strMap = sessionStorage.getItem("abateai-cart")

    if (strMap != null) {
      const jsonObj = JSON.parse(strMap, Cart.reviver)

      // Set totalItems and totalPrice
      this.totalItems = jsonObj.totalItems
      this.totalPrice = jsonObj.totalPrice

      // Clear cart before loading
      this.cart.clear()

      // Copy items from sessionStorage
      for (const [item_id, item] of jsonObj.cart) {
        this.cart.set(item_id, new Item(item.name, item.price, item.qty))
      }
    }
  }

  saveToSessionStorage() {
    sessionStorage.setItem("abateai-cart", JSON.stringify(this, Cart.replacer))
  }

  addItem(item_id, item_name, item_price) {
    if (this.cart.has(item_id)) {
      // If item already exists in cart, update its quantity
      this.cart.get(item_id).qty++
      this.totalItems++
      this.totalPrice += this.cart.get(item_id).price
    } else {
      // Item doesn't exist in cart so add it
      this.cart.set(item_id, new Item(item_name, item_price, 1))
      this.totalItems++
      this.totalPrice += item_price
    }

    this.saveToSessionStorage()
  }

  removeItem(item_id) {
    if (!this.cart.has(item_id)) {
      return
    }

    this.totalItems--
    this.totalPrice -= this.cart.get(item_id).price

    if (--this.cart.get(item_id).qty === 0) {
      this.cart.delete(item_id)
    }

    this.saveToSessionStorage()
  }

  /**
   * Remove all instances of item with item_id from cart
   * @param {string} item_id Square item id
   */
  removeItemAll(item_id) {
    if (!this.cart.has(item_id)) {
      return
    }

    this.totalItems -= this.cart.get(item_id).qty
    this.totalPrice -= this.cart.get(item_id).qty * this.cart.get(item_id).price
    this.cart.delete(item_id)

    this.saveToSessionStorage()
  }

  /**
   * Remove all items from cart
   */
  clear() {
    this.cart.clear()
    this.totalItems = 0
    this.totalPrice = 0.0

    this.saveToSessionStorage()
  }
}
