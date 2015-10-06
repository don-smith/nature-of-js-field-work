import app from '../app';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import * as mammals from '../dal/mammals';
import {locator} from '../gamelogic';

const should = chai.should();
chai.use(chaiAsPromised);

describe('Mammals:', () => {

  describe('mammals.create', () => {

    it('should refuse to create a mammal without a name', () => {
      let p =  mammals.create({}, 'rangers');
      return p.should.be.rejectedWith(Error);
    });

    it('should create an object with the correct properties', () => {
      let p = mammals.create({name: 'Thelonious'}, 'rangers');
      return p.should.eventually.include.keys('name', 'x', 'y', 'turn');
    });

    context('on turn 1', () => {
      before(() => app.set('TURN', 1));
      after(() => app.set('TURN', 0));

      it('should refuse to create a mammal', () => {
        let p = mammals.create({name: 'Gershwin'}, 'rangers')
        return p.should.be.rejectedWith(Error);
      });
    });

    context('with map size 20', () => {
      const size = app.get('MAP_SIZE');
      before(() => app.set('MAP_SIZE', 20));
      after(() => app.set('MAP_SIZE', size));

      it('should create a wombat with fixed coordinates', () => {
        let p = mammals.create({
          name: 'Ellington',
          locator: 'fixed',
          x: 19,
          y: 0
        }, 'wombats');

        return Promise.all([
          p.should.eventually.have.property('x').which.equals(19),
          p.should.eventually.have.property('y').which.equals(0)
        ]);
      });

      it('should not create a ranger with fixed coordinates', () => {
        let p = mammals.create({
          name: 'Coltrane',
          locator: 'fixed',
          x: 19,
          y: 0
        }, 'rangers');
        return p.should.be.rejectedWith(Error);
      });

      it('should not create a wombat out of bounds', () => {
        let p = mammals.create({
          name: 'Basie',
          locator: 'fixed',
          x: 20,
          y: -1
        }, 'rangers');
        return p.should.be.rejectedWith(Error);
      });

    });

  });

});

