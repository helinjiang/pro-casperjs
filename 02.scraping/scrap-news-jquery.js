var casper = require('casper').create({
    clientScripts: ['./lib/jquery.min.js'],
    pageSettings: {
        loadImages: false,        // The WebPage instance used by Casper will
        loadPlugins: false         // use these settings
    }
});

var links;

casper.start('http://www.qq.com/');

casper.then(function () {
    links = this.evaluate(function (itemName) {
        var arr = [];

        $('#newsContent01 ul li a[href]').each(function () {
            var $this = $(this),
                url = $this.attr('href'),
                text = $.trim($this.text());
            arr.push(itemName + ' - ' + text + ' - ' + url);
        });

        return arr;
    }, '要闻');
});

casper.run(function () {
    for (var i in links) {
        this.echo(links[i]);
    }

    this.exit();
});