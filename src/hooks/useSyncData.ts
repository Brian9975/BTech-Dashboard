
import { useAuth } from '../context/AuthContext'
import { dbPromise } from '../config/indexedDB-config'
import { firestoreDb } from '../config/firebase-config'
import { collection, deleteDoc, doc, getDoc, getDocs, setDoc} from "firebase/firestore"

export default function useSyncData() {
  const {user} = useAuth()
  const handleTaskSyncing = async () => {
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
            console.log("Server data was newer : Conflict resolved")
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

     
    try{
if (user) {
const serverRef = collection(firestoreDb, "users", user.uid, "tasks")
     const querySnapShot = await getDocs(serverRef)
    
    for (const docSnap of querySnapShot.docs) {
       const serverData = docSnap.data()
       if(serverData.userId === user.uid) {
       await db.put("tasks", serverData)
       alert("Pulled Data Successfully")
       }
    }
  }
  
  } catch (err) {
     alert(`An error occured while pulling data, ${err}`)
  }
  }
  return {handleTaskSyncing}
}
