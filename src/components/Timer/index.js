import { useEffect, useRef, useState } from "@hydrophobefireman/ui-lib";

import { css } from "catom";
import { useInterval } from "../../customHooks";

const tFix = (t) => {
  t = "" + t;
  return (t.length === 1 ? "0" : "") + t;
};

const getTimeLeft = (n) => n - +new Date();
function parseTime(timeLeft) {
  let _left;
  const inSeconds = timeLeft / 1000;
  const secInAnHour = 3600;
  const minInHour = 60;
  const secInAMin = 60;

  const hours = Math.floor(inSeconds / secInAnHour);
  _left = inSeconds % secInAnHour;

  const mins = Math.floor(_left / minInHour);

  _left = Math.round(_left % secInAMin);

  const sec = _left;

  if (inSeconds > 3.5) {
    return `${tFix(hours)}:${tFix(mins)}:${tFix(sec)}`;
  }
  const r = 1;
  switch (sec) {
    case 3:
      return 3;
    case 2:
      return 2;
    case 1:
      return r;
    default:
      return r;
  }
}

export function Timer({ target, onComplete }) {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(target));
  const isTiming = timeLeft > 500;
  const completeCalled = useRef(false);

  useEffect(() => {
    const t = getTimeLeft(target);
    setTimeLeft(t);
  }, [target]);

  function updateTime() {
    if (!isTiming) return;
    const prev = timeLeft;
    const tl = prev - 1000;
    setTimeLeft(tl);
  }

  useInterval(updateTime, [isTiming ? 1000 : null]);

  useEffect(
    () =>
      !isTiming &&
      !completeCalled.current &&
      (completeCalled.current = true) &&
      onComplete(),
    [isTiming]
  );

  return isTiming ? (
    <div>
      <div
        class={css({
          media: {
            "(min-width:550px)": { fontSize: "6.5rem" },
          },
        })}
      >
        {parseTime(timeLeft)}
      </div>
    </div>
  ) : null;
}
