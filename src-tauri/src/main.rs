use serde::Serialize;
use walkdir::WalkDir;
use base64::{engine::general_purpose, Engine as _};

#[derive(Serialize)]
struct CacheFile {
    name: String,
    path: String,
    is_dir: bool,
    size: u64,
        content: String,
        file_type: String,
            image_base64: String,
}



#[tauri::command]
fn get_chrome_cache_files() -> Vec<CacheFile> {
    
    let path =
        r"C:\Users\USER\AppData\Local\Google\Chrome\User Data\Default\Cache";

    let mut files = vec![];

    for entry in WalkDir::new(path) {
        if let Ok(entry) = entry {
            
            let path_buf = entry.path();

            let metadata = std::fs::metadata(path_buf).ok();

            let size = metadata.map(|m| m.len()).unwrap_or(0);
            let content = if path_buf.is_file() {
    std::fs::read_to_string(path_buf)
        .unwrap_or_else(|_| "Binary file".to_string())
} else {
    "".to_string()
};
let bytes =
    std::fs::read(path_buf)
        .unwrap_or_default();

let file_type = if bytes.starts_with(&[137, 80, 78, 71]) {
    "png"
} else if bytes.starts_with(&[255, 216, 255]) {
    "jpeg"
} else if bytes.len() > 12
    && &bytes[0..4] == b"RIFF"
    && &bytes[8..12] == b"WEBP"
{
    "webp"
} else {
    "unknown"
};
let image_base64 =
    if file_type == "png"
        || file_type == "jpeg"
        || file_type == "webp"
    {
        general_purpose::STANDARD.encode(&bytes)
    } else {
        "".to_string()
    };
            files.push(CacheFile {
                name: entry.file_name().to_string_lossy().to_string(),
                path: path_buf.display().to_string(),
                is_dir: path_buf.is_dir(),
                size,
                content,
                file_type: file_type.to_string(),
                image_base64,
            });
        }
    }

    files
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            get_chrome_cache_files
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}