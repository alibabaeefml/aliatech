<script setup>
import { useAuth } from "@/composable/auth";

const {
  isSubmitDisabled,
  form,
  loading,
  signup,
  passwordValidation,
  emailValidation,
} = useAuth();
</script>
<template>
  <div class="w-max mx-auto">
    <app-card>
      <app-title title="خوش آمدید" />
      <p class="mt-2 text-sm text-neutral-700">
        برای ورود ایمیل و رمز عبور خود را وارد کنید
      </p>

      <app-form @submit.prevent="signup" class="mt-4 flex flex-col gap-4">
        <app-textfield
          title="ایمیل شما"
          type="email"
          id="email"
          name="email"
          prepend-icon="Mail"
          :auto-focus="true"
          :error-message="emailValidation"
          v-model="form.email"
        />
        <app-textfield
          title="رمز عبور"
          type="password"
          id="password"
          name="password"
          prepend-icon="Lock"
          :error-message="passwordValidation"
          v-model="form.password"
        />
        <app-btn :loading="loading" type="submit" :disabled="isSubmitDisabled">
          ورود
        </app-btn>
      </app-form>
    </app-card>
  </div>
</template>
