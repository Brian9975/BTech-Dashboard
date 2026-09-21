import { openDB } from "idb";
export const dbPromise = openDB("btech-dash", 3, {
  upgrade(db) {
    db.createObjectStore("leads", { keyPath: "id" });
    db.createObjectStore("tasks", { keyPath: "id" });
    db.createObjectStore("scripts", {keyPath: "id", autoIncrement: true})
  },
});
