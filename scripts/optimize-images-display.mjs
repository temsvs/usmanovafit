import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const rules = [
  {
    dir: "assets/result",
    maxSize: 540,
    jpegQuality: 88,
  },
  {
    dir: "assets/about",
    maxSize: 900,
    jpegQuality: 88,
  },
  {
    file: "assets/heroimg.png",
    maxSize: 1200,
  },
];

async function collectFilesFromDir(dir) {
  const fullDir = path.resolve(dir);
  const entries = await fs.readdir(fullDir, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile())
    .map((entry) => path.join(fullDir, entry.name))
    .filter((filePath) => /\.(jpe?g|png)$/i.test(filePath));
}

async function optimizeFile(filePath, maxSize, jpegQuality = 88) {
  const originalBuffer = await fs.readFile(filePath);
  const originalSize = originalBuffer.length;
  const ext = path.extname(filePath).toLowerCase();
  const metadata = await sharp(originalBuffer).metadata();
  const longestSide = Math.max(metadata.width ?? 0, metadata.height ?? 0);

  let pipeline = sharp(originalBuffer, { failOn: "none" }).rotate();

  if (longestSide > maxSize) {
    pipeline = pipeline.resize({
      width: maxSize,
      height: maxSize,
      fit: "inside",
      withoutEnlargement: true,
      kernel: sharp.kernel.lanczos3,
    });
  }

  if (ext === ".jpg" || ext === ".jpeg") {
    pipeline = pipeline.jpeg({
      quality: jpegQuality,
      mozjpeg: true,
      chromaSubsampling: "4:4:4",
    });
  } else {
    pipeline = pipeline.png({
      compressionLevel: 9,
      adaptiveFiltering: true,
      effort: 10,
      palette: false,
    });
  }

  const optimizedBuffer = await pipeline.toBuffer();
  const optimizedMeta = await sharp(optimizedBuffer).metadata();
  const optimizedSize = optimizedBuffer.length;

  if (optimizedSize >= originalSize && longestSide <= maxSize) {
    return {
      filePath,
      before: `${metadata.width}x${metadata.height}`,
      after: `${metadata.width}x${metadata.height}`,
      originalSize,
      optimizedSize: originalSize,
      saved: 0,
      skipped: true,
    };
  }

  await fs.writeFile(filePath, optimizedBuffer);

  return {
    filePath,
    before: `${metadata.width}x${metadata.height}`,
    after: `${optimizedMeta.width}x${optimizedMeta.height}`,
    originalSize,
    optimizedSize,
    saved: originalSize - optimizedSize,
    skipped: false,
  };
}

function formatKb(bytes) {
  return `${Math.round(bytes / 1024)} KB`;
}

const targets = [];

for (const rule of rules) {
  if (rule.file) {
    targets.push({
      filePath: path.resolve(rule.file),
      maxSize: rule.maxSize,
      jpegQuality: rule.jpegQuality ?? 88,
    });
    continue;
  }

  if (rule.dir) {
    const files = await collectFilesFromDir(rule.dir);
    for (const filePath of files) {
      targets.push({
        filePath,
        maxSize: rule.maxSize,
        jpegQuality: rule.jpegQuality ?? 88,
      });
    }
  }
}

const results = [];

for (const target of targets) {
  results.push(
    await optimizeFile(target.filePath, target.maxSize, target.jpegQuality),
  );
}

const totalOriginal = results.reduce((sum, item) => sum + item.originalSize, 0);
const totalOptimized = results.reduce(
  (sum, item) => sum + item.optimizedSize,
  0,
);

console.log("Display-size optimization report:\n");

for (const item of results.sort((a, b) => b.saved - a.saved)) {
  const relativePath = path.relative(process.cwd(), item.filePath);
  const status = item.skipped ? "kept original" : "optimized";
  console.log(
    `${relativePath} ${item.before} -> ${item.after} | ${formatKb(item.originalSize)} -> ${formatKb(item.optimizedSize)} [${status}]`,
  );
}

console.log(
  `\nTotal: ${formatKb(totalOriginal)} -> ${formatKb(totalOptimized)} (saved ${formatKb(totalOriginal - totalOptimized)})`,
);
