import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { PERISTER_THROTTLE_TIME } from './constants';
import { QUERY_PERSISTER_KEY } from './keys';

const QUERY_DB_NAME = 'searchpic-query-db';
const QUERY_STORE_NAME = 'react-query';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(QUERY_DB_NAME, 1);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    request.onupgradeneeded = (e) => {
      (e.target as IDBOpenDBRequest).result.createObjectStore(QUERY_STORE_NAME);
    };
  });
}

function getItem(key: string): Promise<string | null> {
  return openDB().then(
    (db) =>
      new Promise((resolve, reject) => {
        const transaction = db.transaction(QUERY_STORE_NAME, 'readonly');
        const store = transaction.objectStore(QUERY_STORE_NAME);
        const request = store.get(key);

        request.onerror = () => {
          db.close();
          reject(request.error);
        };
        request.onsuccess = () => {
          db.close();
          resolve(request.result ?? null);
        };
      })
  );
}

function setItem(key: string, value: string): Promise<void> {
  return openDB().then(
    (db) =>
      new Promise((resolve, reject) => {
        const transaction = db.transaction(QUERY_STORE_NAME, 'readwrite');
        const store = transaction.objectStore(QUERY_STORE_NAME);
        const request = store.put(value, key);

        request.onerror = () => {
          db.close();
          reject(request.error);
        };
        request.onsuccess = () => {
          db.close();
          resolve();
        };
      })
  );
}

function removeItem(key: string): Promise<void> {
  return openDB().then(
    (db) =>
      new Promise((resolve, reject) => {
        const transaction = db.transaction(QUERY_STORE_NAME, 'readwrite');
        const store = transaction.objectStore(QUERY_STORE_NAME);
        const request = store.delete(key);

        request.onerror = () => {
          db.close();
          reject(request.error);
        };
        request.onsuccess = () => {
          db.close();
          resolve();
        };
      })
  );
}

const idbStorage = {
  getItem,
  setItem,
  removeItem,
};

export const asyncStoragePersister = createAsyncStoragePersister({
  storage: idbStorage,
  key: QUERY_PERSISTER_KEY,
  throttleTime: PERISTER_THROTTLE_TIME,
});
