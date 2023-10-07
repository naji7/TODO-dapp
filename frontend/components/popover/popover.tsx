import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Input,
  Avatar,
} from "@nextui-org/react";
import { SignOutButton } from "../button";

type PopoverDropdownProps = {
  //   img: string;
  //   user: any;
  walletBalance: string;
  address:string;
  onclick: Function;
};

export const PopoverDropdown = (props: PopoverDropdownProps) => {
  const { walletBalance, onclick,address } = props;
  //   console.log("user : ", user["address"]);

  

  return (
    <Popover
      placement="bottom-end"
      offset={20}
      showArrow
      backdrop={"blur"}
      classNames={{
        base: "bg-gray-800",
        arrow: "bg-gray-800",
      }}
    >
      <PopoverTrigger>
        <button className="block h-10 w-10 rounded-full overflow-hidden border-2 border-orange-700 focus:outline-none focus:border-white">
          <img
            className="h-full w-full object-cover "
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
            alt="Profile"
          />
        </button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="mt-3 flex items-center justify-between gap-4">
          <Avatar
            size="md"
            isBordered
            radius="full"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
            alt="tania andrew"
          />
        </div>
        &nbsp;
        <div className="border-t border-zinc-900">
          <div className="mt-2 mb-2 flex items-center gap-2 font-medium">
            <span className="text-zinc-400">Address</span>
            <a href="#" className="text-lg text-zinc-500">
              {address && address?.slice(0, 10) + "..."}
            </a>
          </div>

          <div className="mb-2 flex items-center gap-2 font-medium">
            <span className="text-zinc-400">Balance</span>
            <a href="#" className="text-lg text-zinc-500">
              {walletBalance}
            </a>
          </div>
        </div>
        <div className="border-t border-zinc-900 w-full flex justify-center">
          <Button
            // className="my-3 bg-transparent text-color-dark border border-color-dark font-bold px-4 hover:opacity-80 ease-in duration-200 hover:bg-color-dark hover:text-white"
            className="my-3 bg-color-secondary px-9 py-3 text-stone-900 rounded-md capitalize font-bold hover:opacity-80 ease-in duration-200"
            // className="my-3 bg-transparent text-orange-400 border border-orange-400 font-bold px-4 hover:opacity-80 ease-in duration-200 hover:bg-color-secondary hover:text-white "
            radius="lg"
            // onClick={() => signOut({ redirect: "/" })}
            onClick={() => onclick()}
          >
            Log out
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
