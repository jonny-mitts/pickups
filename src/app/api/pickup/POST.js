// import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
// import Server from 'next/server';

import Server from 'next/server';
import createConnection from '@/utils/connection';

// const client = new DynamoDBClient({})

const convertJSDateTODateTime = (d) => {
  const convertedDate = new Date(d)
    .toISOString()
    .slice(0, 19)
    .split('T')
    .join(' ')

  return convertedDate
// return d;
}

// export async function POST(req) {
//   const data = await req.json()
//   const { starttime, endtime, date, user_id, createDate, title, description } = data

//   const Item = {
//     pckup: { S: uuid.v4() },
//     starttime: { S: starttime },
//     endtime: { S: endtime },
//     date: { S: date },
//     user_id: { S: user_id.toString() },
//     createDate: { S: createDate },
//     title: { S: title },
//     description: { S: description },
//   }

//   await client.send(
//     new PutItemCommand({
//       TableName: process.env.PICKUPS_TABLE_NAME,
//       Item,
//     })
//   )

//   return Server.NextResponse.json({ data: Item }, { status: 200 })

// //   return res.status(201).json(Item)
// }

export async function POST(req) {
    const data = await req.json();
    const {starttime, endtime, date, user_id, createDate, title, description} = data;
    const table = "pickups_pickup";
    const connection = await createConnection();
    const insertStatement  =`
    INSERT INTO \`${table}\` ( \`start_time\`, \`end_time\`, \`created\`, \`date_offered\`, \`user_id\`,\`title\`,\`description\` )
    VALUES ('${convertJSDateTODateTime(starttime)}','${convertJSDateTODateTime(endtime)}','${convertJSDateTODateTime(createDate)}','${convertJSDateTODateTime(date)}','${user_id}','${title}','${description}')`;
    const [result] = await connection.execute(insertStatement);

    return Server.NextResponse.json({ data: {...data, id: result.insertId} }, { status: 200 })
  }
