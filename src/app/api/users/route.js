import { connectDB } from "../../lib/db";
import { User } from "../../models/user";

export async function GET() {
  await connectDB();

  const users = await User.find();
  return new Response(JSON.stringify(users), { status: 200 });
}

export async function POST(req) {
  await connectDB();

  try {
    const body = await req.json();
    const user = await User.create(body);

    return new Response(JSON.stringify({ success: true, data: user }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: error.message }), { status: 400 });
  }
}
