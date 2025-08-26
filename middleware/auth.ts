export default defineNuxtRouteMiddleware((to, from) => {
  const storageUser = localStorage.getItem("user");
  if (!storageUser) return navigateTo("/auth");
});
