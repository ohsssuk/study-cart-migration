import { CartItemType } from "@/types/cart";

export const initCartList: CartItemType[] = [
  {
    productId: 2195,
    productName: `원팩쿠캣 스지 수육전골 600g`,
    productThumbnail: `/product/images/2024/11/coce_1732063817_5781_320.jpg`,
    productStatus: 1,
    options: [
      {
        optionId: 166906,
        optionName: `원팩쿠캣 스지 수육전골 600g`,
        price: 10700,
        discountRate: 35,
        min: 1,
        current: 1,
        max: 100,
      },
      {
        optionId: 166907,
        optionName: `원팩쿠캣 스지 수육전골 600gX2개 (최소 2개 구매)`,
        price: 20200,
        min: 2,
        current: 2,
        max: 100,
      },
    ],
  },
  {
    productId: 1822,
    productName: `렌지쿠캣 오븐 닭구이 3종 (오리지널/매콤/고추마요)`,
    productThumbnail: `/product/images/2024/02/poze_1708917471_4491_320.jpg`,
    productStatus: 1,
    options: [
      {
        optionId: 105988,
        optionName: `렌지쿠캣 오리지널 오븐 닭구이 200g`,
        price: 5900,
        min: 1,
        current: 1,
        max: 100,
      },
      {
        optionId: 105989,
        optionName: `렌지쿠캣 매콤 오븐 닭구이 200g (한개만 구매 가능)`,
        price: 5900,
        min: 1,
        current: 1,
        max: 1,
      },
    ],
  },
  {
    productId: 1814,
    productName: `한우이츠 1++ 한우 육회 2종 (육회/육사시미)`,
    productThumbnail: `/product/images/2024/02/kopo_1707364478_2139_320.jpg`,
    productStatus: 1,
    options: [
      {
        optionId: 163777,
        optionName: `1++ 한우 육사시미 150g (3개 구매 가능)`,
        discountRate: 22,
        price: 15900,
        min: 1,
        current: 1,
        max: 3,
      },
    ],
  },
  {
    productId: 260,
    productName: `바로쿠캣 밥도둑 5종 (깐새우장/양념꼬막장/순살게장)`,
    productThumbnail: `/product/images/2024/10/xifi_1728290388_2661_320.jpg`,
    productStatus: 1,
    options: [
      {
        optionId: 103219,
        optionName: `양념 꼬막장 200g`,
        discountRate: 4,
        price: 9500,
        min: 1,
        current: 1,
        max: 100,
      },
    ],
  },
];
