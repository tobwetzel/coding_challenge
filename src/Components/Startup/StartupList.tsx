import { Fragment, ReactElement, useEffect, useState } from "react";
import { StartupHttpService } from "../../Http/Startup/Startup.http.service";
import { Startup } from "../../Types/Startup";



export default function StartupList(): ReactElement {

  const [startups, setStartups] = useState<Startup[]>([]);

  useEffect(() => {
      StartupHttpService.getStartups().then((startups) => {
        return setStartups(startups);
      });
    }, []);


  return (
<Fragment>
    {startups?.map((startup: Startup) => {
      return (
        <div>
      <h1>{startup.name}</h1>
      <h6>Founded {startup.dateFounded.toISOString} | {startup.employees} Employees | {startup.totalFunding} $ | {startup.currentInvestmentStage}</h6><p>{startup.shortDescription}</p>
    </div>
    )})}
</Fragment>
  )
}