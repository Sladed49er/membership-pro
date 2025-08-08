import 'dotenv/config'
import { put, list } from '@vercel/blob'

async function testBlob() {
  try {
    console.log('🔄 Testing blob storage...')
    
    // Check if token exists
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      console.error('❌ BLOB_READ_WRITE_TOKEN not found in environment variables')
      return
    }
    
    console.log('✅ Blob token found')
    
    // Upload a test file
    const blob = await put('test-file.txt', 'Hello from MembershipPro!', {
      access: 'public',
    })
    console.log('✅ File uploaded:', blob.url)
    
    // List files
    const { blobs } = await list()
    console.log(`📊 Total files in storage: ${blobs.length}`)
    
    if (blobs.length > 0) {
      console.log('📁 Recent files:')
      blobs.slice(0, 3).forEach(b => {
        console.log(`  - ${b.pathname} (${b.size} bytes)`)
      })
    }
    
  } catch (error) {
    console.error('❌ Blob storage error:', error.message)
  }
}

testBlob()
