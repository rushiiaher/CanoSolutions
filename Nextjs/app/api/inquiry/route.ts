import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db-utils';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, phone, company, service, message } = await request.json();

    if (!firstName || !lastName || !email || !phone || !service || !message) {
      return NextResponse.json(
        { error: 'All required fields must be filled' },
        { status: 400 }
      );
    }

    const db = await getDatabase();

    const inquiry = {
      firstName,
      lastName,
      email,
      phone,
      company: company || '',
      service,
      message,
      createdAt: new Date(),
      status: 'new'
    };

    const result = await db.collection('inquiries').insertOne(inquiry);

    return NextResponse.json({
      success: true,
      message: 'Inquiry submitted successfully',
      id: result.insertedId
    });
  } catch (error) {
    console.error('Error saving inquiry:', error);
    return NextResponse.json(
      { error: 'Failed to submit inquiry' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const db = await getDatabase();

    const inquiries = await db.collection('inquiries')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ success: true, data: inquiries });
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch inquiries' },
      { status: 500 }
    );
  }
}