# MiniMarkdown
Introducing a new flavor of markdown syntaxing: MiniMarkdown (MiniMD, MiniMarkdown, MMD)

## MiniMarkdown Utilities Language Support

MiniMarkdown Offers a utility tool for each of these languages

* JavaScript
    * MMD > HTML


## Utility Features

### JavaScript

MMD Code Parsing - Convert MiniMarkdown to HTML
Tagify - Convert a single segment of MMD code to html





## Documentation

### New Lines

You can add an empty line between two lines of text by simply hitting `Enter` or `Return` twice.  
Example:

    Hello
     
    World

will render:
    
    Hello
    
    World

To enter only on a new line, add at least two spaces at the end of the line:

    Hello..     (The dots represent spaces, as you will not be able to see empty spaces)
    World
    
will render:

    Hello
    World

### Headings

    #       > H1
    ##      > H2
    ###     > H3
    ####    > H4
    #####   > H5
    ######  > H6
    ####### > H7
    
### Bold, Italics, Underline

#### Bold

You can boldify text by placing it in between two asterisks `** **`

`**This is bold**`                  > **This is bold**

#### Italics

You can italicize by placing text in between asterisks `* *`

`*This is italics*`                 > *This is italics*

#### Bold and Italics

You can perform a bold and italics at the same time by using three asterisks `*** ***`

`***This is bold and italicized***` > ***This is bold and italicized***

### Attatchments

Unlike regular markdown, there is no confusing syntax for different types of attatchments.
Instead in MMD, we offer one unified method of importing images, links etc; this is called an
attatchment. In MMD, you can attatch:

* Images
* HyperLinks
* IFrames (websites/webpages/pdfs/mp3/etc)

Syntax:

    <type> *|* <uri> *|* <optional alt text>
    
Examples:

    image *|* http://google.com/example.png *|* Enable image rendering in your browser
    link *|* http://google.com/ *|* Click here to go to Google
    iframe *|* http://cnn.com/ *|* Enable iFraming to check out the worlds greatest news

HTML versions:

    <img src="http://google.com/example.png" alt="Enable image rendering in your browser"/>
    <a href="http://google.com/">Click here to go to Google</a>
    <iframe src="http://cnn.com/">Enable iFraming to check out the worlds greatest news</iframe>