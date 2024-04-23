import 'dotenv/config'
import { list, del } from "@vercel/blob";

const {
    BLOB_READ_WRITE_TOKEN
} = process.env;

async function deleteAllBlobs() {
  try {
    // List all blobs
    let hasMore = true;
    let cursor;

    while (hasMore) {
      const { blobs, cursor: newCursor, hasMore: newHasMore } = await list({ 
        token: BLOB_READ_WRITE_TOKEN, 
        cursor 
      });

      // Delete each blob
      for (const blob of blobs) {
        await del(blob.url, { token: BLOB_READ_WRITE_TOKEN });
        console.log(`Deleted blob: ${blob.pathname}`);
      }

      cursor = newCursor;
      hasMore = newHasMore;
    }

    console.log('All blobs have been deleted.');
  } catch (error) {
    console.error('Error deleting blobs:', error);
  }
}

deleteAllBlobs();
