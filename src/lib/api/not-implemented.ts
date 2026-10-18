export function notImplemented() {
  return Response.json(
    { error: "هذه الخدمة قيد التجهيز" },
    { status: 501 }
  );
}
