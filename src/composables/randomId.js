export default function useRandomId() {
  return Math.random().toString().slice(3);
}
