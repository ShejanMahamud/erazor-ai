"use client"
import { BackgroundRemover } from "@/components/BackgroundRemover"
import { Banner } from "@/components/Banner"
import { useSubscriptionStore } from "@/stores/subscription-store"
import { useShallow } from "zustand/shallow"

export default function BackgroundRemoverPage() {

  const [showBanner] = useSubscriptionStore(useShallow((state) => [!state.isSubscribed()]))
  return (
    <div className="min-h-screen bg-background">
      {showBanner && <Banner focusText="Upgrade Plan" text="To access the Background Remover tool, please upgrade your plan." linkText="Upgrade" linkUrl="/pricing" />}
      <div className="flex flex-1 flex-col space-y-6 p-4 md:p-6 lg:p-8">
        <BackgroundRemover showHeader={true} />
      </div>
    </div>
  )
}