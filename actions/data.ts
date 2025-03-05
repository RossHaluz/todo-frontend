import { Board, Column, User } from "@/lib/types";
import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";

axios.defaults.baseURL = `${process.env.BACKEND_URL}/api`;

export const currentUser = async (): Promise<User | null> => {
  const tokenCookie = (await cookies()).get("__token");
  const token = tokenCookie ? tokenCookie.value : null;
  try {
    const { data } = await axios.get("/user/current", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.log("CURRENT USER ERROR:", error.message);
      console.log("Error response data:", error.response?.data);
      console.log("Error status:", error.response?.status);
    } else {
      console.log("Unknown error:", error);
    }

    return null;
  }
};

//Get first board by user
export const getFirstBoardByUser = async (): Promise<Board | null> => {
  const tokenCookie = (await cookies()).get("__token");
  const token = tokenCookie ? tokenCookie.value : null;
  try {
    const { data } = await axios.get("/board/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data?.data.board;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.log("CURRENT USER ERROR:", error.message);
      console.log("Error response data:", error.response?.data);
      console.log("Error status:", error.response?.status);
    } else {
      console.log("Unknown error:", error);
    }

    return null;
  }
};

//Get board details
export const getGetBoardDetails = async (
  boardId: string
): Promise<Board | null> => {
  const tokenCookie = (await cookies()).get("__token");
  const token = tokenCookie ? tokenCookie.value : null;

  try {
    const { data } = await axios.get(`/board/${boardId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data?.data?.board;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.log("CURRENT USER ERROR:", error.message);
      console.log("Error response data:", error.response?.data);
      console.log("Error status:", error.response?.status);
    } else {
      console.log("Unknown error:", error);
    }

    return null;
  }
};

//Get all boards
export const getAllBoards = async (): Promise<Board | null> => {
  const tokenCookie = (await cookies()).get("__token");
  const token = tokenCookie ? tokenCookie.value : null;
  try {
    const { data } = await axios.get("/board", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data?.data || null; 
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.log("CURRENT USER ERROR:", error.message);
      console.log("Error response data:", error.response?.data);
      console.log("Error status:", error.response?.status);
    } else {
      console.log("Unknown error:", error);
    }

    return null; 
  }
};
