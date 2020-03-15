"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const feeds_1 = require("../models/feeds");
exports.router = express_1.Router();
const Parser = require('rss-parser');
const parser = new Parser();
exports.router.get('/feeds', async function (req, res, next) {
    try {
        let tags = req.query.tags;
        let url = tags ? 'https://www.flickr.com/services/feeds/photos_public.gne?tags=' + tags : 'https://www.flickr.com/services/feeds/photos_public.gne';
        let feeds = [];
        const feedsRaw = await parser.parseURL(encodeURI(url));
        feedsRaw.items.forEach((item) => {
            var rex = /https:\/\/live.staticflickr.com(.+?)"/g;
            var imageLinks = rex.exec(item.content);
            var temp = imageLinks ? imageLinks[0] : '';
            item.imageLink = temp.slice(0, temp.length - 1).trim();
            feeds.push(new feeds_1.Feeds(item.title, item.link, item.pubDate, item.author, item.imageLink, item.content, item.contentSnippet));
        });
        return res.json(feeds);
    }
    catch (error) {
        return next(error);
    }
});
