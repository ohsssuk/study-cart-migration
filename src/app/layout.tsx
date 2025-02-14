import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "쿠캣 - 렌지쿠캣/원팩쿠캣",
  description:
    "맛있는 초간편식, 쿠캣이 만든 신박한 간편식, 디저트, 식단 제품을 한 눈에!",
  openGraph: {
    title: "쿠캣 - 렌지쿠캣/원팩쿠캣",
    description:
      "맛있는 초간편식, 쿠캣이 만든 신박한 간편식, 디저트, 식단 제품을 한 눈에!",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_IMAGE_BASE_PATH}/assets/mobile/img/using_guide/cookatmarket_ogimg_w_500.png`,
        alt: "쿠캣 썸네일 이미지",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "쿠캣 - 렌지쿠캣/원팩쿠캣",
    description:
      "맛있는 초간편식, 쿠캣이 만든 신박한 간편식, 디저트, 식단 제품을 한 눈에!",
    images: [
      `${process.env.NEXT_PUBLIC_IMAGE_BASE_PATH}/assets/mobile/img/using_guide/cookatmarket_ogimg_w_500.png`,
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
