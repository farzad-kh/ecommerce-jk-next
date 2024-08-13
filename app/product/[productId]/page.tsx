import React, { cache } from "react";
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
import ProductHeader from "@/app/components/module/ProductHeader";

interface Props {
  searchParams: Product;
  params: { productId: string };
}

const page = async ({ searchParams, params }: Props) => {
  const { productId } = params;

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2023-10-16",
  });

  // for cacheing data
  const getProduct = cache(async (productId: string) => {
    const product = await stripe.products.retrieve(productId);
    const price = await stripe.prices.retrieve(product.default_price as string);

    const featuresName = product.features?.map((item) => item?.name);

    return {
      name: product.name,
      id: product.id,
      unit_amount: price.unit_amount,
      image: product.images[0],
      description: product.description,
      metadata: product.metadata,
      currency: price.currency,
      features: featuresName,
      category: product.metadata.category,
    };
  });

  // get product
  const product = await getProduct(productId);

  return (
    <>
      <ProductInfo product={product} />
    </>
  );
};

export default page;

// Metadata
export async function generateMetadata({ params }: Props) {
  const { productId } = params;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2023-10-16",
  });
  const product = await stripe.products.retrieve(productId);
  return {
    title: `${product.name} | JACK & JONES`,
    description: product.description,
    category: product.metadata.category,
  };
}
