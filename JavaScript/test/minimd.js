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
            underline_open = false;
        
        for (var i in lines) {
            
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