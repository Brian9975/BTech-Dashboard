import { useAuth } from "../context/AuthContext";
import { getDb } from "../config/indexedDB-config";
import { firestoreDb } from "../config/firebase-config";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import type { TaskInterface } from "../types/TasksInterface";
import { useTask } from "../context/TaskContext";
import { useLead } from "../context/LeadContext";
import { useScript } from "../context/ScriptContext";
import { useTheme } from "../context/ThemeContext";
import type { LeadsInterface } from "../types/LeadsInterface";
import type { ScriptData } from "../types/ScriptInterface";

export default function useSyncData() {
  const {setSyncLoading} = useTheme()
  
  const { user } = useAuth();
  const { setLeads } = useLead();
  const { setTasks } = useTask();
  const { setScripts } = useScript();
  const handleTaskSyncing = async () => {
    // Handle Task Syncing
    if (!user) {
      return;
    }

    const db = await getDb();
    const allTasks = await db?.getAll("tasks");

    for (const item of allTasks as TaskInterface[]) {
      if (user) {
        if (item.userId === user.uid) {
          const docRef = doc(firestoreDb, "users", user.uid, "tasks", item.id);

          try {
            if (item.isDeleted) {
              await deleteDoc(docRef);
              await db?.delete("tasks", item.id);
              continue;
            }

            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
              const docData = docSnap.data();

              if (docData.lastModified > item.lastModified) {
                await db?.put("tasks", docData);
                // console.log("Server data was newer : Conflict resolved");
                continue;
              }
            }

            await setDoc(docRef, item);

            // console.log("Tasks synced successfully");
          } catch (err) {
            // console.log("An Error occured whilst syncing data");
          }
        }
      }
    }

    //  Pulling from Cloud Functionality
    try {
      if (user) {
        const serverRef = collection(firestoreDb, "users", user.uid, "tasks");
        const querySnapShot = await getDocs(serverRef);

        for (const docSnap of querySnapShot.docs) {
          const serverData = docSnap.data();
          const localData = await db?.get("tasks", serverData.id)
          if (serverData.userId === user.uid) {
            if (!localData || serverData.lastModified > localData.lastModified) {

              await db?.put("tasks", serverData);
              // console.log("Pulled Task Data Successfully");
            }
          }
          const pulledTasks = await db?.getAll("tasks");
          setTasks(pulledTasks as TaskInterface[]);
        }
      }
    } catch (err) {
      // console.log(`An error occured while pulling data`);
    }
  };

  const handleLeadSyncing = async () => {
    // Handle Task Syncing
    if (!user) {
      return;
    }

    const db = await getDb();
    const allLeads = await db?.getAll("leads");

    for (const item of allLeads as LeadsInterface[]) {
      if (user) {
        if (item.userId === user.uid) {
          const docRef = doc(firestoreDb, "users", user.uid, "leads", item.id);

          try {
            if (item.isDeleted) {
              await deleteDoc(docRef);
              await db?.delete("leads", item.id);
              continue;
            }

            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
              const docData = docSnap.data();

              if (docData.lastModified > item.lastModified) {
                await db?.put("leads", docData);
                // console.log("Server data was newer : Conflict resolved");
                continue;
              }
            }

            await setDoc(docRef, item);
            // console.log("Leads synced successfully");
          } catch (err) {
            // console.log("An Error occured whilst syncing data");
          }
        }
      }
    }

    try {
      if (user) {
        const serverRef = collection(firestoreDb, "users", user.uid, "leads");
        const querySnapShot = await getDocs(serverRef);

        for (const docSnap of querySnapShot.docs) {
          const serverData = docSnap.data();
          const localData = await db?.get("leads", serverData.id)
          if (serverData.userId === user.uid) {

              if (!localData || serverData.lastModified > localData.lastModified) {

                await db?.put("leads", serverData);
                // console.log("Pulled Lead Data Successfully");
              }
          }
          const updatedLeads = await db?.getAll("leads");
          setLeads(updatedLeads as LeadsInterface[]);
        }
      }
    } catch (err) {
      // console.log(`An error occured while pulling data, ${err}`);
    } 

    
  };

  const handleScriptSyncing = async () => {
    // Handle Task Syncing
    if (!user) {
      return;
    }

    const db = await getDb();
    const allScripts = await db?.getAll("scripts");

    for (const item of allScripts as ScriptData[]) {
      // if (user) {
        if (item.userId === user.uid) {
          const docRef = doc(
            firestoreDb,
            "users",
            user.uid,
            "scripts",
            item.id,
          );

          try {
            if (item.isDeleted) {
              await deleteDoc(docRef);
              await db?.delete("scripts", item.id);
              continue;
            }

            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
              const docData = docSnap.data();

              if (docData.lastModified > item.lastModified) {
                await db?.put("scripts", docData);
                // console.log("Server data was newer : Conflict resolved");
                continue;
              }
            }

            await setDoc(docRef, item);
            // console.log("Scripts synced successfully");
          } catch (err) {
            // console.log("An Error occured whilst syncing data");
          }
        }
      // }
    }

    try {
      if (user) {
        const serverRef = collection(firestoreDb, "users", user.uid, "scripts");
        const querySnapShot = await getDocs(serverRef);

        for (const docSnap of querySnapShot.docs) {
          const serverData = docSnap.data();
          const localData = await db?.get("scripts", serverData.id)
          
          if (serverData.userId === user.uid) {
             
            if (!localData || serverData.lastModified > localData.lastModified){

              await db?.put("scripts", serverData);
            }
            // console.log("Pulled Script Data Successfully");
          }
          const updatedScripts = await db?.getAll("scripts");
          setScripts(updatedScripts as ScriptData[]);
        }
      }
    } catch (err) {
      // console.log(`An error occured while pulling data`);
    }
  };

  const handleAllSync = async () => {
    if (!navigator.onLine) return
    try {
      
      await handleLeadSyncing();
      await handleTaskSyncing();
      await handleScriptSyncing();
      setSyncLoading(false)
      console.log("Sync complete");
    } catch (err: any) {
      console.log(`An error occured while syncing data!`)
    }
      
  };

  return { handleAllSync };
}
