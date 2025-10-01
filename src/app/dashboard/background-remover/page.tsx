"use client"
import { BackgroundRemover } from "@/components/BackgroundRemover"
import { Banner } from "@/components/Banner"
import PageContainer from "@/components/layout/page-container"
import { useUserSubscription } from "@/hooks/useUserSubscription"

export default function BackgroundRemoverPage() {
  const { userSubscription, loading } = useUserSubscription()

  const showBanner = !loading && (!userSubscription || userSubscription.status !== "active")

  return (
    <PageContainer scrollable={false}>
      {showBanner && <Banner focusText="Upgrade Plan" text="To access the Background Remover tool, please upgrade your plan." linkText="Upgrade" linkUrl="/pricing" />}
      <BackgroundRemover showHeader={true} />
    </PageContainer>
  )
}