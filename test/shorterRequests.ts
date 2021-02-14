import dotenv from "dotenv";
import chai from "chai";
import chaiHttp = require("chai-http");
import "mocha";

dotenv.config();
const expect = chai.expect;

chai.use(chaiHttp);

describe("Urls test", () => {
  it("Invalid url", (done: Function) => {
    const site = {
      url: "http://com",
    };

    chai
      .request(process.env.HOST)
      .post("encurtador")
      .send(site)
      .end((err: any, res: any) => {
        expect(err).to.be.null;
        expect(res).to.have.status(404);
        done();
      });
  });

  it("Invalid url", (done: Function) => {
    const site = {
      url: "http:/wisereducacao.com",
    };

    chai
      .request(process.env.HOST)
      .post("encurtador")
      .send(site)
      .end((err: any, res: any) => {
        expect(err).to.be.null;
        expect(res).to.have.status(404);
        done();
      });
  });

  it("Invalid url", (done: Function) => {
    const site = {
      url: "http:localhost.com",
    };

    chai
      .request(process.env.HOST)
      .post("encurtador")
      .send(site)
      .end((err: any, res: any) => {
        expect(err).to.be.null;
        expect(res).to.have.status(404);
        done();
      });
  });

  it("Invalid url", (done: Function) => {
    const site = {
      url: "https://zzzzcom",
    };

    chai
      .request(process.env.HOST)
      .post("encurtador")
      .send(site)
      .end((err: any, res: any) => {
        expect(err).to.be.null;
        expect(res).to.have.status(404);
        done();
      });
  });

  it("Post correct url", (done: Function) => {
    const site = {
      url: "http://wisereducacao.com",
    };

    chai
      .request(process.env.HOST)
      .post("encurtador")
      .send(site)
      .end((err: any, res: any) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);

        const pickingShortURL = res.text.split("/");
        var shorterURL = pickingShortURL.pop();

        chai
          .request(process.env.HOST)
          .get(shorterURL)
          .end((err: any, res: any) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);

            done();
          });
      });
  });

  it("Get incorrect shortener", (done: Function) => {
    chai
      .request(process.env.HOST)
      .get("kdhf21d")
      .end((err: any, res: any) => {
        expect(err).to.be.null;
        expect(res).to.have.status(404);

        done();
      });
  });
});
