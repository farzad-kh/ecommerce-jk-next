"use client";
import React from "react";
import { motion } from "framer-motion";
import CanvasConfetti from "../module/CanvasConfetti";
import { Button } from "@nextui-org/react";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { useRouter } from "next/navigation";
import Lottie from "../module/Lottie";

const SucceededPayment = ({ isSuccess }: { isSuccess: boolean }) => {
  if (!isSuccess) return null;
  const router = useRouter();
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="h-full flex flex-col w-[340px] justify-center self-center translate-y-[70px] "
      >
        <h3 className="flex items-center my-1 gap-x-1 text-2xl font-semibold justify-center">
          <IoIosCheckmarkCircle className="fill-green-600 text-3xl mt-1" />{" "}
          Payment successful
        </h3>
        <div className="flex flex-col justify-center text-center">
          <p>Your order has been placed</p>

          <div>
            <div>
              <Lottie />
            </div>
            <Button
              onClick={() => router.push("/orders")}
              className="w-full capitalize font-semibold hover:bg-[#346178] hover:text-white "
              color="primary"
              variant="bordered"
            >
              see you'r orders
            </Button>
            <div className="w-full capitalize font-semibold my-3">OR</div>
            <Button
              onClick={() => router.push("/")}
              className="w-full capitalize font-semibold "
              color="primary"
            >
              continue shopping
            </Button>
          </div>
        </div>
      </motion.div>
      <CanvasConfetti />
    </>
  );
};

export default SucceededPayment;
