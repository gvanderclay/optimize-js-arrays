const esbuild = require("esbuild");
const glob = require("fast-glob");

async function build() {
  const entryPoints = await glob("src/**/*.js");

  await esbuild.build({
    entryPoints,
    outdir: "dist",
    platform: "node",
    bundle: true,
    minify: false,
  });
}

build();
