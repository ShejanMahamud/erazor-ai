"use client"
import { BackgroundRemover } from "@/components/BackgroundRemover"
import PageContainer from "@/components/layout/page-container"

export default function BackgroundRemoverPage() {
  return (
    <PageContainer>
      <BackgroundRemover showHeader={true} />
    </PageContainer>
  )
}