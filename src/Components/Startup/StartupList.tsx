import { CardContent, List, ListItem, Pagination, Stack, Typography } from "@mui/material";
import { Fragment, ReactElement, useEffect, useState } from "react";
import { StartupHttpService } from "../../Http/Startup/Startup.http.service";
import { Startup } from "../../Types/Startup";

export default function StartupList(): ReactElement {
  const [ data, setData ] = useState<Startup[]>();
  const [ currentPage, setCurrentPage ] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    StartupHttpService.getStartups().then(response => {
      setData(response);
    }).catch(error => {
      console.log('Failed to fetch data: ', error.message);
    })
  }, []);

  return <Fragment>
    <List>
        { data && (data.map((el, index) => (
          <ListItem key={ index }>
            <CardContent style={{
              width: '100%',
              background: '#fff',
              padding: '12px',
              boxShadow: "0px 0.5px 0.5px #000"
            }}>
              <Typography variant="h5" component="div">
                { el.name }
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Founded: {
                  el.dateFounded.getFullYear()
                  } | { ' ' } {el.employees} { ' ' } Employees
                  | { ' ' } {el.totalFunding} { ' ' } $
                  | { ' ' } {el.currentInvestmentStage}
              </Typography>
              <Typography variant="body1">
                { el.shortDescription }
              </Typography>
            </CardContent>
          </ListItem>))).slice(((currentPage - 1) * itemsPerPage), (currentPage * itemsPerPage))
        }
    </List>
      <Stack>
        <Pagination count={data && data?.length / itemsPerPage} onChange={(value, page) => setCurrentPage(page)} />
      </Stack>
  </Fragment>;
}
