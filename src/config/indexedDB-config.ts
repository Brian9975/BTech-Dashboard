import { openDB } from "idb";
export const dbPromise = openDB("btech-dash", 2, {
  upgrade(db) {
    db.createObjectStore("leads", { keyPath: "id" });
    db.createObjectStore("tasks", { keyPath: "id" });
  },
});
