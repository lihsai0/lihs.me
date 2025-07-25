let isWatchingHashChange = false;

export function watchHashChange() {
  // Page load (you could wrap this in a DOM ready if the script is loaded early).
  handleHashChange();

  // prevent add listener multiple times
  if (isWatchingHashChange) {
    return;
  }
  isWatchingHashChange = true;

  // When URL changes.
  window.addEventListener("hashchange", handleHashChange);

  // When on the URL already, perhaps after scrolling, and clicking again, which
  // doesn’t emit `hashchange`.
  document.addEventListener("click", handleAnchorClick, false);
}

export function unwatchHashChange() {
  window.removeEventListener("hashchange", handleHashChange);
  document.removeEventListener("click", handleAnchorClick);
}

function handleAnchorClick(event: MouseEvent) {
  console.log([
    event.target,
    event.target instanceof HTMLAnchorElement,
    location.hash.length > 1,
  ]);
  if (
    event.target &&
    event.target instanceof HTMLAnchorElement &&
    event.target.href === location.href &&
    location.hash.length > 1
  ) {
    if (!event.defaultPrevented) {
      queueMicrotask(() => {
        handleHashChange();
      });
    }
  }
}

function handleHashChange() {
  let hash: string;

  try {
    hash = decodeURIComponent(location.hash.slice(1)).toLowerCase();
  } catch {
    return;
  }

  const name = "user-content-" + hash;
  const target =
    document.getElementById(name) || document.getElementsByName(name)[0];

  if (target) {
    queueMicrotask(() => {
      target.scrollIntoView();
    });
  }
}
