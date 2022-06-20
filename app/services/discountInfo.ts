import { doc, getDoc } from '@firebase/firestore'
import { db } from '../firebase'

export async function getDiscountPoints (businessUid: string, discountUid: string): Promise<number> {
  const docRef = doc(db, 'businesses', businessUid, 'discounts', discountUid)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return (docSnap.data().points)
  } else {
    return -1 // document doesn't exist
  }
}
