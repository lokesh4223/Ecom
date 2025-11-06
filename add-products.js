// Script to add sample products to Firestore
// Run this script using Node.js with Firebase Admin SDK

const admin = require('firebase-admin');
const serviceAccount = require('./service-account-key.json'); // You'll need to create this file

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ecommerce-b415f.firebaseio.com"
});

const db = admin.firestore();

async function addSampleProducts() {
  const sampleProductTemplates = [
    {
      name: 'Classic Aviator Sunglasses',
      brand: 'Ray-Ban',
      price: 14999,
      maxQuantity: 50,
      description: 'Classic aviator sunglasses with metal frame and green lenses. Perfect for sunny days and stylish look.',
      keywords: ['sunglasses', 'aviator', 'ray-ban', 'metal', 'green'],
      sizes: ['S', 'M', 'L'],
      isFeatured: true,
      isRecommended: true,
      availableColors: ['Gold', 'Silver', 'Black']
    },
    {
      name: 'Round Frame Glasses',
      brand: 'Quay',
      price: 8999,
      maxQuantity: 30,
      description: 'Trendy round frame glasses with unique design. Perfect for adding a vintage touch to your look.',
      keywords: ['glasses', 'round', 'quay', 'vintage', 'trendy'],
      sizes: ['S', 'M'],
      isFeatured: true,
      isRecommended: false,
      availableColors: ['Black', 'Tortoise', 'Gold']
    },
    {
      name: 'Sport Performance Glasses',
      brand: 'Oakley',
      price: 19999,
      maxQuantity: 25,
      description: 'High-performance sport glasses with anti-fog lenses and comfortable fit for all-day wear.',
      keywords: ['glasses', 'sport', 'oakley', 'performance', 'anti-fog'],
      sizes: ['S', 'M', 'L'],
      isFeatured: false,
      isRecommended: true,
      availableColors: ['Black', 'Red', 'Blue']
    },
    {
      name: 'Designer Reading Glasses',
      brand: 'Gucci',
      price: 29999,
      maxQuantity: 20,
      description: 'Luxury designer reading glasses with premium materials and elegant design.',
      keywords: ['glasses', 'reading', 'gucci', 'luxury', 'designer'],
      sizes: ['S', 'M'],
      isFeatured: true,
      isRecommended: true,
      availableColors: ['Gold', 'Black', 'Tortoise']
    },
    {
      name: 'Kids Sunglasses',
      brand: 'Babiators',
      price: 4999,
      maxQuantity: 40,
      description: 'Fun and durable sunglasses designed specifically for kids with UV protection.',
      keywords: ['sunglasses', 'kids', 'babiators', 'uv', 'protection'],
      sizes: ['S'],
      isFeatured: false,
      isRecommended: false,
      availableColors: ['Blue', 'Pink', 'Red', 'Green']
    },
    {
      name: 'Blue Light Blocking Glasses',
      brand: 'Felix Gray',
      price: 12999,
      maxQuantity: 35,
      description: 'Protect your eyes from blue light with these stylish glasses perfect for computer use.',
      keywords: ['glasses', 'blue light', 'felix gray', 'computer', 'protection'],
      sizes: ['S', 'M', 'L'],
      isFeatured: true,
      isRecommended: true,
      availableColors: ['Black', 'Silver', 'Blue']
    },
    {
      name: 'Cat Eye Sunglasses',
      brand: 'Quay',
      price: 7999,
      maxQuantity: 30,
      description: 'Stylish cat eye sunglasses with UV protection and comfortable fit.',
      keywords: ['sunglasses', 'cat eye', 'quay', 'stylish', 'uv'],
      sizes: ['S', 'M'],
      isFeatured: true,
      isRecommended: false,
      availableColors: ['Black', 'Tortoise', 'Pink']
    },
    {
      name: 'Polarized Driving Glasses',
      brand: 'Maui Jim',
      price: 24999,
      maxQuantity: 25,
      description: 'Premium polarized glasses designed for driving with superior clarity and glare reduction.',
      keywords: ['glasses', 'polarized', 'maui jim', 'driving', 'premium'],
      sizes: ['S', 'M', 'L'],
      isFeatured: false,
      isRecommended: true,
      availableColors: ['Brown', 'Black', 'Green']
    }
  ];

  // Generate 40 products from the templates
  const products = [];
  for (let i = 0; i < 40; i++) {
    const template = sampleProductTemplates[i % sampleProductTemplates.length];
    products.push({
      ...template,
      name: `${template.name} #${i + 1}`,
      dateAdded: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)).toISOString(),
      name_lower: `${template.name.toLowerCase()} #${i + 1}`
    });
  }

  try {
    console.log('Adding 40 sample products to Firestore...');
    
    // Add 40 products
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      const docRef = db.collection('products').doc();
      
      // Add image URLs
      const imageUrls = [
        'https://firebasestorage.googleapis.com/v0/b/ecommerce-b415f.appspot.com/o/static%2Fsalt-image-1.png?alt=media',
        'https://firebasestorage.googleapis.com/v0/b/ecommerce-b415f.appspot.com/o/static%2Fsalt-image-2.png?alt=media',
        'https://firebasestorage.googleapis.com/v0/b/ecommerce-b415f.appspot.com/o/static%2Fsalt-image-3.png?alt=media',
        'https://firebasestorage.googleapis.com/v0/b/ecommerce-b415f.appspot.com/o/static%2Fsalt-image-4.png?alt=media',
        'https://firebasestorage.googleapis.com/v0/b/ecommerce-b415f.appspot.com/o/static%2Fsalt-image-5.png?alt=media',
        'https://firebasestorage.googleapis.com/v0/b/ecommerce-b415f.appspot.com/o/static%2Fsalt-image-7.png?alt=media',
        'https://firebasestorage.googleapis.com/v0/b/ecommerce-b415f.appspot.com/o/static%2Fsalt-image-10.png?alt=media'
      ];
      
      product.image = imageUrls[i % imageUrls.length];
      product.imageCollection = [{ id: docRef.id, url: imageUrls[i % imageUrls.length] }];
      
      // Add product to Firestore
      await docRef.set(product);
      console.log(`Added product: ${product.name}`);
    }
    
    console.log('Successfully added 40 sample products!');
  } catch (error) {
    console.error('Error adding products:', error);
  } finally {
    // Exit the process
    process.exit(0);
  }
}

// Run the function
addSampleProducts();