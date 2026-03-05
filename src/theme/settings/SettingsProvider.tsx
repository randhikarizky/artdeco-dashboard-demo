"use client";

import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import Cookies from "universal-cookie";

import { defaultSetting } from "@/theme/types";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const cookies = new Cookies();

export type ThemeSettings = {
  compactLayout: boolean;
  colorScheme: "light" | "dark";
  navLayout: "vertical" | "mini";
};

type SettingsContextValue = ThemeSettings & {
  canReset: boolean;
  onReset: () => void;
  onUpdate: (updateValue: Partial<ThemeSettings>) => void;
  onUpdateThemeField: (
    name: keyof ThemeSettings,
    value: ThemeSettings[keyof ThemeSettings],
  ) => void;

  openSetting: boolean;
  toggleOpenSetting: () => void;
};

export const SettingsContext = createContext<SettingsContextValue | undefined>(
  undefined,
);

export const SettingsConsumer = SettingsContext.Consumer;

interface Props {
  setting: ThemeSettings;
  children: React.ReactNode;
}

export default function SettingsProvider(props: Props) {
  const settings = useLocalStorage<ThemeSettings>("settings", props.setting);

  const [openSetting, setOpenSetting] = useState(false);

  const toggleOpenSetting = useCallback(() => {
    setOpenSetting((prev) => !prev);
  }, []);

  const memoizedValue = useMemo(
    () => ({
      ...settings.state,
      canReset: settings.canReset,
      onReset: settings.resetState,
      onUpdate: settings.setState,
      onUpdateThemeField: settings.setField,
      openSetting,
      toggleOpenSetting,
    }),
    [
      settings.canReset,
      settings.resetState,
      settings.state,
      settings.setState,
      settings.setField,
      openSetting,
      toggleOpenSetting,
    ],
  );

  return (
    <SettingsContext.Provider value={memoizedValue}>
      {props.children}
    </SettingsContext.Provider>
  );
}
