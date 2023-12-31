import Server from 'next/server';
import createConnection from '@/utils/connection';

// To handle a GET request to /api
export async function GET(request, {params}) {
  
  
    // create the connection to database
    const connection = await createConnection();
    
    // simple query
    // const [rows, fields] = await connection.execute('SELECT * FROM `pickups_locations` ORDER BY `label`');
    const [rows, fields] = await connection.execute(`SELECT * FROM \`pickups_locations\` WHERE \`id\` IN (${params.locationId})`);
    return await Server.NextResponse.json(
      { data: rows, params },
      { status: 200 }
    )
  }