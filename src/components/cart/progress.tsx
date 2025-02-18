"use client";

import { ReactNode, useEffect, useState } from "react";
import style from "./progress.module.css";

interface Props {
  cost?: number;
}
export default function Progress({ cost = 0 }: Props) {
  const MIN_COST_FOR_FREE_DELIVERY = 40000;

  const [progressText, setProgressText] = useState<ReactNode>(
    <>
      <strong>{MIN_COST_FOR_FREE_DELIVERY}</strong>원만 더 담으면 일반배송 무료!
    </>
  );
  const [progressBar, setProgressBar] = useState<number>(0);

  useEffect(() => {
    const remainingCost = MIN_COST_FOR_FREE_DELIVERY - cost;
    if (remainingCost > 0) {
      setProgressText(
        <>
          <strong>{remainingCost}</strong>원만 더 담으면 일반배송 무료!
        </>
      );
      setProgressBar((cost / MIN_COST_FOR_FREE_DELIVERY) * 100);
    } else {
      setProgressText(
        <>
          <strong>일반배송</strong> 무료!
        </>
      );
      setProgressBar(100);
    }
  }, [cost]);

  return (
    <div className={style.progress_wrap}>
      <div className={style.progress}>
        <p>{progressText}</p>
        <div className={style.bar}>
          <div
            className={style.inner}
            style={{ width: `${progressBar}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
