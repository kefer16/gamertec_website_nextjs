import { CreateOneBrandRequestDto } from "./dto/requests/create-one-brand.request.dto";
import { UpdateOneBrandRequestDto } from "./dto/requests/update-one-brand.request.dto";
import { BrandResponseDto } from "./dto/responses/brand.response.dto";

export interface BrandApiInterface {
   getMany(): Promise<BrandResponseDto[]>;
   createOne(pData: CreateOneBrandRequestDto): Promise<BrandResponseDto>;
   updateOne(pId: string, pData: UpdateOneBrandRequestDto): Promise<BrandResponseDto>;
   deleteOne(pId: string): Promise<boolean>;
}
