import { appApi } from "@/store/services/app";
import { IPrediction } from "../types";
import { transformJsonLdToJson } from "@/util/response-transform";
import { JsonLdData, TransformedJsonLdData } from "@/types/jsonldData";

export const chatApi = appApi.injectEndpoints({
  endpoints: (build) => ({
    getPredictions: build.query<TransformedJsonLdData<IPrediction[]>, void>({
      query: () => ({
        url: `api/predictions`,
        headers: {
          "Ignore-Headers": "true",
          "Content-Type": "application/ld+json",
        },
      }),
      providesTags: ["Predictions"],
      transformResponse: (jsonldData: JsonLdData<IPrediction[]>) =>
        transformJsonLdToJson<IPrediction[]>(jsonldData),
    }),
    getPredictionInfo: build.query({
      query: (id: IPrediction["requestId"]) => ({
        url: `api/public/predictions/${id}/info`,
      }),
    }),
    createPredictions: build.mutation({
      query: (body: Pick<IPrediction, "input">) => ({
        url: `api/public/predictions`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Predictions"],
    }),
  }),
});

export const {
  useGetPredictionsQuery,
  useLazyGetPredictionInfoQuery,
  useCreatePredictionsMutation,
} = chatApi;
