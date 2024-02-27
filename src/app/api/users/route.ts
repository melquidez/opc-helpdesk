import { NextRequest, NextResponse } from "next/server";
import db from "@/tools/db";
import { userDetails } from "@/tools/auth";

export const GET = async (req: NextRequest, res: Response) => {
    const user = req.nextUrl.searchParams
    if(user.has('user')){
        if(user.get('user') == 'all'){
            // return await getAllUsers()
            return Response.json(await getAllUsers())
        }
    }
    if(user.has('id')){
        const data = await getUserData(user.get('id'))
        return Response.json(...data)
    }


}


const getAllUsers = async () => {
    const getUsersQuery = 'SELECT username, user_role, user_id FROM users';
    return await db.query(getUsersQuery);
}


const getUserData = async (id: any) => {
    const getQuery = `
                        SELECT
                            users.username, users.user_role, users.user_id, user_profile.first_name, user_profile.last_name, user_profile.email, user_profile.phone
                        FROM users
                            JOIN user_profile ON users.user_id = user_profile.user_id
                            WHERE users.user_id = ?
                        `
    return await db.query(getQuery, [id])
}
