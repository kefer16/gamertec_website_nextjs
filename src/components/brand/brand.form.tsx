// import { cn } from "@/lib/utils";
// import { Button } from "../ui/button";
// import { DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "../ui/drawer";
// import { Switch } from "../ui/switch";
// import { CalendarClock, CalendarPlusIcon } from "lucide-react";
// import { useState } from "react";
// import { Separator } from "../ui/separator";
// import { StatusForm } from "@/lib/enum/status-form";

// interface BrandFormInterface {
//    onSubmit: (e: FormEvent<HTMLFormElement>) => void;

// }

// export const BrandForm = () => {
//    const [brandId, setBrandId] = useState<string>("");
//    const [shortName, setShortName] = useState<string>("");
//    const [fullName, setFullName] = useState<string>("");
//    const [creationDate, setCreationDate] = useState<Date>(new Date());
//    const [isActive, setIsActive] = useState<boolean>(false);
//    const [statusForm, setStatusForm] = useState<StatusForm>(StatusForm.VIEW);

//    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
//       e.preventDefault();
//       const srvBrand = new BrandApi();
//       if (statusForm === StatusForm.ADD) {
//          const _data: CreateOneBrandRequestDto = {
//             creation_date: creationDate.toISOString(),
//             full_name: fullName,
//             is_active: isActive,
//             short_name: shortName,
//          };
//          await srvBrand
//             .createOne(_data)
//             .then((pResp: BrandResponseDto) => {
//                const _resp = data;
//                _resp.unshift(pResp);
//                setData([..._resp]);
//             })
//             .catch((error: Error) => {
//                console.log(error.message);
//             });
//       }
//       if (statusForm === StatusForm.UPDATE) {
//          const _data: UpdateOneBrandRequestDto = {
//             full_name: fullName,
//             is_active: isActive,
//             short_name: shortName,
//          };
//          await srvBrand
//             .updateOne(brandId, _data)
//             .then((pResp: BrandResponseDto) => {
//                const _resp = data;
//                const _arrayIndex = _resp.findIndex((item) => item.brand_id === pResp.brand_id);
//                _resp.splice(_arrayIndex, 1, pResp);
//                setData([..._resp]);
//             })
//             .catch((error: Error) => {
//                console.log(error.message);
//             });
//       }

//       cleanForm();
//    };


//    const openFormAdd = () => {
//       cleanForm();
//       setStatusForm(StatusForm.ADD);
//    };

//    const openFormUpdate = (pId: string) => {
//       const _dataForm = data.find((item) => item.brand_id === pId);
//       console.log(_dataForm);

//       if (_dataForm) {
//          setBrandId(_dataForm.brand_id);
//          setShortName(_dataForm.short_name);
//          setFullName(_dataForm.full_name);
//          setIsActive(_dataForm.is_active);
//          setStatusForm(StatusForm.UPDATE);
//       }
//    };
//    const itemDelete = async (pData: BrandResponseDto[], pId: string) => {
//       console.log(pId);

//       const srvBrand = new BrandApi();
//       await srvBrand
//          .deleteOne(pId)
//          .then(() => {
//             const lArray = pData;
//             const lArrayIndex = lArray.findIndex((item) => item.brand_id === pId);
//             lArray.splice(lArrayIndex, 1);

//             setData([...lArray])
//          })
//          .catch((pError: Error) => {
//             console.log(pError);
//          });
//    };
//    const cleanForm = () => {
//       setBrandId("");
//       setShortName("");
//       setFullName("");
//       setIsActive(false);
//    };
//    return (
//       <DrawerContent>
//          <div className="p-8">
//             <form onSubmit={(event) => onSubmit(event)}>
//                <DrawerHeader className="px-0">
//                   <div className="flex justify-between gap-2">
//                      <DrawerTitle>Marca de productos</DrawerTitle>
//                      <Switch onCheckedChange={setIsActive} checked={isActive} />
//                   </div>

//                   <DrawerDescription>
//                      Ingrese la marca para los productos
//                   </DrawerDescription>
//                </DrawerHeader>
//                <div className="flex h-5 justify-between items-center gap-4">
//                   <Button
//                      disabled
//                      variant={"outline"}
//                      className={cn(
//                         "w-full justify-start text-left font-normal",
//                         !creationDate && "text-muted-foreground"
//                      )}
//                   >
//                      <CalendarPlusIcon className="mr-2 h-4 w-4" />
//                      {creationDate
//                         ? format(
//                            creationDate,
//                            "dd-MM-yyyy HH:mm:ss"
//                         )
//                         : ""}
//                   </Button>
//                   <Separator orientation="vertical" />
//                   <Button
//                      disabled
//                      variant={"outline"}
//                      className={cn(
//                         "w-full justify-start text-left font-normal",
//                         !creationDate && "text-muted-foreground"
//                      )}
//                   >
//                      <CalendarClock className="mr-2 h-4 w-4" />
//                      {creationDate
//                         ? format(
//                            creationDate,
//                            "dd-MM-yyyy HH:mm:ss"
//                         )
//                         : ""}
//                   </Button>
//                </div>
//                <div className="py-4">
//                   <div>
//                      <Label htmlFor="short_name">
//                         Nombre Corto
//                      </Label>
//                      <Input
//                         onChange={(e) =>
//                            setShortName(e.target.value)
//                         }
//                         value={shortName}
//                      />
//                   </div>

//                   <div>
//                      <Label>Nombre Completo</Label>
//                      <Input
//                         onChange={(e) =>
//                            setFullName(e.target.value)
//                         }
//                         value={fullName}
//                      />
//                   </div>
//                </div>
//                <DrawerFooter className="px-0">
//                   <Button type="submit">Guardar</Button>
//                   <DrawerClose asChild>
//                      <Button variant="outline">Cancel</Button>
//                   </DrawerClose>
//                </DrawerFooter>
//             </form>
//          </div>
//       </DrawerContent>
//    );
// } 