import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const assetsDir = path.resolve("assets");
const imageExtensions = new Set([".jpg", ".jpeg", ".png"]);

async function collectImages(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectImages(fullPath)));
      continue;
    }

    const ext = path.extname(entry.name).toLowerCase();
    if (imageExtensions.has(ext)) {
      files.push(fullPath);
    }
  }

  return files;
}

async function compressImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const originalBuffer = await fs.readFile(filePath);
  const originalSize = originalBuffer.length;
  const metadata = await sharp(originalBuffer).metadata();

  let pipeline = sharp(originalBuffer, { failOn: "none" }).rotate();

  if (ext === ".jpg" || ext === ".jpeg") {
    pipeline = pipeline.jpeg({
      quality: 88,
      mozjpeg: true,
      chromaSubsampling: "4:4:4",
    });
  } else if (ext === ".png") {
    pipeline = pipeline.png({
      compressionLevel: 9,
      adaptiveFiltering: true,
      palette: false,
    });
  }

  const optimizedBuffer = await pipeline.toBuffer();
  const optimizedSize = optimizedBuffer.length;

  if (optimizedSize >= originalSize) {
    return {
      filePath,
      width: metadata.width,
      height: metadata.height,
      originalSize,
      optimizedSize: originalSize,
      saved: 0,
      skipped: true,
    };
  }

  await fs.writeFile(filePath, optimizedBuffer);

  return {
    filePath,
    width: metadata.width,
    height: metadata.height,
    originalSize,
    optimizedSize,
    saved: originalSize - optimizedSize,
    skipped: false,
  };
}

function formatKb(bytes) {
  return `${Math.round(bytes / 1024)} KB`;
}

const files = await collectImages(assetsDir);
const results = [];

for (const file of files) {
  results.push(await compressImage(file));
}

const totalOriginal = results.reduce((sum, item) => sum + item.originalSize, 0);
const totalOptimized = results.reduce(
  (sum, item) => sum + item.optimizedSize,
  0,
);
const totalSaved = totalOriginal - totalOptimized;

console.log("Compression report:\n");

for (const item of results.sort((a, b) => b.saved - a.saved)) {
  const relativePath = path.relative(process.cwd(), item.filePath);
  const status = item.skipped ? "kept original" : "optimized";
  console.log(
    `${relativePath} (${item.width}x${item.height}) ${formatKb(item.originalSize)} -> ${formatKb(item.optimizedSize)} [${status}]`,
  );
}

console.log(
  `\nTotal: ${formatKb(totalOriginal)} -> ${formatKb(totalOptimized)} (saved ${formatKb(totalSaved)})`,
);
