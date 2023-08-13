import { connectToDB } from '@utils/database'
import { RegYears } from '@models/reg_years'

export const GET = async req => {
  try {
    await connectToDB()

    const regYears = await RegYears.find({})

    const collectionName = RegYears.collection.name

    return new Response(JSON.stringify(regYears), { status: 200 })
  } catch (error) {
    return new Response('Failed to fetch all brands', { status: 500 })
  }
}
