import React, {
  useEffect,
  useState,
  useRef,
  Suspense,
  startTransition,
  Fragment,
} from "react";
import { getSession, signOut } from "next-auth/react";
import { PopoverDropdown } from "@/components/popover/popover";
import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/common-evm-utils";
import {
  useEvmNativeBalance,
  useEvmNativeBalancesForAddresses,
} from "@moralisweb3/next";
import { ethers, BigNumber } from "ethers";
import { Chip } from "@material-tailwind/react";
import {
  Tabs,
  Tab,
  Card,
  CardBody,
  Skeleton,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { TaskCard } from "@/components/cards/taskCard";
import { AddTaskModal } from "@/components/modals/addTaskModal";
import { ABI, CONTRACT_ADDRESS } from "@/utils/abi";
import { getWalletBalance } from "./api/users";
import Loading from "./Loading";
// import Lottie from "lottie-web";
import Lottie from "lottie-react";
import lottieBlock from "../assets/lotties/lottieBlock.json";
import LoadingModal from "@/components/modals/loadingModal";
import { IoIosAddCircle } from "react-icons/io";
import { IconButton } from "@/components/button";
import TaskCardSkeleton from "@/components/skeleton/taskCardSkeleton";
import ItemNotFound from "@/components/cards/itemNotFound";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SuccessMessage, ErrorMessage } from "@/components/alert/messages";
import Brand from "@/components/brand";

declare var window: any;

// gets a prop from getServerSideProps
function User({ user }: any) {
  const [walletBalance, setWalletBalance] = useState("");
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [provider, setProvider] = useState() as any;
  const [contract, setContract] = useState() as any;
  const [taskCount, setTaskCount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(false);

  const [tasks, setTasks] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [filteredTasks, setFilteredTasks] = useState([]);

  // const notify = () => toast("Your task has been successfully created.");

  const decimals = 10;
  const toWei = (ether: any) => ethers.utils.parseEther(ether);
  const toEther = (wei: any) => ethers.utils.formatEther(wei);

  const address = user.address;

  const fetchWalletBalance = async () => {
    const response = await getWalletBalance({
      params: {
        address
      },
    });

    if (response?.status === 200) {
      const oneEther = BigNumber.from(response?.data?.balance);
      const walletBal = toEther(oneEther);

      setWalletBalance(walletBal);
    }
  };

  const fetchBlockchainData = async () => {
    try {
      setIsPageLoading(true);
      // load web3
      const provider: any = new ethers.providers.Web3Provider(window.ethereum);
      await provider.getCode(CONTRACT_ADDRESS);
      setProvider(provider);
      const network = await provider.getNetwork();

      // load contract
      const toDoContract: any = new ethers.Contract(
        CONTRACT_ADDRESS,
        ABI,
        provider
      );
      setContract(toDoContract);

      await getAllTasks(toDoContract);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllTasks = async (contractData: any) => {
    const taskCountInBigNumber = await contractData.taskCount();
    const taskCount = taskCountInBigNumber.toNumber();
    setTaskCount(taskCount);

    const tasks: any = [];
    for (var i = 1; i <= taskCount; i++) {
      const task = await contractData.tasks(i);
      tasks.push(task);
    }

    console.log("tasks : ", tasks);

    setTasks(tasks);
    setFilteredTasks(tasks);
    setIsPageLoading(false);
  };

  const addTask = async (data: string) => {
    try {
      // add task
      const signer = await provider?.getSigner();
      let transaction = await contract?.connect(signer).createTask(data);
      setIsLoading(true);
      onClose();
      let response = await transaction.wait();
      if (response) {
        await getAllTasks(contract);
        setIsLoading(false);
        SuccessMessage({
          message: `Your ${data} task has been successfully created.`,
        });
      }
    } catch (error) {
      ErrorMessage({ message: "Something went wrong" });
    } finally {
      setIsLoading(false);
    }
  };

  const filterTasks = (status: string) => {
    var filtTasks: any = tasks;
    if (status === "all") {
      filtTasks = tasks;
    } else if (status === "pending") {
      filtTasks = tasks.filter((e: any) => {
        return e.completed === false;
      });
    } else if (status === "completed") {
      filtTasks = tasks.filter((e: any) => {
        return e.completed === true;
      });
    }

    setFilteredTasks(filtTasks);
  };

  const completeTask = async (id: number) => {
    try {
      const signer = await provider.getSigner();
      let transaction = await contract.connect(signer).completeTask(id);
      setIsLoading(true);
      const response = await transaction.wait();
      if (response) {
        await getAllTasks(contract);
        await filterTasks(activeFilter);
        setIsLoading(false);
        SuccessMessage({
          message: `Your have successfully completed the task.`,
        });
      }
    } catch (error) {
      console.log("error");
      ErrorMessage({ message: "Something went wrong" });
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      const signer = await provider.getSigner();
      let transaction = await contract.connect(signer).deleteTask(id);
      setIsLoading(true);
      const response = await transaction.wait();
      if (response) {
        await getAllTasks(contract);
        await filterTasks(activeFilter);
        setIsLoading(false);
        SuccessMessage({
          message: `task has been successfully deleted.`,
        });
      }
    } catch (error) {
      console.log("error");
      ErrorMessage({ message: "Something went wrong" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlockchainData();
    fetchWalletBalance();
  }, []);

  return (
    <Fragment>
      {" "}
      {isLoading && <LoadingModal isOpen={isLoading} />}
      <ToastContainer />
      <div className="bg-color-dark min-h-screen">
        <div className="px-20 py-10">
          <div className="flex justify-between ">
            <Brand />
            <PopoverDropdown
              onclick={() => {
                signOut({ redirect: "/" } as any);
              }}
              address={address}
              walletBalance={walletBalance.slice(0, 10)}
            />
          </div>
          <h1 className="mt-10 flex justify-center font-bold text-4xl text-gray-400">
            Todo-list
          </h1>

          <div className="flex justify-center flex-col items-center">
            <div className="flex mt-10 w-1/2 justify-between items-center">
              <Button
                color="primary"
                className="my-3 bg-orange-500 px-9 py-3 text-white rounded-md capitalize font-bold hover:opacity-80 ease-in duration-200 tracking-wide"
                onPress={onOpen}
              >
                ADD TASK
              </Button>

              <AddTaskModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                onclick={(e: any) => {
                  addTask(e);
                }}
              />

              <Tabs
                aria-label="Options"
                color="warning"
                // selectedKey={selected}
                classNames={{
                  tabList: "bg-gray-700",
                  tabContent: "text-white",
                }}
                onSelectionChange={(status: any) => {
                  setActiveFilter(status);
                  filterTasks(status);
                }}
              >
                <Tab key="all" title="All"></Tab>
                <Tab key="pending" title="Pending"></Tab>
                <Tab key="completed" title="Completed"></Tab>
              </Tabs>
            </div>

            <div className="flex mt-10 w-1/2 justify-between rounded-lg bg-gray-700 shadow-2xl">
              <div className="px-5 py-5 w-full">
                {(() => {
                  if (isPageLoading) {
                    return <TaskCardSkeleton />;
                  } else if (tasks.length === 0) {
                    return (
                      <div className="flex justify-center">
                        <ItemNotFound />
                      </div>
                    );
                  } else if (tasks.length !== 0 && !isPageLoading) {
                    return (
                      <div className="grid gap-y-3">
                        {filteredTasks.map((task: any, index) => {
                          console.log("tasks : ", task);
                          return (
                            <TaskCard
                              key={index}
                              value={task.content}
                              createdAt={task.createdDate.toNumber()}
                              id={task.id.toNumber()}
                              onChecked={(id: number) => {
                                completeTask(id);
                              }}
                              isCompleted={task.completed}
                              onDelete={(id: number) => {
                                deleteTask(id);
                              }}
                              completedDate={task.completedDate}
                            />
                          );
                        })}
                      </div>
                    );
                  }
                })()}
                <></>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  // redirect if not authenticated
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: session.user,
    },
  };
}

export default User;
