import { NextResponse } from "next/server";
import connectDB from "@/lib/database";
import User from "@/models/user";
import bcrypt from "bcryptjs";

export const POST = async (req, res) => {
  try {
    const { values } = await req.json();

    await connectDB();

    const existingEmail = await User.findOne({ email: values.email });

    if (existingEmail) {
      return NextResponse.json(
        {
          error: "User with this email address already exists!",
        },
        { status: 400 }
      );
    }

    const hashedPassword = bcrypt.hashSync(values.password, 10);

    const newUser = await User.create({
      username: values.username,
      email: values.email,
      phoneNumber: values.phoneNumber,
      password: hashedPassword,
      role: values.role,
    });

    await newUser.save();

    return NextResponse.json(
      { message: "User created successfully!" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create the user!" },
      { status: 500 }
    );
  }
};
