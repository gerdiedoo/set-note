import 'react-native-url-polyfill/auto'
import { createClient } from '@supabase/supabase-js'
import AsyncStorage from "@react-native-async-storage/async-storage";


const DB_URL = process.env.EXPO_PUBLIC_DATABASE_URL;
const DB_ANON = process.env.EXPO_PUBLIC_DATABASE_ANON_KEY
export const supabase = createClient( DB_URL, DB_ANON, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
