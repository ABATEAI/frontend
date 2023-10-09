import "bootstrap/dist/css/bootstrap.min.css"
import "./globals.css"
import { Roboto_Flex } from "next/font/google"
// import { useEffect } from "react"

const roboto_flex = Roboto_Flex({ subsets: ["latin"] })

export const metadata = {
  title: "ABATE AI",
  description: "Reduce to increase",
}

export default function RootLayout({ children }) {
  /*
   * I don't think this is needed since react-bootstrap does not depend on
   * bootstrap.js and all components are exported on window.ReactBootstrap obj
   * 
   * Referenced:
   * - react-bootstrap.netlify.app/docs/getting-started/introduction/
   * - react-bootstrap.netlify.app/docs/getting-started/why-react-bootstrap
   * - blog.logrocket.com/handling-bootstrap-integration-next-js/
   * - dev.to/anuraggharat/adding-bootstrap-to-nextjs-39b2
   * - www.slingacademy.com/article/how-to-correctly-use-bootstrap-5-in-next-js/
   * - nextjs.org/docs/app/api-reference/file-conventions/layout
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
