import Sphere from "./components/portal/Sphere"
import { art } from "./data/data";

function App() {

  return (
    <div className="h-full">
      <Sphere art={art[0]} />
    </div>
  )
}

export default App
