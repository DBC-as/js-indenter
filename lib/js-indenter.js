// Compatibility boilerplate for dbc custom javascript environment
if(typeof use === "function") {
    use("StdConsole");
    EXPORTED_SYMBOLS = ["JSIndenter"];
    JSIndenter = {};
}
(function(exports){
    // Actual implementation
    /**
     * Indent a piece of javascript source code
     * @param sourceCode {String} the sourcecode to indent
     * @returns {String} indented source code
     */
    exports.indent = function(sourceCode) {
        var lines = sourceCode.split("\n").map(function(str) {
            return str.trim();
        });
        return lines.join("\n");
    };
})(typeof use === "function" ? JSIndenter : exports);
