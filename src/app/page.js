import CategoryTabs from "../components/category_tabs"
import Container from "react-bootstrap/Container"

/**
 * Get URL to backend endpoint based on development or production environment
 * @param {string} external_api String with value "square" or "google"
 * @param {string} endpoint     Path to endpoint (must begin with forward slash)
 * @returns {string} Environment-dependent URL combining external_api + endpoint
 */
function getEndpoint(external_api, endpoint) {
  if (process.env.NODE_ENV === "development") {
    return "http://backend:8000/api/" + external_api + endpoint
  }

  return "https://abateai.com/api/" + external_api + endpoint
}

/**
 * Get catalog objects from backend (list of pizza sizes excluded)
 * @returns {object} JS object containing JSON from response
 */
async function getCatalogObjects() {
  // Referenced
  // - https://nextjs.org/docs/app/building-your-application/data-fetching
  //   /fetching-caching-and-revalidating
  const res = await fetch(
    getEndpoint("square", "/catalog_objects", { cache: "force-cache" })
  )

  if (!res.ok) {
    throw new Error("Failed to fetch catalog objects")
  }

  return res.json()
}

export default async function Home() {
  const catalogObjects = await getCatalogObjects();

  return (
    <Container as="main">
      <CategoryTabs />
    </Container>
  )
}
