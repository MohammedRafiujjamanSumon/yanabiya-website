import { useState } from 'react'
import { Smartphone, X, RotateCw } from 'lucide-react'

const DEVICES = [
  { id: 'iphone',  label: 'iPhone 14',     w: 390, h: 844 },
  { id: 'iphonese', label: 'iPhone SE',    w: 375, h: 667 },
  { id: 'pixel',   label: 'Pixel 7',       w: 412, h: 915 },
  { id: 'tablet',  label: 'iPad Mini',     w: 768, h: 1024 },
] as const

export default function MobilePreview() {
  const [open, setOpen] = useState(false)
  const [deviceId, setDeviceId] = useState<typeof DEVICES[number]['id']>('iphone')
  const [landscape, setLandscape] = useState(false)
  const device = DEVICES.find((d) => d.id === deviceId)!
  const w = landscape ? device.h : device.w
  const h = landscape ? device.w : device.h

  return (
    <>
      {/* Floating trigger */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 end-6 z-50 inline-flex items-center gap-2 px-4 py-3 rounded-full bg-brand-accent text-white font-semibold shadow-lg shadow-brand-accent/30 hover:-translate-y-0.5 hover:shadow-xl transition-all"
          aria-label="Open mobile preview"
        >
          <Smartphone size={18} />
          <span className="hidden sm:inline">Preview Mobile</span>
        </button>
      )}

      {/* Modal overlay */}
      {open && (
        <div className="fixed inset-0 z-[60] bg-slate-900/80 backdrop-blur grid place-items-center p-4 fade-up">
          {/* Header controls */}
          <div className="absolute top-4 inset-x-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              {DEVICES.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setDeviceId(d.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
                    d.id === deviceId
                      ? 'bg-brand-accent text-white'
                      : 'bg-white/10 text-brand-deep hover:bg-white/20'
                  }`}
                >
                  {d.label}
                </button>
              ))}
              <button
                onClick={() => setLandscape((v) => !v)}
                className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/10 text-brand-deep hover:bg-white/20 inline-flex items-center gap-1.5"
                title="Rotate"
              >
                <RotateCw size={12} /> {landscape ? 'Landscape' : 'Portrait'}
              </button>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="w-9 h-9 rounded-full bg-white/10 text-brand-deep hover:bg-white/20 grid place-items-center"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>

          {/* Device frame */}
          <div
            className="relative bg-slate-950 rounded-[2.2rem] p-3 shadow-2xl border border-white/10 max-h-[85vh] overflow-hidden"
            style={{ width: w + 24, height: Math.min(h + 24, window.innerHeight * 0.85) }}
          >
            <iframe
              src="/?preview=mobile"
              className="w-full h-full bg-brand-50 rounded-[1.6rem]"
              style={{ width: w, height: Math.min(h, window.innerHeight * 0.85 - 24) }}
              title="Mobile preview"
            />
            <div className="absolute top-1.5 inset-x-0 flex justify-center pointer-events-none">
              <div className="w-24 h-1.5 bg-slate-700 rounded-full" />
            </div>
          </div>

          {/* Footer info */}
          <div className="absolute bottom-4 inset-x-0 text-center text-xs text-brand-deep/60">
            {w} × {h} px · Tap outside or × to close
          </div>

          {/* Click-outside dismiss */}
          <div
            className="absolute inset-0 -z-10"
            onClick={() => setOpen(false)}
          />
        </div>
      )}
    </>
  )
}
