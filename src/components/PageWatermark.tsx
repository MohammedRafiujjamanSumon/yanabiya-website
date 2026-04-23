import { assets } from '../data/assets'

export default function PageWatermark() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 flex items-center justify-center select-none"
    >
      <img
        src={assets.logo}
        alt=""
        className="w-screen h-screen opacity-[0.10] object-contain p-4"
      />
    </div>
  )
}
