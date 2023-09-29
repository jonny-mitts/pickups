// app/api/pickup/route.js 👈🏽

import Server, { NextResponse } from 'next/server'
import createConnection from '@/utils/connection';

const convertJSDateTODateTime = (d) => {
    const convertedDate = (new Date(d)).toISOString().slice(0, 19).replace('T', ' ');
    return convertedDate;
}

export async function POST(req) {
    const data = await req.json();
    const {starttime, endtime, date, userSub, createDate, title, description} = data;
    const table = "pickups_pickup";
    const connection = await createConnection();
    const insertStatement  =`INSERT INTO \`${table}\` ( \`start_time\`, \`end_time\`, \`created\`, \`date_offered\`, \`user_id\`,\`title\`,\`description\` ) 
VALUES ('${convertJSDateTODateTime(starttime)}','${convertJSDateTODateTime(endtime)}','${convertJSDateTODateTime(createDate)}','${convertJSDateTODateTime(date)}','${userSub}','${title}','${description}')`;
    const [result] = await connection.execute(insertStatement);
  
    return Server.NextResponse.json({ data: {...data, id: result.insertId} }, { status: 200 })
  }
  