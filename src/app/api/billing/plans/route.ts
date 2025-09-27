import { BillingPlansResponse } from '@/types/billing';
import { NextResponse } from 'next/server';


export async function GET() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || process.env.API_BASE_URL;

    const apiUrl = `${baseUrl}/billing/plans`;

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'

      },
      next: { revalidate: 300 }
    });

    if (!response.ok) {
      return NextResponse.json({
        success: false,
        message: 'Failed to fetch billing plans',
        data: [],
      });
    }

    const data: BillingPlansResponse = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Error fetching billing plans',
      data: [],
    });
  }
}
