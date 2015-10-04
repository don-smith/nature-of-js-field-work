import app from '../app';
import * as store from '../dal/store';
import {checkMove, makeMove} from '../gamelogic';
import _ from 'lodash';

// Assumes unique constraint on 'name'
export function create(doc, collection) {
  return new Promise((resolve, reject) => {
    if (app.get('TURN') !== 0) {
      return reject(Error("Can't add mammals after the round begins."));
    }
    if (!doc.hasOwnProperty('name')) {
      return reject(Error("That mammal is invalid!"));
    }
    let max = app.get('MAP_SIZE')-1;
    doc.x = _.random(0, max);
    doc.y = _.random(0, max);
    doc.name = doc.name.toLowerCase();
    doc.turn = 0;

    store.createDocument(doc, collection).then(resolve, reject);
  });
}

export function get(name, collection) {
  return new Promise((resolve, reject) => {
    store.getDocument(name, collection).then(resolve, reject);
  });
}

export function getAll(collection) {
  return new Promise((resolve, reject) => {
    store.getDocuments(collection).then(resolve, reject);
  });
}

export function update(name, coords, collection) {
  return new Promise((resolve, reject) => {
    get(name, collection)
      .then(mammal => checkMove(mammal, coords))
      .then(mammal => makeMove(mammal, coords))
      .then(mammal => {
        store.updateDocument(mammal, collection).then(resolve, reject);
      })
      .catch(reject);
  });
}

