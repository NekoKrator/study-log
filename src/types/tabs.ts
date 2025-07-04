export interface TabConfig {
  value: string;
  label: string;
  content: React.ReactNode;
}

export interface AutoTabProps {
  defaultValue: string;
  tabs: TabConfig[];
}

export interface StudyEntry {
  date: string;
  content: string;
  wordCount: number;
}

export interface TodayTabProps {
  entries: StudyEntry[];
  setEntries: React.Dispatch<React.SetStateAction<StudyEntry[]>>;
}