import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { InquiryForm } from '@/lib/models'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, phone, company, message } = body

    if (!firstName || !lastName || !email || !phone || !message) {
      return NextResponse.json(
        { error: 'All required fields must be filled' },
        { status: 400 }
      )
    }

    const client = await clientPromise
    const db = client.db('canosolutions')
    const collection = db.collection<InquiryForm>('inquiries')

    const inquiry: InquiryForm = {
      firstName,
      lastName,
      email,
      phone,
      company: company || '',
      message,
      createdAt: new Date(),
      status: 'new'
    }

    const result = await collection.insertOne(inquiry)

    return NextResponse.json({
      success: true,
      message: 'Inquiry submitted successfully',
      id: result.insertedId
    })
  } catch (error) {
    console.error('Error saving inquiry:', error)
    return NextResponse.json(
      { error: 'Failed to submit inquiry' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db('canosolutions')
    const collection = db.collection<InquiryForm>('inquiries')

    const inquiries = await collection
      .find({})
      .sort({ createdAt: -1 })
      .toArray()

    return NextResponse.json(inquiries)
  } catch (error) {
    console.error('Error fetching inquiries:', error)
    return NextResponse.json(
      { error: 'Failed to fetch inquiries' },
      { status: 500 }
    )
  }
}