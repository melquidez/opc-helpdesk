import { NextRequest, NextResponse } from "next/server";
import db from "@/tools/db";
import { userDetails } from "@/tools/auth";


export const GET = async (req: NextRequest, res: NextResponse) => {
    try {

        const searchParam = req.nextUrl.searchParams;

        if (searchParam.has('id')) {
            const ticketId = searchParam.get('id');
            const query = `
            SELECT SQL_CALC_FOUND_ROWS tickets.*,
                users.username AS username,
                users.user_role AS user_role,
                ticket_status.status_name AS TicketStatus_Name,
                GROUP_CONCAT(tags.tag_name) AS Tags,
                ticket_analytics.views_count,
                ticket_analytics.resolution_time,
                ticket_analytics.analytics_date
            FROM tickets
                JOIN users ON tickets.user_id = users.user_id
                JOIN ticket_status ON tickets.status_id = ticket_status.status_id
                LEFT JOIN ticket_tags ON tickets.ticket_id = ticket_tags.ticket_id
                LEFT JOIN tags ON ticket_tags.tag_id = tags.tag_id
                LEFT JOIN ticket_analytics ON tickets.ticket_id = ticket_analytics.ticket_id
                WHERE tickets.ticket_id = ?
                GROUP BY tickets.ticket_id; -- Group by ticket ID to handle multiple tags
            `;

            const data = await db.query(query, [ticketId]);
            return Response.json(...data);
        }



        const qString = req.nextUrl.searchParams;
        const page:any = qString.get('page') || 1;
        const pageSize = 5;
        const offset = (page - 1) * pageSize;

        // const query = `
        //     SELECT SQL_CALC_FOUND_ROWS tickets.*,
        //         users.username AS username,
        //         users.user_role AS user_role,
        //         ticket_status.status_name AS TicketStatus_Name,
        //         GROUP_CONCAT(tags.tag_name) AS Tags,
        //         ticket_analytics.views_count,
        //         ticket_analytics.resolution_time,
        //         ticket_analytics.analytics_date
        //     FROM tickets
        //         JOIN users ON tickets.user_id = users.user_id
        //         JOIN ticket_status ON tickets.status_id = ticket_status.status_id
        //         LEFT JOIN ticket_tags ON tickets.ticket_id = ticket_tags.ticket_id
        //         LEFT JOIN tags ON ticket_tags.tag_id = tags.tag_id
        //         LEFT JOIN ticket_analytics ON tickets.ticket_id = ticket_analytics.ticket_id
        //     ORDER BY tickets.created_at DESC
        //     LIMIT ?, ?;
        // `;

        const query = `
            SELECT SQL_CALC_FOUND_ROWS
                tickets.*,
                users.username AS username,
                users.user_role AS user_role,
                ticket_status.status_name AS TicketStatus_Name,
                GROUP_CONCAT(tags.tag_name SEPARATOR ', ') AS Tags,
                ticket_analytics.views_count,
                ticket_analytics.resolution_time,
                ticket_analytics.analytics_date
            FROM
                tickets
            JOIN
                users ON tickets.user_id = users.user_id
            JOIN
                ticket_status ON tickets.status_id = ticket_status.status_id
            LEFT JOIN
                ticket_tags ON tickets.ticket_id = ticket_tags.ticket_id
            LEFT JOIN
                tags ON ticket_tags.tag_id = tags.tag_id
            LEFT JOIN
                ticket_analytics ON tickets.ticket_id = ticket_analytics.ticket_id
            GROUP BY
                tickets.ticket_id  -- Assuming ticket_id is the primary key
            ORDER BY
                tickets.created_at DESC
            LIMIT ?, ?;
        `

        const countQuery = "SELECT COUNT(*) AS total FROM tickets";

        const [results, totalResults]: any = await Promise.all([
            db.query(query, [offset, pageSize]),
            db.query(countQuery)
        ]);

        const totalTickets = totalResults[0].total;
        const totalPages = Math.ceil(totalTickets / pageSize);

        return Response.json({ totalTickets, totalPages, results });


    } catch (error) {
        console.error("Error fetching data:", error);
        return Response.json({ error: error });
    } finally {
        await db.end();
    }
};


interface FormData {
    ticket_id?:number
    status_id?:number
    title:string
    description: string
    tag_id: Array<number> | number
    tag_name:string
}
interface CookieData {
    "username":string
    "user_id":number
    "user_role":string
}
export const POST = async (req: Request, res: Response)=>{
    try{
        const data: FormData = await req.json();
        const user: CookieData | undefined = userDetails();

        // check if undefined
        if (!user){
            return Response.json({error: 'Unauthorized!'})
        }
        const ticketQuery = 'INSERT INTO tickets (title, description, user_id, status_id, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())';
        const ticketTagsQuery = 'INSERT INTO ticket_tags (ticket_id, tag_id, ticket_tag_created_at, ticket_tag_updated_at) VALUES (?, ?, NOW(), NOW())';

        const tag_ids = data.tag_id
        const ticketData = await db.transaction().query(
            ticketQuery,
            [data.title, data.description, user.user_id, 1]
        ).query( async (r:{insertId:number})=>{
            if(Array.isArray(tag_ids)){
                const tagPromise = tag_ids.map( async (tagId:number)=>{
                    await db.query(
                        ticketTagsQuery,
                        [r.insertId, tagId]
                    );
                })
                await Promise.all(tagPromise)
            } else{
                await db.query(ticketTagsQuery,[r.insertId,tag_ids])
            }

        }).rollback((e: any )=> {
            console.error('Transaction rollback:', e);
            Response.json({ error: 'Internal Server Error' });
        }).commit();

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
        const query = 'UPDATE tickets SET title = ?, description = ?, status_id = ? , updated_at = NOW() WHERE ticket_id = ?';

        const result = await db.query(query,
            [data.title, data.description, data.status_id, data.ticket_id]
        );


        return Response.json({message: 'Ticket posted successfully!'})
    } catch(error){
        console.log(error)
        return Response.json({ error: error, message: 'Failed to create ticket!' });
    } finally{
        await db.end();
    }
}

