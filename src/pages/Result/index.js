import { Timer } from "../../components/Timer";
import { center } from "../../style";
import { css } from "catom";
import { useState } from "@hydrophobefireman/ui-lib";

export default function Result(p) {
  const [complete, setComplete] = useState(false);

  return (
    <div
      class={[
        center,
        css({
          fontSize: "4rem",
          fontWeight: "bold",
          color: "var(--spec-color)",
          fontFamily: "orbitron",
        }),
      ]}
    >
      {complete ? (
        <div>Time Up</div>
      ) : (
        <Timer onComplete={() => setComplete(true)} target={+p.params.time} />
      )}
    </div>
  );
}
