var minimd = {
    tagify: function(tagname, content) {
        return "<" + tagname + ">" + content + "</" + tagname + ">";
    },
    
    parse: function(md) {
        var lines = md.split("\n"), // An array of each new line as an array element
            newLine = false, // Defines whether the next line of markdown should be on a new line
            html = ""; // Final HTML output
        for (var i in lines) {
            if (lines[i].indexOf("#######") === 0) {
                html = html + minimd.tagify("h7", lines[i].substring(7, lines[i].lenght));
            } else if (lines[i].indexOf("######") === 0) {
                html = html + minimd.tagify("h6", lines[i].substring(6, lines[i].lenght));
            } else if (lines[i].indexOf("#####") === 0) {
                html = html + minimd.tagify("h5", lines[i].substring(5, lines[i].lenght));
            }  else if (lines[i].indexOf("####") === 0) {
                html = html + minimd.tagify("h4", lines[i].substring(4, lines[i].lenght));
            } else if (lines[i].indexOf("###") === 0) {
                html = html + minimd.tagify("h3", lines[i].substring(3, lines[i].lenght));
            } else if (lines[i].indexOf("##") === 0) {
                html = html + minimd.tagify("h2", lines[i].substring(2, lines[i].lenght));
            } else if (lines[i].indexOf("#") === 0) {
                html = html + minimd.tagify("h1", lines[i].substring(1, lines[i].lenght));
            }
        }
        
        return html;
    }
};