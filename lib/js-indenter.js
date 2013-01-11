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

        // Remove empty lines in the beginning and end of file
        while(lines.length && lines[0] === "") {
            lines.shift();
        }
        while(lines.length && lines[lines.length - 1] === "") {
            lines.pop();
        }

        return lines.join("\n") + "\n";
    };
})(typeof use === "function" ? JSIndenter : exports);
