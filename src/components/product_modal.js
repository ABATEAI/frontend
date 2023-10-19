"use client"

import Badge from "react-bootstrap/Badge"
import Button from "react-bootstrap/Button"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import Container from "react-bootstrap/Container"
import Image from "next/image"
import ListGroup from "react-bootstrap/ListGroup"
import Modal from "react-bootstrap/Modal"
import Table from "react-bootstrap/Table"
import { useEffect } from "react"
import { useState } from "react"

export default function ProductModal({
  idImageMap,
  itemObj,
  onAddToOrder,
  onHide,
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

  const itemData = itemObj.item_data

  // Product image alt and path
  const imageAlt = "Image of " + itemData.name
  const imagePath = "/images/" + idImageMap.get(itemData.image_ids[0])

  const [qtyForSize, setQtyForSize] = useState(
    new Map(itemData.variations.map((sizeObj) => [sizeObj.id, 0]))
  )

  const handleIncrementQtyForSize = (size_id) => {
    // Deep copy state map like in https://react.dev/learn/tutorial-tic-tac-toe
    setQtyForSize(
      (prevQtyForSize) =>
        new Map(prevQtyForSize.set(size_id, prevQtyForSize.get(size_id) + 1))
    )
  }

  const handleDecrementQtyForSize = (size_id) => {
    // Deep copy state map like in https://react.dev/learn/tutorial-tic-tac-toe
    if (qtyForSize.get(size_id) === 0) {
      // Don't decrement quantity if it is already zero
      return
    }

    setQtyForSize(
      (prevQtyForSize) =>
        new Map(prevQtyForSize.set(size_id, prevQtyForSize.get(size_id) - 1))
    )
  }

  const handleAddToOrder = () => {
    // Items that have been added through this modal
    let itemsToOrder = []

    for (const sizeObj of itemData.variations) {
      if (qtyForSize.get(sizeObj.id) === 0) {
        continue
      }

      itemsToOrder.push({
        item_id: sizeObj.id,
        item_name: itemData.name + ", " + sizeObj.item_variation_data.name,
        item_price: sizeObj.item_variation_data.price_money.amount / 100.0,
        item_qty: qtyForSize.get(sizeObj.id),
      })
    }

    if (itemsToOrder.length === 0) {
      // Nothing to order
      return
    }

    // Add items to cart
    onAddToOrder(itemsToOrder)

    // Reset quantities for sizes
    setQtyForSize(
      new Map(itemData.variations.map((sizeObj) => [sizeObj.id, 0]))
    )

    // Finally, close modal
    onHide()
  }

  return (
    <Modal
      aria-labelledby="product-modal-vcenter"
      centered
      onHide={onHide}
      show={show}
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="product-modal-vcenter">{itemData.name}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Container className="d-flex justify-content-center mb-3">
          <Image
            alt={imageAlt}
            height={600}
            priority={true}
            src={imagePath}
            style={{ height: "auto", objectFit: "contain", width: "100%" }}
            width={600}
          />
        </Container>

        <p className="mb-3">{itemData.description}</p>

        <Container>
          <ListGroup variant="flush">
            {itemData.variations.map((sizeObj) => (
              <ListGroup.Item key={sizeObj.id}>
                <Table borderless>
                  <tbody>
                    <tr className="d-flex align-items-center justify-content-between">
                      <td className="ms-2">
                        {sizeObj.item_variation_data.name}
                      </td>
                      <td>
                        $
                        {(
                          sizeObj.item_variation_data.price_money.amount / 100.0
                        ).toLocaleString("en-US", {
                          maximumFractionDigits: 2,
                          minimumFractionDigits: 2,
                        })}
                      </td>
                      <td>
                        <ButtonGroup aria-label="Increment/decrement quantity for size">
                          <Button
                            className="fw-bold"
                            onClick={() =>
                              handleDecrementQtyForSize(sizeObj.id)
                            }
                            size="sm"
                            variant="outline-dark"
                          >
                            &#65293;
                          </Button>
                          <Button
                            className="fw-bold"
                            onClick={() =>
                              handleIncrementQtyForSize(sizeObj.id)
                            }
                            size="sm"
                            variant="dark"
                          >
                            &#65291;
                          </Button>
                        </ButtonGroup>
                      </td>
                      <td>
                        <Badge bg="secondary">
                          {qtyForSize.get(sizeObj.id)}
                        </Badge>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Container>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={handleAddToOrder} variant="dark">
          Add to order
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
