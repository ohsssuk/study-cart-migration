import style from "./ui.module.css";

interface SkeletonProps {
  width?: string;
  height?: string;
}
export default function Skeleton({
  width = "100%",
  height = "100%",
}: SkeletonProps) {
  return (
    <div
      className={style.skeleton}
      style={{ width: width, height: height }}
    ></div>
  );
}
