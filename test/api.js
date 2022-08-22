var expect    = require("chai").expect;
const supertest = require('supertest');

const request = supertest('http://192.168.44.2:3000');

describe("Token", function() {
    it("Gets a token", async function() {

        const res = await request.get('/api/');

        console.log();
        const body = res.body;

        expect(body.ping).to.equal('ponging');

        return;
    });
});