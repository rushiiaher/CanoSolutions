import { NextRequest, NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

export const dynamic = 'force-dynamic';

const client = new MongoClient(process.env.MONGODB_URI!);

export async function GET() {
  try {
    await client.connect();
    const db = client.db('canosolutions');
    
    const tickets = await db.collection('tickets')
      .find({})
      .sort({ created_at: -1 })
      .toArray();

    return NextResponse.json(tickets);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch tickets' },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    await client.connect();
    const db = client.db('canosolutions');

    const ticket = {
      ticket_number: 'TKT-' + Date.now(),
      school_name: data.school_name,
      contact_person: data.contact_person,
      contact_email: data.contact_email,
      contact_phone: data.contact_phone,
      issue_category: data.issue_category,
      priority: data.priority || 'P3',
      title: data.title,
      description: data.description,
      status: 'new',
      created_at: new Date(),
      updated_at: new Date()
    };

    const result = await db.collection('tickets').insertOne(ticket);

    return NextResponse.json({
      success: true,
      ticket_id: result.insertedId,
      ticket_number: ticket.ticket_number
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create ticket' },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}