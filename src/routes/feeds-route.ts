import { Router, Request, Response, NextFunction } from "express";
import { IFeeds, Feeds } from "../models/feeds"
export const router: Router = Router();
const Parser = require('rss-parser');
const parser = new Parser();

router.get('/feeds', async function (req: Request, res: Response, next: NextFunction) {
  try {
    let tags = req.query.tags;
    let url = tags ? 'https://www.flickr.com/services/feeds/photos_public.gne?tags=' + tags : 'https://www.flickr.com/services/feeds/photos_public.gne';
    let feeds: IFeeds[] = [];

    //call flickr feeds api
    const feedsRaw = await parser.parseURL(encodeURI(url));

    //parse each returned items
    feedsRaw.items.forEach((item: IFeeds) => {

      //extract image link from content
      var rex = /https:\/\/live.staticflickr.com(.+?)"/g;
      var imageLinks = rex.exec(item.content);
      var temp = imageLinks ? imageLinks[0] : '';
      item.imageLink = temp.slice(0, temp.length - 1).trim();

      //add new feeds to feeds list
      feeds.push(new Feeds(item.title, item.link, item.pubDate, item.author, item.imageLink, item.content, item.contentSnippet));
    });

    //return feeds list.
    return res.json(feeds)
  } catch (error) {
    return next(error);
  }
});
