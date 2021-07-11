const request = require("supertest");
const app = require("../index");

describe("GET /" , () => {

    it("responds with the Hello Word!" , done => {

        request(app).get('/').expect("Hello World!", done);
    
    });

})