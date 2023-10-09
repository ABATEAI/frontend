import "bootstrap/dist/css/bootstrap.min.css"
import "./globals.css"
import { Roboto_Flex } from "next/font/google"

const roboto_flex = Roboto_Flex({ subsets: ["latin"] })

export const metadata = {
  title: "ABATE AI",
  description: "Reduce to increase",
}

export default function RootLayout({ children }) {
  /*
   * useEffect() can only be used in client components.
   * react-bootstrap does not depend on bootstrap.js and
   * all components are exported on window.ReactBootstrap obj
   * 
   * Referenced:
   * - react-bootstrap.netlify.app/docs/getting-started/introduction/
   * - react-bootstrap.netlify.app/docs/getting-started/why-react-bootstrap
   * - blog.logrocket.com/handling-bootstrap-integration-next-js/
   * - dev.to/anuraggharat/adding-bootstrap-to-nextjs-39b2
   * - www.slingacademy.com/article/how-to-correctly-use-bootstrap-5-in-next-js/
   * - nextjs.org/docs/app/api-reference/file-conventions/layout
   * - nextjs.org/docs/app/building-your-application/rendering/client-components
   * 
  useEffect(() => {
    import("react-bootstrap/dist/react-bootstrap.min.js")
  }, [])
  */

  return (
    <html lang="en" className={roboto_flex.className}>
      <body>{children}</body>
    </html>
  )
}
