"use client"

import Alert from "react-bootstrap/Alert"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import useSWR from "swr"
import { useEffect } from "react"

// Client-side fetching resources
// - nextjs.org/docs/pages/building-your-application/data-fetching/client-side
// - swr.vercel.app/docs/getting-started
const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function CartAlert({
  handleCloseAlert,
  handleRemoveItem,
  idToDelete,
  nameToDelete,
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

  // Todo: Create backend endpoint with item id and name
  //     parameters and returns Makersuite generated text
  const { data, error } = useSWR("/api/square/location", fetcher)

  let message = "Loading persuasive message..."
  if (error) {
    message = "Just know that we failed to persuade you from removing it"
  } else if (data) {
    message = "item_id: " + idToDelete + " " + data.location.name
  }

  return (
    <Container>
      <Alert
        dismissible
        onClose={handleCloseAlert}
        show={showAlert}
        variant="info"
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
    </Container>
  )
}
