'use strict';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);

describe('Giphy API', () => {

  it('should get a giphy on GET /giphy', (done) => {
    chai.request(server)
      .get('/giphy')
      .end((err, res) => {
        res.should.have.a.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.a.property('SUCCESS');
        res.body.SUCCESS.should.be.true;
        res.body.should.have.a.property('MESSAGE');
        res.body.MESSAGE.should.be.eq('Enjoy your Giphy');
        res.body.should.have.a.property('URL');
        done();
      });
  });
});
