import { createRef, useEffect, useState } from "react";
import { FlatList } from "react-native";
import {
  useCreatePredictionsMutation,
  useGetPredictionsQuery,
} from "../endpoints/chat";

interface Message {
  text: string;
  isUser: boolean;
}

export const useChat = () => {
  const flatListRef = createRef<FlatList>();
  const [hasUnansweredPredictions, setHasUnansweredPredictions] =
    useState(true);

  const {
    data: predictions,
    isLoading,
    error,
  } = useGetPredictionsQuery(undefined, {
    pollingInterval: hasUnansweredPredictions ? 2500 : 0,
  });

  const [createPrediction] = useCreatePredictionsMutation();

  const onMessageSend = async (message: Message) => {
    const input = message.text.trim();

    if (input) {
      try {
        const res = await createPrediction({ input });
        console.log("res", res);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const checkIsNeedUpdate = () => {
    let result = predictions?.data.some(
      (prediction) => prediction.output === null
    );

    setHasUnansweredPredictions(result ?? true);
  };

  useEffect(() => {
    if (!hasUnansweredPredictions)
      flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });
  }, [hasUnansweredPredictions]);

  useEffect(() => {
    if (predictions) checkIsNeedUpdate();
  }, [predictions]);

  return {
    flatListRef,
    predictions,
    isLoading,
    error,
    hasUnansweredPredictions,
    onMessageSend,
  };
};
