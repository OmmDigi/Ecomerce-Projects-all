import { cache } from "react";
import { serverApi } from "./serverApi";
import { ICategory, IServerRes } from "../types";

export const getCategoriesServer = cache(
  async () =>
    (await serverApi.get<IServerRes<ICategory[]>>("/api/v1/products/category"))
      .data
);
