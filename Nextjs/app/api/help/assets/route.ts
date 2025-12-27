import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { getDatabase } from '@/lib/db-utils';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const school_id = searchParams.get('school_id');

    if (!school_id) {
      return NextResponse.json(
        { success: false, error: 'School ID is required' },
        { status: 400 }
      );
    }

    const db = await getDatabase();

    console.log('Fetching assets for school_id:', school_id);

    // Query assets collection (not products) - assets link products to schools
    const assets = await db.collection('assets')
      .aggregate([
        {
          $match: {
            school_id: school_id
          }
        },
        {
          $lookup: {
            from: 'products',
            let: { productId: '$product_id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $or: [
                      { $eq: ['$_id', { $toObjectId: '$$productId' }] },
                      { $eq: [{ $toString: '$_id' }, '$$productId'] }
                    ]
                  }
                }
              }
            ],
            as: 'product'
          }
        },
        {
          $addFields: {
            product: { $arrayElemAt: ['$product', 0] }
          }
        }
      ])
      .toArray();

    console.log('Found assets:', assets.length);

    return NextResponse.json({
      success: true,
      data: assets.map(asset => ({
        _id: asset._id.toString(),
        name: asset.product?.name || 'Unknown',
        category: asset.product?.category || 'Hardware',
        asset_tag: asset.asset_code || asset.product?.product_code || 'N/A'
      }))
    });
  } catch (error) {
    console.error('Error fetching assets:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch assets' },
      { status: 500 }
    );
  }
}
