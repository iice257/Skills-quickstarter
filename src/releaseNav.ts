export const OPEN_RELEASE_EVENT = "skills:open-release";

/** Scroll to the "New in this release" section and open the Sensory card. */
export function goToRelease() {
  const target = document.getElementById("new");
  if (!target) return;
  target.scrollIntoView({ behavior: "smooth", block: "start" });
  window.dispatchEvent(new CustomEvent(OPEN_RELEASE_EVENT));
}
