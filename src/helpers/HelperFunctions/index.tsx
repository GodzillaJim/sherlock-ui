export function getEnumAsArray(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  enumObj: any
): { label: string; value: string | number }[] {
  const enumArray = [];

  for (const key in enumObj) {
    if (isNaN(Number(key))) {
      const value = enumObj[key];

      enumArray.push({
        label: key,
        value: typeof value === "string" ? value : value.toString(),
      });
    }
  }

  return enumArray;
}
