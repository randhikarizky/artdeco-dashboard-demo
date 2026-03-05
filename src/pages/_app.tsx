import dayjs from "dayjs";
import '@/styles/globals.css';
import '@/theme/styles/css/global.css';
import 'leaflet/dist/leaflet.css';
import type { AppProps } from 'next/app';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { ThemeProvider } from '@/theme/ThemeProvider';
import SettingsProvider from '@/theme/settings/SettingsProvider';
import { defaultSetting } from '@/theme/types';

require("dayjs/locale/id");
dayjs.locale("id");

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SettingsProvider setting={defaultSetting}>
      <ThemeProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Component {...pageProps} />
        </LocalizationProvider>
      </ThemeProvider>
    </SettingsProvider>
  );
}
