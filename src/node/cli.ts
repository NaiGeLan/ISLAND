import { cac } from "cac";
import { createDevServer } from "./dev";
import { resolve } from "path";
import { build } from "./build";
const version = require("../../package.json").version;

const cli = cac("island").version(version).help();

cli
  .command("dev [root]", "start dev server")
  .action(async (root: string) => {
    const server = await createDevServer(root)
    await server.listen()
    server.printUrls()
  });

cli
  .command("build [root]", "build for production")
  .action(async (root: string) => {
    try {
      root = resolve(root)
      await build(root)
    }catch (err) {
      console.log(err);
      
    }
  });

cli.parse();
