import { createClient as managementClient } from "contentful-management";

export default async (req, res) => {
  console.log(req);
  if (req.method === "POST") {
    try{
      const client = managementClient({
        accessToken: process.env.CONTENTFUL_MANAGEMENT_KEY,
      });

      const response = client.getSpace(process.env.CONTENTFUL_SPACE_ID)
      .then((space) => space.getEnvironment(process.env.CONTENTFUL_ENV))
      .then((environment) => 
      environment.createEntry("total", {
        fields: {
          title: {
            "en-US": req.body.input.Title
          },
          message: {
            "en-US": req.body.input.Message
          },
          cake: {
            "en-US": req.body.input.cake
          },
          decorations: {
            "en-US": req.body.input.decorations
          },
          fondant: {
            "en-US": req.body.input.fondant
          },
          tier: {
            "en-US": req.body.input.tier
          },
        },
      })).then((entry) => entry.publish());

      if (response.status === 201) {
            res.status(200).json({succeeded: true});
      } else {
            const result = await response;
            res.status(200).json({succeeded: false, reason: result});
      }
    } catch (e) {
      res.status(500).end(`Something went wrong: ${e}`);
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}


/* export const getPosts = async (limit) => {
    console.log("voer iets uit");
    console.log(process.env.CONTENTFUL_SPACE_ID);
    console.log(process.env.CONTENTFUL_ACCES_KEY);
  const client = deliveryClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    environment: "master",
    accessToken: process.env.CONTENTFUL_ACCES_KEY,
  });

  return await client
    .getPosts({
      content_type: "total"
    })
    .catch(console.error);
}; */
/* export default async (req, res) => {
  if(req.method==="PUT"){
    try {
        const response = await fetch(`https://api.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master/entries/total`, 
        {
            method:"PUT",
            headers:{
                "Content-Type": "application/json",
                accessToken: process.env.CONTENTFUL_ACCES_KEY,
            },
            body: 
                JSON.stringify({Title: req.body.input.Title, Message: req.body.input.Message, tier: req.body.input.tier, cake: req.body.input.cake, decorations: req.body.input.decorations}), 
        });
        console.log(response);
        
        if (response.status === 201) {
            res.status(200).json({succeeded: true});
        } else {
            const result = await response.json();
            res.status(200).json({succeeded: false, reason: result});
    }
    } catch (e) {
        res.status(500).end(`Something went wrong: ${e}`);
    }
  } else {
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not allowed`);
  }
}
 */