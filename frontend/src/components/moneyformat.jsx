export default function Money({ value }) {
  const money = new Intl.NumberFormat("vi-VN", {
    currency: "VND",
    compactDisplay: "long",
    style: "currency",
  }).format(value);
  return <span>{money}</span>;
}
