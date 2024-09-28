import { JsonLdData, JsonLdView } from "@/types/jsonldData";

const GET_PAGE_NUMBER_REGEX = /page=(\d+)/;
const MEMBER = "hydra:member";
const TOTAL_ITEMS = "hydra:totalItems";
const VIEW = "hydra:view";
const ID = "@id";
const FIRST = "hydra:first";
const LAST = "hydra:last";
const NEXT = "hydra:next";
const PREVIOUS = "hydra:previous";

const getQueryParams = (paramsString: string) => {
  const queryParams = new URLSearchParams(paramsString);
  const params: Record<string, string | number> = {};

  queryParams.forEach((value, key) => {
    const parsedValue = parseFloat(value);
    params[key] = Number.isNaN(parsedValue) ? value : parsedValue;
  });

  return params;
};

const transformPageProperty = <
  T extends keyof Omit<JsonLdView, "@id" | "@type">
>(
  pageData: JsonLdView | undefined,
  property: T
): number => {
  const value = pageData?.[property];
  const match = value ? GET_PAGE_NUMBER_REGEX.exec(value) : null;
  return match ? Number(match[1]) : 0;
};

export const transformJsonLdToJson = <MemberType,>(
  hydraData: JsonLdData<MemberType>
) => {
  const paramsString = hydraData[VIEW]
    ? hydraData[VIEW]?.[ID]?.split("?")[1]
    : "";

  const params = getQueryParams(paramsString);
  const first = transformPageProperty(hydraData[VIEW], FIRST);
  const last = transformPageProperty(hydraData[VIEW], LAST);
  const next = transformPageProperty(hydraData[VIEW], NEXT);
  const previous = transformPageProperty(hydraData[VIEW], PREVIOUS);
  const current = Number(params?.page) || 1;

  const transformJsonLdData = {
    data: hydraData[MEMBER],
    totalItems: hydraData[TOTAL_ITEMS],
    params,
    view: {
      current,
      first,
      last,
      next,
      previous,
    },
  };

  return transformJsonLdData;
};
