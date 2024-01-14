import { NextApiRequest, NextApiResponse } from "next";
import db from "@/tools/db";
import bcrypt from "bcrypt";
import { generateToken, setAuthToken } from "@/tools/auth";

interface Credetials {
    username: string;
    password: string;
}

export const POST = async (req: Request) => {
    try {
        const data: Credetials = await req.json();
        // Retrieve user from the Users table
        const result: any[] = await db.query(
            "SELECT * FROM users WHERE username = ?",
            [data.username]
        );

        if (result.length === 0) {
            return Response.json({ error: "Invalid credentials" });
        }

        const user = result[0];
        // return Response.json(user);
        const isMatch = await bcrypt.compare(
            data.password,
            user.password,
        );

        if (!isMatch) {
            return Response.json({ error: "Invalid credentials" });
        }
        // const username = data.username;
        const userInfo = {
            username: data.username,
            user_id: user.user_id,
            user_role: user.user_role
        }

        // Generate JWT token
        const token = generateToken(userInfo);
        setAuthToken(token);

        return Response.json({ token });
    } catch (error) {
        console.error("Error during login:", error);
        return Response.json({ error: "Internal Server Error" });
    } finally {
        await db.end();
    }
};
