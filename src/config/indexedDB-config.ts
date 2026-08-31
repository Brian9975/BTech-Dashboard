import { openDB } from "idb";
export const dbPromise = openDB("btech-dash", 1, {
  upgrade(db) {
    db.createObjectStore("leads", { keyPath: "id" });
  },
});
