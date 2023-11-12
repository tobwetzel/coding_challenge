import { Fragment, ReactElement, useEffect, useState } from "react";
import { StartupHttpService } from "../../Http/Startup/Startup.http.service";
import { Startup } from "../../Types/Startup";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {Pagination} from '@mui/material'

export default function StartupList(): ReactElement {
  const [ data, setData ] = useState<Startup[]>([]);
  const [ currentPage, setCurrentPage ] = useState(1)
  const [ startupsPerPage ] = useState(3)


  const fetchData = async () => {
    const response = await StartupHttpService.getStartups();
    setData(response);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const indexOfLastStartup = currentPage * startupsPerPage
  const indexOfFirstStartup = indexOfLastStartup - startupsPerPage
  const currentStartups = data.slice(indexOfFirstStartup, indexOfLastStartup)
  const totalStartups = data.length
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalStartups / startupsPerPage); i++) {
    pageNumbers.push(i)
  }

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)
 

  return (
    <Fragment>
      {currentStartups.map((item) => (
        <Card sx={{marginBottom: '1.5rem'}}>
          <CardContent>
            <Typography variant="h5" component="div">
              {item.name}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Founded: {item.dateFounded.getFullYear()} | {item.employees} Employees | {item.totalFunding} | {item.currentInvestmentStage}
            </Typography>
            <Typography variant="body2">
              {item.shortDescription}
            </Typography>
          </CardContent>
        </Card>
      ))}   
        <Pagination sx={{justifyContent:'center', alignItems:'center', display:'flex'}}count={startupsPerPage} onChange={(e: any, pageNumber: number) => paginate(pageNumber)}/>
    </Fragment>
  );
}
