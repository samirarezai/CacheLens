import { invoke } from "@tauri-apps/api/core";
import { useEffect, useState } from "react";

type CacheFile = {
  name: string;
  path: string;
  is_dir: boolean;
  size: number;
  content: string;
  file_type: string;
  image_base64: string;
};

function App() {
  const [files, setFiles] = useState<CacheFile[]>([]);

  async function loadFiles() {
    const result = await invoke<CacheFile[]>("get_chrome_cache_files");

    setFiles(result);
  }

  useEffect(() => {
    loadFiles();
  }, []);

  return (
    <main>
      <h1>Chrome Cache Files</h1>

      <div className="table-container">
        <table className="cache-table">
          <thead>
            <tr>
              <th>Preview</th>
              <th>Name</th>
              <th>Type</th>
              <th>Size</th>
              <th>Content</th>
            </tr>
          </thead>

          <tbody>
            {files.map((file) => (
              <tr key={file.path}>
                <td>
                  {["png", "jpeg", "webp"].includes(file.file_type) ? (
                    <img
                      src={`data:image/${file.file_type};base64,${file.image_base64}`}
                      className="preview-image"
                      width={50}
                    />
                  ) : (
                    <div className="file-icon">{file.is_dir ? "📁" : "📄"}</div>
                  )}
                </td>

                <td>
                  <div className="file-name">{file.name}</div>

                  <div className="file-path">{file.path}</div>
                </td>

                <td>
                  <span className="type-badge">{file.file_type}</span>
                </td>

                <td>{(file.size / 1024).toFixed(1)} KB</td>

                <td>
                  <pre className="content-preview">
                    {file.content.slice(0, 80)}
                  </pre>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default App;
