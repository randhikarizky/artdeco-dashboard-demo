import dayjs from "dayjs";
import type { AppProps } from 'next/app';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { ThemeProvider } from '../../theme/ThemeProvider';
import { SettingsProvider } from '../../theme/settings/SettingsProvider';

require("dayjs/locale/id");
dayjs.locale("id");

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SettingsProvider>
      <ThemeProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Component {...pageProps} />
        </LocalizationProvider>
      </ThemeProvider>
    </SettingsProvider>
  );
}
