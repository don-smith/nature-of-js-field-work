import app from '../app';
import * as store from '../dal/store';
import * as logic from '../gamelogic';
import _ from 'lodash';

// Assumes unique constraint on 'name'
export function create(doc, collection) {
  return new Promise((resolve, reject) => {
    try {
      doc.locator = doc.locator || 'random';
      logic.checkDocument(doc, collection);
      doc.name = doc.name.toLowerCase();
      doc.turn = 0;
      [doc.x, doc.y] = logic.locator(doc.locator)(doc);
    } catch(e) {
      return reject(e);
    }

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
    store.deleteDocument(name, collection).then(resolve, reject);
  });
}

export function remove(name, collection) {
  return new Promise((resolve, reject) => {
    store.removeDocument(name, collection).then(resolve, reject);
  });
}
