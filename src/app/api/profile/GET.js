// app/api/pickup/route.js 👈🏽

import Server from 'next/server';
import createConnection from '@/utils/connection';

// To handle a GET request to /api
export async function GET(req) {
  const searchParams = req.nextUrl.searchParams
  const email = searchParams.get('email');
  
  // Do whatever you want
  // get the client

  // create the connection to database
  const connection = await createConnection();
  const selectStatement = `SELECT * FROM \`pickups_users\` WHERE email='${email}'`;
  // simple query
  
  const [rows, fields] = await connection.execute(selectStatement);
  if(rows && rows[0]){
    const {id} = rows[0];
    const [profRows] = await connection.execute(`SELECT * FROM \`pickups_tennis_preferences\` WHERE profile_id='${id}'`);
  }
  
  connection.destroy()
  return await Server.NextResponse.json(
    { data: rows },
    { status: 200 }
  )
}