import app from '../app';
import _ from 'lodash';

export function withAreaMap(res, rangers, wombats, query) {
  let turn = query.turn || app.get('TURN');
  let me = query.me ? query.me.toLowerCase() : '';
  let areaMap = {
    "--": "",
    "key": "# = ranger  @ = you  W = wombat",
    "turn": turn
  };

  let grid = initGrid(areaMap, app.get('MAP_SIZE'));
  _.each(rangers, (ranger) => placeInGrid(ranger, grid, turn, me, '#'));  
  _.each(wombats, (wombat) => placeInGrid(wombat, grid, turn, me, 'W'));

  _.each(grid, (row, i) => {
    areaMap[i] = (i < 10) ? ' ' : '';
    _.each(row, (loc) => draw(loc, areaMap, i));
  });

  res.send(areaMap);
}

export function withDocument(res, doc) {
  doc ? res.send(doc) : res.sendStatus(404);
}

export function withError(res, err) {
  console.error(err);
  res.status(400).json({ error: err.message });
}

function initGrid(areaMap, size) {
  let grid = [];
  _.times(size, (i) => {
    areaMap['--'] += (i < 10) ? `  ${i} ` : ` ${i} `;

    let row = [];
    _.times(size, () => { row.push(null); });
    grid.push(row);
  });
  return grid;
}

function placeInGrid(mammal, grid, turn, me, avatar) {
  avatar = mammal.name === me ? '@' : avatar;
  let x = mammal.x;
  let y = mammal.y;

  if (turn != app.get('TURN')) {
    if (_.has(mammal.history, turn)) {
      x = mammal.history[turn].x;
      y = mammal.history[turn].y;
    }
  }

  if (!grid[y][x]) grid[y][x] = [];
  grid[y][x].push(avatar);
}

function draw(loc, areaMap, i) {
  if (loc) {
    let s = _.take(loc.sort().reverse(), 4).join('');
    areaMap[i] += _.pad(s, 4, ' ');
  } else {
    areaMap[i] += '  - ';
  }
}
