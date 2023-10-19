"use client"

import Spinner from "react-bootstrap/Spinner"
import useSWR from "swr"
import { useEffect } from "react"

// Client-side fetching resources
// - nextjs.org/docs/pages/building-your-application/data-fetching/client-side
// - swr.vercel.app/docs/getting-started
const fetcher = (...args) => fetch(...args).then((res) => res.json())

/**
 * Helper function to retrieve persuasive message from MakerSuite endpoint
 * @param {string} id Id of item that customer is attempting to remove
 * @returns JSON object of useSWR return values
 */
function useMessage(id) {
  const { data, err, isLoading } = useSWR(`/api/google/keep/${id}`, fetcher)

  return {
    message: data,
    isLoading,
    isError: err,
  }
}

export default function CartAlertBody({ item_id }) {
  /*
   * useEffect() can only be used in client components.
   * react-bootstrap does not depend on bootstrap.js and
   * all components are exported on window.ReactBootstrap
   *
   * Referenced:
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

  const { message, isLoading, isError } = useMessage(item_id)

  if (isLoading) {
    return (
      <Spinner animation="border" role="status" variant="light">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    )
  }

  if (isError) {
    return <p>We hope you will reconsider removing this item.</p>
  }

  return <div>{message}</div>
}
