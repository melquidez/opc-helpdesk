import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import db from "@/tools/db";
import { generateToken } from "@/tools/auth";

interface UserData{
    username: string,
    password: string,
    user_role: string,
    first_name: string,
    last_name: string,
    email: string,
    phone: string
}


export const POST = async (req: Request) => {
    try {
        const data: UserData = await req.json();
        // const { username, password, first_name, last_name, email, phone } = req.body;
        // return Response.json({message: data})

        const hashedPassword = await bcrypt.hash(data.password,10);

        const user = await db.transaction().query(
            "INSERT INTO users (username, password, user_role) VALUES (?, ?, ?)",
            [data.username, hashedPassword, data.user_role]
        ).query( async (r:{insertId:number})=>{
            // const userId = r.insertId
            await db.query(
                "INSERT INTO user_profile (user_id, first_name, last_name, email, phone) VALUES (?, ?, ?, ?, ?)",
                [r.insertId, data.first_name, data.last_name, data.email, data.phone]
            );
        }

        ).rollback((e: any )=> {
            console.error('Transaction rollback:', e);
            Response.json({ error: 'Internal Server Error' });
        }).commit();


        // Get the UserID of the newly registered user
        const username = data.username;
        const userId = user[0].insertId

        // Generate JWT token
        const token = generateToken({ userId, username });

        return Response.json(user[0].insertId);
    } catch (error) {
        console.error("Error during registration:", error);
        return Response.json({ error: "Internal Server Error" });
    } finally {
        await db.end();
    }
};
