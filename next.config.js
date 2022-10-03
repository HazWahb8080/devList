const withTM = require("next-transpile-modules")([
  // https://github.com/vercel/next.js/discussions/13553#discussioncomment-20092  ----------------------------
  // cause of this, we also set `experimental: { esmExternals: "loose" }`
  "react-tag-input",
  "react-dnd",
  "dnd-core",
  "@react-dnd/invariant",
  "@react-dnd/asap",
  "@react-dnd/shallowequal",
  //  --------------------------------------------------------------------------------------------------------
]);

module.exports = withTM({
  experimental: { esmExternals: "loose" },
});
