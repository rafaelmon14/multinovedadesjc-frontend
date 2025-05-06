/** @type {import('next').NextConfig} */
const nextConfig = {
  
    allowedDevOrigins: [
      'https://d68c-190-12-13-23.ngrok-free.app',
      'd68c-190-12-13-23.ngrok-free.app'
    ],
    images: {
       // Aquí pones el dominio o IP de tu Strapi
      domains: [
        '127.0.0.1',
        'd68c-190-12-13-23.ngrok-free.app'
    ],
    },
  };

export default nextConfig;
