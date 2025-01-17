export default function () {
  localStorage.setItem("access_token", null);
  localStorage.setItem("refresh_token", null);
  window.location.assign("/auth");
}
