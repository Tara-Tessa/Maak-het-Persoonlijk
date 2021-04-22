export default async (req, res) => {
    console.log(fetch(`/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master/entries/total`))
  if(req.method==="PUT"){
    try {
        const response = await fetch(`/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master/entries/total`, 
        {
            method:"PUT",
            headers:{
                "Content-Type": "application/json",
                accessToken: process.env.CONTENTFUL_ACCES_KEY,
            },
            body: 
                JSON.stringify({Title: req.body.input.Title, Message: req.body.input.Message, tier: req.body.input.tier, cake: req.body.input.cake, decorations: req.body.input.decorations}), 
        });
        
        if (response.status === 201) {
            res.status(200).json({succeeded: true});
        } else {
            const result = await response.json();
            res.status(200).json({succeeded: false, reason: result.join()});
    }
    } catch (e) {
        res.status(500).end(`Something went wrong: ${e}`);
    }
  } else {
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not allowed`);
  }
}
