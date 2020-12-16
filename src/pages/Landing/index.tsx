import { loadURL, redirect, useRef, useState } from "@hydrophobefireman/ui-lib";

import { Form } from "../../components/Form";
import { center } from "../../style";
import { css } from "catom";

/** Exported routes need to be default exports */
export default function Landing() {
  return <DateInput />;
}

function DateInput() {
  const [value, setValue] = useState(null);
  const input = useRef<HTMLInputElement>();
  function handleInput() {
    const { current } = input;
    current && setValue(current.value);
  }
  return (
    <div class={center}>
      <Form
        onSubmit={() => {
          loadURL("/t/" + +new Date(value));
        }}
      >
        <div>
          <div class={css({ fontWeight: "bold", fontSize: "2rem" })}>
            Enter date and time
          </div>
          <input
            ref={input}
            onInput={handleInput}
            type="datetime-local"
            value={value}
          />
        </div>
        <div>
          <button
            class={css({
              marginTop: "10px",
              border: "2px solid var(--spec-color)",
              padding: "4px",
              width: "100px",
              borderRadius: "5px",
              transition: "0.3s linear",
              pseudo: {
                ":hover": {
                  backgroundColor: "rgb(255 94 0 / 27%)",
                },
              },
            })}
          >
            Go
          </button>
        </div>
      </Form>
    </div>
  );
}
