export function ErrorHandler(error, request, response, next) {
  console.log(error.stack);
  response.status(500).json({ error: error });
}
