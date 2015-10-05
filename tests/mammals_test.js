import app from '../app';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import * as mammals from '../dal/mammals';

const should = chai.should();
chai.use(chaiAsPromised);

describe('Mammals', () => {

  describe('create on turn 0', () => {
    before(() => app.set('TURN', 1));
    after(() => app.set('TURN', 0));

    it('should refuse to create a mammal after the first turn', () => {
      let p = mammals.create({name: 'Gershwin'}, 'rangers')
      return p.should.be.rejectedWith(Error);
    });
  });

  describe('create', () => {
    it('should refuse to create a mammal without a name', () => {
      let p =  mammals.create({}, 'rangers');
      return p.should.be.rejectedWith(Error);
    });

    it('should create an object with the correct properties', () => {
      let p = mammals.create({name: 'Thelonious'}, 'rangers');
      return p.should.eventually.include.keys('name', 'x', 'y', 'turn');
    });

    it(`should not create a mammal out of bounds${app.get('MAP_SIZE')}`, () => {
      let p = mammals.create({name: 'Ellington'}, 'rangers');
      let max = app.get('MAP_SIZE')-1;
      return Promise.all([
        p.should.eventually.have.property('x').which.is.within(0, max),
        p.should.eventually.have.property('y').which.is.within(0, max)
      ]);
    });
  });

});

