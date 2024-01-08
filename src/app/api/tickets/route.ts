import { NextRequest, NextResponse } from "next/server";
import db from "@/tools/db";
import { userDetails } from "@/tools/auth";


export const GET = async (req: NextRequest, res: NextResponse) => {
    try {

        const searchParam = req.nextUrl.searchParams
        if(searchParam.has('id')){
            const ticketid = searchParam.get('id')
            const query = `
                SELECT SQL_CALC_FOUND_ROWS tickets.*,
                users.username          AS UserUserName,
                users.userrole          AS UserUserRole,
                ticketstatus.statusname AS TicketStatusName,
                tags.tagname,
                ticketanalytics.viewscount,
                ticketanalytics.resolutiontime,
                ticketanalytics.analyticsdate
            FROM   tickets
                JOIN users
                ON tickets.userid = users.userid
                JOIN ticketstatus
                ON tickets.statusid = ticketstatus.statusid
                LEFT JOIN tickettags
                    ON tickets.ticketid = tickettags.ticketid
                LEFT JOIN tags
                    ON tickettags.tagid = tags.tagid
                LEFT JOIN ticketanalytics
                    ON tickets.ticketid = ticketanalytics.ticketid
            WHERE tickets.ticketid = ?
        `;

            const data = await db.query(query,[ticketid]);
            return Response.json(...data); // work on this
        }


        const qString = req.nextUrl.searchParams;
        const page:any = qString.get('page') || 1;
        const pageSize:any = 5;
        const offset = (page - 1) * pageSize
        // const results = await db.query("SELECT * FROM users");
        const query = `
                SELECT SQL_CALC_FOUND_ROWS tickets.*,
                users.username          AS UserUserName,
                users.userrole          AS UserUserRole,
                ticketstatus.statusname AS TicketStatusName,
                tags.tagname,
                ticketanalytics.viewscount,
                ticketanalytics.resolutiontime,
                ticketanalytics.analyticsdate
            FROM   tickets
                JOIN users
                ON tickets.userid = users.userid
                JOIN ticketstatus
                ON tickets.statusid = ticketstatus.statusid
                LEFT JOIN tickettags
                    ON tickets.ticketid = tickettags.ticketid
                LEFT JOIN tags
                    ON tickettags.tagid = tags.tagid
                LEFT JOIN ticketanalytics
                    ON tickets.ticketid = ticketanalytics.ticketid
            ORDER BY tickets.createdat DESC
            LIMIT ?, ?;
        `;

        const countQuery = "SELECT COUNT(*) AS total FROM tickets"

        const [ results, totalResults ]:any = await Promise.all([
            db.query(query,[offset, +pageSize]),
            db.query(countQuery)
        ]);

        const totalTickets = totalResults[0].total;
        const totalPages = Math.ceil(totalTickets / pageSize)

        // const results = await db.query(query,[offset, +pageSize]);
        return Response.json({totalTickets, totalPages, results});
    } catch (error) {
        console.error("Error fetching data:", error);
        return Response.json({ error: "Error fetching data" });
    } finally {
        await db.end();
    }
};


interface FormData {
    ticketid?:number,
    statusid?:number,
    title:string,
    description: string
}
interface CookieData {
    "username":string,
    "userid":number,
    "userrole":string
}
export const POST = async (req: Request, res: Response)=>{
    try{
        const data: FormData = await req.json();
        const user: CookieData | undefined = userDetails();

        // check if undefined
        if (!user){
            return Response.json({error: 'Unauthorized!'})
        }
        const query = 'INSERT INTO tickets (title, description, userid, statusid, createdat, updatedat) VALUES (?, ?, ?, ?, NOW(), NOW())';

        const result = await db.query(query,
            [data.title, data.description, user.userid, 1]
        );


        return Response.json({message: 'Ticket posted successfully!'})
    } catch(error){
        console.log(error)
        return Response.json({ error: error, message: 'Failed to create ticket!' });
    } finally{
        await db.end();
    }
}


export const PUT = async (req: Request, res: Response)=>{
    try{
        const data: FormData = await req.json();
        const user: CookieData | undefined = userDetails();

        // check if undefined
        if (!user){
            return Response.json({error: 'Unauthorized!'})
        }
        const query = 'UPDATE tickets SET title = ?, description = ?, statusid = ? , updatedat = NOW() WHERE ticketid = ?';

        const result = await db.query(query,
            [data.title, data.description, data.statusid, data.ticketid]
        );


        return Response.json({message: 'Ticket posted successfully!'})
    } catch(error){
        console.log(error)
        return Response.json({ error: error, message: 'Failed to create ticket!' });
    } finally{
        await db.end();
    }
}

