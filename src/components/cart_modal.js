"use client"

import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import Table from "react-bootstrap/Table"
import { useEffect } from "react"

export default function CartModal({ onClear, onHide, onOrder, show }) {
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

  return (
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
          <tbody></tbody>
        </Table>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={onClear} variant="secondary">
          Clear all
        </Button>
        <Button onClick={onOrder} variant="dark">
          Order now
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
