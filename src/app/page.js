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

export default function Home() {
  return (
    <Container as="main">
      <CategoryTabs />
    </Container>
  )
}
