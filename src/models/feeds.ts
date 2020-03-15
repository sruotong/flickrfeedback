export interface IFeeds {
    title: string;
    link: string;
    pubDate: string;
    author: string;
    imageLink: string;
    content?: string;
    contentSnippet?: string;
}

export class Feeds implements IFeeds{
    constructor(
        public title: string,
        public link: string,
        public pubDate: string,
        public author: string,
        public imageLink: string,
        public content: string,
        public contentSnippet?: string
    ){}
}