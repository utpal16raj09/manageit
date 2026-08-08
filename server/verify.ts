import { neon } from '@neondatabase/serverless';
import 'dotenv/config';

async function verify() {
  const sql = neon(process.env.DATABASE_URL!);
  const result = await sql`SELECT 1 as connected`;
  console.log("Neon connection verified!", result);
}

verify().catch(console.error);
