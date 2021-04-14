const Tiers = (data) => {
    console.log(data);
    return ( 
        <>

        </>
     );
}
 
export default Tiers;

export async function getStaticProps() {
  // Get external data from the file system, API, DB, etc.
  const res = await fetch(`${process.env.STRAPI_URL}/tiers`);
  const data = await res.json()

  // The value of the `props` key will be
  //  passed to the `Home` component
    if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: { data }, // will be passed to the page component as props
  }
}