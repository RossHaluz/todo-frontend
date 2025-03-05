"use client";
import { Board } from "@/lib/types";
import React, { useEffect, useState } from "react";
import BoardListItem from "./board-list-item";

const BoardList = ({ boards }: { boards: Board[] }) => {
  const [allbillbords, setAllBillboards] = useState<Board[] | null>(null);

  useEffect(() => {
    setAllBillboards(boards);
  }, [boards]);
  return (
    <>
      {allbillbords && allbillbords?.length > 0 ? (
        <ul>
          {allbillbords?.map((item) => {
            return <BoardListItem key={item?.id} item={item} />;
          })}
        </ul>
      ) : (
        <h3></h3>
      )}
    </>
  );
};

export default BoardList;
