import { LinearClient } from "@linear/sdk";

const linear = new LinearClient({
    apiKey: process.env.NEXT_PUBLIC_LINEAR_API_KEY
})

export default linear;