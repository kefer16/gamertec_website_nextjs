import axios, { AxiosResponse } from "axios";
import { ConfigureApi, UrlsApi } from "../configure.api";
import { BrandResponseDto } from "./dto/responses/brand.response.dto";
import { CreateOneBrandRequestDto } from "./dto/requests/create-one-brand.request.dto";
import { UpdateOneBrandRequestDto } from "./dto/requests/update-one-brand.request.dto";

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

   async createOne(pData: CreateOneBrandRequestDto): Promise<BrandResponseDto> {
      try {
         const config = {
            headers: {
               Authorization: `Bearer ${this.cfgApi.bearer}`,
               "Content-Type": "application/json",
            },
         };
         const body = JSON.stringify(pData);

         return (
            await axios.post(`${this.urlApi.brand}/create_one`, body, config)
         ).data.Data;
      } catch (error: any) {
         // error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }

   async updateOne(
      pId: string,
      pData: UpdateOneBrandRequestDto
   ): Promise<BrandResponseDto> {
      try {
         const config = {
            headers: {
               Authorization: `Bearer ${this.cfgApi.bearer}`,
               "Content-Type": "application/json",
            },
         };
         const body = JSON.stringify(pData);

         return (
            await axios.put(
               `${this.urlApi.brand}/update_one/${pId}`,
               body,
               config
            )
         ).data.Data;
      } catch (error: any) {
         // error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }
}
