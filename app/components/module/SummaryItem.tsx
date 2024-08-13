import React from "react";
interface Props {
  labal: string;
  value: string | number;
  gradientColor?: string;
}
const SummaryItem = ({ labal, value, gradientColor }: Props) => {
  return (
    <div className="flex justify-between items-center text-sm">
      <p className="text-slate-600">{labal}:</p>
      <h3
        className={`${
          gradientColor ? gradientColor : "text-slate-700"
        } font-semibold`}
      >
        {value}
      </h3>
    </div>
  );
};

export default SummaryItem;
