// place at : deploy/ghpages.js
// you can see more info at https://github.com/tschaub/gh-pages
import { fileURLToPath } from "url";
import path from "path";
import ghpages from "gh-pages";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
  branch: "main",
  repo: "https://github.com/ykyyykk/WebProject.git", // project github repo
};

const callback = (err) => {
  if (err) console.error(err);
  else console.log("publish success");
};

/**
 * This task pushes to the `main` branch of the configured `repo`.
 */
ghpages.publish(path.resolve(__dirname, "../dist"), options, callback);
