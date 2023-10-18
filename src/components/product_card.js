"use client"

import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import Image from "next/image"
import styles from "./product_card.module.css"
import { useEffect } from "react"

export default function ProductCard({
  handleProductModalShow,
  idImageMap,
  itemObj,
}) {
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

  const itemData = itemObj.item_data

  // Get lower and upper bounds on product price
  const lowPrice =
    itemData.variations[0].item_variation_data.price_money.amount / 100.0
  const highPrice =
    itemData.variations[itemData.variations.length - 1].item_variation_data
      .price_money.amount / 100.0

  // Convert prices to strings with two decimal places
  const lowPriceString = lowPrice.toLocaleString("en-US", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  })
  const highPriceString = highPrice.toLocaleString("en-US", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  })

  // Product image alt and path
  const imageAlt = "Image of " + itemData.name
  const imagePath = "/images/" + idImageMap.get(itemData.image_ids[0])

  return (
    <>
      <Card border="secondary" href="#">
        <span
          as={Button}
          className={styles.span_wrapper}
          onClick={handleProductModalShow}
        >
          <div className={styles.card_img_wrapper}>
            <Card.Img
              alt={imageAlt}
              as={Image}
              height={200}
              src={imagePath}
              style={{ height: "auto", objectFit: "cover", width: "100%" }}
              variant="top"
              width={300}
            />
          </div>
        </span>

        <Card.Body>
          <Card.Title>{itemData.name}</Card.Title>
          <Card.Text>{itemData.description.substring(0, 47)}...</Card.Text>
          <Card.Text className="text-muted">
            ${lowPriceString} - ${highPriceString}
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  )
}
