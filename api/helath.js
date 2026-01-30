export default function handler(req, res) {
  res.status(200).json({
    status: "ok",
    service: "Puskesmas Platform API",
    time: new Date().toISOString()
  });
}
