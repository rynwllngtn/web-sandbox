<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { fetchRegister } from "../api/identityApi.js";
import { maskCpf, unmaskCpf } from "../utils/cpf.js";

const router = useRouter();
const formRef = ref(null);
const section = ref(1);

const cpf = ref("");
const email = ref("");
const username = ref("");
const password = ref("");
const passwordConfirm = ref("");

function nextSection() {
  if (formRef.value.reportValidity()) {
    section.value++;
  }
}

async function handleRegister() {
  if (password.value !== passwordConfirm.value) {
    return;
  }

  const payload = {
    cpf: unmaskCpf(cpf.value),
    email: email.value,
    username: username.value,
    password: password.value
  }

  const response = await fetchRegister(payload);
  if (response.ok) {
    router.push("/login");
  }
}
</script>

<template>
  <main class="register-layout">
    <section class="register-panel">
      <header class="panel-header">
        <svg class="logo-sandbox" width="50" height="50" aria-hidden="true">
          <use href="/assets/logo.svg#sandbox-logo"></use>
        </svg>
        <h1>SANDBOX</h1>
      </header>
      <form ref="formRef" class="panel-form" @submit.prevent="handleRegister">
        <header class="form-header">
          <h2>Create your account</h2>
          <p>Follow the steps below to get started with SandBox</p>
        </header>
        <div class="form-progress">
          <svg class="dot active" viewBox="0 0 30 30">
            <circle cx="15" cy="15" r="12"/>
          </svg>
          <svg class="progress-line">
            <line class="line-bg" x1="0" y1="50%" x2="100%" y2="50%" stroke-width="4"/>
            <line class="line-fill" x1="0" y1="50%" x2="100%" y2="50%" stroke-width="4" pathLength="1"/>
          </svg>
          <svg class="dot" :class="{ active: section >= 2 }" viewBox="0 0 30 30">
            <circle cx="15" cy="15" r="12"/>
          </svg>
          <svg class="progress-line">
            <line class="line-bg" x1="0" y1="50%" x2="100%" y2="50%" stroke-width="4"/>
            <line class="line-fill" x1="0" y1="50%" x2="100%" y2="50%" stroke-width="4" pathLength="1"/>
          </svg>
          <svg class="dot" :class="{ active: section >= 3 }" viewBox="0 0 30 30">
            <circle cx="15" cy="15" r="12"/>
          </svg>
        </div>
        <section v-if="section === 1" class="section-step">
          <div class="form-input">
            <label for="cpf">CPF</label>
            <input v-model="cpf" @input="cpf = maskCpf(cpf)" type="text" id="cpf" name="cpf" placeholder="000.000.000-00" inputmode="numeric" minlength="14" maxlength="14" pattern="\d{3}\.\d{3}\.\d{3}-\d{2}" required/>
          </div>
          <button @click="nextSection()" class="btn-primary" type="button">Continue</button>
        </section>
        <section v-if="section === 2" class="section-step">
          <div class="form-input">
            <label for="email">Email</label>
            <input v-model="email" type="email" id="email" name="email" placeholder="email@example.com" autocomplete="email" maxlength="120" required>
          </div>
          <div class="form-input">
            <label for="username">Username</label>
            <input v-model="username" type="text" id="username" name="username" placeholder="How should we call you?" autocomplete="username" minlength="3" maxlength="50" required>
          </div>
          <div class="form-buttons">
            <button @click="section--" class="btn-secondary" type="button">Back</button>
            <button @click="nextSection()" class="btn-primary" type="button">Continue</button>
          </div>
        </section>
        <section v-if="section === 3" class="section-step">
          <div class="form-input">
            <label for="password">Password</label>
            <input v-model="password" type="password" id="password" name="password" placeholder="••••••••" autocomplete="new-password" minlength="8" maxlength="64" required>
          </div>
          <div class="form-input">
            <label for="password-confirm">Password Confirmation</label>
            <input v-model="passwordConfirm" type="password" id="password-confirm" name="password-confirm" placeholder="••••••••" autocomplete="new-password" minlength="8" maxlength="64" required>
          </div>
          <div class="form-buttons">
            <button @click="section--" class="btn-secondary" type="button">Back</button>
            <button class="btn-primary" type="submit">Create Account</button>
          </div>
        </section>
      </form>
      <footer class="panel-footer">
        <p>Already have an account? <RouterLink to="/login" class="links">Sign In</RouterLink></p>
      </footer>
    </section>
    <aside class="register-info">
      <h2 class="info-title">Start your journey with SandBox.</h2>
      <p class="info-text">Open your digital account in minutes with zero hidden fees and complete control over your finances.</p>
    </aside>
  </main>
</template>

<style scoped>
.register-layout {
  grid-template-columns: 60% 40%;

  @media (max-width: 1024px) {
    grid-template-columns: 65% 35%;
  }

  @media (max-width: 768px) {
    grid-template-columns: 100%;
  }
}

.register-info {
  border-left: 1px solid var(--color-sage-green-700);
}

.register-panel {
  gap: clamp(4px, calc(10vh - 60px), 24px);

  & .panel-form {
    gap: 24px;

    & section {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    & .form-buttons {
      display: flex;
      gap: 16px;

      & .btn-primary {
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1;
      }

      & .btn-secondary {
        padding: 0 24px;
      }
    }
  }
}

.form-progress {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 12px 0;

  & .progress-line {
    flex: 1;
    width: 0;
    height: 12px;
    margin: 0 -2px;
    overflow: visible;

    & .line-bg {
      stroke: var(--color-sage-green-200);
    }

    & .line-fill {
      stroke: var(--color-sunglow-yellow-400);
      stroke-dasharray: 1;
      stroke-dashoffset: 1;
      filter: drop-shadow(0 0 6px rgb(from var(--color-sunglow-yellow-400) r g b / 0));
      transition: stroke-dashoffset 0.2s ease-in-out 0s, filter 0.2s ease 0s;
    }

    &:has(+ .dot.active) .line-fill {
      stroke-dashoffset: 0;
      filter: drop-shadow(0 0 6px rgb(from var(--color-sunglow-yellow-400) r g b / 0.65));
      transition: stroke-dashoffset 0.2s ease-in-out 0s, filter 0.2s ease 0s;
    }
  }

  & .dot {
    fill: var(--color-white);
    stroke: var(--color-sage-green-300);
    stroke-width: 3px;
    width: 30px;
    height: 30px;
    overflow: visible;
    z-index: 2;
    filter: drop-shadow(0 2px 6px rgb(from var(--color-sunglow-yellow-400) r g b / 0));
    transition:
        fill 0.2s ease 0s,
        stroke 0.2s ease 0s,
        filter 0.2s ease 0s,
        transform 0.1s ease 0s;

    &.active {
      fill: var(--color-sunglow-yellow-400);
      stroke: rgb(from var(--color-sunglow-yellow-500) r g b / 0.5);
      filter: drop-shadow(0 2px 6px rgb(from var(--color-sunglow-yellow-400) r g b / 0.75));
      transform: scale(1.05);
      transition:
          fill 0.2s ease 0.2s,
          stroke 0.2s ease 0.2s,
          filter 0.2s ease 0.2s,
          transform 0.1s ease 0.3s;
    }
  }
}
</style>