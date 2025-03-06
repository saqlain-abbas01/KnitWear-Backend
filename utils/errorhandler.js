const errorHandler = (error, res) => {
  console.error('Error:', error);
  if (error.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Validation Error',
      details: Object.keys(error.errors).map((key) => ({
        field: key,
        message: error.errors[key].message,
      })),
    });
  }
  if (error.code === 11000) {
    return res.status(400).json({
      error: 'Duplicate Key Error',
      details: error.keyValue,
      message: `A product with the same ${Object.keys(error.keyValue).join(', ')} already exists.`,
    });
  }
  return res.status(500).json({
    error: 'Internal Server Error',
    message: error.message,
    stack: process.env.NODE_ENV === 'development' ? error.stack : undefined, // Stack trace only in development
  });
};

export default errorHandler;
