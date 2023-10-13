"use client"

import Col from "react-bootstrap/Col"
import ProductCard from "./product_card"
import Row from "react-bootstrap/Row"
import { useEffect } from "react"

// Todo: Pass in props containing product data from Square
export default function ProductGrid() {
  /*
   * useEffect() can only be used in client components.
   * react-bootstrap does not depend on bootstrap.js and
   * all components are exported on window.ReactBootstrap
   *
   * Referenced:
   * - react-bootstrap.netlify.app/docs/components/cards/
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
    <Row xs={1} md={2} xxl={3}>
      {["Pizza_1", "Pizza_2", "Pizza_3", "Pizza_4", "Pizza_5", "Pizza_6"].map(
        (item) => (
          <Col className="mb-4" key={item}>
            <ProductCard name={item} />
          </Col>
        )
      )}
    </Row>
  )
}
