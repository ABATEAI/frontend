"use client"

import Alert from "react-bootstrap/Alert"
import Button from "react-bootstrap/Button"
import { useEffect } from "react"

export default function CartAlert({
  handleCloseAlert,
  handleRemoveItem,
  message,
  showAlert,
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
    <>
      <Alert
        dismissible
        onClose={handleCloseAlert}
        show={showAlert}
        variant="dark"
      >
        <Alert.Heading>Before you remove that pizza...</Alert.Heading>
        <p>{message}</p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={handleRemoveItem} variant="outline-warning">
            Remove it
          </Button>
          <Button onClick={handleCloseAlert} variant="outline-success">
            Keep it
          </Button>
        </div>
      </Alert>
    </>
  )
}
