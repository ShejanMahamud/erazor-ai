import { auth, currentUser } from '@clerk/nextjs/server';
import { Polar } from '@polar-sh/sdk';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';

const polar = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN!,
  server: 'production'
});

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    redirect('/auth/sign-in');
  }

  const user = await currentUser();

  if (!user) {
    return NextResponse.json('User not found', { status: 401 });
  }

  try {
    let customer;

    try {
      customer = await polar.customers.getExternal({
        externalId: userId
      });
    } catch (error) {
      try {
        customer = await polar.customers.create({
          email: user?.emailAddresses[0]?.emailAddress || '',
          name: user?.fullName || user?.firstName || 'User',
          externalId: userId
        });
      } catch (createError) {
        throw createError;
      }
    }

    try {
      const session = await polar.customerSessions.create({
        externalCustomerId: userId
      });

      return NextResponse.json({
        url: session.customerPortalUrl
      });
    } catch (sessionError) {

      // Try with customer ID instead if externalCustomerId fails
      if (customer && customer.id) {
        try {
          const sessionRetry = await polar.customerSessions.create({
            customerId: customer.id
          });
          return NextResponse.json({ url: sessionRetry.customerPortalUrl });
        } catch (retryError) {
          throw retryError;
        }
      }
      throw sessionError;
    }
  } catch (error) {
    // More detailed error response
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    return NextResponse.json(
      {
        error: 'Error creating portal session',
        message: errorMessage,
        userId: userId
      },
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
}
