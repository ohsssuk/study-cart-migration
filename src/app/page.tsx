import { redirect } from "next/navigation";
import style from "./page.module.css";

export default function Home() {
  redirect("/cart");
  return <div className={style.page}></div>;
}
