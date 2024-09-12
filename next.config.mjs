/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'do-env.xyz',
          port: '',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'www.safefood.net',
          port: '',
          pathname: '/**',
        },
        {
          protocol: 'https',  // أضف المضيف الجديد هنا
          hostname: 'cdn-icons-png.flaticon.com',
          port: '',
          pathname: '/**',
        },
      ],
    },
  };
  
  export default nextConfig;
  