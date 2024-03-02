import Stripe from "stripe";

const getProducts = async () => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2023-10-16",
  });
  const products = await stripe.products.list({});
  const price = products.data.map((item) => item.id);
  const priceList = await stripe.prices.list({ product: (price as any).id });

  const productsItems = products.data.map((item) => {
    const p = priceList.data.find((pr) => pr.id === item.default_price )
    const productsPrices=p?.unit_amount

    const featuresName = item.features.map((item) => item.name);
    return {
      id: item.id,
      name: item.name,
      metadata: item.metadata,
      image: item.images[0],
      description: item.description,
      unit_amount: productsPrices,
      features: featuresName,
    };
  });

  return productsItems;
};

export default getProducts;
