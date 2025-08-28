// import { getShopInfo } from "app/api";
// import type { TShop } from "app/type";
// import { useQuery } from "@tanstack/react-query";

// FIXME: this is a temporary hook to fetch shop info. It should
// be normally done in the loader(250820, sh)
export const useShopInfo = () => {
  // const { data: shopInfo } = useQuery({
  //   queryKey: ["shopInfo"],
  //   queryFn: getShopInfo,
  // });

  // return shopInfo as TShop;

  return {
    id: "69963055244",
    phone_number: "lolilol1234567",
    email: "louis@gena.co",
    name: "genasql",
    cs_agent: {
      name: "Gena",
      phone_number: "+18564463369",
      contact_phone_number: "+18564463369",
      contact_email: "louis@gena.co",
      contact_preference: "email",
    },
  };
};
