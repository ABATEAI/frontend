"use client"

import ProductGrid from "../components/product_grid"
import Tab from "react-bootstrap/Tab"
import Tabs from "react-bootstrap/Tabs"
import { useEffect } from "react"

// Todo: Pass in props containing category and product data from Square
export default function CategoryTabs() {
  /*
   * useEffect() can only be used in client components.
   * react-bootstrap does not depend on bootstrap.js and
   * all components are exported on window.ReactBootstrap
   *
   * Referenced:
   * - react-bootstrap.netlify.app/docs/components/tabs/
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
    <Tabs
      className="my-5"
      defaultActiveKey="classic"
      id="category_tabs"
      justify
      variant="underline"
    >
      {["Classic", "Supreme", "Chicken", "Veggie"].map((category) => (
        // Product grid should be retrieved from Square API.
        <Tab eventKey={category.toLowerCase()} key={category} title={category}>
          <ProductGrid />
        </Tab>
      ))}
    </Tabs>
  )
}