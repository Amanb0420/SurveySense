import nlp from 'compromise';
import { string } from 'zod';

// Define the function for extracting the top 2 nouns
const commonWords = ['i', 'the', 'a', 'an', 'and', 'in', 'of', 'to', 'is', 'it', 'you', 'that', 'was', 'for', 'on', 'are', 'with', 'as', 'his', 'they', 'at', 'be', 'this', 'from', 'or', 'one', 'had', 'by', 'but', 'not', 'what', 'about', 'which', 'their', 'when', 'there', 'can', 'out', 'other', 'if', 'up', 'use', 'your', 'how', 'said', 'her', 'all', 'no', 'go', 'so', 'will', 'time', 'any', 'then', 'them', 'write', 'would', 'like', 'make', 'see', 'these', 'into', 'two', 'has', 'look', 'more', 'number', 'sound', 'no', 'could', 'who', 'my', 'than', 'first', 'water', 'way', 'even', 'new', 'want', 'because', 'anything', 'some', 'come', 'could', 'now', 'find', 'day', 'call', 'did', 'get', 'next', 'man', 'long', 'made', 'may', 'people', 'may', 'take', 'part', 'good', 'over', 'think', 'year', 'also', 'great', 'place', 'work', 'well', 'back', 'side', 'been', 'ask', 'leave', 'mean', 'many', 'find', 'help', 'turn', 'line', 'through', 'us'];

// export function extractTopNouns(text: string): string {
//   // Count the frequency of each noun
//   const nounCounts: { [key: string]: number } = {};
//   const nounsArr: string[] = extractNouns(text);

//   // Filter out common words, punctuation, and empty strings after trimming
//   const filteredNouns: string[] = nounsArr.filter(noun => {
//     const trimmedNoun = noun.trim();
//     // Parse the noun using Compromise to access its tags
//     const parsedNoun = nlp(noun);
//     // Check if the noun is not empty, not a common word, and not too short
//     if (trimmedNoun && !commonWords.includes(trimmedNoun) && trimmedNoun.length > 2) {
//         // Check if the noun is preceded by specific adjectives or verbs
//         if (parsedNoun.has('#Adjective') || parsedNoun.has('#Verb')) {
//             return true;
//         }
//     }
//     return false;
// });

//   for (const noun of filteredNouns) {
//     const trimmedNoun = noun.trim();
//     if (trimmedNoun.length > 0) {
//       if (nounCounts[trimmedNoun] === undefined) {
//         nounCounts[trimmedNoun] = 0;
//       }
//       nounCounts[trimmedNoun]++;
//     }
//   }

//   // Get the top 2 most common nouns
//   const sortedNounCounts = Object.entries(nounCounts).sort((a, b) => b[1] - a[1]);
//   const topNouns = sortedNounCounts.slice(0, 2);

//   // Return the top 2 nouns as a string
//   return topNouns.map(([noun]) => noun).join(', ');
// }

export function extractTopNouns(text: string): string {
  // Count the frequency of each noun
  const nounCounts: { [key: string]: number } = {};
  const nounsArr: string[] = extractNouns(text);

  // Filter out common words, punctuation, and empty strings after trimming
  const filteredNouns: string[] = nounsArr.filter(noun => {
    const trimmedNoun = noun.trim();
    // Parse the noun using Compromise to access its tags
    const parsedNoun = nlp(noun);
    // Check if the noun is not empty, not a common word, and not too short
    if (trimmedNoun && !commonWords.includes(trimmedNoun) && trimmedNoun.length > 2) {
        // Check if the noun is preceded by specific adjectives or verbs
        if (parsedNoun.has('#Adjective') || parsedNoun.has('#Verb')) {
            return true;
        }
    }
    return false;
});

  for (const noun of filteredNouns) {
    const trimmedNoun = noun.trim();
    if (trimmedNoun.length > 0) { // Add this check to ensure the noun is not an empty string
      if (nounCounts[trimmedNoun] === undefined) {
        nounCounts[trimmedNoun] = 0;
      }
      nounCounts[trimmedNoun]++;
    }
  }

  // Get the top 2 most common nouns
  const sortedNounCounts = Object.entries(nounCounts).sort((a, b) => b[1] - a[1]);
  const topNouns = sortedNounCounts.slice(0, 2);

  // Return the top 2 nouns as a string
  return topNouns.map(([noun]) => noun).join(', ');
}

function extractNouns(text: string): string[] {
  const doc = nlp(text);
  const nouns = doc.nouns().out('array').slice(1).map((noun: string) => noun.trim()) as string[];
  // Filter out empty strings
  return nouns.filter(noun => noun.length > 0);
}