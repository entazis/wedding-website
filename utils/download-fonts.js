#!/usr/bin/env node

/**
 * Script to download Google Fonts with latin-ext subset
 * Downloads: Cormorant Garamond, Inter, and Eyesome Script
 */

import fs from "fs";
import https from "https";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fontsDir = path.join(__dirname, "../public/fonts");

// Ensure fonts directory exists
if (!fs.existsSync(fontsDir)) {
  fs.mkdirSync(fontsDir, { recursive: true });
}

/**
 * Download a file from URL
 */
function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const options = {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    };

    https
      .get(url, options, (response) => {
        if (response.statusCode === 200) {
          response.pipe(file);
          file.on("finish", () => {
            file.close();
            console.log(`✓ Downloaded: ${path.basename(dest)}`);
            resolve();
          });
        } else if (response.statusCode === 301 || response.statusCode === 302) {
          // Handle redirects
          file.close();
          if (fs.existsSync(dest)) {
            fs.unlinkSync(dest);
          }
          downloadFile(response.headers.location, dest)
            .then(resolve)
            .catch(reject);
        } else {
          file.close();
          if (fs.existsSync(dest)) {
            fs.unlinkSync(dest);
          }
          reject(
            new Error(`Failed to download ${url}: ${response.statusCode}`)
          );
        }
      })
      .on("error", (err) => {
        file.close();
        if (fs.existsSync(dest)) {
          fs.unlinkSync(dest);
        }
        reject(err);
      });
  });
}

/**
 * Get font file URLs from Google Fonts CSS
 */
async function getFontUrls(fontFamily, weights, styles = [""]) {
  const urls = [];

  for (const weight of weights) {
    for (const style of styles) {
      const italParam = style === "italic" ? "1" : "0";
      const apiUrl = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
        fontFamily
      )}:ital,wght@${italParam},${weight}&subset=latin-ext`;

      try {
        const response = await fetch(apiUrl, {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          },
        });
        const css = await response.text();

        // Extract font URLs from CSS - prioritize woff2, fallback to woff
        const urlRegex = /url\(([^)]+)\)/g;
        let match;
        const foundUrls = [];
        while ((match = urlRegex.exec(css)) !== null) {
          const url = match[1].replace(/['"]/g, "");
          if (url.startsWith("http")) {
            foundUrls.push(url);
          }
        }

        // Prefer woff2, then woff
        const woff2Url = foundUrls.find((u) => u.includes(".woff2"));
        const woffUrl = foundUrls.find(
          (u) => u.includes(".woff") && !u.includes(".woff2")
        );

        if (woff2Url) {
          urls.push({
            url: woff2Url,
            weight,
            style: style || "regular",
            fontFamily,
            format: "woff2",
          });
        }
        if (woffUrl) {
          urls.push({
            url: woffUrl,
            weight,
            style: style || "regular",
            fontFamily,
            format: "woff",
          });
        }
      } catch (error) {
        console.error(
          `Error fetching ${fontFamily} ${weight}${style}:`,
          error.message
        );
      }
    }
  }

  return urls;
}

/**
 * Generate filename from font info
 */
function generateFilename(fontFamily, weight, style, format) {
  if (fontFamily === "Cormorant Garamond") {
    const weightStr = weight === 400 ? "regular" : weight.toString();
    const styleStr =
      style === "regular"
        ? ""
        : style === "italic" && weight === 400
        ? "italic"
        : `${weightStr}${style}`;
    return `cormorant-garamond-v16-latin-ext-${
      styleStr || weightStr
    }.${format}`;
  } else if (fontFamily === "Inter") {
    const weightStr = weight === 400 ? "regular" : weight.toString();
    return `inter-v18-latin-ext-${weightStr}.${format}`;
  } else if (fontFamily === "Eyesome Script") {
    return `eyesome-script-latin-ext-regular.${format}`;
  }

  const familySlug = fontFamily.toLowerCase().replace(/\s+/g, "-");
  const weightStr = weight === 400 ? "regular" : weight.toString();
  const styleStr = style === "regular" ? "" : `-${style}`;
  return `${familySlug}-${weightStr}${styleStr}.${format}`;
}

/**
 * Main download function
 */
async function downloadFonts() {
  console.log("Starting font download...\n");

  const fonts = [
    {
      name: "Cormorant Garamond",
      weights: [300, 400, 500, 600, 700],
      styles: ["", "italic"],
    },
    {
      name: "Inter",
      weights: [200, 300, 400, 500, 600, 700],
      styles: [""],
    },
    {
      name: "Eyesome Script",
      weights: [400],
      styles: [""],
    },
  ];

  for (const font of fonts) {
    console.log(`\nDownloading ${font.name}...`);
    const urls = await getFontUrls(font.name, font.weights, font.styles);

    for (const fontInfo of urls) {
      const filename = generateFilename(
        fontInfo.fontFamily,
        fontInfo.weight,
        fontInfo.style,
        fontInfo.format
      );
      const dest = path.join(fontsDir, filename);

      // Skip if file already exists
      if (fs.existsSync(dest)) {
        console.log(`⊘ Skipped (exists): ${filename}`);
        continue;
      }

      try {
        await downloadFile(fontInfo.url, dest);
      } catch (error) {
        console.error(`✗ Failed to download ${filename}:`, error.message);
      }
    }
  }

  console.log("\n✓ Font download complete!");
  console.log(`Fonts saved to: ${fontsDir}`);
}

// Run the script
downloadFonts().catch(console.error);
