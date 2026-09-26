import React from 'react'
import { useAuth } from '../context/AuthContext'
import { dbPromise } from '../config/indexedDB-config'
import { firestoreDb } from '../config/firebase-config'
import {collection, deleteDoc, doc, getDoc, setDoc} from "firebase/firestore"

export default function useSyncData() {
  const {user} = useAuth()
  const handleSyncing = async () => {
    // Handle Task Syncing
    if (!user && !navigator.onLine) {
       return 
    }

    const db = await dbPromise
    const allTasks = await db.getAll("tasks")

    for (const item of allTasks) {
      if (user) {

        if (item.userId === user.uid) {
            const docRef = doc(firestoreDb, "users", user.uid, "tasks", item.id)
         
            try {
              if (item.isDeleted) {
           await deleteDoc(docRef)
           await db.delete("tasks", item.id)
           continue   
           
  }

       
   
         const docSnap = await getDoc(docRef)

         if (docSnap.exists()) {
          const docData = docSnap.data()

          if (docData.lastModified > item.lastModified ) {
             await db.put("tasks", docData)
            console.log("Server data was newer : Conlict resolved")
             continue
          }
         }


                await setDoc(docRef, item)
                console.log("Tasks synced successfully")
            } catch (err) {
                console.log("An Error occured whilst syncing data", err)
            }
        }
      }
    }


     

  }
  return {handleSyncing}
}
