import { Image } from "@nextui-org/react";
import React from "react";
import LogoMain from "../../../public/newin-us.jpg";
import SectionImgMain from "../module/SectionImgMain";
import getProducts from "@/app/hooks/DataList";
import SliderBreakPoint from "../layout/SliderBreakPoint";

const HomeContainer = async () => {
  const productsData = await getProducts();
  return (
    <section className="sm:p-5 p-4 mt-4">
      <div className="block mb-8 aspect-[16/5.44] bg-loader">
        <Image alt={LogoMain.src} radius="none" className="rounded bg-loader" src={LogoMain.src} />
      </div>

      <div className="overflow-hidden block  md:mt-9 mt-0 mb-12">
        <p className="my-2 sm:text-xl text-base font-bold uppercase">
          new products
        </p>
        <SliderBreakPoint productsData={productsData} />
      </div>
      <SectionImgMain />
      <div className="my-16 flex flex-col px-2 flex-wrap ">
        <h3 className="sm:text-xl text-base font-bold mb-2">
          JACK & JONES United States
        </h3>
        <div className="block">
          <p className="text-sm text-slate-700 mb-3">
            Welcome to JACK & JONES US. If you love stunning menswear offering
            both elegant and rough styles you've come to the right place. Even
            more, if you share our passion for{" "}
          </p>
          <p className="text-sm text-slate-700 mb-3">
            Since 1990 it has been our mission to provide you guys with the most
            stylish wardrobe pieces to make sure you look good wherever you go,
            and whatever the occasion might be. And, as we hold the opinion that
            fashion knows neither size nor age, at JACK & JONES you'll also find
            stylish{" "}
          </p>
          <p className="text-sm text-slate-700 mb-3">
            Our roots are based in jeanswear and designing cool denim clothes is
            one of our favorite things. However, we're just as crazy about other
            fabrics that make you feel cool and confident. From trendy jeans
            styles, over fancy bomber jackets, to classic chino trousers and
            sleek suits. At JACK & JONES you'll find everything you need to
            upgrade your closet and impress others with you great fashion sense.
          </p>
          <p className="text-sm text-slate-700 mb-3">
            Our assortment also features men's underwear, shoes and accessories.
            So, no matter what you're searching for, we've got you covered from
            head to toe, whether it's the perfect outfit for the first date, a
            relaxed look for a gathering with your best buddies or a
            smart-casual business outfit for work.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HomeContainer;
