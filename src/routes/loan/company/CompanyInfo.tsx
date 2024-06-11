import React from "react";
import CompanyInfoTable from "./CompanyInfoTable";

type Props = {};

export default function CompanyInfo({}: Props) {
  return (
    <div className="w-[100%]">
      <div className="py-[1rem]" />
      <CompanyInfoTable />
    </div>
  );
}
