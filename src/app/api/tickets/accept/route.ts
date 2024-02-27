import db from "@/tools/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {


    const  queryString = req.nextUrl.searchParams;


    // check if there's a ticket_id (t_id) and ticket status (t_stats) status ID to be specific
    if( queryString.has('t_id') && queryString.has('t_stats') ){
        const ticket_id = queryString.get('t_id')
        const ticket_status = queryString.get('t_stats'); // status ID

        const query = 'UPDATE tickets SET status_id = ?, updated_at = NOW() WHERE ticket_id = ?';

        // const data = await db.query(query, [ticket_status, ticket_id]);
        const data = "data";
        return Response.json({message: "OK", info:data });
    }
}
