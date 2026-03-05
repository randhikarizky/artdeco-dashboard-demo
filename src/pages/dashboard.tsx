import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import dayjs from "dayjs";

import { Grid } from "@mui/system";
import {
  Card,
  CardHeader,
  CardContent,
  Box,
  Stack,
  Typography,
  useTheme,
  Skeleton,
  Avatar,
  LinearProgress,
  Divider,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import { Chart } from "@/components/Chart";
import { ChartLegends } from "@/components/ChartLegends";
import Icon from "@/components/Icon";
import { useChart } from "@/hooks/useChart";
import DashboardLayout from "@/components/DashboardLayout";

// Dummy data
const DUMMY_DATA = {
  kpiCards: {
    totalReports: { value: 1247, subtitle: "Total laporan diserahkan", trend: 8.5, trendUp: true },
    activeEmployees: { value: 142, subtitle: "Karyawan aktif melaporkan", trend: 3.2, trendUp: true },
    totalViolations: { value: 87, subtitle: "Total pelanggaran tercatat", trend: -5.4, trendUp: true },
    activePatrolAreas: { value: 28, subtitle: "Area patroli aktif", trend: 1.8, trendUp: true },
  },
  reportActivityTrend: {
    categories: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"],
    series: [
      { name: "Laporan Pengecekan", data: [85, 92, 88, 95, 102, 98, 105, 110, 108, 115, 112, 120] },
      { name: "Laporan Kunjungan", data: [65, 70, 68, 75, 78, 82, 85, 88, 90, 92, 95, 98] },
      { name: "Laporan Kinerja", data: [45, 48, 52, 55, 58, 60, 62, 65, 68, 70, 72, 75] },
      { name: "Laporan Insiden", data: [25, 28, 22, 30, 26, 32, 28, 35, 30, 38, 35, 40] },
    ],
  },
  mostActiveEmployees: [
    { id: 1, name: "Budi Santoso", reports: 156, avatar: "BS", score: 100 },
    { id: 2, name: "Siti Nurhaliza", reports: 142, avatar: "SN", score: 91 },
    { id: 3, name: "Agus Wijaya", reports: 138, avatar: "AW", score: 88 },
    { id: 4, name: "Dewi Lestari", reports: 125, avatar: "DL", score: 80 },
    { id: 5, name: "Eko Prasetyo", reports: 118, avatar: "EP", score: 76 },
    { id: 6, name: "Fitri Handayani", reports: 112, avatar: "FH", score: 72 },
    { id: 7, name: "Gunawan Setiawan", reports: 108, avatar: "GS", score: 69 },
    { id: 8, name: "Hani Permata", reports: 102, avatar: "HP", score: 65 },
    { id: 9, name: "Indra Kusuma", reports: 98, avatar: "IK", score: 63 },
    { id: 10, name: "Joko Widodo", reports: 95, avatar: "JW", score: 61 },
  ],
  violationsByType: {
    categories: ["Patroli Terlambat", "Laporan Hilang", "Insiden Operasional", "Pelanggaran SOP", "Keterlambatan"],
    series: [{ name: "Jumlah Pelanggaran", data: [32, 28, 15, 8, 4] }],
  },
  employeesWithViolations: [
    { id: 1, name: "Ahmad Fauzi", violations: 12, avatar: "AF", type: "Patroli Terlambat" },
    { id: 2, name: "Linda Wijayanti", violations: 10, avatar: "LW", type: "Laporan Hilang" },
    { id: 3, name: "Hendra Gunawan", violations: 9, avatar: "HG", type: "Keterlambatan" },
    { id: 4, name: "Maya Sari", violations: 8, avatar: "MS", type: "Patroli Terlambat" },
    { id: 5, name: "Rina Susanti", violations: 7, avatar: "RS", type: "Insiden Operasional" },
    { id: 6, name: "Teguh Prasetyo", violations: 6, avatar: "TP", type: "Pelanggaran SOP" },
    { id: 7, name: "Wulan Sari", violations: 5, avatar: "WS", type: "Laporan Hilang" },
    { id: 8, name: "Yudi Hermawan", violations: 5, avatar: "YH", type: "Keterlambatan" },
  ],
  latestReports: {
    patrol: [
      { id: "1", name: "Patroli Zona A - Gate 1", description: "Pemeriksaan rutin zona A gate 1, kondisi aman terkendali. Tidak ada temuan khusus.", employeeName: "Budi Santoso", avatarUrl: "BS", postedAt: new Date(2026, 2, 5, 14, 30), location: "Area A - Gate 1", status: "completed" },
      { id: "2", name: "Patroli Zona B - Perimeter", description: "Patroli keliling perimeter zona B, ditemukan pagar rusak di titik B-12.", employeeName: "Agus Wijaya", avatarUrl: "AW", postedAt: new Date(2026, 2, 5, 13, 15), location: "Area B - Perimeter", status: "completed" },
    ],
    inspection: [
      { id: "3", name: "Pemeriksaan Fasilitas Gedung C", description: "Inspeksi rutin fasilitas gedung C, AC unit 5 memerlukan perawatan segera.", employeeName: "Siti Nurhaliza", avatarUrl: "SN", postedAt: new Date(2026, 2, 5, 12, 45), location: "Gedung C - Lantai 3", status: "needs-attention" },
    ],
    incident: [
      { id: "4", name: "Insiden Keamanan - Akses Tidak Sah", description: "Terdeteksi percobaan akses tidak sah di pintu darurat gedung D. Sudah ditangani petugas.", employeeName: "Dewi Lestari", avatarUrl: "DL", postedAt: new Date(2026, 2, 5, 11, 20), location: "Gedung D - Pintu Darurat", status: "resolved" },
    ],
    visit: [
      { id: "5", name: "Kunjungan Klien - PT ABC", description: "Kunjungan tamu dari PT ABC untuk meeting rutin, sudah dicatat sesuai prosedur.", employeeName: "Eko Prasetyo", avatarUrl: "EP", postedAt: new Date(2026, 2, 5, 10, 0), location: "Lobby Utama", status: "completed" },
    ],
  },
  mostActiveAreas: {
    categories: ["Area A", "Area B", "Area C", "Area D", "Area E", "Area F"],
    series: [{ name: "Total Laporan", data: [245, 218, 195, 178, 162, 145] }],
  },
  mostActiveWorkUnits: {
    categories: ["Unit Patroli", "Unit Keamanan", "Unit Kebersihan", "Unit Teknis", "Unit Operasional", "Unit Logistik"],
    series: [{ name: "Total Laporan", data: [320, 285, 245, 210, 185, 142] }],
  },
  mapLocations: [
    { id: 1, name: "Laporan Patroli - Area A Gate 1", lat: -6.2088, lng: 106.8456, type: "patrol", employee: "Budi Santoso", date: "2026-03-05 08:30", status: "completed" },
    { id: 2, name: "Laporan Insiden - Area B", lat: -6.2188, lng: 106.8556, type: "incident", employee: "Siti Nurhaliza", date: "2026-03-05 09:15", status: "pending" },
    { id: 3, name: "Laporan Pengecekan - Area C", lat: -6.1988, lng: 106.8356, type: "inspection", employee: "Agus Wijaya", date: "2026-03-05 10:00", status: "completed" },
    { id: 4, name: "Laporan Kunjungan - Area D", lat: -6.2288, lng: 106.8656, type: "visit", employee: "Dewi Lestari", date: "2026-03-05 11:20", status: "completed" },
    { id: 5, name: "Laporan Patroli - Area A Gate 2", lat: -6.2088, lng: 106.8500, type: "patrol", employee: "Eko Prasetyo", date: "2026-03-05 13:45", status: "completed" },
    { id: 6, name: "Laporan Insiden - Area E", lat: -6.2388, lng: 106.8756, type: "incident", employee: "Fitri Handayani", date: "2026-03-05 14:30", status: "in-progress" },
  ],
};

export default function DashboardPage() {
  const router = useRouter();
  const theme = useTheme();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('demo_logged_in');
    if (!isLoggedIn) router.push('/login');
  }, [router]);

  const [filter, setFilter] = useState<Record<string, string>>({ area: "", workUnit: "", year: dayjs().year().toString() });
  const [loading, setLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);
  const [filterDialog, setFilterDialog] = useState<string | null>(null);
  const [tempFilterValue, setTempFilterValue] = useState<string>("");

  const filterFields = [
    { name: "area", label: "Area", type: "select" as const, placeholder: "Pilih Area", config: {}, defaultValue: "", properties: { options: [{ label: "Semua Area", value: "" }, { label: "Area A", value: "area-a" }, { label: "Area B", value: "area-b" }, { label: "Area C", value: "area-c" }, { label: "Area D", value: "area-d" }, { label: "Area E", value: "area-e" }] } },
    { name: "workUnit", label: "Unit Kerja", type: "select" as const, placeholder: "Pilih Unit Kerja", config: {}, defaultValue: "", properties: { options: [{ label: "Semua Unit", value: "" }, { label: "Unit Patroli", value: "patroli" }, { label: "Unit Keamanan", value: "keamanan" }, { label: "Unit Kebersihan", value: "kebersihan" }, { label: "Unit Teknis", value: "teknis" }] } },
    { name: "year", label: "Tahun", type: "select" as const, placeholder: "Pilih Tahun", config: {}, defaultValue: dayjs().year().toString(), properties: { options: Array.from({ length: 5 }, (_, i) => { const year = dayjs().year() - i; return { label: i === 0 ? "Tahun Ini" : year.toString(), value: year.toString() }; }) } },
  ];

  const reportTrendChartOptions = useChart({ colors: [theme.palette.primary.main, theme.palette.success.main, theme.palette.warning.main, theme.palette.info.main], xaxis: { categories: DUMMY_DATA.reportActivityTrend.categories }, stroke: { width: 3, curve: "smooth" }, legend: { show: false }, tooltip: { y: { formatter: (val: number) => `${val} laporan` } } });
  const violationsChartOptions = useChart({ colors: [theme.palette.error.main], xaxis: { categories: DUMMY_DATA.violationsByType.categories }, plotOptions: { bar: { horizontal: true, borderRadius: 8 } }, dataLabels: { enabled: true }, tooltip: { y: { formatter: (val: number) => `${val} pelanggaran` } } });
  const activeAreasChartOptions = useChart({ colors: [theme.palette.primary.main], xaxis: { categories: DUMMY_DATA.mostActiveAreas.categories }, plotOptions: { bar: { borderRadius: 8, columnWidth: "60%" } }, dataLabels: { enabled: true }, tooltip: { y: { formatter: (val: number) => `${val} laporan` } } });
  const activeUnitsChartOptions = useChart({ colors: [theme.palette.success.main], xaxis: { categories: DUMMY_DATA.mostActiveWorkUnits.categories }, plotOptions: { bar: { borderRadius: 8, columnWidth: "60%" } }, dataLabels: { enabled: true }, tooltip: { y: { formatter: (val: number) => `${val} laporan` } } });

  const KPICard = ({ title, value, subtitle, icon, color, trend, trendUp, loading = false }: { title: string; value: string | number; subtitle: string; icon: string; color: string; trend?: number; trendUp?: boolean; loading?: boolean }) => (
    <Grid size={3}>
      <Card>
        <CardContent>
          {loading ? <Skeleton variant="rectangular" height={120} /> : (
            <Stack spacing={2}>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Box sx={{ width: 56, height: 56, borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center", bgcolor: `${color}.lighter`, color: `${color}.main` }}>
                  <Icon icon={icon} width={32} />
                </Box>
                {trend !== undefined && (
                  <Stack direction="row" alignItems="center" spacing={0.5}>
                    <Icon icon={trendUp ? "eva:trending-up-fill" : "eva:trending-down-fill"} width={20} color={trendUp ? theme.palette.success.main : theme.palette.error.main} />
                    <Typography variant="body2" color={trendUp ? "success.main" : "error.main"} fontWeight={600}>{Math.abs(trend)}%</Typography>
                  </Stack>
                )}
              </Stack>
              <Box>
                <Typography variant="h3" fontWeight={700}>{value}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>{subtitle}</Typography>
              </Box>
              <Typography variant="caption" color="text.secondary">{title}</Typography>
            </Stack>
          )}
        </CardContent>
      </Card>
    </Grid>
  );

  const EmployeeItem = ({ employee, rank, maxValue, showProgress = true }: { employee: { name: string; reports: number; avatar: string; score?: number }; rank: number; maxValue: number; showProgress?: boolean }) => {
    const progress = (employee.reports / maxValue) * 100;
    return (
      <Box sx={{ py: 1.5 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="body2" fontWeight={600} color="text.secondary" sx={{ minWidth: 24 }}>#{rank}</Typography>
          <Avatar sx={{ width: 40, height: 40, bgcolor: theme.palette.primary.main, fontSize: "0.875rem" }}>{employee.avatar}</Avatar>
          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <Typography variant="body2" fontWeight={600} noWrap>{employee.name}</Typography>
            {showProgress && (
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5 }}>
                <LinearProgress variant="determinate" value={progress} sx={{ flexGrow: 1, height: 6, borderRadius: 1, bgcolor: theme.palette.grey[200], "& .MuiLinearProgress-bar": { borderRadius: 1 } }} />
                <Typography variant="caption" color="text.secondary" sx={{ minWidth: 40 }}>{employee.reports}</Typography>
              </Stack>
            )}
          </Box>
        </Stack>
      </Box>
    );
  };

  const ViolationItem = ({ employee, rank }: { employee: { name: string; violations: number; avatar: string; type: string }; rank: number }) => (
    <Box sx={{ py: 1.5, borderBottom: `1px solid ${theme.palette.divider}` }}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography variant="body2" fontWeight={600} color="text.secondary" sx={{ minWidth: 24 }}>#{rank}</Typography>
        <Avatar sx={{ width: 40, height: 40, bgcolor: theme.palette.error.lighter, color: theme.palette.error.main, fontSize: "0.875rem" }}>{employee.avatar}</Avatar>
        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          <Typography variant="body2" fontWeight={600} noWrap>{employee.name}</Typography>
          <Typography variant="caption" color="text.secondary" noWrap>{employee.type}</Typography>
        </Box>
        <Chip label={`${employee.violations} pelanggaran`} size="small" color="error" variant="outlined" />
      </Stack>
    </Box>
  );

  type ReportItem = { id: string; name: string; description: string; employeeName: string; avatarUrl: string; postedAt: Date; location: string; status: string };
  const [reportType, setReportType] = useState<"patrol" | "inspection" | "incident" | "visit">("patrol");
  const [currentReportIndex, setCurrentReportIndex] = useState(0);
  const reportTypes = [
    { value: "patrol", label: "Patroli", icon: "mdi:shield-account", color: theme.palette.primary.main },
    { value: "inspection", label: "Pengecekan", icon: "mdi:clipboard-check", color: theme.palette.success.main },
    { value: "incident", label: "Insiden", icon: "mdi:alert-circle", color: theme.palette.error.main },
    { value: "visit", label: "Kunjungan", icon: "mdi:map-marker-check", color: theme.palette.info.main },
  ];
  const getCurrentReports = (): ReportItem[] => DUMMY_DATA.latestReports[reportType] || [];
  const currentReports = getCurrentReports();
  const currentReport = currentReports[currentReportIndex];
  const handleNextReport = () => { if (currentReportIndex < currentReports.length - 1) setCurrentReportIndex(currentReportIndex + 1); };
  const handlePrevReport = () => { if (currentReportIndex > 0) setCurrentReportIndex(currentReportIndex - 1); };
  const handleReportTypeChange = (type: "patrol" | "inspection" | "incident" | "visit") => { setReportType(type); setCurrentReportIndex(0); };
  const getStatusColor = (status: string) => { switch (status) { case "completed": return theme.palette.success.main; case "needs-attention": return theme.palette.warning.main; case "resolved": return theme.palette.info.main; default: return theme.palette.grey[500]; } };
  const getStatusLabel = (status: string) => { switch (status) { case "completed": return "Selesai"; case "needs-attention": return "Perlu Perhatian"; case "resolved": return "Terselesaikan"; default: return status; } };
  const formatTimeAgo = (date: Date) => { const now = new Date(); const diffMs = now.getTime() - date.getTime(); const diffMins = Math.floor(diffMs / 60000); const diffHours = Math.floor(diffMs / 3600000); if (diffMins < 60) return `${diffMins} menit yang lalu`; else if (diffHours < 24) return `${diffHours} jam yang lalu`; else return dayjs(date).format("DD MMM YYYY HH:mm"); };

  const LatestReportsCard = () => (
    <Card sx={{ height: "100%" }}>
      <CardHeader title="Laporan Terbaru" subheader="Aktivitas pelaporan terkini" sx={{ pb: 1 }} action={currentReports.length > 0 && (
        <Stack direction="row" spacing={0.5} alignItems="center">
          <IconButton size="small" onClick={handlePrevReport} disabled={currentReportIndex === 0} sx={{ width: 28, height: 28 }}><Icon icon="eva:arrow-ios-back-fill" width={16} /></IconButton>
          <Typography variant="caption" sx={{ minWidth: 35, textAlign: "center", fontSize: "0.7rem" }}>{currentReportIndex + 1}/{currentReports.length}</Typography>
          <IconButton size="small" onClick={handleNextReport} disabled={currentReportIndex === currentReports.length - 1} sx={{ width: 28, height: 28 }}><Icon icon="eva:arrow-ios-forward-fill" width={16} /></IconButton>
        </Stack>
      )} />
      <CardContent sx={{ pt: 1 }}>
        <Stack direction="row" spacing={0.5} sx={{ mb: 2, flexWrap: "wrap", gap: 0.5 }}>
          {reportTypes.map((type) => (
            <Chip key={type.value} label={type.label} icon={<Icon icon={type.icon} width={14} />} onClick={() => handleReportTypeChange(type.value as any)} color={reportType === type.value ? "primary" : "default"} variant={reportType === type.value ? "filled" : "outlined"} size="small" sx={{ height: 26, fontSize: "0.75rem", ...(reportType === type.value && { bgcolor: type.color, color: "white", "& .MuiChip-icon": { color: "white" } }) }} />
          ))}
        </Stack>
        {loading ? <Skeleton variant="rectangular" height={180} /> : currentReports.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 3, bgcolor: theme.palette.grey[50], borderRadius: 2 }}>
            <Icon icon="mdi:file-document-outline" width={42} color={theme.palette.grey[400]} />
            <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 1 }}>Tidak Ada Laporan</Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.7rem" }}>Belum ada laporan {reportTypes.find((t) => t.value === reportType)?.label.toLowerCase()} saat ini</Typography>
          </Box>
        ) : (
          <Box>
            <Stack spacing={1.5}>
              <Stack direction="row" spacing={1.5} alignItems="flex-start">
                <Avatar sx={{ width: 40, height: 40, bgcolor: reportTypes.find((t) => t.value === reportType)?.color, fontSize: "0.9rem" }}>{currentReport.avatarUrl}</Avatar>
                <Box sx={{ flexGrow: 1 }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={1}>
                    <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                      <Typography variant="body2" fontWeight={600} noWrap>{currentReport.name}</Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.7rem" }}>oleh {currentReport.employeeName}</Typography>
                    </Box>
                    <Chip label={getStatusLabel(currentReport.status)} size="small" sx={{ height: 20, fontSize: "0.65rem", bgcolor: getStatusColor(currentReport.status) + "20", color: getStatusColor(currentReport.status), fontWeight: 600 }} />
                  </Stack>
                </Box>
              </Stack>
              <Divider />
              <Box><Typography variant="caption" color="text.secondary" sx={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", fontSize: "0.75rem" }}>{currentReport.description}</Typography></Box>
              <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap" sx={{ gap: 0.5 }}>
                <Stack direction="row" spacing={0.5} alignItems="center"><Icon icon="mdi:map-marker" width={14} color={theme.palette.text.secondary} /><Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.7rem" }}>{currentReport.location}</Typography></Stack>
                <Stack direction="row" spacing={0.5} alignItems="center"><Icon icon="mdi:clock-outline" width={14} color={theme.palette.text.secondary} /><Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.7rem" }}>{formatTimeAgo(currentReport.postedAt)}</Typography></Stack>
              </Stack>
              <Divider sx={{ borderStyle: "dashed" }} />
              <Stack direction="row" spacing={1}>
                <Button fullWidth size="small" variant="outlined" startIcon={<Icon icon="mdi:eye" width={16} />} onClick={() => console.info("VIEW DETAIL", currentReport.id)} sx={{ fontSize: "0.7rem", py: 0.5 }}>Detail</Button>
                <Button fullWidth size="small" variant="contained" startIcon={<Icon icon="mdi:download" width={16} />} onClick={() => console.info("DOWNLOAD", currentReport.id)} sx={{ fontSize: "0.7rem", py: 0.5 }}>Unduh</Button>
              </Stack>
            </Stack>
          </Box>
        )}
      </CardContent>
    </Card>
  );

  const getMarkerColor = (type: string, status: string) => { if (status === "pending") return theme.palette.warning.main; if (status === "in-progress") return theme.palette.info.main; switch (type) { case "patrol": return theme.palette.primary.main; case "incident": return theme.palette.error.main; case "inspection": return theme.palette.success.main; case "visit": return theme.palette.info.main; default: return theme.palette.grey[500]; } };
  const getMarkerIcon = (type: string) => { switch (type) { case "patrol": return "mdi:shield-account"; case "incident": return "mdi:alert-circle"; case "inspection": return "mdi:clipboard-check"; case "visit": return "mdi:map-marker-check"; default: return "mdi:map-marker"; } };
  const handleOpenFilter = (filterName: string) => { setFilterDialog(filterName); setTempFilterValue(filter[filterName] || ""); };
  const handleCloseFilter = () => { setFilterDialog(null); setTempFilterValue(""); };
  const handleApplyFilter = () => { if (filterDialog) setFilter({ ...filter, [filterDialog]: tempFilterValue }); handleCloseFilter(); };
  const getFilterLabel = (fieldName: string) => { const field = filterFields.find((f) => f.name === fieldName); const value = filter[fieldName]; const option = field?.properties.options?.find((opt: any) => opt.value === value); return option ? option.label : field?.label || fieldName; };
  const getActiveFilterDialog = () => filterFields.find((f) => f.name === filterDialog);

  return (
    <DashboardLayout>
      <Box>
        <Box sx={{ mb: 3, mt: 10 }}>
          <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" gap={1}>
            <Icon icon="mdi:filter-variant" width={20} color={theme.palette.text.secondary} />
            {filterFields.map((field) => (
              <Chip key={field.name} label={getFilterLabel(field.name)} onClick={() => handleOpenFilter(field.name)} onDelete={filter[field.name] ? () => setFilter({ ...filter, [field.name]: "" }) : undefined} color={filter[field.name] ? "primary" : "default"} variant={filter[field.name] ? "filled" : "outlined"} icon={<Icon icon="mdi:chevron-down" width={16} />} sx={{ height: 36, "& .MuiChip-label": { px: 1 } }} />
            ))}
          </Stack>
        </Box>
        <Dialog open={filterDialog !== null} onClose={handleCloseFilter} maxWidth="xs" fullWidth>
          <DialogTitle>{getActiveFilterDialog()?.label}</DialogTitle>
          <DialogContent>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>{getActiveFilterDialog()?.label}</InputLabel>
              <Select value={tempFilterValue} label={getActiveFilterDialog()?.label} onChange={(e) => setTempFilterValue(e.target.value)}>
                {getActiveFilterDialog()?.properties.options?.map((option: any) => (
                  <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseFilter}>Batal</Button>
            <Button onClick={handleApplyFilter} variant="contained">Terapkan</Button>
          </DialogActions>
        </Dialog>
        <Grid container spacing={3}>
          <KPICard title="Total Laporan Diserahkan" value={DUMMY_DATA.kpiCards.totalReports.value} subtitle={DUMMY_DATA.kpiCards.totalReports.subtitle} icon="mdi:file-document-multiple" color="primary" trend={DUMMY_DATA.kpiCards.totalReports.trend} trendUp={DUMMY_DATA.kpiCards.totalReports.trendUp} loading={loading} />
          <KPICard title="Karyawan Aktif Melaporkan" value={DUMMY_DATA.kpiCards.activeEmployees.value} subtitle={DUMMY_DATA.kpiCards.activeEmployees.subtitle} icon="mdi:account-check" color="success" trend={DUMMY_DATA.kpiCards.activeEmployees.trend} trendUp={DUMMY_DATA.kpiCards.activeEmployees.trendUp} loading={loading} />
          <KPICard title="Total Pelanggaran" value={DUMMY_DATA.kpiCards.totalViolations.value} subtitle={DUMMY_DATA.kpiCards.totalViolations.subtitle} icon="mdi:alert-octagon" color="error" trend={DUMMY_DATA.kpiCards.totalViolations.trend} trendUp={DUMMY_DATA.kpiCards.totalViolations.trendUp} loading={loading} />
          <KPICard title="Area Patroli Aktif" value={DUMMY_DATA.kpiCards.activePatrolAreas.value} subtitle={DUMMY_DATA.kpiCards.activePatrolAreas.subtitle} icon="mdi:map-marker-multiple" color="warning" trend={DUMMY_DATA.kpiCards.activePatrolAreas.trend} trendUp={DUMMY_DATA.kpiCards.activePatrolAreas.trendUp} loading={loading} />
          <Grid size={8}>
            <Card sx={{ height: "100%" }}>
              <CardHeader title="Tren Aktivitas Laporan" subheader="Jumlah laporan yang diserahkan per bulan" />
              <ChartLegends colors={[theme.palette.primary.main, theme.palette.success.main, theme.palette.warning.main, theme.palette.info.main]} labels={["Laporan Pengecekan", "Laporan Kunjungan", "Laporan Kinerja", "Laporan Insiden"]} sx={{ px: 3, gap: 3, mb: 2 }} />
              {loading ? <Box sx={{ p: 2.5 }}><Skeleton variant="rectangular" height={320} /></Box> : <Chart type="line" series={DUMMY_DATA.reportActivityTrend.series} options={reportTrendChartOptions} height={320} sx={{ py: 2.5, pl: 1, pr: 2.5 }} />}
            </Card>
          </Grid>
          <Grid size={4}>
            <Card sx={{ height: "100%" }}>
              <CardHeader title="Karyawan Paling Aktif" subheader="Top 10 berdasarkan jumlah laporan" />
              <CardContent>{loading ? <Skeleton variant="rectangular" height={400} /> : <Box sx={{ maxHeight: 400, overflowY: "auto" }}>{DUMMY_DATA.mostActiveEmployees.map((emp, idx) => <EmployeeItem key={emp.id} employee={emp} rank={idx + 1} maxValue={DUMMY_DATA.mostActiveEmployees[0].reports} />)}</Box>}</CardContent>
            </Card>
          </Grid>
          <Grid size={6}>
            <Card sx={{ height: "100%" }}>
              <CardHeader title="Pelanggaran Berdasarkan Jenis" subheader="Kategori pelanggaran yang tercatat" />
              {loading ? <Box sx={{ p: 2.5 }}><Skeleton variant="rectangular" height={320} /></Box> : <Chart type="bar" series={DUMMY_DATA.violationsByType.series} options={violationsChartOptions} height={320} sx={{ py: 2.5, pl: 1, pr: 2.5 }} />}
            </Card>
          </Grid>
          <Grid size={6}>
            <Card sx={{ height: "100%" }}>
              <CardHeader title="Karyawan dengan Pelanggaran Terbanyak" subheader="Ranking berdasarkan jumlah pelanggaran" />
              <CardContent>{loading ? <Skeleton variant="rectangular" height={320} /> : <Box sx={{ maxHeight: 320, overflowY: "auto" }}>{DUMMY_DATA.employeesWithViolations.map((emp, idx) => <ViolationItem key={emp.id} employee={emp} rank={idx + 1} />)}</Box>}</CardContent>
            </Card>
          </Grid>
          <Grid size={6}>
            <Card sx={{ height: "100%" }}>
              <CardHeader title="Area Paling Aktif" subheader="Ranking area berdasarkan laporan yang diserahkan" />
              {loading ? <Box sx={{ p: 2.5 }}><Skeleton variant="rectangular" height={320} /></Box> : <Chart type="bar" series={DUMMY_DATA.mostActiveAreas.series} options={activeAreasChartOptions} height={320} sx={{ py: 2.5, pl: 1, pr: 2.5 }} />}
            </Card>
          </Grid>
          <Grid size={6}>
            <Card sx={{ height: "100%" }}>
              <CardHeader title="Unit Kerja Paling Aktif" subheader="Ranking unit berdasarkan aktivitas pelaporan" />
              {loading ? <Box sx={{ p: 2.5 }}><Skeleton variant="rectangular" height={320} /></Box> : <Chart type="bar" series={DUMMY_DATA.mostActiveWorkUnits.series} options={activeUnitsChartOptions} height={320} sx={{ py: 2.5, pl: 1, pr: 2.5 }} />}
            </Card>
          </Grid>
          <Grid size={12}><LatestReportsCard /></Grid>
          <Grid size={12}>
            <Card>
              <CardHeader title="Monitor Lokasi Laporan" subheader="Peta interaktif menampilkan koordinat GPS laporan" action={
                <Stack direction="row" spacing={1}>
                  <Chip icon={<Icon icon="mdi:shield-account" width={16} />} label="Patroli" size="small" sx={{ bgcolor: theme.palette.primary.lighter }} />
                  <Chip icon={<Icon icon="mdi:alert-circle" width={16} />} label="Insiden" size="small" sx={{ bgcolor: theme.palette.error.lighter }} />
                  <Chip icon={<Icon icon="mdi:clipboard-check" width={16} />} label="Pengecekan" size="small" sx={{ bgcolor: theme.palette.success.lighter }} />
                  <Chip icon={<Icon icon="mdi:map-marker-check" width={16} />} label="Kunjungan" size="small" sx={{ bgcolor: theme.palette.info.lighter }} />
                </Stack>
              } />
              <CardContent>
                {loading ? <Skeleton variant="rectangular" height={500} /> : (
                  <Box>
                    <Box sx={{ position: "relative", height: 500, bgcolor: theme.palette.grey[100], borderRadius: 2, overflow: "hidden", border: `1px solid ${theme.palette.divider}` }}>
                      <Box sx={{ width: "100%", height: "100%", background: `linear-gradient(to right, ${theme.palette.grey[200]} 1px, transparent 1px), linear-gradient(to bottom, ${theme.palette.grey[200]} 1px, transparent 1px)`, backgroundSize: "40px 40px", position: "relative" }}>
                        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center", color: theme.palette.text.secondary }}>
                          <Icon icon="mdi:map" width={64} color={theme.palette.grey[400]} />
                          <Typography variant="body2" sx={{ mt: 2 }}>Interactive Map Area</Typography>
                          <Typography variant="caption" color="text.secondary">Integrasi dengan Google Maps / Mapbox / Leaflet</Typography>
                        </Box>
                        {DUMMY_DATA.mapLocations.map((location, idx) => {
                          const xPos = 15 + (idx % 3) * 30;
                          const yPos = 20 + Math.floor(idx / 3) * 35;
                          return (
                            <Tooltip key={location.id} title={<Box><Typography variant="caption" fontWeight={600}>{location.name}</Typography><Typography variant="caption" display="block">Petugas: {location.employee}</Typography><Typography variant="caption" display="block">Waktu: {location.date}</Typography><Typography variant="caption" display="block">Status: {location.status}</Typography></Box>}>
                              <Box onClick={() => setSelectedLocation(location.id)} sx={{ position: "absolute", left: `${xPos}%`, top: `${yPos}%`, transform: "translate(-50%, -100%)", cursor: "pointer", transition: "all 0.3s", "&:hover": { transform: "translate(-50%, -100%) scale(1.2)" } }}>
                                <Box sx={{ width: 40, height: 40, borderRadius: "50% 50% 50% 0", transform: "rotate(-45deg)", bgcolor: getMarkerColor(location.type, location.status), display: "flex", alignItems: "center", justifyContent: "center", boxShadow: theme.shadows[4], border: selectedLocation === location.id ? `3px solid ${theme.palette.common.white}` : "none" }}>
                                  <Icon icon={getMarkerIcon(location.type)} width={20} color={theme.palette.common.white} style={{ transform: "rotate(45deg)" }} />
                                </Box>
                              </Box>
                            </Tooltip>
                          );
                        })}
                      </Box>
                    </Box>
                    <Box sx={{ mt: 3 }}>
                      <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 2 }}>Detail Lokasi Laporan</Typography>
                      <TableContainer component={Paper} variant="outlined">
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell>Nama Laporan</TableCell>
                              <TableCell>Petugas</TableCell>
                              <TableCell>Koordinat</TableCell>
                              <TableCell>Waktu</TableCell>
                              <TableCell>Status</TableCell>
                              <TableCell align="right">Aksi</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {DUMMY_DATA.mapLocations.map((location) => (
                              <TableRow key={location.id} hover selected={selectedLocation === location.id} sx={{ cursor: "pointer", bgcolor: selectedLocation === location.id ? theme.palette.action.selected : "inherit" }} onClick={() => setSelectedLocation(location.id)}>
                                <TableCell>
                                  <Stack direction="row" spacing={1} alignItems="center">
                                    <Icon icon={getMarkerIcon(location.type)} width={20} color={getMarkerColor(location.type, location.status)} />
                                    <Typography variant="body2" noWrap>{location.name}</Typography>
                                  </Stack>
                                </TableCell>
                                <TableCell><Typography variant="body2" noWrap>{location.employee}</Typography></TableCell>
                                <TableCell><Typography variant="caption" color="text.secondary">{location.lat.toFixed(4)}, {location.lng.toFixed(4)}</Typography></TableCell>
                                <TableCell><Typography variant="caption">{location.date}</Typography></TableCell>
                                <TableCell><Chip label={location.status} size="small" color={location.status === "completed" ? "success" : location.status === "pending" ? "warning" : "info"} variant="outlined" /></TableCell>
                                <TableCell align="right">
                                  <Tooltip title="Lihat Detail"><IconButton size="small"><Icon icon="mdi:eye" width={20} /></IconButton></Tooltip>
                                  <Tooltip title="Lihat di Peta"><IconButton size="small"><Icon icon="mdi:map-marker" width={20} /></IconButton></Tooltip>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Box>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </DashboardLayout>
  );
}
