"use client";
import { useEffect, useState } from "react";
import { BrandResponseDto } from "../api/brand/dto/responses/brand.response.dto";

import { BrandApi } from "../api/brand/brand.api";

export default function Page() {

   const [data, setData] = useState<BrandResponseDto[]>([]);

   const getBrans = async () => {
      const apiBrand = new BrandApi();
      await apiBrand.getMany()
         .then((resp) => {
            console.log(resp);

            setData(resp);
         })
         .catch((error) => {
            console.log(error.message);
         });
   };


   useEffect(() => {
      getBrans();
   }, []);



   return (
      <div className="flex flex-col">
         <div className="w-full max-w-[1440px] mx-auto">
            <h1>Brand</h1>

         </div>
      </div>
   );
}
