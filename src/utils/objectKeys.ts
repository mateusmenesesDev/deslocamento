export const changeObjectKeysToUperCase = (keys: Array<string>) => {
  const newKeys = keys.map((key) => {
    const word = key.split(/(?=[A-Z])/); // Separa as palavras pela mudança de maiúsculas
    const newKey = word
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    return newKey;
  });
  return newKeys;
};
