import {
    FlatList,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    View,
  } from "react-native";
  import { ProgressBar } from "@/features/register/components";
  import { useRegisterScreen } from "@/features/register/hooks";
  import { ContainerAreaView } from "@/shared/components/ui";
  import { DismissKeyboard } from "@/shared/components";
  import { useTranslation } from "react-i18next";
  
  export const RegisterScreen = () => {
    const {
      carouselContentRef,
      carouselButtonsRef,
      width,
      formsList,
      buttonsList,
      step,
      onSkip,
      onSubmit,
      onNextHandler,
      onBackHandler,
    } = useRegisterScreen();
    const { t } = useTranslation("auth");
  
    return (
      <ContainerAreaView>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <ProgressBar
            current={step}
            length={formsList.length}
            onBack={() => onBackHandler()}
          />
          <View style={[styles.marginHorizontal_20, styles.contentContainer]}>
            <FlatList
              ref={carouselContentRef}
              data={formsList}
              horizontal
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              keyboardShouldPersistTaps="handled"
              renderItem={({ item: Item }) => (
                <View style={{ width }}>
                  {/* <DismissKeyboard> */}
                  <Item onSubmit={onNextHandler} />
                  {/* </DismissKeyboard> */}
                </View>
              )}
              scrollEnabled={false}
            />
          </View>
          <View style={styles.marginHorizontal_20}>
            <FlatList
              ref={carouselButtonsRef}
              data={buttonsList}
              horizontal
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              keyboardShouldPersistTaps="handled"
              renderItem={({ item: Item }) => (
                <View style={[styles.buttonsContainer, { width }]}>
                  <Item
                    title={t("Continue")}
                    onSkip={onSkip}
                    variant="secondary"
                    onPress={onSubmit}
                  />
                </View>
              )}
              scrollEnabled={false}
            />
          </View>
        </KeyboardAvoidingView>
      </ContainerAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    marginHorizontal_20: {
      marginHorizontal: -20,
    },
    contentContainer: {
      flexGrow: 1,
    },
    buttonsContainer: {
      paddingHorizontal: 20,
    },
  });
  