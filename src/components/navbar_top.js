"use client"

import ABATEAI_Logo from "../../public/icons/ABATE_266x64.svg"
import Button from "react-bootstrap/Button"
import Cart from "./cart"
import CartIcon from "../../public/icons/shopping_cart.svg"
import CartModal from "./cart_modal"
import Container from "react-bootstrap/Container"
import Image from "next/image"
import Link from "next/link"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import { useEffect } from "react"
import { useState } from "react"

export default function NavbarTop() {
  /*
   * useEffect() can only be used in client components.
   * react-bootstrap does not depend on bootstrap.js and
   * all components are exported on window.ReactBootstrap obj
   *
   * Referenced:
   * - react-bootstrap.netlify.app/docs/components/navbar/
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

  let cart = new Cart()
  cart.loadFromSessionStorage()

  const [cartModalShow, setCartModalShow] = useState(false)
  const [cartMap, setCartMap] = useState(new Map([...cart.getCart().entries()]))

  const handleCartModalClose = () => setCartModalShow(false)
  const handleCartModalShow = () => {
    cart.loadFromSessionStorage()
    setCartMap(new Map([...cart.getCart().entries()]))
    setCartModalShow(true)
  }

  return (
    <>
      <Navbar
        bg="white"
        className="py-4"
        data-bs-theme="light"
        expand="lg"
        fixed="top"
      >
        <Container>
          <Navbar.Brand as={Link} href="/">
            <Image
              alt="ABATE AI Logo"
              className="d-inline-block align-top"
              height={43}
              src={ABATEAI_Logo}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav" className="justify-content-end">
            <Nav className="ms-auto">
              <Nav.Link
                as={Button}
                className="d-lg-none text-center"
                href="/"
                variant="link"
              >
                Order now
              </Nav.Link>

              <Nav.Link
                as={Button}
                className="d-none d-lg-inline border border-4 border-black rounded-0 fs-5 fw-bold text-black"
                href="/"
                variant="outline-secondary"
              >
                Order now
              </Nav.Link>

              <Nav.Link
                as={Button}
                className="d-lg-none"
                onClick={handleCartModalShow}
                variant="link"
              >
                View cart
              </Nav.Link>

              <Nav.Link
                as={Button}
                className="d-none d-lg-inline mx-lg-3"
                onClick={handleCartModalShow}
                variant="link"
              >
                <Image alt="View cart" src={CartIcon} />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <CartModal
        cart={cart}
        cartMap={cartMap}
        onHide={handleCartModalClose}
        onOrder={() => console.log("Place order via Square API.")}
        setCartMap={setCartMap}
        show={cartModalShow}
      />
    </>
  )
}
