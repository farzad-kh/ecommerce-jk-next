
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import Stripe from "stripe";

import prisma from "../../../prisma/client"
import { authOptions } from "../auth/[...nextauth]/route";
// import { authOptions } from "../auth/[...nextauth]/route";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
//     apiVersion: "2023-10-16"
// });
export async function POST(req) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: "2023-10-16"
    });
    const session = await getServerSession(authOptions)
    try {
        const body = await req.json()
        const { products, payment_intent_id, total_price } = body

        if (!session) return NextResponse.json({ error: "You must log in" }, { status: 403 })

        const orderData = {
            user: { connect: { id: session?.user?.id } },
            totalPrice: total_price,
            currency: "usd",
            status: "pending",
            paymentIntentId: payment_intent_id,
            products: {
                create: products.map(item => ({
                    productId: item.id,
                    name: item.name,
                    image: item.image,
                    unit_amount: parseFloat(item.unit_amount),
                    quantity: item.quantity,
                    size: item.size
                }))
            }
        }
        if (payment_intent_id) {
            const current_intent = await stripe.paymentIntents.retrieve(
                payment_intent_id
            )
            if (current_intent) {
                const updated_intent = await stripe.paymentIntents.update(
                    payment_intent_id,
                    { amount: total_price }
                )
                const existingOrder = await prisma.order.findFirst({
                    where: { paymentIntentId: updated_intent?.id },
                    include: { products: true }
                })

                if (!existingOrder) return NextResponse.json({ error: 400 }, { message: "invalid payment intent" })

                await prisma.order.update({
                    where: { id: existingOrder?.id },
                    data: {
                        totalPrice: total_price,
                        products: {
                            deleteMany: {},
                            create: products.map(item => ({
                                productId: item.id,
                                name: item.name,
                                image: item.image,
                                unit_amount: parseFloat(item.unit_amount),
                                quantity: item.quantity,
                                size: item.size
                            }))
                        }
                    }
                })

                return NextResponse.json(
                    { paymentIntent: updated_intent },
                    { message: "update success" },
                    { status: 200 }
                );
            }
        } else {
            // for the first time product add to db by user
            const paymentIntent = await stripe.paymentIntents.create({
                amount: total_price,
                currency: 'usd',
                automatic_payment_methods: {
                    enabled: true,
                },
            })
            orderData.paymentIntentId = paymentIntent.id
            // payment_intent_id is empty if user not adding product and click on checkout
            await prisma.order.create({
                data: orderData
            })
            return NextResponse.json(
                { paymentIntent },
                { message: "success" },
                { status: 201 }
            );
        }

    } catch (err) {
        console.log(err);
        return NextResponse.json(
            { error: "Error from server" },
            { status: 500 }
        );
    }

}