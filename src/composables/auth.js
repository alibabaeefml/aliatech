import { useRepository } from "@/composables/repository";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue-sonner";
export function useAuth() {
  const form = ref({ email: 'test@test.com', password: '@aB12345678' });
  const loading = ref();
  const authRepository = useRepository("auth");
  const router = useRouter();

  const passwordValidation = computed(() => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=.*\d).{8,}$/;
    switch (true) {
      case !form.value.password:
        return null;

      case !passwordRegex.test(form.value.password):
        return "رمز عبور باید حداقل شامل 8 کاراکتر و ترکیبی از اعداد، حروف بزرگ و کوچک و نما باشد!";

      default:
        return null;
    }
  });

  const emailValidation = computed(() => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    switch (true) {
      case !form.value.email:
        return null;

      case !emailRegex.test(form.value.email):
        return "ایمیل معتبر نیست!";

      default:
        return null;
    }
  });

  const isSubmitDisabled = computed(() => {
    switch (true) {
      case !form.value.email:
        return true;
      case !form.value.password:
        return true;
      case !!emailValidation.value:
        return true;
      case !!passwordValidation.value:
        return true;

      default:
        return false;
    }
  });

  const signup = async () => {
    if (isSubmitDisabled.value) return;
    try {
      loading.value = true;
      await authRepository.signup(form.value);

      router.push({ name: "forms" });
    } catch (error) {
      console.log(error);
    } finally {
      loading.value = false;
    }
  };

  function logout() {
    localStorage.setItem("access_token", null);
    localStorage.setItem("refresh_token", null);
    router.push({ name: "auth" });
  }

  return {
    form,
    passwordValidation,
    emailValidation,
    isSubmitDisabled,
    signup,
    loading,
    logout,
  };
}
