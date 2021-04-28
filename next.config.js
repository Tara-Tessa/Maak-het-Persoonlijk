module.exports = {

  async redirects() {
      return [
      {
        source: '/',
        destination: '/cakes/:id', // Matched parameters can be used in the destination
        permanent: true,
      },
    ]
  }
}