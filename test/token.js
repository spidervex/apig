var expect    = require("chai").expect;
const supertest = require('supertest');

const request = supertest('http://192.168.44.2:3000');

const app = require('../app');


describe("Token", function() {
        it("Gets a token", async function() {

            const res = await request.get('/api/token');

            console.log(res.body);
            expect(res.body.token).to.exist;

            return;
        });
});