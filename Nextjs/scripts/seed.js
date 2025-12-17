const { MongoClient } = require('mongodb')
const bcrypt = require('bcryptjs')

const MONGODB_URI = 'mongodb+srv://Cano:ChhxF5kcjmvXblVK@cluster0.ze01tlz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const DB_NAME = 'canosolutions'

async function seedDatabase() {
  const client = new MongoClient(MONGODB_URI)
  
  try {
    await client.connect()
    console.log('Connected to MongoDB')
    
    const db = client.db(DB_NAME)
    
    // Create default admin user
    const adminEmail = 'admin@canosolutions.com'
    const existingAdmin = await db.collection('users').findOne({ email: adminEmail })
    
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('admin123', 12)
      
      const adminUser = {
        name: 'System Administrator',
        email: adminEmail,
        password_hash: hashedPassword,
        role: 'super_admin',
        status: 'active',
        schools: [],
        assigned_schools: [],
        created_at: new Date(),
        updated_at: new Date(),
        last_login: null,
        login_count: 0
      }
      
      await db.collection('users').insertOne(adminUser)
      console.log('✅ Default admin user created')
      console.log('Email: admin@canosolutions.com')
      console.log('Password: admin123')
    } else {
      console.log('ℹ️  Admin user already exists')
    }

    // Create test school admin user
    const schoolAdminEmail = 'school@test.com'
    const existingSchoolAdmin = await db.collection('users').findOne({ email: schoolAdminEmail })
    
    if (!existingSchoolAdmin) {
      // First create a test school
      const testSchool = {
        name: 'Test School',
        code: 'TEST001',
        address: {
          street: '123 Test Street',
          city: 'Test City',
          state: 'Test State',
          pincode: '123456'
        },
        region: 'Test Region',
        contact: {
          name: 'Test Principal',
          phone: '+91 9876543210',
          email: 'principal@test.com',
          designation: 'Principal'
        },
        assets_count: 0,
        active_tickets: 0,
        status: 'active',
        created_at: new Date(),
        updated_at: new Date()
      }
      
      const schoolResult = await db.collection('schools').insertOne(testSchool)
      
      const hashedPassword = await bcrypt.hash('test123', 12)
      
      const schoolAdminUser = {
        name: 'School Administrator',
        email: schoolAdminEmail,
        password_hash: hashedPassword,
        role: 'school_admin',
        status: 'active',
        schools: [schoolResult.insertedId.toString()],
        assigned_schools: [],
        created_at: new Date(),
        updated_at: new Date(),
        last_login: null,
        login_count: 0
      }
      
      await db.collection('users').insertOne(schoolAdminUser)
      console.log('✅ Test school admin user created')
      console.log('Email: school@test.com')
      console.log('Password: test123')
      console.log('School: Test School (TEST001)')
    } else {
      console.log('ℹ️  School admin user already exists')
    }
    
    // Create indexes
    await db.collection('users').createIndex({ email: 1 }, { unique: true })
    await db.collection('schools').createIndex({ code: 1 }, { unique: true })
    await db.collection('schools').createIndex({ region: 1, status: 1 })
    
    console.log('✅ Database indexes created')
    
  } catch (error) {
    console.error('❌ Seed error:', error)
  } finally {
    await client.close()
  }
}

seedDatabase()