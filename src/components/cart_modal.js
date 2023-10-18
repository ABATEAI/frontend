"use client"

import Button from "react-bootstrap/Button"
import CartAlert from "./cart_alert"
import CartTable from "./cart_table"
import Modal from "react-bootstrap/Modal"
import { useEffect } from "react"
import { useState } from "react"

export default function CartModal({
  cart,
  cartTable,
  onHide,
  onOrder,
  setCartTable,
  show,
}) {
  /*
   * useEffect() can only be used in client components.
   * react-bootstrap does not depend on bootstrap.js and
   * all components are exported on window.ReactBootstrap
   *
   * Referenced:
   * - react-bootstrap.netlify.app/docs/components/buttons/
   * - react-bootstrap.netlify.app/docs/components/modal/
   * - react-bootstrap.netlify.app/docs/components/table/
   * - react-bootstrap.netlify.app/docs/getting-started/introduction/
   * - react-bootstrap.netlify.app/docs/getting-started/why-react-bootstrap
   * - blog.logrocket.com/handling-bootstrap-integration-next-js/
   * - dev.to/anuraggharat/adding-bootstrap-to-nextjs-39b2
   * - www.slingacademy.com/article/how-to-correctly-use-bootstrap-5-in-next-js/
   * - nextjs.org/docs/app/api-reference/file-conventions/layout
   * - nextjs.org/docs/app/building-your-application/rendering/client-components
   */
  useEffect(() => {
    import("react-bootstrap/dist/react-bootstrap.min.js")
  }, [])

  const [showAlert, setShowAlert] = useState(false)
  const [idToDelete, setIdToDelete] = useState("")
  const [nameToDelete, setNameToDelete] = useState("")

  /**
   * When the customer attempts to delete an item from the cart, display alert
   */
  function handleOnDeleteAttempt(item_id, item) {
    setIdToDelete(item_id)
    setNameToDelete(item.name)
    onHide()
    setShowAlert(true)
  }

  /**
   * Set showAlert to false and clear message when closing the alert
   */
  function handleCloseAlert() {
    setShowAlert(false)
    setIdToDelete("")
    setNameToDelete("")
  }

  /**
   * Customer decided to still remove item from cart so remove corresponding row
   */
  function handleRemoveItem() {
    // Remove item from cart
    cart.removeItemAll(idToDelete)

    // Remove row from table
    setCartTable(new Map([...cart.getCart().entries()]))

    handleCloseAlert()
  }

  return (
    <>
      <Modal
        aria-labelledby="cart-modal-vcenter-table"
        centered
        onHide={onHide}
        show={show}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="cart-modal-vcenter-table">Cart</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <CartTable
            cartTable={cartTable}
            handleOnDeleteAttempt={handleOnDeleteAttempt}
          />
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={onOrder} variant="dark">
            Order now
          </Button>
        </Modal.Footer>
      </Modal>

      <CartAlert
        handleCloseAlert={handleCloseAlert}
        handleRemoveItem={handleRemoveItem}
        idToDelete={idToDelete}
        nameToDelete={nameToDelete}
        showAlert={showAlert}
      />
    </>
  )
}
