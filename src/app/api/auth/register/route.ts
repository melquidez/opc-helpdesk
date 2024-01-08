import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import db from "@/tools/db";
import { generateToken } from "@/tools/auth";

interface UserData{
    username: string,
    password: string,
    userrole: string,
    firstname: string,
    lastname: string,
    email: string,
    phone: string
}


export const POST = async (req: Request) => {
    try {
        const data: UserData = await req.json();
        // const { username, password, firstname, lastname, email, phone } = req.body;
        // return Response.json({message: data})

        const hashedPassword = await bcrypt.hash(data.password,10);

        const user = await db.transaction().query(
            "INSERT INTO users (username, password, userrole) VALUES (?, ?, ?)",
            [data.username, hashedPassword, data.userrole]
        ).query( async (r:{insertId:number})=>{
            // const userId = r.insertId
            await db.query(
                "INSERT INTO userprofile (userid, firstname, lastname, email, phone) VALUES (?, ?, ?, ?, ?)",
                [r.insertId, data.firstname, data.lastname, data.email, data.phone]
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
