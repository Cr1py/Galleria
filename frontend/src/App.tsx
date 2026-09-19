import Gallery from "./components/webpage/Gallery"

function App() {

  return (
    // later: have it default to landing unless user chooses guest, then route them to Gallery
    <div className="h-full">
      <Gallery />
    </div>
  )
}

export default App
