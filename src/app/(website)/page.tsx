import CallToAction from './_components/call-to-action/call-to-action'
import DashboardSnippet from './_components/dashboard-snippet/dashboard-snippet'
import {PricingCard} from "@/app/(website)/_components/pricing/PricingSection";

export default function Home() {
  return (
  <main className="md:px-10 py-20 flex flex-col gap-36">
    <div>
      <CallToAction />
      <DashboardSnippet />
    </div>
    <div className="shadow-card-glow p-6 rounded-lg">
      <PricingCard/>
    </div>
  </main>
  )
}
