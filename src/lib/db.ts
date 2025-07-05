import Dexie, { type EntityTable } from 'dexie'
import type { StudyEntry } from '@/types/tabs'

export const db = new Dexie('EntriesDatabase') as Dexie & {
  entries: EntityTable<
    StudyEntry, 'id'>
}

db.version(1).stores({
  entries: '++id, date, content, wordCount'
})

