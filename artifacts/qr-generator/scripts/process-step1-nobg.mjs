import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const src =
  "C:/Users/HP/.cursor/projects/c-Users-HP-Desktop-QRcodeGenerator/assets/c__Users_HP_AppData_Roaming_Cursor_User_workspaceStorage_d2b9a62f9c7e697ac55ff986d8dab0dd_images_Gemini_Generated_Image_m58eo1m58eo1m58e-removebg-preview-145d3eac-fa50-4adb-9d68-7435f4b5454b.png";

const dest = path.join(root, "public/images/how-to/step-1-choose-type.webp");

const buf = fs.readFileSync(src);
const meta = await sharp(buf).metadata();
const w = 1120;
const h = Math.round(w * (meta.height / meta.width));

const bgSvg = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
    <defs>
      <radialGradient id="g" cx="50%" cy="44%" rx="58%" ry="52%">
        <stop offset="0%" stop-color="#fafafa"/>
        <stop offset="50%" stop-color="#f5f5f5"/>
        <stop offset="100%" stop-color="#f7f7f7"/>
      </radialGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
  </svg>`,
);

const fg = await sharp(buf).resize(w, h, { fit: "fill" }).ensureAlpha().png().toBuffer();

await sharp(bgSvg)
  .resize(w, h)
  .composite([{ input: fg, gravity: "center" }])
  .webp({ quality: 85, effort: 6 })
  .toFile(dest);

console.log("written:", dest, fs.statSync(dest).size);
