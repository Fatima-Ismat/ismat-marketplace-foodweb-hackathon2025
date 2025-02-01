// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;


// /**
//  * @type {import('next').NextConfig}
//  */
// const nextConfig = {
//      images: {
//        remotePatterns: [
//          {
//            protocol: 'https',
//            hostname: 'cdn.sanity.io',
//          },
//        ],
//      },
//    };
   
//    export default nextConfig;



// /**
//  * @type {import('next').NextConfig}
//  */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'cdn.sanity.io',
//       },
//     ],
//   },
//   eslint: {
//     // Ignore ESLint warnings during build
//     ignoreDuringBuilds: true,
//   },
// };

// export default nextConfig;

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  eslint: {
    // Ignore ESLint warnings during build
    ignoreDuringBuilds: true,
  },
  experimental: {
    // Disable Edge Runtime for specific pages
    edgeFunctions: false,
  },
};

export default nextConfig;

