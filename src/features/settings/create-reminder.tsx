import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useRemindersContext } from "./context";
import {
  Button,
  ContainerAreaView,
  Input,
  ItemList,
  ItemTimePicker,
  ItemValue,
} from "@/shared/components/ui";
import { useTranslation } from "react-i18next";
import {
  formatToHHMM,
  getCurrentDateWithZeroSeconds,
  getDateFromString,
} from "@/util/dayjs";

export const CreateReminderScreen = () => {
  const params = useLocalSearchParams();
  const [title, setTitle] = useState((params.title as string) ?? "");
  const [startDate, setStartDate] = useState(
    params.startDate
      ? getDateFromString(params.startDate as string)
      : getCurrentDateWithZeroSeconds()
  );

  const { isLoading, onReminderFormSubmit, onReminderRemove } =
    useRemindersContext();
  const { t } = useTranslation("reminders");

  const getIsActive = () => {
    if (params.isActive === "false") return false;
    else return true; // no value indicates creation mode
  };

  const onSubmit = async () => {
    if (title.trim()) {
      await onReminderFormSubmit({
        id: params.id as string,
        title: title.trim(),
        isActive: getIsActive(),
        startDate: startDate.toISOString(),
      }).finally(() => router.back());
    }
  };

  const onRemove = async () => {
    await onReminderRemove(params.id as string).finally(() => router.back());
  };

  return (
    <ContainerAreaView style={styles.container}>
      <Input
        value={title}
        maxLength={64}
        placeholder={t("Title")}
        onChangeText={(text) => setTitle(text)}
      />
      <ItemList>
        <ItemValue title={t("Time")} value={formatToHHMM(startDate)} />
        <ItemTimePicker
          value={startDate}
          onChange={(date: any) => {
            setStartDate(date);
          }}
        />
      </ItemList>
      <View style={styles.buttonsContainer}>
        <Button
          variant="secondary"
          title={t("Save")}
          disabled={isLoading}
          onPress={onSubmit}
        />
        {params.id ? (
          <Button
            variant="dark_danger"
            title={t("Delete")}
            disabled={isLoading}
            onPress={onRemove}
          />
        ) : null}
      </View>
    </ContainerAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
  buttonsContainer: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
});
