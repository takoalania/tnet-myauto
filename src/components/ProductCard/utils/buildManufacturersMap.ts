type ManufacturersMap = Record<number | string, string>;

export function buildManufacturersMap(mans?: any[]): ManufacturersMap {
  if (!mans) return {};
  return mans.reduce<ManufacturersMap>((acc, m) => {
    acc[m.man_id] = m.man_name;
    return acc;
  }, {});
}
