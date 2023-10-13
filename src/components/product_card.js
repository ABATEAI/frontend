"use client"

import Card from "react-bootstrap/Card"
import Link from "next/link"
import { useEffect } from "react"

// Todo: Pass in props containing product data from Square
export default function ProductCard(props) {
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
    <Card border="secondary" href="/">
      <Link href="/">
        <Card.Img src="https://picsum.photos/id/292/300/200" variant="top" />
      </Link>

      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>Product details</Card.Text>
        <Card.Text className="text-muted">$XX.XX - $YY.YY</Card.Text>
      </Card.Body>
    </Card>
  )
}
