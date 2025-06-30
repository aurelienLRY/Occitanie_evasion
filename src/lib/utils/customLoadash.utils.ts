/**
 * Get nested value from object using dot notation
 * @param obj - The object to search in
 * @param path - The path to the property (e.g., "user.address.street")
 * @returns The value at the path or undefined
 */
export const getNestedValue = (obj: Record<string, unknown>, path: string): unknown => {
  if (!obj || !path) return undefined;
  
  return path.split('.').reduce((current, key) => {
    return current && typeof current === 'object' && current !== null && key in current 
      ? (current as Record<string, unknown>)[key] 
      : undefined;
  }, obj as unknown);
}; 