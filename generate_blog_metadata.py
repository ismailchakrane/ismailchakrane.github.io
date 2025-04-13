import json
from pathlib import Path
from datetime import datetime, timezone
import argparse

def generate_blog_metadata(blog_dir, output_file):
    blog_dir = Path(blog_dir)
    metadata = []
    for file_path in blog_dir.glob("*.md"):
        mtime = file_path.stat().st_mtime
        dt = datetime.fromtimestamp(mtime, timezone.utc)
        iso_str = dt.isoformat(timespec='milliseconds').replace("+00:00", "Z")
        with file_path.open("r", encoding="utf-8") as f:
            lines = f.readlines()
            remaining = "".join(lines[2:]) if len(lines) > 2 else ""
            plain_text = remaining.replace("#", "")
            summary = plain_text.strip()[:255]
        title = file_path.stem.replace("_", " ")
        metadata.append({
            "name": file_path.name,
            "title": title,
            "summary": summary,
            "modified": iso_str
        })
    metadata.sort(key=lambda x: x["modified"], reverse=True)
    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(metadata, f, indent=2)

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--blog-dir", type=str, default="content/blog")
    parser.add_argument("--output", type=str, default="blog-metadata.json")
    args = parser.parse_args()
    generate_blog_metadata(args.blog_dir, args.output)
