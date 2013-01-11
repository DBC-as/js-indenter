// Compatibility boilerplate for dbc custom javascript environment
if(typeof use === "function") {
    use("StdConsole");
    EXPORTED_SYMBOLS = ["JSIndenter"];
    JSIndenter = {};
}
(function(exports){
    
    /** Table for mapping from l/r-paren to paren-type */
    var parenTypes = {
        "(": {begin: "()"},
        ")": {end: "()"},
        "[": {begin: "[]"},
        "]": {end: "[]"},
        "{": {begin: "{}"},
        "}": {end: "{}"}
    }
    parenRegExp = /([({[\]})]|<\/?\w+)/g

    /** @param {String} str @returns {Array} a list or left-parens in a given string */
    function parseParens(str) {
        var result = [];
        !str.replace(parenRegExp, function(paren) {

            if(parenTypes[paren]) {
                result.push(parenTypes[paren]);
            } else if(paren[0] === "<") {
                if(paren[1] === "/") {
                    result.push({end: paren.slice(2)});
                } else {
                    result.push({begin: paren.slice(1)});
                }
            } else {
                throw "internal bug, should never happen, something wrong with regexp";
            }
            console.log("paren", paren);
        });
        return result
    }

    /**
     * Indent a piece of javascript source code
     * @param sourceCode {String} the sourcecode to indent
     * @returns {String} indented source code
     */
    exports.indent = function(sourceCode) {
        // codelines is the source code to prettyprint
        var codelines = sourceCode.split("\n").map(function(str) {
            return str.trim();
        });

        // Remove empty codelines in the beginning and end of file
        while(codelines.length && codelines[0] === "") {
            codelines.shift();
        }
        while(codelines.length && codelines[codelines.length - 1] === "") {
            codelines.pop();
        }

        // lines is the source code to analyse for parentheses
        // different from codelines, as we remove strings, comments etc.
        // in order not to get things like "(" count as begin-paren
        var lines = codelines.map(function(line) {
            return line
                .replace(/"[^"]*"/g, "")
                .replace(/'[^']*'/g, "")
                .replace(/\/\/.*/g, "");
        }).map(function(line) {
            return {
                line: line,
                parens: parseParens(line),
            };
        });

        lines.forEach(function(line) {
            console.log(line);
        });

        return codelines.join("\n") + "\n";
    };
})(typeof use === "function" ? JSIndenter : exports);
