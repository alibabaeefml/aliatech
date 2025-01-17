export default function usePersianDate(timestamp) {
  const date = new Date(timestamp * 1000);
  return new Intl.DateTimeFormat("fa-IR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}
