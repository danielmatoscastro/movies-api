export const errorHandler = (err, req, res) => {
  if (err.status) {
    if (err.message) {
      return res.status(err.status).json({ error: err.message });
    }
    return res.sendStatus(err.status);
  }

  return res.sendStatus(500);
};

export default errorHandler;
