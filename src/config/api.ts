const API_BASE = 'https://api2.myauto.ge/ka';
const STATIC_BASE = 'https://static.my.ge/myauto';

export const API_ENDPOINTS = {
    manufacturers: `${STATIC_BASE}/js/mans.json`,
    models: (manId: string) => `${API_BASE}/getManModels?man_id=${manId}`,
    categories: `${API_BASE}/cats/get`,
    products: `${API_BASE}/products`,
    count: `${API_BASE}/products/count`,
}

export const buildImageUrl = (photo: string, id: number, ver: number) =>
    `${STATIC_BASE}/photos/${photo}/thumbs/${id}_1.jpg?v=${ver}`