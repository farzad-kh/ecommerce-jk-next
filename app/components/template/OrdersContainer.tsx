"use client";
import { CartItem } from "@/app/store";

import dateFormat from "dateformat";
import { formatPrice } from "@/util/PriceUsFormat";
import OrderItem from "../module/OrderItem";
import { motion } from "framer-motion";

interface Orders {
  id: string | undefined;
  createdDate?: Date | undefined;
  status?: string | undefined;
  totalPrice?: number | undefined;
  paymentIntentId?: string | null | undefined;
  products?: CartItem[] | undefined;
}

interface Props {
  orders: Orders[];
}

const OrdersContainer = ({ orders }: Props) => {
  return (
    <div className="md:p-10 p-4 w-full flex justify-center overflow-hidden">
      <div className="flex justify-center items-center flex-col sm:w-[1280px] w-full flex-wrap overflow-hidden">
        {orders.map((item) => (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{
              opacity: 1,
              transition: { delay: 0.2, duration: 0.4 },
            }}
            viewport={{ once: true }}
            className={`flex w-full gap-1 mb-6 flex-col  ${
              orders.length > 1 &&
              "before:relative before:border-b-1 before:top-[-10px]"
            }`}
            key={item.id}
          >
            <h2 className="text-slate-700 text-sm">
              Order reference:
              <span className="text-slate-600 font-semibold text-sm">
                {" "}
                {item.id}
              </span>
            </h2>
            <p className="text-slate-700 text-sm">
              Order Time:
              <span className="text-slate-600 font-semibold text-sm">
                {" "}
                {dateFormat(item.createdDate)}
              </span>
            </p>
            <p className="text-slate-700 text-sm">
              Status:{" "}
              {item?.status && (
                <span className="p-1 font-semibold bg-[#30beb7] text-white rounded text-sm">
                  succsses
                </span>
              )}
            </p>

            <div className="flex gap-2  flex-col ">
              {item?.products?.map((products) => (
                <OrderItem product={products} key={products.id} />
              ))}

              <h3 className="text-slate-700 my-3 text-sm">
                Total:{" "}
                <span className="text-sm text-slate-800 font-bold ">
                  {formatPrice(item?.totalPrice!)}
                </span>
              </h3>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default OrdersContainer;
