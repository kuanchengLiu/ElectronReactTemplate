import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useMovieData } from "@mui/x-data-grid-generator";
import Button from "@mui/material/Button";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import Stack from "@mui/material/Stack";
import ServerDialog from "../../components/CreateServerDialog";
import { useDialog } from "../../hooks/useDialog";

const VISIBLE_FIELDS = [
  "test",
  "title",
  "company",
  "director",
  "year",
  "cinematicUniverse",
];

export default function QuickFilteringInitialize() {
  const data = useMovieData();
  const { isOpen, openDialog, closeDialog } = useDialog();

  const columns = React.useMemo(
    () =>
      data.columns.filter((column) => VISIBLE_FIELDS.includes(column.field)),
    [data.columns]
  );
  const handleCreate = () => {};
  return (
    <Box sx={{ height: 400, width: 1, p: 2 }}>
      <Stack direction="row" spacing={1} alignItems="center" p={2}>
        <Button
          variant="outlined"
          size="small"
          onClick={openDialog}
          startIcon={<NoteAddIcon fontSize="inherit" />}
        >
          Create Server
        </Button>
      </Stack>

      <DataGrid
        {...data}
        initialState={{
          filter: {
            filterModel: {
              items: [],
            },
          },
        }}
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        columns={columns}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
      />

      <ServerDialog
        open={isOpen}
        onClose={closeDialog}
        onCreate={handleCreate}
      />
    </Box>
  );
}
