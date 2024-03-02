import { NextResponse,NextRequest } from "next/server";
import { getServerSession } from "next-auth";
 
import prisma from "../../../prisma/client"
import { authOptions } from "../auth/[...nextauth]/route";






export async function GET() {

    const session = await getServerSession(authOptions)
    try {
        if (!session) return NextResponse.json(

            { message: "You must login" },
            { status: 403 }
        );
        const favoriteList = await prisma.favorite.findMany({
            where: { userId: session?.user?.id }

        })


        return NextResponse.json(
            favoriteList,
            { message: "like" },
            { status: 200 }
        );
    } catch (err) {
        console.log(err);
        return NextResponse.json(
            { error: "Error from server" },
            { status: 500 }
        );
    }
}

export async function POST(req, res) {

    const session = await getServerSession(authOptions)
    try {
        const body = await req.json()
        const { productId, name, image,unit_amount } = body


        if (!session) return NextResponse.json({ error: "You must login" }, { status: 403 })

        const like = await prisma.favorite.create({
            data: {
                user: { connect: { id: session?.user?.id } },
                productId: productId,
                name: name,
                image: image,
                unit_amount:unit_amount
            },
        })
       
    
            return NextResponse.json(

                { message: "like" },
                { status: 200 }
            );
        
        
      
    } catch (err) {
        console.log(err);
        return NextResponse.json(
            { error: "Error from server" },
            { status: 500 }
        );
    }
}


export async function DELETE(req, res) {

    const session = await getServerSession(authOptions)
    try {
        const body = await req.json()
        const { productId, userId } = body
 
        if (userId !== session?.user?.id) return NextResponse.json(
            { error: "somthing wronge" },
            { status: 400 }
        );
        await prisma.favorite.deleteMany({
            where: {
                userId: session?.user?.id,
                productId: productId
            }

        })


        return NextResponse.json(
            { message: "delete" },
            { status: 201 }
        );
    } catch (err) {
        console.log(err);
        return NextResponse.json(
            { error: "Error from server" },
            { status: 500 }
        );
    }
}
