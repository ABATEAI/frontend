"use client"

import Button from "react-bootstrap/Button"
import Table from "react-bootstrap/Table"
import { useEffect } from "react"

export default function CartTable({ cartMap, handleOnDeleteAttempt }) {
  /*
   * useEffect() can only be used in client components.
   * react-bootstrap does not depend on bootstrap.js and
   * all components are exported on window.ReactBootstrap
   *
   * Referenced:
   * - react-bootstrap.netlify.app/docs/components/buttons/
   * - react-bootstrap.netlify.app/docs/components/table/
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
    <>
      <Table borderless hover>
        <tbody>
          {[...cartMap.entries()].map((idItemArr) => (
            <tr id={idItemArr[0]} key={idItemArr[0]}>
              <td>
                <Button
                  className="fs-3 fw-bold"
                  onClick={() =>
                    handleOnDeleteAttempt(idItemArr[0], idItemArr[1])
                  }
                  variant="outline-danger"
                >
                  &times;
                </Button>
              </td>
              <td>{idItemArr[1].name}</td>
              <td>{idItemArr[1].qty}</td>
              <td>
                ${Number(idItemArr[1].qty * idItemArr[1].price).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}
