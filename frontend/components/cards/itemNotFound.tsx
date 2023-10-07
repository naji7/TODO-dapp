import Lottie from "lottie-react";

import lottieNotFound from "../../assets/lotties/lottieNotFound.json";
export default function ItemNotFound() {
  return (
    <Lottie className="h-80 w-80" animationData={lottieNotFound} loop={true} />
  );
}
