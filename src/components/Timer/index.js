import { Component } from "@hydrophobefireman/ui-lib";
import { useInterval } from "../../customHooks";
const tFix = (t) => {
  t = "" + t;
  return (t.length === 1 ? "0" : "") + t;
};

const getTimeLeft = (n) => n - +new Date();
function parseTime(timeLeft, last) {
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
  if (inSeconds > 3) {
    return `${tFix(hours)}:${tFix(mins)}:${tFix(sec)}`;
  }
  const r = last[2];
  switch (sec) {
    case 3:
      return last[0];
    case 2:
      return last[1];
    case 1:
      return r;
    default:
      return r;
  }
}

export function Timer({ target, last3Words, onComplete }) {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(target));
  const [isTiming, setIsTiming] = useState(timeLeft > 500);

  useEffect(() => {
    setTimeLeft(() => getTimeLeft(target));
  }, [target]);

  function updateTime() {
    const prev = timeLeft;
    const tl = prev - 1000;
    const $isTiming = tl > 500;
    setTimeLeft(tl);
    setIsTiming($isTiming);
  }

  useInterval(updateTime, [isTiming ? 1000 : null]);

  useEffect(() => !isTiming && onComplete(), [isTiming]);

  return isTiming ? (
    <>
      <div class="heading-text goes-live">Going Live In</div>
      <div class="heading-text going-live-time-delta">
        {parseTime(timeLeft,last3Words)}
      </div>
    </>
  ) : null;
}
