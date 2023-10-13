import CategoryTabs from "../components/category_tabs"
import Container from "react-bootstrap/Container"

export default function Home() {
  return (
    <Container as="main">
      <CategoryTabs />
    </Container>
  )
}
