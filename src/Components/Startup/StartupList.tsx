import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Grid, Container, Pagination } from "@mui/material";
import { StartupHttpService } from "../../Http/Startup/Startup.http.service";
import { Startup } from "../../Types/Startup";

export default function StartupList() {
  const [startups, setStartups] = useState<Startup[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await StartupHttpService.getStartups();
        setStartups(data);
      } catch (error) {
        console.error("Error fetching startup data:", error);
      }
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const itemsPerPage = 20;

  // Calculate the start and end index of the items to display
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Slice the list based on the current page
  const currentItems = startups.slice(startIndex, endIndex);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };



  return (
    <Container maxWidth="md">
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {currentItems.map((startup) => (
          <Grid item key={startup.id} xs={12}>
            <Card sx={{ boxShadow: 3, bgcolor: "#f9f9f9", borderRadius: 4 }}>
              <CardContent>
                <Typography variant="h6" component="div" color="primary">
                  {startup.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mb: "10px" }}>
                  Founded: {startup.dateFounded.getFullYear()} | {startup.employees} Employees |{" "}
                  <span style={{ color: "#2ecc71" }}>{startup.totalFunding} $</span> |{" "}
                  {startup.currentInvestmentStage}
                </Typography>
                <Typography color="textPrimary">{startup.shortDescription}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Pagination count={Math.ceil(startups.length / itemsPerPage)} page={currentPage} onChange={handleChange} color="primary" size="medium" sx={{ mt: 2 }} />
    </Container>
  );
}
