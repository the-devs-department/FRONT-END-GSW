import { RouterProvider } from "react-router-dom"
import router from "./router"
import { FeedbackProvider } from "./context/FeedbackModalContext"
import { NotificationProvider } from "./context/NotificationContext" 

function App() {
  return (
    <FeedbackProvider>
      <NotificationProvider>
        <RouterProvider router={router}/>
      </NotificationProvider>
    </FeedbackProvider>
  )
}

export default App