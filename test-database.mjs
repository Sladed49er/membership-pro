import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    // Test connection
    console.log('🔄 Testing database connection...')
    
    // Create a test user
    const user = await prisma.user.create({
      data: {
        email: `test-${Date.now()}@example.com`,
        name: 'Test User'
      }
    })
    console.log('✅ Created user:', user)
    
    // Create a test connection record
    const testConnection = await prisma.testConnection.create({
      data: {
        message: `Connection successful at ${new Date().toISOString()}`
      }
    })
    console.log('✅ Test connection:', testConnection)
    
    // Count records
    const userCount = await prisma.user.count()
    const connectionCount = await prisma.testConnection.count()
    
    console.log(`📊 Total users: ${userCount}`)
    console.log(`📊 Total test connections: ${connectionCount}`)
    
  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
