var casper = require("casper").create();
var mouse = require("mouse").create(casper);

casper.start('https://now.qq.com/', function() {
    this.echo(this.getTitle());
});

casper.then(function() {
    this.mouse.click("#root > div.display-show-banner > div.header > div.title > ul > li:nth-child(3) > a"); // clicks <a id="my-link">hey</a>
    // this.mouse.click(400, 300);   // clicks at coordinates x=400; y=300
});

casper.then(function() {
    this.echo(this.getTitle());
});


casper.run();