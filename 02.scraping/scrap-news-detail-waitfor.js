var casper = require('casper').create({
    clientScripts: ['./lib/jquery.min.js'],
    pageSettings: {
        loadImages: false,        // The WebPage instance used by Casper will
        loadPlugins: false         // use these settings
    }
});

casper.start('http://www.qq.com/');

var newsLink, newsData;

casper.then(function () {
    // 获取“要闻”新闻第一条新闻链接
    newsLink = this.evaluate(function () {
        return $('#newsContent01 ul li a[href]').eq(0).attr('href');
    });

    // 输出结果
    this.echo('新闻页面地址：' + newsLink);

    // 打开该新闻链接
    this.thenOpen(newsLink, function () {
        // 输出新闻详情页面的title
        this.echo('新闻页面title：' + this.getTitle());
    });

});

casper.waitFor(function check() {
    return this.evaluate(function () {
        // 注意，此处仅为示例而已，具体的判断条件请依据自己的实际情况来看
        return $('#cmtNum').text() > 0;
    });
}, function then() {
    // 将当前网页保存为截图
    this.capture('qq-com-news-detail-waitfor.png');

    // 获取新闻页页面元素的信息
    newsData = this.evaluate(function () {
        var result = {};

        // 发布时间是同html一同返回的，同步拉取
        result.publishTime = $('#Main-Article-QQ  .qq_main  .qq_article  .hd  .a_Info .a_time').text();

        // 评论数是加载完 html 之后，异步拉取
        result.discussCount = $('#cmtNum').text();

        return result;
    });

});

casper.then(function () {
    this.echo('newsLink值为：' + newsLink);
    this.echo('newsData值为：' + JSON.stringify(newsData));
    this.echo('当前页面 title：' + this.getTitle());
});

casper.run(function () {
    this.exit();
});