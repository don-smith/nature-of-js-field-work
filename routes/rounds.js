import app from '../app';

// router middleware checks round status prior to allowing game activity
export function checkRoundStatus(req, res, next) {
  if (app.get('ROUND_ACTIVE')) {
    next();
  } else {
    res.status(400).json({ message: "Round is over!" });
  }
}
