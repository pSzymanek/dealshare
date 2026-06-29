const wordpressUrl = process.env.WORDPRESS_API_URL;
const wordpressPattern = (() => {
  if (!wordpressUrl) return null;

  try {
    const url = new URL(wordpressUrl);
    return {
      protocol: url.protocol.replace(":", ""),
      hostname: url.hostname
    };
  } catch {
    return null;
  }
})();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: wordpressPattern ? [wordpressPattern] : []
  },
  async redirects() {
    return [
      {
        source: "/jak-dziala",
        destination: "/jak-dzialamy",
        permanent: true
      },
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.dealshare.pl"
          }
        ],
        destination: "https://dealshare.pl/:path*",
        permanent: true
      }
    ];
  }
};

export default nextConfig;
