export default function BlankLine({
  backgroundColor = `rgba(237, 237, 237, 0.6)`,
}: {
  backgroundColor?: string;
}) {
  return (
    <div
      role="presentation"
      style={{
        backgroundColor,
        height: "12px",
        width: "100%",
      }}
    ></div>
  );
}
