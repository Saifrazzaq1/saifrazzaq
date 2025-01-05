const canvas = document.getElementById('networkCanvas');
const ctx = canvas.getContext('2d');

// Resize canvas to full screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Adjust number of particles based on screen size
function getNumberOfParticles() {
  if (window.innerWidth <= 480) return 40; // Small screens (phones)
  if (window.innerWidth <= 768) return 60; // Medium screens (tablets)
  return 80; // Large screens
}

let numberOfParticles = getNumberOfParticles();

// Handle window resizing
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  numberOfParticles = getNumberOfParticles(); // Update particle count
  init(); // Reinitialize particles
});

// Particle class
class Particle {
  constructor(x, y) {
    this.x = x || Math.random() * canvas.width;
    this.y = y || Math.random() * canvas.height;
    this.size = 3; // Particle size
    this.speedX = Math.random() * 2 - 1; // Horizontal speed
    this.speedY = Math.random() * 2 - 1; // Vertical speed
  }

  // Update particle position
  update(mouse) {
    // Auto movement
    this.x += this.speedX;
    this.y += this.speedY;

    // Bounce particles off canvas edges
    if (this.x <= 0 || this.x >= canvas.width) this.speedX *= -1;
    if (this.y <= 0 || this.y >= canvas.height) this.speedY *= -1;

    // Cursor interaction
    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const maxDistance = 100; // Interaction radius

    if (distance < maxDistance) {
      const force = (maxDistance - distance) / maxDistance; // Interaction strength
      const directionX = dx / distance;
      const directionY = dy / distance;

      // Push particles away from the cursor
      this.x -= directionX * force * 10;
      this.y -= directionY * force * 10;
    }
  }

  // Draw particle
  draw() {
    ctx.fillStyle = '#00d9ff';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Particle array
let particlesArray = [];

// Mouse object to track cursor position
const mouse = {
  x: null,
  y: null,
};

window.addEventListener('mousemove', (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

window.addEventListener('mouseleave', () => {
  mouse.x = null;
  mouse.y = null;
});

// Initialize particles
function init() {
  particlesArray = [];
  for (let i = 0; i < numberOfParticles; i++) {
    particlesArray.push(new Particle());
  }
}

// Connect particles with lines
function connect() {
  for (let a = 0; a < particlesArray.length; a++) {
    for (let b = a + 1; b < particlesArray.length; b++) {
      const dx = particlesArray[a].x - particlesArray[b].x;
      const dy = particlesArray[a].y - particlesArray[b].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 100) {
        const opacity = 1 - distance / 100;
        ctx.strokeStyle = `rgba(0, 217, 255, ${opacity})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
        ctx.stroke();
      }
    }
  }
}

// Animation loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particlesArray.forEach((particle) => {
    particle.update(mouse);
    particle.draw();
  });

  connect();
  requestAnimationFrame(animate);
}

// Start
init();
animate();


// const canvas = document.getElementById('networkCanvas');
// const ctx = canvas.getContext('2d');

// // Resize canvas to full screen
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

// window.addEventListener('resize', () => {
//   canvas.width = window.innerWidth;
//   canvas.height = window.innerHeight;
//   init();
// });

// // Particle class
// class Particle {
//   constructor(x, y) {
//     this.x = x || Math.random() * canvas.width;
//     this.y = y || Math.random() * canvas.height;
//     this.size = 3; // Particle size
//     this.speedX = Math.random() * 2 - 1; // Horizontal speed
//     this.speedY = Math.random() * 2 - 1; // Vertical speed
//   }

//   // Update particle position
//   update(mouse) {
//     // Auto movement
//     this.x += this.speedX;
//     this.y += this.speedY;

//     // Bounce particles off canvas edges
//     if (this.x <= 0 || this.x >= canvas.width) this.speedX *= -1;
//     if (this.y <= 0 || this.y >= canvas.height) this.speedY *= -1;

//     // Cursor interaction
//     const dx = mouse.x - this.x;
//     const dy = mouse.y - this.y;
//     const distance = Math.sqrt(dx * dx + dy * dy);
//     const maxDistance = 100; // Interaction radius

//     if (distance < maxDistance) {
//       const force = (maxDistance - distance) / maxDistance; // Interaction strength
//       const directionX = dx / distance;
//       const directionY = dy / distance;

//       // Push particles away from the cursor
//       this.x -= directionX * force * 10;
//       this.y -= directionY * force * 10;
//     }
//   }

//   // Draw particle
//   draw() {
//     ctx.fillStyle = '#00d9ff';
//     ctx.beginPath();
//     ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
//     ctx.fill();
//   }
// }

// // Particle array
// let particlesArray = [];
// const numberOfParticles = 80;

// // Mouse object to track cursor position
// const mouse = {
//   x: null,
//   y: null,
// };

// window.addEventListener('mousemove', (event) => {
//   mouse.x = event.clientX;
//   mouse.y = event.clientY;
// });

// window.addEventListener('mouseleave', () => {
//   mouse.x = null;
//   mouse.y = null;
// });

// // Initialize particles
// function init() {
//   particlesArray = [];
//   for (let i = 0; i < numberOfParticles; i++) {
//     particlesArray.push(new Particle());
//   }
// }

// // Connect particles with lines
// function connect() {
//   for (let a = 0; a < particlesArray.length; a++) {
//     for (let b = a + 1; b < particlesArray.length; b++) {
//       const dx = particlesArray[a].x - particlesArray[b].x;
//       const dy = particlesArray[a].y - particlesArray[b].y;
//       const distance = Math.sqrt(dx * dx + dy * dy);

//       if (distance < 100) {
//         const opacity = 1 - distance / 100;
//         ctx.strokeStyle = `rgba(0, 217, 255, ${opacity})`;
//         ctx.lineWidth = 1;
//         ctx.beginPath();
//         ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
//         ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
//         ctx.stroke();
//       }
//     }
//   }
// }

// // Animation loop
// function animate() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);

//   particlesArray.forEach((particle) => {
//     particle.update(mouse);
//     particle.draw();
//   });

//   connect();
//   requestAnimationFrame(animate);
// }

// // Start
// init();
// animate();

// Lines to be "typed"
const lines = [
  "Hello, How are you?",
  "Welcome to my profile",
  "I'm  Muhammad Saif",
  "How can i help you?",
];

const typewriterElement = document.getElementById("typewriter");

// Typing effect function
function typeText(text, element, delay = 100) {
  return new Promise((resolve) => {
    let i = 0;
    const interval = setInterval(() => {
      element.textContent += text.charAt(i);
      i++;
      if (i === text.length) {
        clearInterval(interval);
        setTimeout(resolve, 1000); // Wait 1 second after typing finishes
      }
    }, delay);
  });
}

// Function to type each line sequentially and repeat
async function startTyping() {
  while (true) {
    for (const line of lines) {
      typewriterElement.textContent = ""; // Clear previous line
      await typeText(line, typewriterElement);
    }
  }
}

// Start the typing effect
startTyping();

// Get the cursor elements
const cursorOuter = document.getElementById("cursor-outer");
const cursorInner = document.getElementById("cursor-inner");

// Variable to track the delayed position for the outer cursor
let delayedPosition = { x: 0, y: 0 };

// Mouse move event to position the cursors
document.addEventListener("mousemove", (e) => {
  const { clientX, clientY } = e;

  // Move the inner cursor instantly
  cursorInner.style.left = `${clientX}px`;
  cursorInner.style.top = `${clientY}px`;

  // Update delayedPosition for the outer cursor after 3 seconds
  setTimeout(() => {
    delayedPosition = { x: clientX, y: clientY };
    cursorOuter.style.left = `${delayedPosition.x}px`;
    cursorOuter.style.top = `${delayedPosition.y}px`;
  }, 100); // 3-second delay
});

// Function to open the modal and show details
function openModal(projectId, title, technologies, imageUrl) {
  // Set the modal content dynamically
  document.getElementById('modalTitle').innerText = title;
  document.getElementById('modalTechnologies').innerText = technologies;
  document.getElementById('modalImage').src = imageUrl;

  // Display the modal
  document.getElementById('projectModal').style.display = "block";
}

// Function to close the modal
function closeModal() {
  document.getElementById('projectModal').style.display = "none";
}

// Close the modal when clicked outside of the modal content
window.onclick = function (event) {
  if (event.target === document.getElementById('projectModal')) {
    closeModal();
  }
}

const projects = [
  {
    id: 1,
    title: "Dar-e-Arqam School App",
    description: "The first Dar-e-Arqam School was established in Sargodha in 1990 Then, like-minded people gathered and spread the rays of knowledge in a very short time. These schools are progressing and increasing in number tremendously. Right now, The Dar-e-Arqam School is one of the largest growing school systems with more than 2,00,000 students and more than 700 branches all over Pakistan. This appreciation and recognition by the society are more because of its unique way of imparting modern education with Islamic perspective.",
    technologies: "React Native, Firebase, Laravel",
    associate: " Associate with PreeSoft Pvt Ltd.",
    playStoreLink: "https://play.google.com/store/apps/details?id=com.darearqam&pcampaignid=web_share",
    appStoreLink: "https://apps.apple.com/us/app/dar-e-arqam-schools/id6444527803",
    websiteLink: "https://darearqamsgd.edu.pk/",
    images: [
      'assets/img/portfolio/smsApp/0.png',
      'assets/img/portfolio/smsApp/1.png',
      'assets/img/portfolio/smsApp/2.png',
      'assets/img/portfolio/smsApp/3.png',
      'assets/img/portfolio/smsApp/4.png',
      'assets/img/portfolio/smsApp/5.png',
      'assets/img/portfolio/smsApp/6.png',
      'assets/img/portfolio/smsApp/7.png',
      'assets/img/portfolio/smsApp/8.png',
      'assets/img/portfolio/smsApp/9.png',
      'assets/img/portfolio/smsApp/10.png',
      'assets/img/portfolio/smsApp/11.png',
      'assets/img/portfolio/smsApp/12.png',
      'assets/img/portfolio/smsApp/13.png',
      'assets/img/portfolio/smsApp/14.png',
    ],
  },
  {
    id: 2,
    title: "Bright Vision E-commerce App",
    description: "This is conversion to mobile e-commerce app from WooCommerce Website. This app have all important features of e-commerce mobil application including add to cart, remove from cart, checkout billing information, select payment method and order confirmation details. This app have others features also like authentication, notifications, validations, check all orders, support team, contact details, complaints form, order details etc.",
    technologies: "React Native, WooCommerce APIs, WordPress",
    associate: " Associate with PreeSoft Pvt Ltd.",
    websiteLink:"https://brightvision.com.pk/",
    playStoreLink:"https://play.google.com/store/apps/details?id=com.brightvisione.commerce&pcampaignid=web_share",
    images: [
      'assets/img/portfolio/brightVisionApp/0.png',
      'assets/img/portfolio/brightVisionApp/1.png',
      'assets/img/portfolio/brightVisionApp/2.png',
      'assets/img/portfolio/brightVisionApp/3.png',
      'assets/img/portfolio/brightVisionApp/4.png',
      'assets/img/portfolio/brightVisionApp/5.png',
      'assets/img/portfolio/brightVisionApp/6.png',
      'assets/img/portfolio/brightVisionApp/7.png',
      'assets/img/portfolio/brightVisionApp/8.png',
      'assets/img/portfolio/brightVisionApp/9.png',
      'assets/img/portfolio/brightVisionApp/10.png',
      'assets/img/portfolio/brightVisionApp/11.png',
      'assets/img/portfolio/brightVisionApp/12.png',
      'assets/img/portfolio/brightVisionApp/13.png',
      'assets/img/portfolio/brightVisionApp/14.png',
      'assets/img/portfolio/brightVisionApp/15.png',
      'assets/img/portfolio/brightVisionApp/16.png',
      'assets/img/portfolio/brightVisionApp/17.png',
      'assets/img/portfolio/brightVisionApp/18.png',
      'assets/img/portfolio/brightVisionApp/19.png',

    ],
  },
  {
    id: 3,
    title: "GAWAPP: Connecting Coffee Shops and Coffee Lovers",
    description: "GAWAPP is an innovative mobile app built with React Native and Node.js, designed to connect coffee shops and coffee enthusiasts. For coffee shops, it offers features like profile management, menu customization, order handling, table reservations, promotions, and analytics. Coffee lovers can explore nearby cafes, place customized orders, reserve tables, share reviews, and connect socially. With real-time chat, geolocation, and secure payments, GAWAPP transforms the coffee experience by fostering seamless interactions and building a vibrant coffee community.",
    technologies: "React Native, Node js, Mongo DB, Firebase",
    associate: " Associate with Falcon Consulting.",
    websiteLink:"https://gawapp.com/",
    appStoreLink:"https://apps.apple.com/ae/app/gawapp/id6468561505",
    playStoreLink:"https://play.google.com/store/apps/details?id=com.gawapp&pcampaignid=web_share",
    images: [
      'assets/img/portfolio/GawApp/0.png',
      'assets/img/portfolio/GawApp/1.png',
      'assets/img/portfolio/GawApp/2.png',
      'assets/img/portfolio/GawApp/3.png',
      'assets/img/portfolio/GawApp/4.png',
      'assets/img/portfolio/GawApp/5.png',
      'assets/img/portfolio/GawApp/6.png',
      'assets/img/portfolio/GawApp/7.png',
      'assets/img/portfolio/GawApp/8.png',
      'assets/img/portfolio/GawApp/9.png',
      'assets/img/portfolio/GawApp/10.png',
      'assets/img/portfolio/GawApp/11.png',
      'assets/img/portfolio/GawApp/12.png',
      'assets/img/portfolio/GawApp/13.png',
      'assets/img/portfolio/GawApp/14.png',
      'assets/img/portfolio/GawApp/15.png',
      'assets/img/portfolio/GawApp/16.png',
      'assets/img/portfolio/GawApp/17.png',
      'assets/img/portfolio/GawApp/18.png',
      'assets/img/portfolio/GawApp/19.png',

    ],
  },
  {
    id: 4,
    title: "Ezy Event - Service Provider",
    description: "Ezy Event is your all-in-one event management app, designed to streamline everything from planning to execution. Effortlessly create events, book services like caterers and photographers, send interactive invitations, and manage RSVPs in real-time. With features like location-based services, in-app chat, guest list management, and budget tracking, Ezy Event ensures a seamless planning experience. Secure and user-friendly, it’s perfect for any event—corporate, weddings, or fundraisers. Create unforgettable experiences with Ezy Event today!.",
    technologies: "React Native, Node js, Mongo DB, Firebase",
    associate: " Associate with Falcon Consulting.",
    websiteLink:"https://ezyevent-dev.falconweb.app/",
    images: [
      'assets/img/portfolio/ezeEvent/0.png',
      'assets/img/portfolio/ezeEvent/1.png',
      'assets/img/portfolio/ezeEvent/2.png',
      'assets/img/portfolio/ezeEvent/3.png',
      'assets/img/portfolio/ezeEvent/4.png',
      'assets/img/portfolio/ezeEvent/5.png',
      'assets/img/portfolio/ezeEvent/6.png',
      'assets/img/portfolio/ezeEvent/7.png',
      'assets/img/portfolio/ezeEvent/8.png',
      'assets/img/portfolio/ezeEvent/9.png',
      'assets/img/portfolio/ezeEvent/10.png',
      'assets/img/portfolio/ezeEvent/11.png',
      'assets/img/portfolio/ezeEvent/12.png',


    ],
  },
  {
    id: 5,
    title: "Ezy Event - User Side App",
    description: "Ezy Event is the ultimate app for organizing unforgettable events with ease. Plan seamlessly with features like event creation, service booking, interactive invitations, location-based services, and real-time chat. Manage guest lists, track expenses, and coordinate effortlessly—all while ensuring data security. Whether it’s a wedding, conference, or fundraiser, Ezy Event empowers you to create memorable experiences.",
    technologies: "React Native, Node js, Mongo DB, Firebase",
    associate: " Associate with Falcon Consulting.",
    websiteLink:"https://ezyevent-dev.falconweb.app/",
    images: [
      'assets/img/portfolio/ezeEvent/13.png',
      'assets/img/portfolio/ezeEvent/14.png',
      'assets/img/portfolio/ezeEvent/15.png',
      'assets/img/portfolio/ezeEvent/16.png',
      'assets/img/portfolio/ezeEvent/17.png',
      'assets/img/portfolio/ezeEvent/18.png',
      'assets/img/portfolio/ezeEvent/19.png',
      'assets/img/portfolio/ezeEvent/20.png',
      'assets/img/portfolio/ezeEvent/21.png',
      'assets/img/portfolio/ezeEvent/22.png',
      'assets/img/portfolio/ezeEvent/23.png',
      'assets/img/portfolio/ezeEvent/24.png',
      'assets/img/portfolio/ezeEvent/25.png',
      'assets/img/portfolio/ezeEvent/26.png',
      'assets/img/portfolio/ezeEvent/27.png',
      'assets/img/portfolio/ezeEvent/28.png',
      'assets/img/portfolio/ezeEvent/29.png',
      'assets/img/portfolio/ezeEvent/30.png',
      'assets/img/portfolio/ezeEvent/31.png',
      'assets/img/portfolio/ezeEvent/32.png',
      'assets/img/portfolio/ezeEvent/33.png',
      'assets/img/portfolio/ezeEvent/34.png',
      'assets/img/portfolio/ezeEvent/35.png',
      'assets/img/portfolio/ezeEvent/36.png',
      'assets/img/portfolio/ezeEvent/37.png',
      'assets/img/portfolio/ezeEvent/38.png',
      'assets/img/portfolio/ezeEvent/39.png',
      'assets/img/portfolio/ezeEvent/40.png',
      'assets/img/portfolio/ezeEvent/40.png',
      'assets/img/portfolio/ezeEvent/41.png',
      'assets/img/portfolio/ezeEvent/42.png',
      'assets/img/portfolio/ezeEvent/43.png',
      'assets/img/portfolio/ezeEvent/44.png',

    ],
  },
  {
    id: 6,
    title: "FDS- User Side",
    description: "The Fastest Felievery App, a user-friendly React Native mobile application for seamless food delivery services. Users can effortlessly browse restaurants, explore food categories, check detailed menus, view prices, and place orders. The app integrates Google Maps APIs for accurate location tracking, allowing users to monitor their order status and delivery progress in real time. With a robust NodeJS backend and MongoDB ensuring secure data management, the app provides a smooth and reliable experience, meeting client goals and enhancing user satisfaction.",
    technologies: "React Native, Node js, Mongo DB, Firebase",
    associate: " Associate with Falcon Consulting.",
    images: [
      'assets/img/portfolio/FDS/0.png',
      'assets/img/portfolio/FDS/1.png',
      'assets/img/portfolio/FDS/2.png',
      'assets/img/portfolio/FDS/3.png',
      'assets/img/portfolio/FDS/4.png',
      'assets/img/portfolio/FDS/5.png',
      'assets/img/portfolio/FDS/6.png',
      'assets/img/portfolio/FDS/7.png',
      'assets/img/portfolio/FDS/8.png',
      'assets/img/portfolio/FDS/9.png',
      'assets/img/portfolio/FDS/10.png',
      'assets/img/portfolio/FDS/11.png',
      'assets/img/portfolio/FDS/12.png',
      'assets/img/portfolio/FDS/13.png',
      'assets/img/portfolio/FDS/14.png',
      'assets/img/portfolio/FDS/15.png',
      'assets/img/portfolio/FDS/16.png',
      'assets/img/portfolio/FDS/17.png',
      'assets/img/portfolio/FDS/18.png',
      'assets/img/portfolio/FDS/19.png',
    ],
  },
  {
    id: 7,
    title: "FDS- Rider Side",
    description: "The Fastest Felievery Rider App, a robust React Native mobile application for food delivery, focusing on seamless functionality for both users and riders. The rider module provides an intuitive dashboard where riders can receive and refresh new orders, view detailed order information, and track vendor and user locations using integrated Google Maps APIs. Riders can confirm pickups at vendor locations, navigate efficiently to user addresses, and mark orders as delivered. Additionally, the app enables riders to maintain a delivery history, streamlining their workflow and ensuring efficient order management. With its user-friendly interface and secure backend powered by NodeJS and MongoDB, the app enhances the overall delivery process, meeting client goals effectively.",
    technologies: "React Native, Node js, Mongo DB, Firebase",
    associate: " Associate with Falcon Consulting.",
    images: [
      'assets/img/portfolio/FDS/0.png',
      'assets/img/portfolio/FDS/1.png',
      'assets/img/portfolio/FDS/2.png',
      'assets/img/portfolio/FDS/3.png',
      'assets/img/portfolio/FDS/4.png',
      'assets/img/portfolio/FDS/5.png',
      'assets/img/portfolio/FDS/20.png',
      'assets/img/portfolio/FDS/21.png',
      'assets/img/portfolio/FDS/22.png',
      'assets/img/portfolio/FDS/23.png',
      'assets/img/portfolio/FDS/24.png',
      'assets/img/portfolio/FDS/25.png',
      'assets/img/portfolio/FDS/26.png',
      'assets/img/portfolio/FDS/27.png',
      'assets/img/portfolio/FDS/28.png',
      'assets/img/portfolio/FDS/29.png',
      'assets/img/portfolio/FDS/30.png',
      'assets/img/portfolio/FDS/31.png',
      'assets/img/portfolio/FDS/32.png',
      'assets/img/portfolio/FDS/33.png',
      'assets/img/portfolio/FDS/34.png',
      'assets/img/portfolio/FDS/35.png',
      'assets/img/portfolio/FDS/36.png',
      'assets/img/portfolio/FDS/37.png',
    ],
  },
  {
    id: 8,
    title: "ACMUV - Umrah app",
    description: "The ACMUV Umrah app represents a significant milestone in providing comprehensive assistance to pilgrims embarking on their spiritual journey. As the developer, my role was pivotal in shaping the app's functionality and usability. Integrating crucial elements like a suitcase checklist and clear instructions for performing Umrah rituals ensured that users could navigate their journey with confidence and ease. Through rigorous testing and optimization, we ensured the app's reliability across various devices and platforms. Today, the ACMUV Umrah app stands as a testament to our collective efforts, providing pilgrims with invaluable support and guidance throughout their spiritual odyssey.",
    technologies: "React Native, Node js, Mongo DB, Firebase",
    associate: " Associate with Falcon Consulting.",
    websiteLink:"https://www.associationcypres.fr/",
    images: [
      'assets/img/portfolio/Umrah/0.png',
      'assets/img/portfolio/Umrah/1.png',
      'assets/img/portfolio/Umrah/2.png',
      'assets/img/portfolio/Umrah/3.png',
      'assets/img/portfolio/Umrah/4.png',
      'assets/img/portfolio/Umrah/5.png',
      'assets/img/portfolio/Umrah/6.png',
      'assets/img/portfolio/Umrah/7.png',
      'assets/img/portfolio/Umrah/8.png',
      'assets/img/portfolio/Umrah/9.png',
      'assets/img/portfolio/Umrah/10.png',
      'assets/img/portfolio/Umrah/11.png',
      'assets/img/portfolio/Umrah/12.png',
      'assets/img/portfolio/Umrah/13.png',
      'assets/img/portfolio/Umrah/14.png',
      'assets/img/portfolio/Umrah/15.png',
      'assets/img/portfolio/Umrah/16.png',
      'assets/img/portfolio/Umrah/17.png',
      'assets/img/portfolio/Umrah/18.png',
      'assets/img/portfolio/Umrah/19.png',

    ],
  },
  {
    id: 9,
    title: "E-Fruit shop",
    description: "The E Fruit Shop app simplifies fruit shopping with features like login/signup, a home page showcasing fruits with prices, a search bar, detailed product pages, and an add-to-cart option. Users can view cart totals, provide delivery addresses, and confirm orders. The settings screen includes account details, order history, and a signout option. An Add Product feature allows expanding the app's offerings effortlessly.",
    technologies: "React Native, Firebase",
    associate: "Personal Project.",
    images: [
      "assets/img/portfolio/fruitApp/0.png",
      "assets/img/portfolio/fruitApp/1.png",
      "assets/img/portfolio/fruitApp/2.png",
      "assets/img/portfolio/fruitApp/3.png",
      "assets/img/portfolio/fruitApp/4.png",
      "assets/img/portfolio/fruitApp/5.png",
      "assets/img/portfolio/fruitApp/6.png",
      "assets/img/portfolio/fruitApp/7.png",
      "assets/img/portfolio/fruitApp/8.png",
      "assets/img/portfolio/fruitApp/9.png",
      "assets/img/portfolio/fruitApp/10.png",
      "assets/img/portfolio/fruitApp/11.png",
      "assets/img/portfolio/fruitApp/12.png",
      "assets/img/portfolio/fruitApp/13.png",
      "assets/img/portfolio/fruitApp/14.png",


    ],
  },
  {
    id: 10,
    title: "Pak Riders - Ride Share Aapp",
    description: "Nowadays due to increasing fuel and car prices, people want an affordable and reliable app for ride sharing which is powered by real-time data & availability. If a user (ride seeker) needs to get somewhere e.g. commuting to work, why not get a ride from someone who is traveling in the same direction, share costs, get a comfortable ride, and be faster compared to buses or metro. To solve this problem, we need an app to have all the features to connect two different people going on the same routes to share their ride rent.",
    technologies: "Flutter, Firebase",
    associate: "Final Year Project.",
    images: [
      "assets/img/portfolio/PakRider/0.png",
      "assets/img/portfolio/PakRider/1.png",
      "assets/img/portfolio/PakRider/2.png",
      "assets/img/portfolio/PakRider/3.png",
      "assets/img/portfolio/PakRider/4.png",
      "assets/img/portfolio/PakRider/5.png",
      "assets/img/portfolio/PakRider/6.png",
      "assets/img/portfolio/PakRider/7.png",
      "assets/img/portfolio/PakRider/8.png",
      "assets/img/portfolio/PakRider/9.png",
      "assets/img/portfolio/PakRider/10.png",
      "assets/img/portfolio/PakRider/11.png",
      "assets/img/portfolio/PakRider/12.png",
      "assets/img/portfolio/PakRider/13.png",
      "assets/img/portfolio/PakRider/14.png",


    ],
  },
  {
    id: 11,
    title: "TeleHealth-App Doctor & Patient App",
    description: "Telehealth Doctor-Patient App simplifies healthcare by enabling users to book appointments and lab tests, select doctors and centers, and make secure payments using Stripe, integrated with Auth0 for authentication. Patients can access medical records, while doctors can view patient histories, conduct audio consultations, and provide prescriptions. This app ensures seamless and efficient healthcare access for both patients and doctors.",
    technologies: "React Native, Firebase, Node js, Mongo DB, Auth 0, Stripe and socket.",
    associate: "Personal Client Project.",
    websiteLink:'https://dev.myhealthcaresupport.co.uk/',
    images: [
      "assets/img/portfolio/Telehealth/0.png",
      "assets/img/portfolio/Telehealth/1.png",
      "assets/img/portfolio/Telehealth/2.png",
      "assets/img/portfolio/Telehealth/3.png",
      "assets/img/portfolio/Telehealth/4.png",
      "assets/img/portfolio/Telehealth/5.png",
      "assets/img/portfolio/Telehealth/6.png",
      "assets/img/portfolio/Telehealth/7.png",
      "assets/img/portfolio/Telehealth/8.png",
      "assets/img/portfolio/Telehealth/9.png",
      "assets/img/portfolio/Telehealth/10.png",
      "assets/img/portfolio/Telehealth/11.png",
      "assets/img/portfolio/Telehealth/12.png",
      "assets/img/portfolio/Telehealth/13.png",
      "assets/img/portfolio/Telehealth/14.png",
      "assets/img/portfolio/Telehealth/15.png",
      "assets/img/portfolio/Telehealth/16.png",
      "assets/img/portfolio/Telehealth/17.png",
      "assets/img/portfolio/Telehealth/18.png",
      "assets/img/portfolio/Telehealth/19.png",
      "assets/img/portfolio/Telehealth/20.png",
      "assets/img/portfolio/Telehealth/21.png",
      "assets/img/portfolio/Telehealth/22.png",
      "assets/img/portfolio/Telehealth/23.png",
      "assets/img/portfolio/Telehealth/24.png",
      "assets/img/portfolio/Telehealth/25.png",
      "assets/img/portfolio/Telehealth/26.png",
      "assets/img/portfolio/Telehealth/27.png",
      "assets/img/portfolio/Telehealth/30.png",
      "assets/img/portfolio/Telehealth/31.png",
      "assets/img/portfolio/Telehealth/32.png",
      "assets/img/portfolio/Telehealth/33.png",
      "assets/img/portfolio/Telehealth/34.png",
      "assets/img/portfolio/Telehealth/35.png",
      "assets/img/portfolio/Telehealth/36.png",
      "assets/img/portfolio/Telehealth/37.png",
      "assets/img/portfolio/Telehealth/38.png",
      "assets/img/portfolio/Telehealth/39.png",
      "assets/img/portfolio/Telehealth/40.png"
    ],
  },
  {
    id: 12,
    title: "Travel Ease App",
    description: "Travel Ease App streamlines travel planning by allowing users to explore tours, view detailed itineraries, search, mark favorites, and book trips seamlessly. The app features a secure admin portal where admins can manage users, view details, and upload tour information, ensuring a smooth experience for both travelers and administrators.",
    technologies: "React Native, Firebase, Node js, Mongo DB, Auth 0, Stripe and socket.",
    associate: "Personal Client Project.",
    images: [
      "assets/img/portfolio/travelEase/cover.png",
      "assets/img/portfolio/travelEase/0.png",
      "assets/img/portfolio/travelEase/1.png",
      "assets/img/portfolio/travelEase/2.png",
      "assets/img/portfolio/travelEase/3.png",
      "assets/img/portfolio/travelEase/4.png",
      "assets/img/portfolio/travelEase/5.png",
      "assets/img/portfolio/travelEase/6.png",
      "assets/img/portfolio/travelEase/7.png",
      "assets/img/portfolio/travelEase/8.png",
      "assets/img/portfolio/travelEase/9.png",
      "assets/img/portfolio/travelEase/10.png",
      "assets/img/portfolio/travelEase/11.png",
      "assets/img/portfolio/travelEase/12.png",
      "assets/img/portfolio/travelEase/13.png",
      "assets/img/portfolio/travelEase/14.png",
      "assets/img/portfolio/travelEase/15.png",
      "assets/img/portfolio/travelEase/16.png",
      "assets/img/portfolio/travelEase/17.png",
      "assets/img/portfolio/travelEase/18.png",
      "assets/img/portfolio/travelEase/19.png",
      "assets/img/portfolio/travelEase/20.png",
      "assets/img/portfolio/travelEase/21.png",
      "assets/img/portfolio/travelEase/22.png",
      "assets/img/portfolio/travelEase/23.png",
      "assets/img/portfolio/travelEase/24.png",
      "assets/img/portfolio/travelEase/25.png",
      "assets/img/portfolio/travelEase/26.png",


    ],
  },
  {
    id: 13,
    title: "SHL CRM App",
    description: "The SHL CRM App is designed to streamline equipment rental for movie theaters and film production. Users can create projects, manage opportunities, and add items to those opportunities. With features like adding items to favorites, creating a cart, and renting out equipment directly through the app, it simplifies the rental process. The app caters to organizational needs by allowing users to manage and rent equipment efficiently for their projects.",
    technologies: "React Native, Firebase,Laravel, Mongo DB, My SQL.",
    associate: "Associate with PreeSoft Pvt Ltd.",
    websiteLink:'https://shl.london/',
    images: [
      "assets/img/portfolio/SHLCrm/cover.jpg",
      "assets/img/portfolio/SHLCrm/0.jpg",
      "assets/img/portfolio/SHLCrm/1.jpg",
      "assets/img/portfolio/SHLCrm/2.jpg",
      "assets/img/portfolio/SHLCrm/3.jpg",
      "assets/img/portfolio/SHLCrm/4.jpg",
      "assets/img/portfolio/SHLCrm/5.jpg",
      "assets/img/portfolio/SHLCrm/6.jpg",
      "assets/img/portfolio/SHLCrm/7.jpg",
      "assets/img/portfolio/SHLCrm/8.jpg",
      "assets/img/portfolio/SHLCrm/9.jpg",
      "assets/img/portfolio/SHLCrm/10.jpg",
      "assets/img/portfolio/SHLCrm/11.jpg",
      "assets/img/portfolio/SHLCrm/12.jpg",
      "assets/img/portfolio/SHLCrm/13.jpg",
      "assets/img/portfolio/SHLCrm/14.jpg",
      "assets/img/portfolio/SHLCrm/15.jpg",
      "assets/img/portfolio/SHLCrm/16.jpg",
      "assets/img/portfolio/SHLCrm/17.jpg",
      "assets/img/portfolio/SHLCrm/18.jpg",
      "assets/img/portfolio/SHLCrm/19.jpg",
      "assets/img/portfolio/SHLCrm/20.jpg",
      "assets/img/portfolio/SHLCrm/21.jpg",
      "assets/img/portfolio/SHLCrm/22.jpg",
      "assets/img/portfolio/SHLCrm/23.jpg",
      "assets/img/portfolio/SHLCrm/24.jpg",
      "assets/img/portfolio/SHLCrm/25.jpg",
      "assets/img/portfolio/SHLCrm/26.jpg",
      "assets/img/portfolio/SHLCrm/27.jpg",
      "assets/img/portfolio/SHLCrm/28.jpg",
      "assets/img/portfolio/SHLCrm/29.jpg",
      "assets/img/portfolio/SHLCrm/30.jpg",
      "assets/img/portfolio/SHLCrm/31.jpg",
      "assets/img/portfolio/SHLCrm/32.jpg",
      "assets/img/portfolio/SHLCrm/33.jpg",
      "assets/img/portfolio/SHLCrm/37.jpg",
      "assets/img/portfolio/SHLCrm/38.jpg",
      "assets/img/portfolio/SHLCrm/39.jpg",
      "assets/img/portfolio/SHLCrm/40.jpg",
      "assets/img/portfolio/SHLCrm/41.jpg",
      "assets/img/portfolio/SHLCrm/42.jpg",
      "assets/img/portfolio/SHLCrm/43.jpg",
      "assets/img/portfolio/SHLCrm/44.jpg",
      "assets/img/portfolio/SHLCrm/45.jpg",
      "assets/img/portfolio/SHLCrm/46.jpg",
      "assets/img/portfolio/SHLCrm/47.jpg",
      "assets/img/portfolio/SHLCrm/48.jpg",
      "assets/img/portfolio/SHLCrm/49.jpg",
      "assets/img/portfolio/SHLCrm/50.jpg",
      "assets/img/portfolio/SHLCrm/51.jpg",
      "assets/img/portfolio/SHLCrm/52.jpg",
   



    ],
  },
  {
    id: 14,
    title: "EZE Logs App part-1",
    description: "EZELOGS is a robust, cloud-based SaaS platform designed to revolutionize construction project management. The software integrates effortlessly with existing accounting systems and offers an array of features, including time management, resource tracking, daily field management, safety checklists, bid management, project closeouts, and productivity tracking using cost codes. Accessible across both mobile and desktop platforms, EZELOGS ensures that construction teams can monitor and manage projects effectively, whether they are in the office or on-site.",
    technologies: "React Native, Firebase, Laravel, Mongo DB, My SQL.",
    associate: " Associate with PreeSoft Pvt Ltd.",
    playStoreLink: "https://play.google.com/store/apps/details?id=com.ezelogsapp&pcampaignid=web_share",
    appStoreLink: "https://apps.apple.com/us/app/ezelogs-construction-software/id1575217159",
    websiteLink: "https://ezelogs.com/",
    images: [
      "assets/img/portfolio/EZELogs/cover.jpg",
      "assets/img/portfolio/EZELogs/0.jpg",
      "assets/img/portfolio/EZELogs/1.jpg",
      "assets/img/portfolio/EZELogs/2.jpg",
      "assets/img/portfolio/EZELogs/3.jpg",
      "assets/img/portfolio/EZELogs/4.jpg",
      "assets/img/portfolio/EZELogs/5.jpg",
      "assets/img/portfolio/EZELogs/6.jpg",
      "assets/img/portfolio/EZELogs/7.jpg",
      "assets/img/portfolio/EZELogs/8.jpg",
      "assets/img/portfolio/EZELogs/9.jpg",
      "assets/img/portfolio/EZELogs/10.jpg",
      "assets/img/portfolio/EZELogs/11.jpg",
      "assets/img/portfolio/EZELogs/12.jpg",
      "assets/img/portfolio/EZELogs/13.jpg",
      "assets/img/portfolio/EZELogs/14.jpg",
      "assets/img/portfolio/EZELogs/15.jpg",
      "assets/img/portfolio/EZELogs/16.jpg",
      "assets/img/portfolio/EZELogs/17.jpg",
      "assets/img/portfolio/EZELogs/18.jpg",
      "assets/img/portfolio/EZELogs/19.jpg",
      "assets/img/portfolio/EZELogs/20.jpg",
      "assets/img/portfolio/EZELogs/21.jpg",
      "assets/img/portfolio/EZELogs/22.jpg",
      "assets/img/portfolio/EZELogs/23.jpg",
      "assets/img/portfolio/EZELogs/24.jpg",
      "assets/img/portfolio/EZELogs/25.jpg",
      "assets/img/portfolio/EZELogs/26.jpg",
      "assets/img/portfolio/EZELogs/27.jpg",
      "assets/img/portfolio/EZELogs/28.jpg",
      "assets/img/portfolio/EZELogs/29.jpg",
      "assets/img/portfolio/EZELogs/30.jpg",
      "assets/img/portfolio/EZELogs/31.jpg",
      "assets/img/portfolio/EZELogs/32.jpg",
      "assets/img/portfolio/EZELogs/33.jpg",
      "assets/img/portfolio/EZELogs/34.jpg",
      "assets/img/portfolio/EZELogs/35.jpg",
      "assets/img/portfolio/EZELogs/36.jpg",
      "assets/img/portfolio/EZELogs/37.jpg",
      "assets/img/portfolio/EZELogs/38.jpg",
      "assets/img/portfolio/EZELogs/39.jpg",
      "assets/img/portfolio/EZELogs/40.jpg",
      "assets/img/portfolio/EZELogs/41.jpg",
      "assets/img/portfolio/EZELogs/42.jpg",
      "assets/img/portfolio/EZELogs/43.jpg",
      "assets/img/portfolio/EZELogs/44.jpg",
      "assets/img/portfolio/EZELogs/45.jpg",
      "assets/img/portfolio/EZELogs/46.jpg",
      "assets/img/portfolio/EZELogs/47.jpg",
      "assets/img/portfolio/EZELogs/48.jpg",
      "assets/img/portfolio/EZELogs/49.jpg",
      "assets/img/portfolio/EZELogs/50.jpg",
      "assets/img/portfolio/EZELogs/51.jpg",
      "assets/img/portfolio/EZELogs/52.jpg",
      "assets/img/portfolio/EZELogs/53.jpg",
      "assets/img/portfolio/EZELogs/54.jpg",
      "assets/img/portfolio/EZELogs/55.jpg",
      "assets/img/portfolio/EZELogs/56.jpg",
      "assets/img/portfolio/EZELogs/57.jpg",
      "assets/img/portfolio/EZELogs/58.jpg",
      "assets/img/portfolio/EZELogs/59.jpg",
      "assets/img/portfolio/EZELogs/60.jpg"

    ],
  },
  {
    id: 15,
    title: "EZE Logs App part-1",
    description: "The EZELOGS app extends these capabilities to mobile devices. With its intuitive design, the app makes it easy to create safety reports, track project progress, manage budgets, and collaborate with team members in real time. Key app features include scheduling tools, safety toolbox talk summaries, and performance monitoring analytics that ensure projects stay on track and within budget. Available on iOS and Android, the EZELOGS app empowers construction professionals with the tools needed to improve efficiency, reduce risks, and enhance overall project performance.",
    technologies: "React Native, Firebase, Laravel, Mongo DB, My SQL.",
    associate: " Associate with PreeSoft Pvt Ltd.",
    playStoreLink: "https://play.google.com/store/apps/details?id=com.ezelogsapp&pcampaignid=web_share",
    appStoreLink: "https://apps.apple.com/us/app/ezelogs-construction-software/id1575217159",
    websiteLink: "https://ezelogs.com/",
    images: [
      "assets/img/portfolio/EZELogs/cover.jpg",
      "assets/img/portfolio/EZELogs/61.jpg",
      "assets/img/portfolio/EZELogs/62.jpg",
      "assets/img/portfolio/EZELogs/63.jpg",
      "assets/img/portfolio/EZELogs/64.jpg",
      "assets/img/portfolio/EZELogs/65.jpg",
      "assets/img/portfolio/EZELogs/66.jpg",
      "assets/img/portfolio/EZELogs/67.jpg",
      "assets/img/portfolio/EZELogs/68.jpg",
      "assets/img/portfolio/EZELogs/69.jpg",
      "assets/img/portfolio/EZELogs/70.jpg",
      "assets/img/portfolio/EZELogs/71.jpg",
      "assets/img/portfolio/EZELogs/72.jpg",
      "assets/img/portfolio/EZELogs/73.jpg",
      "assets/img/portfolio/EZELogs/74.jpg",
      "assets/img/portfolio/EZELogs/75.jpg",
      "assets/img/portfolio/EZELogs/76.jpg",
      "assets/img/portfolio/EZELogs/77.jpg",
      "assets/img/portfolio/EZELogs/78.jpg",
      "assets/img/portfolio/EZELogs/79.jpg",
      "assets/img/portfolio/EZELogs/80.jpg",
      "assets/img/portfolio/EZELogs/81.jpg",
      "assets/img/portfolio/EZELogs/82.jpg",
      "assets/img/portfolio/EZELogs/83.jpg",
      "assets/img/portfolio/EZELogs/84.jpg",
      "assets/img/portfolio/EZELogs/85.jpg",
      "assets/img/portfolio/EZELogs/86.jpg",
      "assets/img/portfolio/EZELogs/87.jpg",
      "assets/img/portfolio/EZELogs/88.jpg",
      "assets/img/portfolio/EZELogs/89.jpg",
      "assets/img/portfolio/EZELogs/90.jpg",
      "assets/img/portfolio/EZELogs/91.jpg",
      "assets/img/portfolio/EZELogs/92.jpg",
      "assets/img/portfolio/EZELogs/93.jpg",
      "assets/img/portfolio/EZELogs/94.jpg",
      "assets/img/portfolio/EZELogs/95.jpg",
      "assets/img/portfolio/EZELogs/96.jpg",
      "assets/img/portfolio/EZELogs/97.jpg",
      "assets/img/portfolio/EZELogs/98.jpg",
      "assets/img/portfolio/EZELogs/99.jpg",
      "assets/img/portfolio/EZELogs/100.jpg",
      "assets/img/portfolio/EZELogs/101.jpg",
      "assets/img/portfolio/EZELogs/102.jpg",
      "assets/img/portfolio/EZELogs/103.jpg",
      "assets/img/portfolio/EZELogs/104.jpg",
      "assets/img/portfolio/EZELogs/105.jpg",
      "assets/img/portfolio/EZELogs/106.jpg",
      "assets/img/portfolio/EZELogs/107.jpg",
      "assets/img/portfolio/EZELogs/108.jpg",
      "assets/img/portfolio/EZELogs/109.jpg",
      "assets/img/portfolio/EZELogs/110.jpg",
      "assets/img/portfolio/EZELogs/111.jpg",
      "assets/img/portfolio/EZELogs/112.jpg",
      "assets/img/portfolio/EZELogs/113.jpg",
      "assets/img/portfolio/EZELogs/114.jpg",
      "assets/img/portfolio/EZELogs/115.jpg",
      "assets/img/portfolio/EZELogs/116.jpg",
      "assets/img/portfolio/EZELogs/117.jpg",
      "assets/img/portfolio/EZELogs/118.jpg",
      "assets/img/portfolio/EZELogs/119.jpg",
      "assets/img/portfolio/EZELogs/120.jpg"


    ],
  },
];

// function openModal(projectId) {
//   // Find the project based on the ID
//   const project = projects.find(p => p.id === projectId);

//   if (project) {
//     // Set project details in the modal
//     document.getElementById('modal-title').innerText = project.title;
//     document.getElementById('modal-description').innerText = project.description;
//     document.getElementById('modal-technologies').innerText = project.technologies;
//     document.getElementById('modal-associate').innerText = project.associate;


//     // Display images in the modal
//     const imageContainer = document.getElementById('modal-images');
//     imageContainer.innerHTML = '';  // Clear previous images

//     // Add all project images to the modal
//     project.images.forEach((image, index) => {
//       const imgElement = document.createElement('img');
//       imgElement.src = image;
//       imgElement.alt = 'Project Image';
//       imgElement.classList.add('modal-image');

//       // Add click event to open fullscreen modal
//       imgElement.onclick = () => openFullscreenModal(project.images, index);

//       imageContainer.appendChild(imgElement);
//     });


//     // Show the modal
//     document.getElementById('modal').style.display = 'block';
//   }
// }
function openModal(projectId) {
  // Find the project based on the ID
  const project = projects.find(p => p.id === projectId);

  if (project) {
    // Set project details in the modal
    document.getElementById('modal-title').innerText = project.title;
    document.getElementById('modal-description').innerText = project.description;
    document.getElementById('modal-technologies').innerText = project.technologies;
    document.getElementById('modal-associate').innerText = project.associate;

    // Set links for the buttons by their IDs
    if (project.playStoreLink) {
      document.getElementById('play-store-btn').href = project.playStoreLink;
    } else {
      document.getElementById('play-store-btn').style.display = 'none';
    }

    if (project.appStoreLink) {
      document.getElementById('app-store-btn').href = project.appStoreLink;
    } else {
      document.getElementById('app-store-btn').style.display = 'none';
    }

    if (project.websiteLink) {
      document.getElementById('website-btn').href = project.websiteLink;
    } else {
      document.getElementById('website-btn').style.display = 'none';
    }


    // Get the modal image container and clear it
    const imageContainer = document.getElementById('modal-images');
    const loadingMessage = document.getElementById('loading-message');
    imageContainer.innerHTML = '';  // Clear previous images

    // Show the loading message initially
    loadingMessage.style.display = 'block';
    imageContainer.style.display = 'none';

    let imagesLoaded = 0;
    const totalImages = project.images.length;

    // Add all project images to the modal
    project.images.forEach((image, index) => {
      const imgElement = document.createElement('img');
      imgElement.src = image;
      imgElement.alt = 'Project Image';
      imgElement.classList.add('modal-image');

      // When each image is loaded, increment the counter
      imgElement.onload = () => {
        imagesLoaded++;

        // If all images are loaded, hide the loading message and show images
        if (imagesLoaded === totalImages) {
          loadingMessage.style.display = 'none';  // Hide loading message
          imageContainer.style.display = 'flex';   // Show images container
        }
      };

      // Add click event to open fullscreen modal
      imgElement.onclick = () => openFullscreenModal(project.images, index);

      imageContainer.appendChild(imgElement);
    });

    // Show the modal
    document.getElementById('modal').style.display = 'block';
  }
}


function closeModal() {
  document.getElementById('modal').style.display = 'none';
}
let currentImageIndex = 0;
let currentImageList = [];

// Open fullscreen modal
function openFullscreenModal(images, index) {
  currentImageList = images; // Store the current list of images
  currentImageIndex = index; // Set the clicked image index
  showFullscreenImage();
  document.getElementById('fullscreen-modal').style.display = 'block';
}

// Show the current image in fullscreen modal
function showFullscreenImage() {
  const image = currentImageList[currentImageIndex];
  const imgElement = document.getElementById('fullscreen-image');

  imgElement.src = image;
  imgElement.style.width = 'auto';  // Remove any forced width
  imgElement.style.height = 'auto'; // Remove any forced height
  imgElement.style.maxWidth = '90vw';  // Optionally limit width to fit viewport
  imgElement.style.maxHeight = '90vh'; // Optionally limit height to fit viewport
}

// Navigate between images
function navigateImage(direction) {
  currentImageIndex += direction;

  // Wrap around if the index goes out of bounds
  if (currentImageIndex < 0) {
    currentImageIndex = currentImageList.length - 1;
  } else if (currentImageIndex >= currentImageList.length) {
    currentImageIndex = 0;
  }

  showFullscreenImage();
}

// Close the fullscreen modal
function closeFullscreenModal() {
  document.getElementById('fullscreen-modal').style.display = 'none';
}

// Add event listener for keyboard navigation
document.addEventListener('keydown', (event) => {
  if (document.getElementById('fullscreen-modal').style.display === 'block') {
    if (event.key === 'ArrowLeft') {
      navigateImage(-1); // Navigate to the previous image
    } else if (event.key === 'ArrowRight') {
      navigateImage(1); // Navigate to the next image
    } else if (event.key === 'Escape') {
      closeFullscreenModal(); // Close the fullscreen modal on Escape key
    }
  }
});



const root = document.documentElement;
const marqueeElementsDisplayed = getComputedStyle(root).getPropertyValue("--marquee-elements-displayed");
const marqueeContent = document.querySelector("ul.marquee-content");

root.style.setProperty("--marquee-elements", marqueeContent.children.length);

for (let i = 0; i < marqueeElementsDisplayed; i++) {
  marqueeContent.appendChild(marqueeContent.children[i].cloneNode(true));
}


// Toggle modal visibility
function toggleModal() {
  const modal = document.getElementById('whatsapp-modal');
  const whatsappBtn = document.getElementById('whatsapp-btn');
  const tooltip = document.getElementById('tooltip');

  if (modal.style.display === 'none' || modal.style.display === '') {
    modal.style.display = 'block';
    whatsappBtn.style.animation = 'none'; // Stop bounce animation
    tooltip.style.display = 'none'; // Hide tooltip
  } else {
    modal.style.display = 'none';
    whatsappBtn.style.animation = ''; // Resume bounce animation
    tooltip.style.display = ''; // Show tooltip
  }
}

// Send message function
function sendMessage() {
  const userMessage = document.getElementById('user-message').value.trim();
  if (userMessage) {
    // Open WhatsApp with the user's message
    const phoneNumber = '923249470845'; // Replace with your phone number
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(userMessage)}`;
    window.open(whatsappUrl, '_blank');

    // Clear the input field
    document.getElementById('user-message').value = '';
  }
}

//show less and more description modal
function truncateDescription() {
  const descriptionElement = document.getElementById("modal-description");
  const maxChars = 200;
  if (descriptionElement) {
    const originalText = descriptionElement.textContent.trim();
    if (originalText.length > maxChars) {
      descriptionElement.textContent = originalText.slice(0, maxChars) + "...";
    }
  }
}

// Call the function on page load
window.addEventListener("DOMContentLoaded", truncateDescription);