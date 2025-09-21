// app/api/portal/route.ts
import { auth, currentUser } from '@clerk/nextjs/server';
import { Polar } from '@polar-sh/sdk';
import { redirect } from 'next/navigation';

// Check if required environment variables are present
if (!process.env.POLAR_ACCESS_TOKEN) {
  console.error('POLAR_ACCESS_TOKEN environment variable is not set');
}

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
    console.error('No user found after authentication');
    return new Response('User not found', { status: 401 });
  }

  try {
    console.log('Creating portal session for user:', userId);
    let customer;

    // Try to get existing customer
    try {
      console.log('Attempting to get existing customer with externalId:', userId);
      customer = await polar.customers.getExternal({
        externalId: userId
      });
      console.log('Found existing customer:', customer.id);
    } catch (error) {
      // Customer doesn't exist, create a new one
      console.log('Customer not found, creating new customer...');
      console.log('User data:', {
        email: user?.emailAddresses[0]?.emailAddress,
        name: user?.fullName,
        externalId: userId
      });

      try {
        customer = await polar.customers.create({
          email: user?.emailAddresses[0]?.emailAddress || '',
          name: user?.fullName || user?.firstName || 'User',
          externalId: userId
        });
        console.log('Created new customer:', customer.id);
      } catch (createError) {
        console.error('Error creating customer:', createError);
        throw createError;
      }
    }

    // Create customer portal session
    console.log('Creating customer portal session...');
    try {
      const session = await polar.customerSessions.create({
        externalCustomerId: userId
      });
      console.log('Portal session created successfully:', session.customerPortalUrl);
      return Response.redirect(session.customerPortalUrl);
    } catch (sessionError) {
      console.error('Error creating customer session with externalCustomerId:', sessionError);

      // Try with customer ID instead if externalCustomerId fails
      if (customer && customer.id) {
        try {
          console.log('Retrying with customer ID:', customer.id);
          const sessionRetry = await polar.customerSessions.create({
            customerId: customer.id
          });
          console.log('Portal session created with customer ID:', sessionRetry.customerPortalUrl);
          return Response.redirect(sessionRetry.customerPortalUrl);
        } catch (retryError) {
          console.error('Error creating session with customer ID:', retryError);
          throw retryError;
        }
      }
      throw sessionError;
    }
  } catch (error) {
    console.error('Error creating portal session:', error);

    // More detailed error response
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorDetails = error instanceof Error ? error.stack : String(error);

    console.error('Error details:', {
      message: errorMessage,
      stack: errorDetails,
      userId,
      userEmail: user?.emailAddresses[0]?.emailAddress
    });

    return new Response(
      JSON.stringify({
        error: 'Error creating portal session',
        message: errorMessage,
        userId: userId
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
}
