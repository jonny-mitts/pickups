import Server, { NextResponse } from 'next/server'
import createConnection from '@/utils/connection';

// To handle a GET request to /api
export async function GET(request) {
  
    // create the connection to database
    const connection = await createConnection();
    
    // simple query
    const [rows, fields] = await connection.execute('SELECT * FROM `pickups_locations` ORDER BY `label`');
  
    return await Server.NextResponse.json(
      { data: rows },
      { status: 200 }
    )
  }