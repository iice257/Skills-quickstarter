import { ArrowRight } from "lucide-react";
import { releaseNote } from "../data";
import { goToRelease } from "../releaseNav";

export function AnnounceBar() {
  return (
    <a
      className="announce-bar"
      href="#new"
      onClick={(event) => {
        event.preventDefault();
        goToRelease();
      }}
    >
      <span className="announce-bar-tag">New</span>
      <span className="announce-bar-text">
        <strong>{releaseNote.title}</strong> — see it and hear it before it's built
      </span>
      <span className="announce-bar-link">
        See the release <ArrowRight aria-hidden="true" />
      </span>
    </a>
  );
}
