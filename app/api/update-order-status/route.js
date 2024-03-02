import { NextResponse } from "next/server";
import Stripe from "stripe";
new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2023-10-16",
});
import prisma from "../../../prisma/client"
export async function POST(req) {

    try {
  
        const body = await req.json()
        const { paymentIntentStore, newStatus } = body


        const updateUser = await prisma.order.update({
            where: {
                paymentIntentId: paymentIntentStore,
            },
            data: {
                status: newStatus,
            },
        })
        return NextResponse.json(
            { message: "update success" },
            { status: 200 }
        );
    } catch (err) {
        console.log(err);
    }

}