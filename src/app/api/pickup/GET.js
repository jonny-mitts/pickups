// app/api/pickup/route.js 👈🏽

import Server, { NextResponse } from 'next/server'
import createConnection from '@/utils/connection';

// To handle a GET request to /api
export async function GET(request) {
  // Do whatever you want
  // get the client

  // create the connection to database
  const connection = await createConnection();
  
  // simple query
  const [rows, fields] = await connection.execute('SELECT * FROM `pickups_pickup`');
  connection.destroy()
  return await Server.NextResponse.json(
    { data: rows },
    { status: 200 }
  )
}