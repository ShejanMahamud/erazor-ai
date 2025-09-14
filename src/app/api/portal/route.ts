// app/api/portal/route.ts
import { auth, currentUser } from '@clerk/nextjs/server';
import { Polar } from '@polar-sh/sdk';
import { redirect } from 'next/navigation';

const polar = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN!,
  server: 'sandbox'
});

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    redirect('/auth/sign-in');
  }
  const user = await currentUser();

  try {
    let customer;

    // Try to get existing customer
    try {
      customer = await polar.customers.getExternal({
        externalId: userId
      });
    } catch (error) {
      // Customer doesn't exist, create a new one
      customer = await polar.customers.create({
        email: user?.emailAddresses[0]?.emailAddress || '',
        name: user?.fullName || '',
        externalId: userId
      });
    }

    // Create customer portal session
    const session = await polar.customerSessions.create({
      externalCustomerId: userId
    });

    return Response.redirect(session.customerPortalUrl);
  } catch (error) {
    console.error('Error creating portal session:', error);
    return new Response('Error creating portal session', { status: 500 });
  }
}
