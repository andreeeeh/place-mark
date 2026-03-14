export function validationError(request, h, err) {
  console.log(JSON.stringify(err, null, 2));
  throw err;
}
