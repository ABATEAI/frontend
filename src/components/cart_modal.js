"use client"

import Button from "react-bootstrap/Button"
import CartAlert from "./cart_alert"
import Modal from "react-bootstrap/Modal"
import Table from "react-bootstrap/Table"
import useSWR from "swr"
import { useEffect } from "react"
import { useState } from "react"

export default function CartModal({ cart, onHide, onOrder, show }) {
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
  const [alertMsg, setAlertMsg] = useState("")
  const [idToDelete, setIdToDelete] = useState("")

  // Client-side fetching resources
  // - nextjs.org/docs/pages/building-your-application/data-fetching/client-side
  // - swr.vercel.app/docs/getting-started
  const fetcher = (...args) => fetch(...args).then((res) => res.json())

  /**
   * When the customer attempts to delete an item from the cart, display alert
   */
  function handleOnDeleteAttempt(item_id, item) {
    // Todo: Create backend endpoint with item name and size parameters and
    //       returns Makersuite generated text
    const { data, error } = useSWR("/api/square/location", fetcher)

    if (error) {
      setAlertMsg("Just know that we failed to persuade you from removing it")
      setIdToDelete("")
    } else if (data) {
      // Todo: Update message once backend endpoint is created
      setAlertMsg("item_id: " + item_id + " " + data.location.name)
      setIdToDelete(item_id)
    }

    setShowAlert(true)
  }

  /**
   * Set showAlert to false and clear message when closing the alert
   */
  function handleCloseAlert() {
    setShowAlert(false)
    setAlertMsg("")
    setIdToDelete("")
  }

  /**
   * Customer decided to still remove item from cart so remove corresponding row
   */
  function handleRemoveItem() {
    // Remove item from cart
    cart.removeItemAll(idToDelete)

    // Remove remove from table
    const table_row = document.getElementById(idToDelete)
    table_row.parentNode.removeChild(table_row)

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
          <Table borderless hover id="cart-table">
            <tbody>
              {[...cart.getCart().entries()].map((item_id, item) => (
                <tr id={item_id} key={item_id}>
                  <td>
                    <Button
                      onClick={() => handleOnDeleteAttempt(item_id, item)}
                    >
                      &times;
                    </Button>
                  </td>
                  <td>{item.name}</td>
                  <td>{item.qty}</td>
                  <td>${Number(item.qty * item.price).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
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
        message={alertMsg}
        showAlert={showAlert}
      />
    </>
  )
}
