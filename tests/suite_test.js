import app from '../app';
import {connect} from '../dal/store';

// There are better solutions for setting up fixtures with MongoDB.
// We'll just keep it fairly simple here...
before(() => app.set('DB', 'field-test'));
after(() => connect().then(db => db.dropDatabase()));
