"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.preLoadProducts = void 0;
const Product_1 = require("../entities/Product");
const category_respository_1 = require("../repositories/category.respository");
const product_repository_1 = require("../repositories/product.repository");
const productsToPreLoad = [
    {
        name: "iPhone 16",
        price: 899,
        description: "Experience power and elegance with the iPhone 16: capture stunning moments with its dual-camera system, enjoy exceptional performance, and immerse yourself in a brilliant Liquid Retina display. Discover a world of possibilities in the palm of your hand!",
        image: "https://cms-images.mmst.eu/2rj3gcd43pmw/6MjYQHpYxPHTSwV50yctCW/fcc28abf39e95044a0fa0c302e403978/iPhone_16_neu.png?q=80",
        category: "Smartphones",
        stock: 10,
    },
    {
        name: "MacBook Air",
        price: 999,
        description: "Embrace efficiency and sophistication with the MacBook Air: lightweight design meets powerful performance, stunning Retina display brings your work to life, and all-day battery life keeps you productive wherever you go. Elevate your computing experience with the MacBook Air.",
        image: "https://cms-images.mmst.eu/2rj3gcd43pmw/1u3Wtip50I011JDgsIo7IW/19c24271a602929521cf095cc390258e/Brandshop_Titelbild.png?q=80",
        category: "Laptops",
        stock: 10,
    },
    {
        name: "iPad Pro",
        price: 799,
        description: "Unleash your creativity and productivity with the iPad Pro: powerful performance, stunning Liquid Retina display, and all-day battery life make the iPad Pro the perfect tool for work and play. Transform your ideas into reality with the iPad Pro.",
        image: "https://cms-images.mmst.eu/2rj3gcd43pmw/6pKK5L43pmtFCYWcXjFft3/acbba82d830b92d52d3c23ede92764c4/ipad_air__1_.png?q=80",
        category: "Tablets",
        stock: 10,
    },
    {
        name: "Apple Watch Series 6",
        price: 399,
        description: "Stay connected and healthy with the Apple Watch Series 6: track your workouts, monitor your health, and stay in touch with the people and information you care about most. Experience the future of health and wellness with the Apple Watch Series 6.",
        image: "https://cms-images.mmst.eu/2rj3gcd43pmw/6KNfNNSQADGE8CRu42TVPo/f8d36d89842f357aa87a16ece93ea8d9/brand-cat-dsk-tab-mob_apple_watch_wei__.png?q=80",
        category: "Watches",
        stock: 10,
    },
    {
        name: "AirPods Pro",
        price: 249,
        description: "Immerse yourself in sound with the AirPods Pro: active noise cancellation, transparency mode, and customizable fit make the AirPods Pro the perfect companion for music, calls, and everything in between. Elevate your audio experience with the AirPods Pro.",
        image: "https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MP_134183984?x=320&y=320&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=320&ey=320&align=center&resizesource&unsharp=1.5x1+0.7+0.02&cox=0&coy=0&cdx=320&cdy=320",
        category: "Headphones",
        stock: 10,
    },
    {
        name: "HomePod mini",
        price: 99,
        description: "Elevate your home audio experience with the HomePod mini: immersive sound, intelligent assistant, and smart home hub make the HomePod mini the perfect addition to your home. Enjoy a world of music, news, and more with the HomePod mini.",
        image: "https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_142947063?x=320&y=320&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=320&ey=320&align=center&resizesource&unsharp=1.5x1+0.7+0.02&cox=0&coy=0&cdx=320&cdy=320",
        category: "Accessories",
        stock: 10,
    },
];
// preLoadProducts.ts
const preLoadProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield product_repository_1.ProductRepository.find();
    if (!products.length) {
        const categories = yield category_respository_1.CategoryRepository.find();
        for (const p of productsToPreLoad) {
            const category = categories.find(c => c.name === p.category);
            if (!category) {
                console.error(`Category ${p.category} not found for product ${p.name}`);
                continue;
            }
            const product = new Product_1.Product();
            product.name = p.name;
            product.description = p.description;
            product.price = p.price;
            product.stock = p.stock;
            product.image = p.image;
            product.category = category;
            yield product_repository_1.ProductRepository.save(product);
        }
        console.log("Products preloaded");
    }
});
exports.preLoadProducts = preLoadProducts;
