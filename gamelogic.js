import app from './app';
import * as mammals from './dal/mammals';
import _ from 'lodash';

// Increment the turn if no mammals are yet to move
export function incrementTurn() {
  let turn = app.get('TURN');

  return new Promise ((resolve, reject) => {
    mammals.getAll('rangers').then(rangers => {
      if (turnInProgress(rangers, 'RANGERS', turn)) {
        return resolve();
      }
      mammals.getAll('wombats').then(wombats => {
        if (!turnInProgress(wombats, 'WOMBATS', turn)) {
          if (turn + 1 === app.get('ROUND_LENGTH')) {
            app.set('ROUND_ACTIVE', false);
          } else {
            app.set('TURN', turn + 1);
          }
        }
        resolve();
      });
    });
  });
}

function turnInProgress(collection, type, turn) {
  if (collection.length < app.get(type)) return true;
  return _.some(_.map(collection, 'turn'), t => t === turn);
}

export function checkDocument(doc, collection) {
  if (app.get('TURN') !== 0) {
    throw Error("Can't add mammals after the round begins.");
  }
  if (!doc.hasOwnProperty('name')) {
    throw Error("That mammal is invalid!");
  }
  if (doc.locator === 'fixed' && collection !== 'wombats') {
    throw Error("Only wombats can have fixed positions.");
  }
}

export function checkMove(mammal, coords) {
  return new Promise((resolve, reject) => {
    if (!mammal) {
      return reject(Error("Don't recognise that mammal.")); 
    }
    if (mammal.history) {
      if (mammal.history.hasOwnProperty(app.get('TURN').toString())) {
        return reject(Error(`${mammal.name} has already moved this turn.`));
      }
    }
    // No jumps of more than one space at a time
    if (Math.abs(mammal.x - coords.x) > 1 || Math.abs(mammal.y - coords.y) > 1) {
      return reject(Error("Only allowed to move 1 space at a time."));
    }
    let max = app.get('MAP_SIZE')-1;
    if (coords.x > max || coords.y > max) {
      return reject(Error("Out of bounds."));
    }
    if (coords.x < 0 || coords.y < 0) {
      return reject(Error("Out of bounds."));
    }

    return resolve(mammal);
  });
}

export function makeMove(mammal, coords) {
  let turn = app.get('TURN');
  if (turn === 0) mammal.history = {};
  mammal.history[turn] = { x: mammal.x, y: mammal.y };
  mammal.turn = turn + 1;
  mammal.x = coords.x;
  mammal.y = coords.y;
  return mammal;
}

export function locator(type) {
  switch(type) {
    case 'fixed': return fixedLocation;
    default: return randomLocation;
  }
}

function randomLocation() {
  let max = app.get('MAP_SIZE')-1;
  return [_.random(0, max), _.random(0, max)];
}

function fixedLocation(doc) {
  let max = app.get('MAP_SIZE')-1;
  if (!Number.isInteger(doc.x) || !Number.isInteger(doc.y)) {
    throw Error("Specify coordinates.");
  }
  if (doc.x < 0 || doc.x > max || doc.y < 0 || doc.y > max) {
    throw Error("Out of bounds.");
  }
  return [doc.x, doc.y];
}

