var links = [];

var casper = require('casper').create({
    clientScripts: ['jquery.min.js'],
    pageSettings: {
        loadImages: false,        // The WebPage instance used by Casper will
        loadPlugins: false         // use these settings
    }
});

casper.start('http://www.qq.com/', function () {
    var result = this.evaluate(function () {
        var arr = [];

        $('#newsContent02 a[href]').each(function () {
            var $this = $(this),
                url = $this.attr('href'),
                text = $.trim($this.text());
            arr.push(text + ' ' + url);
        });

        return arr;
    });

    links = links.concat(result);
});

casper.run(function () {
    // echo results in some pretty fashion
    this.echo(links.length + ' links found:');
    this.echo(' - ' + links.join('\n - ')).exit();
});