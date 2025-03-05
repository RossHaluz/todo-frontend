import { getGetBoardDetails } from "@/actions/data";
import React from "react";
import Columns from "./_components /board-details";

const BoardPage = async ({
  params,
}: {
  params: {
    boardId: string;
  };
}) => {
  const { boardId } = await params;
  const data = await getGetBoardDetails(boardId);

  return <Columns item={data} />;
};

export default BoardPage;
