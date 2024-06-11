export class ConfigureApi {
   urlHost: string = process.env.NEXT_PUBLIC_API_HOST ?? "";
   urlVersion: string = "/v1";
   bearer: string = process.env.NEXT_PUBLIC_API_BEARER ?? "";
}
export class UrlsApi {
   private cfgApi: ConfigureApi = new ConfigureApi();

   brand: string = this.cfgApi.urlHost + this.cfgApi.urlVersion + "/brand";
}
