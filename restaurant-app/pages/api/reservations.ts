import type { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../lib/prisma"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { userId, placeId, datetime, partySize, notes } = req.body

    if (!placeId || !datetime || !partySize) {
      res.status(400).json({ error: "placeId, datetime and partySize required" })
      return
    }

    try {
      const dt = new Date(datetime)
      const reservation = await prisma.reservation.create({
        data: {
          userId: userId ?? undefined,
          placeId,
          datetime: dt,
          partySize,
          notes
        }
      })

      res.status(201).json({ reservation })
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: "failed to create reservation" })
    }
    return
  }

  // GET: list recent reservations (basic)
  if (req.method === "GET") {
    try {
      const items = await prisma.reservation.findMany({ take: 50 })
      res.status(200).json({ items })
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: "failed to list reservations" })
    }
    return
  }

  res.setHeader("Allow", ["GET", "POST"])
  res.status(405).end(`Method ${req.method} Not Allowed`)
}

