import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    // Test connection
    await prisma.$connect()
    console.log('✅ Database connected successfully!')
    
    // Create a test entry
    const test = await prisma.testConnection.create({
      data: {
        message: `Connection test at ${new Date().toISOString()}`
      }
    })
    console.log('✅ Test entry created:', test)
    
    // Count entries
    const count = await prisma.testConnection.count()
    console.log(`✅ Total test entries: ${count}`)
    
  } catch (error) {
    console.error('❌ Database connection failed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
