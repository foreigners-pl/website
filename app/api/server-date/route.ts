export async function GET() {
  const date = new Date().toISOString().split('T')[0];
  return Response.json({ date });
}
