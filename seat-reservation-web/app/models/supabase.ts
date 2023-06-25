import { createClient } from '@supabase/supabase-js';
import * as process from 'process';
import { Database } from './database.types';

export default createClient<Database>(
  process.env.SUPARBASE_URL as string,
  process.env.SUPARBASE_ANON_KEY as string,
);
