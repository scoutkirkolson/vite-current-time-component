/* eslint-disable no-console */
import {execa} from "execa";
import * as fs from "fs";
(async () => {
  try {
    // eslint-disable-next-line no-console
    console.log("Commit changes...");
    await execa("git", ["add", "--all"]);
    await execa("git", ["commit", "-m", "build commit"]);
    await execa("git", ["push", "origin"]);

    console.log("Checkout gh-pages...");
    await execa("git", ["checkout", "--orphan", "gh-pages"]);

    console.log("Building started...");
    await execa("yarn", ["build:es-min"]);
    await execa("yarn", ["build:es-full"]);
    await execa("yarn", ["build:umd-min"]);
    await execa("yarn", ["build:umd-full"]);
    
    // Understand if it's dist or build folder
    const folderName = fs.existsSync("dist") ? "dist" : "build";
    await execa("git", ["--work-tree", folderName, "add", "--all"]);
    await execa("git", ["--work-tree", folderName, "commit", "-m", "gh-pages"]);

    console.log("Pushing to gh-pages...");
    await execa("git", ["push", "origin", "HEAD:gh-pages", "--force"]);
    await execa("rm", ["-r", folderName]);
    await execa("git", ["checkout", "-f", "main"]);
    await execa("git", ["branch", "-D", "gh-pages"]);

    console.log("Successfully deployed, check your settings");
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e.message);
    process.exit(1);
  }
})();
