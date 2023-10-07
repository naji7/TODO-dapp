// import { FC } from "react";

// interface DaysButtonProps {
//   value: string;
// }

// const daysButton: FC<DaysButtonProps> = ({ value }) => {
//   return (
//     <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
//       {value}
//     </button>
//   );
// };

// export default daysButton;

type daysButtonProps = {
  value: string;
  onClick: Function;
  isActive: boolean;
};

type secondaryButtonProps = {
  value: string;
  onClick: Function;
};

type walletButtonProps = {
  onClick: Function;
  value: string;
};

type signOutButtonProps = {
  onClick: Function;
};

type IconButtonProps = {
  onClick: Function;
  value: String;
  icon: any;
};
export function DaysButton(props: daysButtonProps) {
  const { value, onClick, isActive } = props;
  return (
    <button
      onClick={() => {
        onClick();
      }}
      // className="bg-transparent hover:bg-blue-500 text-slate-300 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      className={`${
        isActive ? "bg-blue-500" : "bg - transparent"
      } hover:bg-blue-500 text-slate-300 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded`}
    >
      {value}
    </button>
  );
}

export function SecondaryButton(props: secondaryButtonProps) {
  const { value, onClick } = props;
  return (
    <button
      onClick={() => {
        onClick();
      }}
      className="border border-orange-400 text-stone-100 tracking-widest px-9 py-3 rounded-md capitalize font-bold hover:opacity-80 ease-in duration-200 hover:bg-color-secondary"
    >
      {value}
    </button>
  );
}

export function WalletButton(props: walletButtonProps) {
  const { value, onClick } = props;
  return (
    <button
      onClick={() => {
        onClick();
      }}
      className={`bg-transparent text-orange-400 border border-orange-400 font-bold px-4 rounded-full hover:opacity-80 ease-in duration-200 hover:bg-color-secondary hover:text-white w-40`}
    >
      {value}
    </button>
  );
}

export function SignOutButton(props: signOutButtonProps) {
  const { onClick } = props;
  return (
    <button
      onClick={() => {
        onClick();
      }}
      className="bg-transparent text-orange-400 border border-orange-400 font-bold px-4 rounded-full hover:opacity-80 ease-in duration-200 hover:bg-color-secondary hover:text-white w-40"
    >
      Log Out
    </button>
  );
}

export function IconButton(props: IconButtonProps) {
  const { onClick, value, icon } = props;
  return (
    <button
      onClick={() => {
        onClick();
      }}
      className="flex flex-row items-center gap-x-5 my-3 bg-orange-500 px-9 py-3 text-white rounded-md capitalize font-bold hover:opacity-80 ease-in duration-200 tracking-wide"
    >
      {value}
    </button>
  );
}
