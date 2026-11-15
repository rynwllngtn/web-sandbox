<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { fetchLogin} from "../api/identityApi.js";
import { maskCpf, unmaskCpf } from "../utils/cpf.js";

const router = useRouter();

const cpf = ref("");
const password = ref("");

async function handleLogin() {
  const payload = {
    cpf: unmaskCpf(cpf.value),
    password: password.value
  };

  const response = await fetchLogin(payload);
  if (response.ok) {
    sessionStorage.setItem("tokenAwt", response.data.tokenAwt);
    router.push("/dashboard");
  }
}
</script>

<template>
  <main class="login-layout">
    <aside class="login-info">
      <h2 class="info-title">Your money, under your control.</h2>
      <p class="info-text">Manage your accounts, track real-time transactions, and move your money effortlessly with SandBox.</p>
    </aside>
    <section class="login-panel">
      <header class="panel-header">
        <svg class="logo-sandbox" width="50" height="50" aria-hidden="true">
          <use href="/assets/logo.svg#sandbox-logo"></use>
        </svg>
        <h1>SANDBOX</h1>
      </header>
      <form class="panel-form" @submit.prevent="handleLogin">
        <header class="form-header">
          <h2>Welcome back</h2>
          <p>Enter your credentials to access your account</p>
        </header>
        <div class="form-input">
          <label for="input-cpf">CPF</label>
          <input v-model="cpf" @input="cpf = maskCpf(cpf)" type="text" id="input-cpf" name="cpf" placeholder="000.000.000-00" inputmode="numeric" autocomplete="username" minlength="14" maxlength="14" pattern="\d{3}\.\d{3}\.\d{3}-\d{2}" required>
        </div>
        <div class="form-input">
          <label for="input-password">Password</label>
          <input v-model="password" type="password" id="input-password" name="password" placeholder="••••••••" autocomplete="current-password" minlength="8" maxlength="64" required>
        </div>
        <div class="form-helper">
          <!-- TODO: Adicionar tela para troca de senha -->
          <a href="#">Forgot your password?</a>
        </div>
        <button class="btn-submit" type="submit">Sign In</button>
      </form>
      <footer class="panel-footer">
        <p>Don't have an account? <RouterLink class="links" to="/register">Create one now!</RouterLink></p>
      </footer>
    </section>
  </main>
</template>

<style scoped>
.login-layout {
  grid-template-columns: 40% 60%;

  @media (max-width: 1024px) {
    grid-template-columns: 35% 65%;
  }

  @media (max-width: 768px) {
    grid-template-columns: 100%;
  }
}

.login-info {
  border-right: 1px solid var(--color-sage-green-700);
}

.login-panel .panel-form {
  & .form-helper {
    display: flex;
    justify-content: flex-end;
    margin-top: -4px;

    & a {
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--color-sage-green-700);
      text-decoration: none;
      transition: color 0.15s ease;

      &:hover {
        color: var(--color-sunglow-yellow-700);
        text-decoration: underline;
      }
    }
  }
}
</style>