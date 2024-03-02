import SliderContainer from "@/app/components/layout/SliderContainer";
import AccorDionItem from "@/app/components/module/AccorDionItem";
import AddToCartBtn from "@/app/components/module/AddToCartBtn";
import SliderThumbs from "@/app/components/module/SliderThumbs";
import { Product } from "@/app/components/template/ProductCardContainer";
import ProductInfo from "@/app/components/template/ProductInfo";

import { formatPrice } from "@/util/PriceUsFormat";
import { Image } from "@nextui-org/react";
import { PrismaClient } from "@prisma/client";
import { useSession } from "next-auth/react";

import Stripe from "stripe";
interface Props {
  searchParams: Product;
  params: { productId: string };
}

const page = async ({ searchParams, params }: Props) => {
  const { productId } = params;

  const getProduct = async () => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
      apiVersion: "2023-10-16",
      
    });
    const products = await stripe.products.retrieve(productId);

    const price = await stripe.prices.retrieve(products?.default_price as any);

    const featuresName = products.features.map((item) => item.name);

    const productItem = {
      name: products.name,
      id: products.id,
      unit_amount: price.unit_amount,
      image: products.images[0],
      description: products.description,
      metadata: products?.metadata,
      currency: price.currency,
      features: featuresName,
    };

    // return productItem;
    return productItem;
  };

  const product = await getProduct();

  // const price = await getProductPrice((await getProduct())?.default_price);
  // console.log(price);

  // const defaultPriceId = 'price_1OK4DkHI5fzlufHDZjC4DH4k';

  // const price = await getProductPrice(defaultPriceId);

  return <ProductInfo product={product}/>
 
    

  
};

export default page;

// import AccorDionItem from "@/app/components/module/AccorDionItem";
// import AddToCartBtn from "@/app/components/module/AddToCartBtn";
// import { Product } from "@/app/components/module/ProductCard";
// import { formatPrice } from "@/util/PriceUsFormat";
// import { PrismaClient } from "@prisma/client";
// import { useSession } from "next-auth/react";

// import Image from "next/image";
// interface Props {
//   searchParams: Product;
// }

// const page = ({ searchParams }: Props) => {
//   // const { data: session, status, update } = useSession()
//   // console.log(session);

//   // const prisma = new PrismaClient();
//   // await prisma.$connect();

//   // if (session?.user?.email !== null && session?.user?.email !== undefined) {
//   //   const a = await prisma.user.findUnique({
//   //     where: {
//   //       email: session?.user?.email,
//   //     },
//   //   });
//   //   console.log(a);
//   // }
//   // console.log(session);

//   // const handler = async () => {
//   //   const res = await fetch("/api/use", {
//   //     method: "POST",
//   //     body: JSON.stringify({ email:session?.user?.email }),
//   //     headers: { "Content-Type": "application/json" },
//   //   });
//   //   const data = await res.json();
//   //   console.log(data, res);
//   // };

//   return (
//     <div className="flex justify-between gap-y-10  sm:p-10 p-4 text-gray-700 md:flex-row flex-col">
//       <div className="md:flex-[1] flex-[0.8] flex flex-wrap justify-center md:self-baseline self-center  ">
//         <Image
//           className="rounded-md"
//           width={500}
//           height={500}
//           alt={searchParams?.name || ""}
//           src={searchParams?.image || ""}
//         />
//       </div>

//       <div className="md:flex-[1.2] flex-[0.2] flex flex-col sm:p-4 ml-2">
//         <h1 className="text-2xl font-semibold ">{searchParams?.name}</h1>
//         <p className="mt-2 font-semibold text-gradient  ">{searchParams?.unit_amount && formatPrice(searchParams?.unit_amount)}</p>
//         <p className="mt-5 ">{searchParams?.description}</p>

//         <AccorDionItem features={searchParams?.features} />
//         <AddToCartBtn id={searchParams.id} name={searchParams?.name} image={searchParams.image} unit_amount={searchParams.unit_amount} quantity={1}  />
//       </div>
//     </div>
//   );
// };

// export default page;

// import SliderContainer from "@/app/components/layout/SliderContainer";
// import AccorDionItem from "@/app/components/module/AccorDionItem";
// import AddToCartBtn from "@/app/components/module/AddToCartBtn";
// import SliderThumbs from "@/app/components/module/SliderThumbs";
// import { Product } from "@/app/components/template/ProductsContainer";

// import { formatPrice } from "@/util/PriceUsFormat";
// import { Image } from "@nextui-org/react";
// import { PrismaClient } from "@prisma/client";
// import { useSession } from "next-auth/react";

// import Stripe from "stripe";
// interface Props {
//   searchParams: Product;
//   params: { productId: string };
// }

// const page = async ({ searchParams, params }: Props) => {
//   const { productId } = params;

//   console.log(productId);

//   const getProduct = async () => {
//     const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
//       apiVersion: "2023-10-16",
//     });
//     const products = await stripe.products.retrieve(productId);

//     const price = await stripe.prices.retrieve(products?.default_price as any);

//     const featuresName = products.features.map((item) => item.name);

//     const productItem = {
//       name: products.name,
//       id: products.id,
//       unit_amount: price.unit_amount,
//       image: products.images[0],
//       description: products.description,
//       metadata: products.metadata,
//       currency: price.currency,
//       features: featuresName,
//     };

//     // return productItem;
//     return productItem;
//   };

//   const product = await getProduct();

//   // const price = await getProductPrice((await getProduct())?.default_price);
//   // console.log(price);

//   // const defaultPriceId = 'price_1OK4DkHI5fzlufHDZjC4DH4k';

//   // const price = await getProductPrice(defaultPriceId);

//   console.log();

//   return (
//     <>
//    <div className="flex justify-center w-full">
//    <div className="flex justify-between gap-y-10  sm:p-10 p-4 text-gray-700 md:flex-row flex-col w-full">
//         <SliderContainer product={product} />

//         <div className="md:flex-[0.5] flex-[0.2] flex flex-col sm:p-4 ml-2">
//           <h1 className="text-2xl font-semibold ">{product?.name}</h1>
//           <p className="mt-2 font-semibold text-gradient  ">
//             {product?.unit_amount && formatPrice(product?.unit_amount)}
//           </p>
//           <p className="mt-5 ">{product?.description}</p>

//           <AccorDionItem features={product?.features} />
//           <AddToCartBtn
//             id={product.id}
//             name={product?.name}
//             image={product.image}
//             unit_amount={product.unit_amount}
//             quantity={1}
//           />
//         </div>
//       </div>
//    </div>
//     </>
//   );
// };

// export default page;
