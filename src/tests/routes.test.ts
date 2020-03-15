import { expect } from 'chai';
import * as app from '../app';
import { agent as request } from 'supertest';

describe("Routes Test", () => {
    it('should always pass', function () {
        expect(true).to.equal(true);
    });

    describe("feeds-route", () => {
        it("Should return feeds", async () => {
            const res = await request(app).get('/feeds');
            expect(res.status).to.equal(200);
            expect(res.body).not.to.be.empty;
            expect(res.body.length).above(0);
            expect(res.body[0].title).not.be.undefined;
            expect(res.body[0].link).not.be.undefined;
            expect(res.body[0].pubDate).not.be.undefined;
            expect(res.body[0].author).not.be.undefined;
            expect(res.body[0].imageLink).not.be.undefined;
            expect(res.body[0].content).not.be.undefined;
            expect(res.body[0].contentSnippet).not.be.undefined;
        });

        it("Should return feeds with tags", async () => {
            const res = await request(app).get('/feeds').query({ tags: "coronavirus,virus" });
            expect(res.status).to.equal(200);
            expect(res.body).not.to.be.empty;
            expect(res.body.length).above(0);
            expect(res.body[0].title).not.be.undefined;
            expect(res.body[0].link).not.be.undefined;
            expect(res.body[0].pubDate).not.be.undefined;
            expect(res.body[0].author).not.be.undefined;
            expect(res.body[0].imageLink).not.be.undefined;
            expect(res.body[0].content).not.be.undefined;
            expect(res.body[0].contentSnippet).not.be.undefined;
        });
    });
});