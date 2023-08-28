import { Fragment, ReactElement } from "react";
import { Startup } from "../../Types/Startup";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
interface StartupItemProps {
  startup: Startup;
}
export default function StartupItem({ startup }: StartupItemProps): ReactElement {
  const {
    name,
    shortDescription,
    dateFounded,
    employees,
    totalFunding,
    currentInvestmentStage,
  } = startup;
  return (
    <ListItem
      alignItems="flex-start"
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        borderRadius: "15px",
        mt: 2,
      }}
    >
      <ListItemText
        primary={name}
        secondary={
          <Fragment>
            <Typography
              sx={{ display: "inline" }}
              component="span"
            >
              {`Founded: ${dateFounded.getFullYear()} | ${employees} Employees | ${totalFunding} $ | ${currentInvestmentStage}`}
            </Typography>
            <br />
            <Typography sx={{ color: "black",mt:'10px' }}>{shortDescription}</Typography>
          </Fragment>
        }
      />
    </ListItem>
  );
}
