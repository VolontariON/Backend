import fs from "fs/promises";

export async function getConfig() {
  try {
    const data = await fs.readFile("./config.json", "utf8");
    const config = JSON.parse(data);
    return config;
  } catch (err) {
    console.error("Error reading or parsing JSON:", err);
    return null;
  }
}
