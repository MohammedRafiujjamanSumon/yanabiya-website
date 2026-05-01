export type DistributionType = {
  slug: string
  label: string
  short: string
  body: string
  longBody: string[]
  /** Tailwind text color for badges. */
  accent: string
  /** Linear-gradient pair for the card. */
  from: string
  to: string
  /** Outer hover glow rgba. */
  glow: string
  /** Hero photo for the detail page. */
  image: string
}

export const DISTRIBUTIONS: DistributionType[] = [
  {
    slug: 'formally',
    label: 'Distribution Formally',
    short: 'Through designated roles and job descriptions.',
    body: 'Leadership flows through clearly designated roles, board mandates, and documented job responsibilities.',
    longBody: [
      'Formal distribution is the backbone of governance at Yanabiya Group. Every leader has a charter — a documented remit, decision rights, and accountability lines that cascade from the Board through the Global CEO, the Executive Committee, and country heads.',
      'This makes the group auditable, diligence-ready, and resilient to turnover: when someone moves on, their charter survives. It also gives every operator clarity on what they own, who they escalate to, and how their work is measured.',
      "Formal distribution is what lets the group execute consistently across four time zones — Muscat, London, Dhaka, and Austin — without bottlenecks at the centre.",
    ],
    accent: 'text-emerald-300',
    from: '#a7f3d0',
    to: '#059669',
    glow: 'rgba(5,150,105,0.35)',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=80',
  },
  {
    slug: 'pragmatically',
    label: 'Distribution Pragmatically',
    short: 'Through necessity — often ad hoc delegation of workload.',
    body: 'When the work demands it, leadership is delegated cross-functionally — fast, pragmatic, and outcome-led.',
    longBody: [
      "Pragmatic distribution is how the group adapts to spikes — a partner launch, a regulatory shift, a major bid. Senior leaders delegate ownership down to the operator closest to the problem, even when it cuts across formal lines.",
      "We treat this as a feature, not a workaround. The group runs lean by design, and pragmatic distribution lets us pivot capacity without re-orging every quarter.",
      'The discipline is to time-box it: pragmatic ownership is for a specific outcome with a defined window. Once it lands, we either formalise the role or collapse it back.',
    ],
    accent: 'text-teal-300',
    from: '#5eead4',
    to: '#0d9488',
    glow: 'rgba(13,148,136,0.35)',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1400&q=80',
  },
  {
    slug: 'strategically',
    label: 'Distribution Strategically',
    short: 'Based on planned appointment to develop leadership across the group.',
    body: 'Senior appointments are planned with succession in mind — to build leadership depth across every market.',
    longBody: [
      "Strategic distribution is how we build the bench. Every senior appointment is a deliberate two-part decision: who runs this today, and who is being developed to run it next.",
      'The Executive Committee reviews succession depth across all four countries on a rolling cycle. We invest in stretch assignments, cross-country rotations, and external advisory exposure for emerging leaders.',
      'This is the slowest of the six distributions — and the one with the longest payoff. Done well, it eliminates the "hero leader" risk that fells most fast-growing groups.',
    ],
    accent: 'text-cyan-300',
    from: '#67e8f9',
    to: '#0891b2',
    glow: 'rgba(8,145,178,0.35)',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80',
  },
  {
    slug: 'incrementally',
    label: 'Distribution Incrementally',
    short: 'Developing greater responsibility as people demonstrate capacity to lead.',
    body: 'Responsibility expands in tested increments — leaders earn the next scope by delivering on the current one.',
    longBody: [
      "We grow leaders the same way we grow the group: in tested increments. A team lead earns a function. A function lead earns a market. A country head earns a region.",
      'Each step is paired with explicit success criteria and a structured review. The principle: we never give someone a remit they have not already shown they can carry.',
      'Done at scale, incremental distribution turns the group into a leadership factory. It also keeps egos honest — every leader knows the next remit is earned, not given.',
    ],
    accent: 'text-indigo-300',
    from: '#a5b4fc',
    to: '#4338ca',
    glow: 'rgba(67,56,202,0.35)',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=80',
  },
  {
    slug: 'opportunistically',
    label: 'Distribution Opportunistically',
    short: 'Capable people willingly extending their roles to group-wide leadership.',
    body: 'High-performers willingly extend their roles to take group-wide ownership — leadership by initiative.',
    longBody: [
      'Opportunistic distribution is leadership by initiative. A senior engineer in Dhaka spots a workflow gap across all four offices and writes the playbook. A country marketing lead notices a gap in group brand and proposes the fix.',
      'We make it easy to step up: lightweight intake, fast yes/no, real ownership when the answer is yes. The group rewards initiative with scope, not just praise.',
      'This is how unspoken roles emerge — and how outsized contributions get noticed before formal review cycles catch them.',
    ],
    accent: 'text-fuchsia-300',
    from: '#f0abfc',
    to: '#a21caf',
    glow: 'rgba(162,28,175,0.35)',
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1400&q=80',
  },
  {
    slug: 'culturally',
    label: 'Distribution Culturally',
    short: "Leadership as a reflection of the group's culture, ethos and traditions.",
    body: "Leadership is lived — a reflection of the group's culture, ethos, and the example its founders set every day.",
    longBody: [
      "Cultural distribution is the deepest layer. It is the unwritten standard for how decisions get made, how customers are treated, how mistakes are owned, and how junior people are developed.",
      "It is set at the top — by the founders, the CEO, the Vice Chairman, and the country heads — and reinforced in every all-hands, every onboarding, every customer escalation.",
      'Culture is the only form of leadership that scales without anyone managing it. When it works, it makes the other five distributions easier; when it breaks, none of them are enough.',
    ],
    accent: 'text-slate-300',
    from: '#cbd5e1',
    to: '#475569',
    glow: 'rgba(71,85,105,0.35)',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1400&q=80',
  },
]
