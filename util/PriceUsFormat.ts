export const formatPrice = (amount: number) => {
  let USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount / 100);
  return USDollar;
};

export const sideBanerMotion = (i: number | any) => ({
  hidden: {
    opacity: 0,
 
  },
  show: {
    opacity: 1,

    transition: {
      delay: i * 0.4,
      duration: 1.5,
      type: 'spring' 
    },
  },
});
