import { openDB } from "idb";
export let dbPromise = openDB("btech-dash", 4, {
  upgrade(db) {
    db.createObjectStore("leads", { keyPath: "id" });
    db.createObjectStore("tasks", { keyPath: "id" });
    db.createObjectStore("scripts", {keyPath: "id"})
  },
});

export const getDb = async () => {
  try {
    const db = await dbPromise
    db.transaction("leads", "readonly").done
    return db
  } catch {
    dbPromise = openDB("btech-dash", 4, {
  upgrade(db) {
    db.createObjectStore("leads", { keyPath: "id" });
    db.createObjectStore("tasks", { keyPath: "id" });
    db.createObjectStore("scripts", {keyPath: "id"})
    return dbPromise
  },

});


  }
}