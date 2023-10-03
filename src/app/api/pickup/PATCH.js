// app/api/pickup/route.js 👈🏽

import Server from 'next/server';
import createConnection from '@/utils/connection';

const convertJSDateTODateTime = (d) => {
    // const convertedDate = (new Date(d)).toISOString().slice(0, 19).split("T");
    return d;
}

export async function PATCH(req) {
    
    const data = await req.json();
    const {starttime, endtime, date, userSub, createDate, title, description, id} = data;
    const table = "pickups_pickup";
    const connection = await createConnection();
    const updateStatement  =`UPDATE ${table} SET start_time='${convertJSDateTODateTime(starttime)}', end_time='${convertJSDateTODateTime(endtime)}', created='${convertJSDateTODateTime(createDate)}', date_offered='${convertJSDateTODateTime(date)}', user_id='${userSub}', title='${title}', description='${description}' WHERE id=${id}`;            
    const [result] = await connection.execute(updateStatement);
    
    return Server.NextResponse.json({ data: {...data} }, { status: 200 })
  }
  