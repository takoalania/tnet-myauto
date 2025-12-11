export const buildMansNModels = (
  mans: string[],
  modelIds: Record<string, string[]>
): string => {
  if (!mans || mans.length === 0) return "";

  return mans
    .map((manId) => {
      const models = modelIds[manId];

      if (!models || models.length === 0) {
        return manId;
      }

      return `${manId}.${models.join(".")}`;
    })
    .join("-");
};
