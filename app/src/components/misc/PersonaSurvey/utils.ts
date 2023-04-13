import { actions } from "store";
import { getAndUpdateInstallationDate } from "utils/Misc";
import { multipleChoiceOption, Option, UserPersona } from "./types";
import { getValueAsPromise, updateValue } from "actions/FirebaseActions";

export const shouldShowPersonaSurvey = async (appMode: string) => {
  const installDate = await getAndUpdateInstallationDate(appMode, false, false);
  if (new Date(installDate) >= new Date("2023-03-06")) return true;
  else return false;
};

export const getFormattedUserUseCases = (useCases: multipleChoiceOption[]) => {
  const result = useCases.map((useCase: multipleChoiceOption) => {
    if (useCase.optionType === "other") return "OTHER:" + useCase.value;
    else return useCase.value;
  });
  return result;
};

export const shuffleOptions = (options: Option[]) => {
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }
  return options;
};

export const syncUserPersona = async (
  uid: string,
  dispatch: any,
  userPersona: UserPersona
) => {
  const profile: any = await getValueAsPromise(["users", uid, "profile"]);
  if (!profile) {
    return;
  }
  if (profile.userPersona)
    dispatch(actions.setUserPersonaData(profile.userPersona));
  else updateValue(["users", uid, "profile"], { userPersona });
};
