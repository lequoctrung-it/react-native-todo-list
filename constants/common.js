import { getFirestore } from '@firebase/firestore'
import app from '../Fire'
export const db = getFirestore(app)