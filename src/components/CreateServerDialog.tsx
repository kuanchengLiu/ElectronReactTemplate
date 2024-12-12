import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useForm } from "../hooks/useForm";

const CreateServerDialog: React.FC<{
  open: boolean;
  onClose: () => void;
  onCreate: (data: Record<string, unknown>) => void;
}> = ({ open, onClose, onCreate }) => {
  const { formData, errors, handleChange, handleSubmit } = useForm({
    initialValues: {
      Servername: "",
      BuildPlan: "",
      Site: "",
      ServerType: "beta",
      SiteDescription: "",
      SiteMaster: "",
      IsMaster: "true",
      IPAddress: "",
      TimeOffset: "",
      PMfullname: "",
      L2fullname: "",
      Location: "",
    },
    validationRules: {
      Servername: /^[a-zA-Z0-9_-]{3,}$/,
      BuildPlan: /^([a-zA-Z0-9]+,)*[a-zA-Z0-9]+$/,
      IPAddress:
        /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)$/,
      TimeOffset: /^UTC[+-][0-9]{2}$/,
      PMfullname: /^[a-zA-Z\\s]{3,}$/,
      L2fullname: /^[a-zA-Z\\s]{3,}$/,
    },
    onSubmit: onCreate,
    onClose,
  });

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Create New Server</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} p={1}>
          <Grid size={4}>
            <TextField
              name="Servername"
              label="Servername"
              value={formData.Servername}
              onChange={handleChange}
              error={!!errors.Servername}
              helperText={errors.Servername}
              fullWidth
            />
          </Grid>
          <Grid size={4}>
            <TextField
              name="BuildPlan"
              label="Build Plan (comma-separated)"
              value={formData.BuildPlan}
              onChange={handleChange}
              error={!!errors.BuildPlan}
              helperText={errors.BuildPlan}
              fullWidth
            />
          </Grid>
          <Grid size={4}>
            <TextField
              name="Site"
              label="Site"
              value={formData.Site}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid size={4}>
            <FormLabel component="legend">Environment</FormLabel>
            <RadioGroup
              name="ServerType"
              value={formData.ServerType}
              onChange={handleChange}
              row
            >
              <FormControlLabel value="beta" control={<Radio />} label="Beta" />
              <FormControlLabel value="prod" control={<Radio />} label="Prod" />
            </RadioGroup>
          </Grid>
          <Grid size={4}>
            <FormLabel component="legend">Is Master</FormLabel>
            <RadioGroup
              name="IsMaster"
              value={formData.IsMaster}
              onChange={handleChange}
              row
            >
              <FormControlLabel value="true" control={<Radio />} label="True" />
              <FormControlLabel
                value="false"
                control={<Radio />}
                label="False"
              />
            </RadioGroup>
          </Grid>
          <Grid size={4}>
            <TextField
              name="IPAddress"
              label="IP Address"
              value={formData.IPAddress}
              onChange={handleChange}
              error={!!errors.IPAddress}
              helperText={errors.IPAddress}
              fullWidth
            />
          </Grid>
          <Grid size={4}>
            <TextField
              name="TimeOffset"
              label="Time Offset (e.g., UTC+08)"
              value={formData.TimeOffset}
              onChange={handleChange}
              error={!!errors.TimeOffset}
              helperText={errors.TimeOffset}
              fullWidth
            />
          </Grid>
          <Grid size={4}>
            <TextField
              name="PMfullname"
              label="PM Fullname"
              value={formData.PMfullname}
              onChange={handleChange}
              error={!!errors.PMfullname}
              helperText={errors.PMfullname}
              fullWidth
            />
          </Grid>
          <Grid size={4}>
            <TextField
              name="L2fullname"
              label="L2 Fullname"
              value={formData.L2fullname}
              onChange={handleChange}
              error={!!errors.L2fullname}
              helperText={errors.L2fullname}
              fullWidth
            />
          </Grid>
          <Grid size={4}>
            <TextField
              name="Location"
              label="Location"
              value={formData.Location}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateServerDialog;