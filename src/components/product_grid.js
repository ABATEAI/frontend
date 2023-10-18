"use client"

import Col from "react-bootstrap/Col"
import ProductCard from "./product_card"
import ProductModal from "./product_modal"
import Row from "react-bootstrap/Row"
import { useEffect } from "react"
import { useState } from "react"

export default function ProductGrid({ cart, idImageMap, itemArray }) {
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

  const [productModalShow, setProductModalShow] = useState(
    new Map(itemArray.map((itemObj) => [itemObj.id, false]))
  )

  const handleProductModalClose = (item_id) => {
    // Deep copy state map like in https://react.dev/learn/tutorial-tic-tac-toe
    setProductModalShow(
      (prevProductModalShow) =>
        new Map(prevProductModalShow.set(item_id, false))
    )
  }
  const handleProductModalShow = (item_id) => {
    // Deep copy state map like in https://react.dev/learn/tutorial-tic-tac-toe
    setProductModalShow(
      (prevProductModalShow) => new Map(prevProductModalShow.set(item_id, true))
    )
  }

  return (
    <Row xs={1} md={2} xxl={3}>
      {itemArray.map((itemObj) => (
        <Col className="mb-4" key={itemObj.id}>
          <ProductCard
            handleProductModalShow={() => handleProductModalShow(itemObj.id)}
            idImageMap={idImageMap}
            itemObj={itemObj}
          />
          <ProductModal
            idImageMap={idImageMap}
            itemObj={itemObj}
            onAddToOrder={(items) =>
              items.forEach((item) => {
                for (let qty = 0; qty < item.item_qty; qty++) {
                  cart.addItem(item.item_id, item.item_name, item.item_price)
                }
              })
            }
            onHide={() => handleProductModalClose(itemObj.id)}
            show={productModalShow.get(itemObj.id)}
          />
        </Col>
      ))}
    </Row>
  )
}
