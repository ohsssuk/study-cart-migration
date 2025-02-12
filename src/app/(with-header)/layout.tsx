import { ReactNode } from "react";
import style from "./layout.module.css";
import Link from "next/link";
import Image from "next/image";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <header id={style.header}>
        <nav id={style.gnb}>
          <ul>
            <li>
              <Link href="">
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_PATH}/using_guide/ic-24-arrow-perv.svg`}
                  width={24}
                  height={24}
                  alt={"뒤로가기"}
                />
              </Link>
            </li>
            <li>
              <h1>카트</h1>
            </li>
            <li>
              <Link href="/">
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_PATH}/using_guide/ic-24-home.svg`}
                  width={24}
                  height={24}
                  alt={"홈"}
                />
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main id={style.main}>{children}</main>
    </>
  );
}
