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

  return <ProductInfo product={product} />;
};

export default page;

// category: 'technology',
export async function generateMetadata({ params }: Props) {
  const { productId } = params;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2023-10-16",
  });
  const products = await stripe.products.retrieve(productId);
  return {
    title: `${products.name} | JACK & JONES`,
    description: products?.description,
    category: products.metadata.category,
  };
}
