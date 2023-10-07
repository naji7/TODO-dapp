import React, { useState, useEffect } from "react";
import AnimatedNumber from "react-animated-number";

import { DaysButton, SecondaryButton } from "@/components/button";
import {
  useAccount,
  useContract,
  useEnsAddress,
  useProvider,
  useSigner,
} from "wagmi";
import { ethers } from "ethers";
import axios from "axios";
import { ABI, CONTRACT_ADDRESS } from "@/contracts";

export async function getStaticProps() {
  return {
    props: {
      pageId: "stake",
    },
  };
}

export default function Stake() {
  const [stakeDays, setStakeDays] = useState("7");
  const [apy, setApy] = useState(0);

  const { isConnected, address } = useAccount();
  const provider = useProvider();
  const { data: signer } = useSigner();

  const [walletBalance, setWalletBalance] = useState("");

  const [stakingTab, setStakingTab] = useState(true);
  const [unstakingTab, setUnstakingTab] = useState(false);
  const [unstakeValue, setUnstakeValue] = useState(0);

  const [assetsIds, setAssestIds] = useState([]);
  const [assets, setAssets] = useState([]);
  const [amount, setAmount] = useState(0);

  const toWei = (ether: any) => ethers.utils.parseEther(ether);
  const toEther = (wei: any) => ethers.utils.formatEther(wei);

  useEffect(() => {
    async function getWalletBalance() {
      await axios
        .get("http://localhost:5001/getwalletbalance", {
          params: { address },
        })
        .then((response: any) => {
          setWalletBalance(response.data.balance);
        });
    }

    if (isConnected) {
      getWalletBalance();
    }
  }, [isConnected]);

  const contract = useContract({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    signerOrProvider: signer || provider,
  });

  const switchToUnstake = async () => {
    if (!unstakingTab) {
      setUnstakingTab(true);
      setStakingTab(false);
      const assetIds = await getAssetIds(address, signer);
      setAssestIds(assetIds);
      getAssets(assetIds, signer);
    }
  };

  const switchToStake = () => {
    if (!stakingTab) {
      setStakingTab(true);
      setUnstakingTab(false);
    }
  };

  const getAssetIds = async (address: string) => {
    const assetIds = await contract?.getPositionIdsForAddress(address);
    return assetIds;
  };

  const calcDaysRemaining = (unlockDate: any) => {
    const timeNow = Date.now() / 1000;
    const secondsRemaining = unlockDate - timeNow;
    // @ts-ignore
    return Math.max((secondsRemaining / 60 / 60 / 24).toFixed(0), 0);
  };

  const getAssets = async (ids: any) => {
    const queriedAssets = await Promise.all(
      ids.map((id: any) => contract?.getPositionById)
    );

    queriedAssets.map(async (asset) => {
      const parsedAsset = {
        positionId: asset.positionId,
        percentInterest: Number(asset.percentInterest) / 100,
        daysRemaining: calcDaysRemaining(Number(asset.unlockDate)),
        etherInterest: toEther(asset.weiInterest),
        etherStaked: toEther(asset.weiStaked),
        open: asset.open,
      };

      // @ts-ignore
      setAssets((prev) => [...prev, parsedAsset]);
    });
  };

  const stakeEther = async (stakingLength: any) => {
    const wei = toWei(String(amount));
    const data = { value: wei };
    await contract?.stakeEther(stakingLength, data);
  };

  const withdraw = (positionId: any) => {
    contract?.closePosition(positionId);
  };

  useEffect(() => {
    setApy(
      stakeDays === "7"
        ? 10
        : stakeDays === "14"
        ? 20
        : stakeDays === "30"
        ? 50
        : stakeDays === "60"
        ? 80
        : 0
    );
  }, [stakeDays]);

  return (
    <div className="h-screen flex flex-col items-center justify-center space-y-4 ">
      {/* <div className="grid grid-rows-2 place-items-center"> */}
      <div className="shadow-lg rounded bg-slate-950">
        <div className="p-5">
          <DaysButton
            value={`Stake`}
            onClick={() => {
              switchToStake();
            }}
            isActive={stakingTab}
          />
          <DaysButton
            value={`Un stake`}
            onClick={() => {
              switchToUnstake();
            }}
            isActive={unstakingTab}
          />

          {stakingTab ? (
            <>
              <h1>Participate IGO Stake 256.50 BUSD</h1>
              <div className="flex space-x-4 py-5">
                {["7", "14", "30", "60"].map((e) => {
                  return (
                    <DaysButton
                      key={e}
                      value={`${e} Days`}
                      onClick={() => {
                        setStakeDays(e);
                      }}
                      isActive={e == stakeDays}
                    />
                  );
                })}
              </div>
              <div className="flex justify-between items-center">
                <div>
                  {" "}
                  <h1>{`Balance ${(
                    Number(walletBalance) /
                    10 ** 18
                  ).toLocaleString()}`}</h1>
                  <h1>You Receive</h1>
                </div>
                <div>
                  <div className="flex flex-row items-center justify-center">
                    <AnimatedNumber
                      value={apy}
                      style={{
                        fontSize: 108,
                        transition: "0.8s ease-out",
                        transitionProperty: "background-color, white, opacity",
                      }}
                      formatValue={(n: any) => n.toFixed(0)}
                    />

                    <h1 className="text-8xl">%</h1>
                  </div>

                  <h1 className="text-slate-800 font-bold">APY*</h1>
                </div>
              </div>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline my-6"
                id="username"
                type="number"
                placeholder="Enter Amount"
                onChange={(e) => {
                  setAmount(Number(e.target.value));
                }}
                value={amount}
              ></input>
              <div className="flex justify-center">
                <SecondaryButton
                  onClick={() => {
                    stakeEther(0, "7%");
                  }}
                  value={"Stake"}
                />
              </div>
            </>
          ) : (
            <>
              <h1>Un stake</h1>
              <div className="flex justify-between items-center">
                <div>
                  {" "}
                  <h1>{`Balance ${
                    assets.length > 0 &&
                    assets.map((a: any, id) => {
                      if (a.open) {
                        return <span key={id}>{a.etherStaked}</span>;
                      } else {
                        return <span key={id}></span>;
                      }
                    })
                  }`}</h1>
                  <h1>
                    {`You Receive${
                      unstakeValue == 0 ? "" : unstakeValue * 1.07
                    }`}{" "}
                  </h1>
                </div>
              </div>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline my-6"
                id="username"
                type="number"
                placeholder="Enter Amount"
                onChange={(e) => {
                  setUnstakeValue(Number(e.target.value));
                }}
                value={unstakeValue}
              ></input>
              <div className="flex justify-center">
                <SecondaryButton
                  onClick={() => {
                    // @ts-ignore
                    withdraw(assets[assets.length - 1].positionId);
                  }}
                  value={"Un stake"}
                />
              </div>
            </>
          )}
        </div>
      </div>

      <div className="flex flex-row space-x-4">
        <div className="shadow-lg rounded bg-slate-950 p-5">
          <h1>Total staked Tokens</h1>
          <h1>Amount</h1>
        </div>
        <div className="shadow-lg rounded bg-slate-950 p-5">
          <h1>Total staked Tokens</h1>
          <h1>Amount</h1>
        </div>
        <div className="shadow-lg rounded bg-slate-950 p-5">
          <h1>Total staked Tokens</h1>
          <h1>Amount</h1>
        </div>
      </div>
    </div>
  );
}
