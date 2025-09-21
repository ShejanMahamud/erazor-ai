'use client';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { IconPhoto, IconUpload } from '@tabler/icons-react';
import Link from 'next/link';

interface EmptyStateProps {
    title?: string;
    description?: string;
    showCTA?: boolean;
}

export function EmptyState({
    title = "Welcome to Your Dashboard!",
    description = "Start by uploading your first image to see your processing statistics and activity here.",
    showCTA = true
}: EmptyStateProps) {
    return (
        <Card className="col-span-full">
            <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                    <IconPhoto className="h-8 w-8 text-muted-foreground" />
                </div>
                <CardTitle className="text-xl font-semibold">{title}</CardTitle>
                <CardDescription className="text-center max-w-md mx-auto">
                    {description}
                </CardDescription>
            </CardHeader>
            {showCTA && (
                <CardContent className="text-center">
                    <Link href="/dashboard/background-remover">
                        <Button className="inline-flex items-center gap-2">
                            <IconUpload className="h-4 w-4" />
                            Start Processing Images
                        </Button>
                    </Link>
                    <p className="text-sm text-muted-foreground mt-3">
                        Once you process your first image, you'll see detailed analytics and insights here.
                    </p>
                </CardContent>
            )}
        </Card>
    );
}
