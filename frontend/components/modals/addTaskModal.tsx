import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

type AddTaskModalProps = {
  //   img: string;
  //   user: any;
  isOpen: boolean;
  onOpenChange: any;
  onclick: Function;
};

export const AddTaskModal = (props: AddTaskModalProps) => {
  const { isOpen, onOpenChange, onclick } = props;
  const [task, setTask] = useState("");

  return (
    <Modal
      backdrop="opaque"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      //   size={"sm"}
      classNames={{
        backdrop:
          "bg-gradient-to-t from-gray-900 to-zinc-900/10 backdrop-opacity-20",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Add TODO</ModalHeader>
            <ModalBody>
              <div>
                <label className="block mb-2 text-base font-medium text-gray-900 dark:text-white">
                  Task name
                </label>
                <input
                  type="text"
                  id="task_name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter Todo..."
                  required
                  onChange={(e) => {
                    setTask(e.target.value);
                  }}
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button
                color="primary"
                onPress={() => {
                  onclick(task);
                }}
                isDisabled={task == ""}
              >
                Action
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
