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
    return "http://localhost:3000/api/" + external_api + endpoint
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
  const res = await fetch(getEndpoint("square", "/catalog_objects"))

  if (!res.ok) {
    throw new Error("Failed to fetch catalog objects")
  }

  return res.json()
}

/**
 * Home page of abateai.com
 * @returns Home page consisting of JSX components
 */
export default async function Home() {
  // Referenced:
  // - https://nextjs.org/learn/basics/data-fetching/with-data

  // props to pass to CategoryTabs
  let props = {}

  // Map of category names to item objects
  let categoryItemMap = new Map()

  // Map of category ids to category names
  let idCategoryMap = new Map()

  // Map of image ids to image names
  let idImageMap = new Map()

  // Fetch external data at build time
  try {
    const catalogObjects = await getCatalogObjects()

    // Parse data from related_objects section of catalogObjects
    for (const obj of catalogObjects.related_objects) {
      if (obj.type === "CATEGORY") {
        idCategoryMap.set(obj.id, obj.category_data.name)
      } else if (obj.type === "IMAGE") {
        idImageMap.set(obj.id, obj.image_data.name)
      }
    }

    // Fill categoryItemMap
    for (const item of catalogObjects.objects) {
      const categoryName = idCategoryMap.get(item.item_data.category_id)

      if (!categoryItemMap.has(categoryName)) {
        categoryItemMap.set(categoryName, [item])
      } else {
        categoryItemMap.get(categoryName).push(item)
      }
    }

    props = {
      categoryItemMap,
      idImageMap,
    }
  } catch (error) {
    console.error("Error:", error)
  }

  return (
    <Container as="main">
      <CategoryTabs {...props} />
    </Container>
  )
}
