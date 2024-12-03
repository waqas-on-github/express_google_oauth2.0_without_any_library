/* eslint-disable @typescript-eslint/quotes */

export async function profileControler(req, res) {
  res.json({ Hello: req.user });
}
