var fs = require("fs");
var indent = require("../lib/js-indenter").indent;
var src = fs.readFileSync(__dirname + "/sample.js", "utf8");
var newsrc = indent(src);
fs.writeFileSync(__dirname + "/sample.js.out", newsrc);
