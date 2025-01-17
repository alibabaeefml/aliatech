import { toast } from "vue-sonner";

export default function useApiMessage(message) {
  switch (message) {
    case "IncorrectPassword":
      toast.error("رمز عبور وارد شده اشتباه است!");
      break;
    case "Unable to refresh token. Please log in again.":
      toast.error("نشست شما منقضی شده است!");
      break;
    case "An error occurred":
      toast.error("خطایی رخ داده اس!");
      break;

    default:
      break;
  }
}
