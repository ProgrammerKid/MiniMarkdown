var minimd = {
    tagify: function(tagname, content) {
        return "<" + tagname + ">" + content + "</" + tagname + ">";
    },
    
    parse: function(md) {
        var lines = md.split("\n"), // An array of each new line as an array element
            newLine = false, // Defines whether the next line of markdown should be on a new line
            html = ""; // Final HTML output
        
        // Enable toggles for opening and closing MD markers
        var bold_open = false,
            italics_open = false,
            bolditalics_open = false,
            underline_open = false,
            codeblock_open = false,
            quote_open = false;
        
        for (var i in lines) {
            
            // If previous line defined new line, then apply it now
            if (newLine) {
                html = html + "<br>";
                newLine = false;
            }
            // If previous line was blank, then two new lines are needed
            if (lines[i] === "") {
                html = html + "<br><br>";
                continue;
            }
            // Check for line ending in two spaces (signifies a new line)
            if (lines[i].substr(lines[i].length - 2, lines[i].length - 1) === "  ") {
                newLine = true;
            }
            
            // Check if a code block should be closed or opened
            if (codeblock_open) {
                if (lines[i].indexOf("    ") !== 0 || lines[i].indexOf("\t") !== 0) {
                    codeblock_open = false;
                    html = html + "</pre>";
                }
            } else {
                if (lines[i].indexOf("    ") === 0 || lines[i].indexOf("\t") === 0) {
                    codeblock_open = true;
                    html = html + "<pre class='code-block' style='box-sizing:border-box; padding:10px; background:silver; font-family:monospace;'>";
                }
            }
            
            // Check if a blocked quote should be closed or opened
            if (quote_open) {
                if (lines[i].indexOf("|") !== 0) {
                    html = html + "</div>";
                    quote_open = false;
                }
            } else if (!quote_open) {
                if (lines[i].indexOf("|") === 0) {
                    html = html + "<div class='block-quote' style='background:lightorange; border-left:3px solid orange; padding:10px;'>";
                    quotes_open = true;
                }
            }
            
            // Attatchments
            if (lines[i].indexOf("*|*") >= 0) {
                var segments = lines[i].split(" *|* "),
                    type = segments[0].toLowerCase(),
                    uri = segments[1],
                    alt;
                
                if (segments.length == 3) {
                    alt = segments[2];
                }
                
                if (type == "link" || type == "a") { // Link/anchor
                    lines[i] = "<a href='" + uri + "'>" + alt + "</a>";
                } else if (type == "image" || type == "img") { // Image
                    lines[i] = "<img src='" + uri + "' alt='" + alt + "' />";
                } else if (type == "iframe" || type == "webpage" || type == "website") {
                    lines[i] = "<iframe src='" + uri + ">" + alt + "<iframe>";
                }
            }
            
            // Bold italic marks
            while (lines[i].indexOf("***") >= 0) {
                if (bolditalics_open) {
                    lines[i] = lines[i].replace("***", "</b></i>");
                    bolditalics_open = false;
                } else {
                    lines[i] = lines[i].replace("***", "<i><b>");
                    bolditalics_open = true;
                }
            }
            
            // Bold marks
            while (lines[i].indexOf("**") >= 0) {
                if (bold_open) {
                    lines[i] = lines[i].replace("**", "</b>");
                    bold_open = false;
                } else {
                    lines[i] = lines[i].replace("**", "<b>");
                    bold_open = true;
                }
            }
            
            // Italic marks
            while (lines[i].indexOf("*") >= 0) {
                if (italics_open) {
                    lines[i] = lines[i].replace("*", "</i>");
                    italics_open = false;
                } else {
                    lines[i] = lines[i].replace("*", "<i>");
                    italics_open = true;
                }
            }
            
            
            if (lines[i].indexOf("#######") === 0) {
                lines[i] = minimd.tagify("h7", lines[i].substring(7, lines[i].lenght));
            } else if (lines[i].indexOf("######") === 0) {
                lines[i] = minimd.tagify("h6", lines[i].substring(6, lines[i].lenght));
            } else if (lines[i].indexOf("#####") === 0) {
                lines[i] = minimd.tagify("h5", lines[i].substring(5, lines[i].lenght));
            }  else if (lines[i].indexOf("####") === 0) {
                lines[i] = minimd.tagify("h4", lines[i].substring(4, lines[i].lenght));
            } else if (lines[i].indexOf("###") === 0) {
                lines[i] = minimd.tagify("h3", lines[i].substring(3, lines[i].lenght));
            } else if (lines[i].indexOf("##") === 0) {
                lines[i] = minimd.tagify("h2", lines[i].substring(2, lines[i].lenght));
            } else if (lines[i].indexOf("#") === 0) {
                lines[i] = minimd.tagify("h1", lines[i].substring(1, lines[i].lenght));
            }
            
            html = html + lines[i];
        }
        
        return html;
    }
};