import { connectDB } from "../../../lib/db";
import { User } from "../../../models/user";

export async function GET(req, context) {
  const params = await context.params;
  const { userId } = params;

  await connectDB();

  const user = await User.findById(userId);
  if (!user) return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });

  return new Response(JSON.stringify(user), { status: 200 });
}

export async function PUT(req, context) {
  const params = await context.params;
  const { userId } = params;

  const data = await req.json();
  await connectDB();

  const user = await User.findByIdAndUpdate(userId, data, { new: true, runValidators: true });
  if (!user) return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });

  return new Response(JSON.stringify({ success: true, data: user }), { status: 200 });
}

export async function DELETE(req, context) {
  const params = await context.params;
  const { userId } = params;

  await connectDB();

  const user = await User.findByIdAndDelete(userId);
  if (!user) return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });

  return new Response(JSON.stringify({ message: "User deleted successfully" }), { status: 200 });
}
