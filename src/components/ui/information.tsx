import { ReactNode } from "react";
import style from "./ui.module.css";

interface InformationProps {
  head?: ReactNode;
  contents: ReactNode[];
}
export default function Information({
  head = "꼭 확인하세요",
  contents,
}: InformationProps) {
  return (
    <div className={style.information}>
      <div className={style.information_head}>{head}</div>
      <ul className={style.information_list}>
        {contents.map((content, index) => (
          <li key={`information-${index}`}>{content}</li>
        ))}
      </ul>
    </div>
  );
}
