"use client"

import ABATEAI_Logo from "../../public/images/ABATE_266x64.png"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Image from "next/image"
import Link from "next/link"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import ShoppingCartIcon from "../../public/icons/shopping_cart.svg"
import { useEffect } from "react"

export default function NavbarTop() {
  useEffect(() => {
    import("react-bootstrap/dist/react-bootstrap.min.js")
  }, [])

  return (
    <Navbar fixed="top" expand="lg" bg="white" data-bs-theme="light">
      <Container>
        <Navbar.Brand as={Link} href="/">
          <Image
            src={ABATEAI_Logo}
            height={43}
            className="d-inline-block align-top"
            alt="ABATE AI Logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="ms-auto">
            <Nav.Link
              as={Button}
              variant="link"
              href="/"
              className="d-lg-none text-center"
            >
              Order now
            </Nav.Link>
            <Nav.Link
              as={Button}
              variant="outline-secondary"
              href="/"
              className="d-none d-lg-inline border border-4 border-black rounded-0 fs-5 fw-bold text-black"
            >
              Order now
            </Nav.Link>
            <Nav.Link as={Button} variant="link" className="d-lg-none">
              View cart
            </Nav.Link>
            <Nav.Link
              as={Button}
              variant="link"
              className="d-none d-lg-inline mx-lg-3"
            >
              <Image src={ShoppingCartIcon} alt="View cart" />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
