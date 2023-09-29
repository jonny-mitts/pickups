// app/api/pickup/route.js 👈🏽

import Server, { NextResponse } from 'next/server'
import createConnection from '@/utils/connection'
import {
  createUpdateStatementFromObject,
} from '@/utils/databaseUtils'

export async function PATCH(req) {
  const data = await req.json()
  const profileTable = 'pickups_users'
  
  const {profileId} = data;

  const updateStatement = createUpdateStatementFromObject(
    profileTable,
    data,
    'id',
    profileId,
    ['profileId']
  )
  
  
  const connection = await createConnection()
  const [result] = await connection.execute(updateStatement)
  

  return Server.NextResponse.json({ data: result }, { status: 200 })
}
