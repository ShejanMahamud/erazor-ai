import { BillingPlansResponse } from '@/types/billing';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(request: NextRequest) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || process.env.API_BASE_URL;

    const apiUrl = `${baseUrl}/billing/plans`;

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
        // Add any authentication headers here if needed
        // 'Authorization': `Bearer ${token}`,
      },
      // Add cache control if needed
      next: { revalidate: 300 } // Revalidate every 5 minutes
    });

    if (!response.ok) {
      // Fallback to mock data if API fails
      return NextResponse.json({
        success: false,
        message: 'Failed to fetch billing plans',
        data: [],
      });
    }

    const data: BillingPlansResponse = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    // Fallback to mock data on error
    return NextResponse.json({
      success: false,
      message: 'Error fetching billing plans',
      data: [],
    });
  }
}
