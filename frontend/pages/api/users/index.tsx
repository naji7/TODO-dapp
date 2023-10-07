import axios from "axios";

export async function verifyUser(data: any) {
  try {
    const response = await axios.get("http://localhost:5001/verifyUser", data);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function getWalletBalance(data: any) {
  try {
    const response = await axios.get(
      "http://localhost:5001/getwalletbalance",
      data
    );
    return response;
  } catch (error) {
    console.log(error);
  }
}
