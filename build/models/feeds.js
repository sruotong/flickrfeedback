"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Feeds {
    constructor(title, link, pubDate, author, imageLink, content, contentSnippet) {
        this.title = title;
        this.link = link;
        this.pubDate = pubDate;
        this.author = author;
        this.imageLink = imageLink;
        this.content = content;
        this.contentSnippet = contentSnippet;
    }
}
exports.Feeds = Feeds;
