import { NextRequest, NextResponse } from "next/server";
import db from "@/tools/db";
import { userDetails } from "@/tools/auth";



export const GET = async (req: Request, res: Response) => {
    const data = await getAllUsers();
    return Response.json(data);
}


const getAllUsers = async () => {
    const getUsersQuery = 'SELECT username, user_role, user_id FROM users';
    return await db.query(getUsersQuery);
}
