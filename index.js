const program = require("commander");
const fs = require("fs");
const textractScan = require("./textractUtils");

var text = ""

function printText(item) {
    //items += toString(items)
    if(item.Text) { 
        text += item.Text
        text += " "
     }
    else { return }
  }


program.version("0.0.1").description("Textract");
program
.command("scan <filePath>")
.alias("s")
.description("scans a file")
.action(async filePath => {
var data = fs.readFileSync(filePath);
const results = await textractScan(data);
results.map(printText)
console.log(text.substring(0, text.length / 2))


});
program.parse(process.argv);