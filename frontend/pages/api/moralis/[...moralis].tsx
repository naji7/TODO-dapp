// import { MoralisNextApi } from "@moralisweb3/next";

// export default MoralisNextApi({
//   apiKey: process.env.NEXT_PUBLIC_MORALIS_API,
//   authentication: {
//     domain: process.env.NEXT_PUBLIC_NEXTAUTH_URL
//       ? new URL(process.env.NEXT_PUBLIC_NEXTAUTH_URL).host
//       : "",
//     uri: process.env.NEXT_PUBLIC_NEXTAUTH_URL,
//     timeout: 120,
//   },
// } as any);

import { MoralisNextApi } from "@moralisweb3/next";

export default MoralisNextApi({
  apiKey: process.env.NEXT_PUBLIC_MORALIS_API,
  authentication: {
    domain: "auth.app",
    // domain: "http://localhost:3000/",
    uri: process.env.NEXT_PUBLIC_NEXTAUTH_URL,
    timeout: 120,
  },
} as any);
