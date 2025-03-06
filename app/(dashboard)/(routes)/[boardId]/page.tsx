import { getGetBoardDetails } from "@/actions/data";
import React from "react";
import Columns from "./_components /board-details";

interface BoardPageProps {
  params: Promise<{
    boardId: string;
  }>;
}

const BoardPage: React.FC<BoardPageProps> = async ({ params }) => {
  const { boardId } = await params;
  const data = await getGetBoardDetails(boardId);

  return <Columns item={data} />;
};

export default BoardPage;
