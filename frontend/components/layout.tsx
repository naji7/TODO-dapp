import React, { useState, useEffect } from "react";
import { useAccount, useConnect, useDisconnect, useSignMessage } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletButton } from "./button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useAuthRequestChallengeEvm } from "@moralisweb3/next";
import axios from "axios";

type NavBarItemProps = {
  title: string;
  url: string;
  isSelected: boolean;
};

function NavBarItem(props: NavBarItemProps) {
  const { title, url, isSelected } = props;
  return (
    <li>
      <a
        href={url}
        className={`block px-3 py-2 transition hover:color-secondary ${
          isSelected ? "text-color-secondary" : ""
        }`}
      >
        {" "}
        {title}
      </a>
    </li>
  );
}

type NavBarProps = {
  pageId: string;
};

function NavBar(props: NavBarProps) {
  let { pageId } = props;
  const { connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { requestChallengeAsync } = useAuthRequestChallengeEvm();
  const { push } = useRouter();

  const handleAuth = async () => {
    if (isConnected) {
      await disconnectAsync();
    }

    const { account, chain } = await connectAsync({
      connector: new MetaMaskConnector(),
    });

    const { message }: any = await requestChallengeAsync({
      address: account,
      chainId: chain.id,
    });

    console.log("message : ", message);

    const signature = await signMessageAsync({ message });

    console.log("signature : ", signature);

    // redirect user after success authentication to '/user' page
    const { url }: any = await signIn("credentials", {
      message,
      signature,
      redirect: false,
      callbackUrl: "/user",
    });
    /**
     * instead of using signIn(..., redirect: "/user")
     * we get the url from callback and push it to the router to avoid page refreshing
     */
    push(url);
  };

  return (
    <div className="pt-6 h-16 mx-10 mx-auto flex justify-center justify-between ">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        onClick={() => {
          console.log("isConnected : ", isConnected);
        }}
      >
        Button
      </button>

      <nav>
        <ul className="flex text-sm font-medium text-zinc-800 shadow-lg rounded-full bg-white/90 ring-1 ring-zinc-900/5 backdrop-blur px-3">
          <NavBarItem title={"Home"} url={"/"} isSelected={pageId == "home"} />
          <NavBarItem
            title={"Stakes"}
            url={"/stake"}
            isSelected={pageId == "stake"}
          />
        </ul>
      </nav>
      <WalletButton
        onClick={() => {
          handleAuth();
        }}
        value={"Connect"}
      />
      {/* {!isLoggedIn ? (
        <WalletButton
          onClick={() => {
            disconnect();
          }}
          value={items?.slice(0, 8) + "..." + items?.slice(38)}
        />
      ) : (
        <WalletButton
          onClick={() => {
            connect();
          }}
          value={"Connect"}
        />
      )} */}
    </div>
  );
}

export default function Layout({ children }: any) {
  return (
    <>
      <NavBar pageId={children.props.pageId} />
      <main>{children}</main>
    </>
  );
}
