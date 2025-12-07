# Font Files

This directory should contain the self-hosted font files for the wedding website.

## Required Fonts

### 1. Cormorant Garamond (Display Font)

- Weights: 300, 400, 500, 600, 700
- Styles: Regular and Italic
- Subset: latin-ext (for Hungarian characters)
- Files needed:
  - cormorant-garamond-v16-latin-ext-300.woff2
  - cormorant-garamond-v16-latin-ext-300.woff
  - cormorant-garamond-v16-latin-ext-300italic.woff2
  - cormorant-garamond-v16-latin-ext-300italic.woff
  - cormorant-garamond-v16-latin-ext-regular.woff2
  - cormorant-garamond-v16-latin-ext-regular.woff
  - cormorant-garamond-v16-latin-ext-italic.woff2
  - cormorant-garamond-v16-latin-ext-italic.woff
  - cormorant-garamond-v16-latin-ext-500.woff2
  - cormorant-garamond-v16-latin-ext-500.woff
  - cormorant-garamond-v16-latin-ext-500italic.woff2
  - cormorant-garamond-v16-latin-ext-500italic.woff
  - cormorant-garamond-v16-latin-ext-600.woff2
  - cormorant-garamond-v16-latin-ext-600.woff
  - cormorant-garamond-v16-latin-ext-600italic.woff2
  - cormorant-garamond-v16-latin-ext-600italic.woff
  - cormorant-garamond-v16-latin-ext-700.woff2
  - cormorant-garamond-v16-latin-ext-700.woff
  - cormorant-garamond-v16-latin-ext-700italic.woff2
  - cormorant-garamond-v16-latin-ext-700italic.woff

### 2. Inter (Body and Form Font)

- Weights: 200, 300, 400, 500, 600, 700
- Subset: latin-ext (for Hungarian characters)
- Files needed:
  - inter-v18-latin-ext-200.woff2
  - inter-v18-latin-ext-200.woff
  - inter-v18-latin-ext-300.woff2
  - inter-v18-latin-ext-300.woff
  - inter-v18-latin-ext-regular.woff2
  - inter-v18-latin-ext-regular.woff
  - inter-v18-latin-ext-500.woff2
  - inter-v18-latin-ext-500.woff
  - inter-v18-latin-ext-600.woff2
  - inter-v18-latin-ext-600.woff
  - inter-v18-latin-ext-700.woff2
  - inter-v18-latin-ext-700.woff

### 3. Eyesome Script (Decorative Script Font)

- Weight: 400 (Regular)
- Subset: latin-ext (if available, otherwise latin)
- Files needed:
  - eyesome-script-latin-ext-regular.woff2
  - eyesome-script-latin-ext-regular.woff

## How to Download

### Option 1: Google Webfonts Helper

1. Visit https://gwfh.mranftl.com/fonts
2. Search for each font:
   - Cormorant Garamond
   - Inter
   - Eyesome Script
3. Select "latin-ext" subset for each
4. Select the required weights/styles
5. Download and extract the files to this directory

### Option 2: Manual Download from Google Fonts

1. Visit https://fonts.google.com/
2. Search for each font
3. Click "Download family" or use the API
4. Ensure you select the latin-ext subset
5. Extract woff2 and woff files to this directory

### Option 3: Using a Script

You can use tools like `google-webfonts-helper` or similar npm packages to automate the download.

## Note

The font file names in `src/fonts.css` must match the actual file names. If the downloaded files have different names, update the `@font-face` declarations in `src/fonts.css` accordingly.
