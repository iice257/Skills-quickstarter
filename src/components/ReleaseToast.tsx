import { Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";
import { releaseNote } from "../data";

const storageKey = `skill-starter:release:${releaseNote.id}`;

function wasDismissed() {
  try {
    return window.localStorage.getItem(storageKey) === "dismissed";
  } catch {
    return false;
  }
}

export function ReleaseToast() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (wasDismissed()) return;
    const timer = window.setTimeout(() => setVisible(true), 700);
    return () => window.clearTimeout(timer);
  }, []);

  function dismiss() {
    setVisible(false);
    try {
      window.localStorage.setItem(storageKey, "dismissed");
    } catch {
      /* storage unavailable; the toast simply returns next visit */
    }
  }

  if (!visible) return null;

  return (
    <aside className="release-toast" role="status" aria-label="Release note">
      <span className="release-toast-icon" aria-hidden="true">
        <Sparkles />
      </span>
      <div className="release-toast-body">
        <span className="release-toast-meta">Release note / {releaseNote.date}</span>
        <strong>{releaseNote.title}</strong>
        <p>{releaseNote.text}</p>
        <a
          className="release-toast-link"
          href="#new"
          onClick={(event) => {
            event.preventDefault();
            document.getElementById("new")?.scrollIntoView({ behavior: "smooth", block: "start" });
            dismiss();
          }}
        >
          See what is new
        </a>
      </div>
      <button className="release-toast-close" type="button" aria-label="Dismiss release note" onClick={dismiss}>
        <X aria-hidden="true" />
      </button>
    </aside>
  );
}
