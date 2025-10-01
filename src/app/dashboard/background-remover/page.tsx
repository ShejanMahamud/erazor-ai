"use client"
import { BackgroundRemover } from "@/components/BackgroundRemover"
import { Banner } from "@/components/Banner"
import { useUserSubscription } from "@/hooks/useUserSubscription"

export default function BackgroundRemoverPage() {
  const { userSubscription, loading } = useUserSubscription()

  const showBanner = !loading && (!userSubscription || userSubscription.status !== "active")

  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-1 flex-col space-y-6 p-4 md:p-6 lg:p-8">
        {showBanner && <Banner focusText="Upgrade Plan" text="To access the Background Remover tool, please upgrade your plan." linkText="Upgrade" linkUrl="/pricing" />}
        <BackgroundRemover showHeader={true} />
      </div>
    </div>
  )
}