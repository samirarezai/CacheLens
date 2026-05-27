import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke, isTauri } from "@tauri-apps/api/core";
import "./App.css";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    if (!isTauri()) {
      setGreetMsg(
        "Greetings run in the Tauri desktop window only. Use `pnpm tauri dev` and click Greet there, not in a standalone browser tab.",
      );
      return;
    }
    try {
      const message = await invoke<string>("greet", { name });
      setGreetMsg(message);
    } catch (e) {
      const detail = e instanceof Error ? e.message : String(e);
      setGreetMsg(`Could not call Rust: ${detail}`);
    }
  }

  return (
    <main className="container">
      <h1>Welcome to Tauri + React</h1>

      <div className="row">
        <a href="https://vite.dev" target="_blank">
          <img src="/vite.svg" className="logo vite" alt="Vite logo" />
        </a>
        <a href="https://tauri.app" target="_blank">
          <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <p>Click on the Tauri, Vite, and React logos to learn more.</p>

      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}
      >
        <input
          id="greet-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button type="submit">Greet</button>
      </form>
      <p className="greet-output" aria-live="polite">
        {greetMsg || (
          <span className="greet-placeholder">
            Click Greet to show a message from Rust (run the desktop app with{" "}
            <code>pnpm tauri dev</code>, not only the browser).
          </span>
        )}
      </p>
    </main>
  );
}

export default App;
