const errorHandler = (error, res) => {
  console.error("Error:", error);

  const response = {
    success: false,
    error: {
      type: "GenericError",
      message: "Something went wrong",
      details: [],
    },
  };

  if (error.name === "ValidationError") {
    response.error.type = "ValidationError";
    response.error.message = "Data validation failed";
    response.error.details = Object.keys(error.errors).map((key) => ({
      field: key,
      message: error.errors[key].message,
    }));
    return res.status(400).json(response);
  }

  if (error.name === "CastError") {
    response.error.type = "InvalidIdentifier";
    response.error.message = `Invalid format for ${error.path}: ${error.value}`;
    return res.status(400).json(response);
  }

  if (error.code === 11000) {
    response.error.type = "DuplicateKey";
    response.error.message = `Duplicate value for: ${Object.keys(error.keyValue).join(", ")}`;
    response.error.details = error.keyValue;
    return res.status(409).json(response);
  }

  if (error.name === "SyntaxError") {
    response.error.type = "InvalidJSON";
    response.error.message = "Malformed JSON in request body";
    return res.status(400).json(response);
  }

  response.error.type = "ServerError";
  response.error.message =
    process.env.NODE_ENV === "production"
      ? "Internal server error"
      : error.message;

  response.error.stack =
    process.env.NODE_ENV === "development" ? error.stack : undefined;

  return res.status(500).json(response);
};

export default errorHandler;
