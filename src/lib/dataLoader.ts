import { ref, getDownloadURL } from "firebase/storage";
import Papa from "papaparse";
import { storage } from "../firebase";

export interface CSVRow {
  Date: string;
  Subsystem: string;
  Group: string;
  Entropy: number;
  Nakamoto: number;
  Gini: number;
  HHI: number;
  Count: number;
}

export async function fetchCSV(filename: string): Promise<CSVRow[]> {
  try {
    const fileRef = ref(storage, filename);
    const url = await getDownloadURL(fileRef);
    
    console.log(`Fetching from URL: ${url}`);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch ${filename}: ${response.status}`);
    }
    
    const csvText = await response.text();
    
    console.log(`CSV text length: ${csvText.length} characters`);
    
    const result = Papa.parse<CSVRow>(csvText, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true
    });
    
    console.log(`Parsed ${result.data.length} rows`);
    if (result.errors.length > 0) {
      console.log('Parse errors:', result.errors);
    }
    
    return result.data;
  } catch (error) {
    console.error(`Error fetching ${filename}:`, error);
    throw error;
  }
}