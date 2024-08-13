"use client";
import React from "react";
import { Accordion, AccordionItem, Button } from "@nextui-org/react";
interface Props {
  features?: (string | undefined)[];
  metadata?: { composition?: string };
}
const AccorDionItem = ({ features, metadata }: Props) => {
 
  const filterComposition = metadata?.composition?.split("-");

  return (
    <div className=" my-3  relative group transition-all    ">
      <div>
        <Accordion
          selectionMode="multiple"
          defaultExpandedKeys={["1"]}
          className="!px-0 "
          variant="light"
        >
          <AccordionItem
            className="font-semibold py-0 "
            key="1"
            aria-label="Features & Specs"
            title="FEATURES & SPECS"
          >
            {features?.map((item, i) => (
              <p
                className=" mb-1 text-sm purple-dark  text-slate-600 font-semibold"
                key={i}
              >
                {item}
              </p>
            ))}
          </AccordionItem>

          <AccordionItem
            className="font-semibold py-0"
            key="2"
            aria-label="Fabric Composition"
            title="FABRIC COMPOSITION"
          >
            {filterComposition?.map((item, i) => (
              <p
                className=" mb-1 text-sm purple-dark  text-slate-600 font-semibold"
                key={i}
              >
                -{item}
              </p>
            ))}
          </AccordionItem>

          <AccordionItem
            className="font-semibold py-0"
            key="3"
            aria-label="DELIVERY & RETURNS"
            title="DELIVERY & RETURNS"
          >
            <p className=" mb-1 text-sm purple-dark  text-slate-600 font-semibold">
              You have 100 days to return your items by using the label provided
              and returning your parcel to the same courier that delivered your
              items.
            </p>

            <p className=" mb-1 text-sm purple-dark  text-slate-600 font-semibold">
              Returns cost $9.95 and will be deducted from your refund.
            </p>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default AccorDionItem;
