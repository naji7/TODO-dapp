import { Card, CardBody, Checkbox, Button } from "@nextui-org/react";
import moment from "moment";
import { SignOutButton } from "../button";
import { MdDelete } from "react-icons/md";

type CardProps = {
  value: string;
  createdAt: any;
  id: number;
  onChecked: Function;
  isCompleted: boolean;
  onDelete: Function;
  completedDate: any;
};

export const TaskCard = (props: CardProps) => {
  const {
    value,
    createdAt,
    id,
    onChecked,
    isCompleted,
    onDelete,
    completedDate,
  } = props;

  return (
    <Card className="bg-gray-200">
      <CardBody className="flex flex-row items-center justify-between">
        <div className="flex flex-row ">
          <Checkbox
            isSelected={isCompleted}
            color="success"
            size="lg"
            onValueChange={() => {
              onChecked(id);
            }}
          />
          &nbsp;
          <div>
            <p
              className={`text-gray-600 font-semibold text-xl ${
                isCompleted && `line-through`
              }`}
            >
              {value}
            </p>
            <div className="flex flex-row">
              <p className="font-semibold text-gray-400 font-light text-sm">
                Created At :
              </p>
              &nbsp;
              <p className="font-semibold text-gray-400 font-light text-sm">
                {moment(createdAt * 1000).format("L")}
              </p>
              {isCompleted && (
                <>
                  <p className="px-1 font-semibold text-gray-400 font-light text-sm">
                    |
                  </p>
                  <p className="font-semibold text-gray-400 font-light text-sm">
                    Completed At :
                  </p>
                  &nbsp;
                  <p className="font-semibold text-gray-400 font-light text-sm">
                    {moment(completedDate * 1000).format("L")}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
        
        {/* <button
          onClick={() => {
            onDelete(id);
          }}
          className="inline-flex items-center justify-center w-8 h-8 mr-2 text-pink-100 transition-colors duration-150 bg-red-600 rounded-lg focus:shadow-outline hover:bg-red-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button> */}
      </CardBody>
    </Card>
  );
};
