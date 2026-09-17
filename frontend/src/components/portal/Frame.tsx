import Sphere from "./Sphere";
import { art } from "../../data/data";

export default function Frame() {
  return (
    <div className="h-full w-full">
      <Sphere art={art[0]} />
    </div>
  )
}