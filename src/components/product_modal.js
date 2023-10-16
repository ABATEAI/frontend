"use client"

import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Image from "next/image"
import Modal from "react-bootstrap/Modal"
import { useEffect } from "react"

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

        {itemData.variations.map((sizeObj) => (
          <p key={sizeObj.id} className="mb-2">
            {sizeObj.item_variation_data.name}, $
            {(
              sizeObj.item_variation_data.price_money.amount / 100.0
            ).toLocaleString("en-US", {
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
            })}
          </p>
        ))}
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={onAddToOrder} variant="dark">
          Add to order
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
