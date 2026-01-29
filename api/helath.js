export default function handler(req, res) {
  res.status(200).json({
    status: "ok",
    message: "Puskesmas backend is alive",
    time: new Date().toISOString()
  });
}
