var casper = require('casper').create();

var links;

casper.start('http://www.qq.com/');

casper.then(function () {
    links = this.evaluate(function (itemName) {
        var links = document.querySelectorAll('#newsContent01 ul li a');
        return Array.prototype.map.call(links, function (e) {
            return itemName + ' - ' + e.innerHTML + ' - ' + e.getAttribute('href')
        });
    }, '要闻');
});

casper.run(function () {
    for (var i in links) {
        this.echo(links[i]);
    }

    this.exit();
});