import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
type Data = {
  title: string;
  price: number;
  image: string;
};

export const POST = async (request: NextRequest) => {
  try {
    const data: Data = await request.json();
    console.log(data);
    const customer = await stripe.customers.create({
      email: "customer@exple.com",
      address: {
        city: "New York",
        country: "US",
        line1: "123 Main Street",
        postal_code: "10001",
        state: "NY",
      },
      name: "Customer Name",
    });
    console.log(customer);
    const amountInCents = Math.round(data.price * 100);
    if (amountInCents < 50) {
      throw new Error("Amount must be at least 50 cents");
    }
    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"], // Zahlungsart
      mode: "payment", // Zahlungsmodus((entspricht einer Zahlung ohne Abonnement))
      customer: customer.id, // Kunden-ID(daten des Kunden)
      success_url: "http://localhost:3000/success?token=" + customer.id, // Erfolgreiche Zahlung
      cancel_url: "http://localhost:3000/cancel?token=" + customer.id, // Abgebrochene Zahlung
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: data.title,
              images: [data.image],
            },
            unit_amount: amountInCents,
          },
          quantity: 1,
        },
      ],
    });
    console.log(checkoutSession.url);
    return NextResponse.json(
      { msg: checkoutSession, url: checkoutSession.url },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error: ", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
