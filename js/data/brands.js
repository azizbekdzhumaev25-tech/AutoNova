// Placeholder: brands.js
/* ========================================
   AutoNova - Brands Data
   База данных брендов
   ======================================== */

const BrandsDB = {
    brands: [
        { id: 1, name: 'AutoPremium', slug: 'autopremium', productsCount: 142 },
        { id: 2, name: 'EVACar',      slug: 'evacar',      productsCount: 89 },
        { id: 3, name: 'UniMat',      slug: 'unimat',      productsCount: 56 },
        { id: 4, name: 'EcoCover',    slug: 'ecocover',    productsCount: 120 },
        { id: 5, name: 'SportSeat',   slug: 'sportseat',   productsCount: 34 },
        { id: 6, name: 'VisionDash',  slug: 'visiondash',  productsCount: 78 },
        { id: 7, name: 'RadarPro',    slug: 'radarpro',    productsCount: 45 },
        { id: 8, name: 'MediaNavi',   slug: 'medianavi',   productsCount: 67 },
        { id: 9, name: 'LumosLED',    slug: 'lumosled',    productsCount: 231 },
        { id: 10, name: 'OffroadLight', slug: 'offroadlight', productsCount: 92 },
        { id: 11, name: 'ShineCare',   slug: 'shinecare',   productsCount: 154 },
        { id: 12, name: 'TunePro',     slug: 'tunepro',     productsCount: 43 }
    ],

    getAll() {
        return this.brands;
    },

    getById(id) {
        return this.brands.find(b => b.id === parseInt(id)) || null;
    },

    getBySlug(slug) {
        return this.brands.find(b => b.slug === slug) || null;
    },

    getPopular(limit = 10) {
        // Возвращаем бренды с наибольшим количеством товаров
        return [...this.brands]
            .sort((a, b) => b.productsCount - a.productsCount)
            .slice(0, limit);
    }
};

// Экспорт
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BrandsDB;
}
