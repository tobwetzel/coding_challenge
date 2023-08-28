import { Fragment, ReactElement, useEffect, useState } from "react";
import { Startup } from "../../Types/Startup";
import { StartupHttpService } from "../../Http/Startup/Startup.http.service";
import List from "@mui/material/List";
import StartupItem from "./StartupItem";
import { Box, CircularProgress, Pagination } from "@mui/material";
const itemsPerPage = 20;
export default function StartupList(): ReactElement {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [startupList, setStartupList] = useState<Startup[]>([]);
  const [visibleList, setVisibleList] = useState<Startup[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const handleChange = (evt: any, page: number) => {
    const list = startupList.slice(
      (page - 1) * itemsPerPage,
      itemsPerPage * page
    );
    setCurrentPage(page);
    setVisibleList(list);
  };
  useEffect(() => {
    handleFetchStartups();
  }, []);
  const handleFetchStartups = async () => {
    setIsLoading(true);
    try {
      const list = await StartupHttpService.getStartups();
      setStartupList(list);
      setVisibleList(list.slice(0, itemsPerPage));
    } catch (error) {
      console.error(error);
      alert("Error , Please try again Later!");
    }
    setIsLoading(false);
  };
  if (isLoading)
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  return (
    <Fragment>
      <List sx={{ width: "100%" }}>
        {visibleList.map((startup) => (
          <StartupItem startup={startup} key={startup.id} />
        ))}
      </List>
      <Pagination
        count={Math.floor(startupList.length / itemsPerPage)}
        page={currentPage}
        onChange={handleChange}
      />
    </Fragment>
  );
}
