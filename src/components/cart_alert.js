"use client"

import Alert from "react-bootstrap/Alert"
import Button from "react-bootstrap/Button"
import CartAlertBody from "./cart_alert_body"
import Container from "react-bootstrap/Container"
import { useEffect } from "react"

export default function CartAlert({
  handleCloseAlert,
  handleRemoveItem,
  idToDelete,
}) {
  /*
   * useEffect() can only be used in client components.
   * react-bootstrap does not depend on bootstrap.js and
   * all components are exported on window.ReactBootstrap
   *
   * Referenced:
   * - react-bootstrap.netlify.app/docs/components/alerts/
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
    <Container>
      <Alert show={idToDelete !== ""} variant="info">
        <Alert.Heading>Before you remove that pizza...</Alert.Heading>
        <Container className="d-flex justify-content-center">
          <CartAlertBody item_id={idToDelete} />
        </Container>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={handleRemoveItem} variant="outline-secondary">
            Remove item
          </Button>
          <Button
            className="ms-3"
            onClick={handleCloseAlert}
            variant="outline-light"
          >
            Keep item
          </Button>
        </div>
      </Alert>
    </Container>
  )
}
