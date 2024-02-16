export function truncateString(input: string, maxLength: number, showLength: number): string {
    if (input.length <= maxLength) {
      return input;
    }
  
    // Truncate the string to showLength characters
    const truncatedString = input.substring(0, showLength);
  
    // Append '...' at the end
    return truncatedString + '...';
  }
  
  