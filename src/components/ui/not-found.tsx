"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, RefreshCw, SearchX } from "lucide-react"

export function DataNotFound() {
    return (
        <div className="flex items-center justify-center p-4">
            <Card className="w-full max-w-md mx-auto shadow-lg">
                <CardContent className="flex flex-col items-center text-center p-8 space-y-6">
                    {/* Icon */}
                    <div className="relative">
                        <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center">
                            <SearchX className="w-10 h-10 text-accent" />
                        </div>
                        <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-destructive flex items-center justify-center">
                            <span className="text-destructive-foreground text-xs font-bold">!</span>
                        </div>
                    </div>

                    {/* Header */}
                    <div className="space-y-2">
                        <h1 className="text-2xl font-bold text-foreground text-balance">Data Not Found</h1>
                        <p className="text-muted-foreground text-pretty leading-relaxed">
                            We couldn't find any data matching your criteria. The information you're looking for might have been moved
                            or doesn't exist.
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 w-full">
                        <Button variant="default" className="flex-1 gap-2" onClick={() => window.history.back()}>
                            <ArrowLeft className="w-4 h-4" />
                            Go Back
                        </Button>
                        <Button variant="outline" className="flex-1 gap-2 bg-transparent" onClick={() => window.location.reload()}>
                            <RefreshCw className="w-4 h-4" />
                            Try Again
                        </Button>
                    </div>

                    {/* Additional Help */}
                    <div className="pt-4 border-t border-border w-full">
                        <p className="text-sm text-muted-foreground">
                            Need help?
                            <Button variant="link" className="p-0 h-auto ml-1 text-sm">
                                Contact Support
                            </Button>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
