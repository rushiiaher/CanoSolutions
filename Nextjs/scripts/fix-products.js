const { MongoClient, ObjectId } = require('mongodb');

async function fixProducts() {
  const client = new MongoClient(process.env.MONGODB_URI);
  
  try {
    await client.connect();
    const db = client.db('canosolutions');
    
    // Get all products
    const products = await db.collection('products').find({}).toArray();
    console.log('Found products:', products.length);
    
    for (const product of products) {
      console.log('Product:', product.name, 'Status:', product.status);
      
      // If product has status 'assigned' or 'in_service' but no school_id, we need to find which school it belongs to
      if ((product.status === 'assigned' || product.status === 'in_service') && !product.school_id) {
        console.log('  -> Product needs school assignment');
        
        // Check if there's a school_name field or similar
        if (product.school_name) {
          const school = await db.collection('schools').findOne({ name: product.school_name });
          if (school) {
            await db.collection('products').updateOne(
              { _id: product._id },
              { $set: { school_id: school._id } }
            );
            console.log('  -> Assigned to school:', school.name);
          }
        }
      }
    }
    
    console.log('Migration complete!');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
  }
}

fixProducts();
