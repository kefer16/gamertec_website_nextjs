import axios, { AxiosResponse } from "axios";
import { ConfigureApi, UrlsApi } from "../configure.api";
import { BrandResponseDto } from "./dto/responses/brand.response.dto";

export class BrandApi {
   private cfgApi: ConfigureApi = new ConfigureApi();
   private urlApi: UrlsApi = new UrlsApi();

   async getMany(): Promise<BrandResponseDto[]> {
      try {
         const config = {
            headers: {
               Authorization: `Bearer ${this.cfgApi.bearer}`,
               "Content-Type": "application/json",
            },
         };

         return (await axios.get(`${this.urlApi.brand}/get_many`, config)).data
            .Data;
      } catch (error: any) {
         // error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }

   async createOne(data: any): Promise<AxiosResponse> {
      try {
         const config = {
            headers: {
               Authorization: `Bearer ${this.cfgApi.bearer}`,
               "Content-Type": "application/json",
            },
         };
         const body = JSON.stringify(data);

         return await axios.post(
            `${this.urlApi.brand}/create_one`,
            body,
            config
         );
      } catch (error: any) {
         // error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }
}
