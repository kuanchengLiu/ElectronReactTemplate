import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useMovieData } from "@mui/x-data-grid-generator";
import Button from "@mui/material/Button";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import "./ServerPage.model.scss";
import Stack from "@mui/material/Stack";
import PrintIcon from "@mui/icons-material/Print";
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

  // Otherwise filter will be applied on fields such as the hidden column id
  const columns = React.useMemo(
    () =>
      data.columns.filter((column) => VISIBLE_FIELDS.includes(column.field)),
    [data.columns]
  );

  return (
    <Box sx={{ height: 400, width: 1, p: 2 }}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Button
          variant="outlined"
          size="small"
          startIcon={<NoteAddIcon fontSize="inherit" />}
        >
          Create Server
        </Button>
        <Button
          variant="outlined"
          size="small"
          startIcon={<PrintIcon fontSize="inherit" />}
        >
          Print
        </Button>
      </Stack>
      <Button
        className="create-server-button"
        variant="contained"
        startIcon={<NoteAddIcon />}
      >
        Contained
      </Button>

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
    </Box>
  );
}
