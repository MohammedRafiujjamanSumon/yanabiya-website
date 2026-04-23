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
        className="w-[85%] max-w-[1100px] opacity-[0.13] object-contain"
      />
    </div>
  )
}
