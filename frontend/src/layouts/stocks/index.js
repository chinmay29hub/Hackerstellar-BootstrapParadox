// @mui material components
import Card from "@mui/material/Card";

// Bootstrap Paradox Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

// Bootstrap Paradox Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Table from "examples/Tables/Table";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";

import { db } from "layouts/authentication/firebase";
import { onValue, ref } from "firebase/database";

import { useState, useEffect } from "react";


function Stocks() {
  const { columns, rows } = authorsTableData;
  const { columns: prCols, rows: prRows } = projectsTableData;

  const [stocks, setStocks] = useState([]);

  const [text, setText] = useState("");

  useEffect(() => {
    const query = ref(db, "/stocks");
    return onValue(query, (snapshot) => {
      const data = snapshot.val();

      if (snapshot.exists()) {
        setStocks([data]);
      }
    });
  }, []);

  const symbolTextMap = {
    "NOVABANK": "This futuristic bank has adopted sustainable techniques to keep track of Terra Coins and even create them with least carbon emission.",
    "TERAT-AUTO": "These electric automobiles company is leading the way to an environment friendly transportation manufacturing.",
    "BPCL": "BPCL has revolutionized housing systems by creating anti-pollution paint that captures dust and emissions molecules and disintegrates them to their non-existence. ",
    "DIVISLAB" : "This green house energy company has been leading the way for energy consumption on Tera Nova with a focus on protecting it by not repeating the mistakes done on planet Earth.   ",
    "TETTRECH" : "This fashionable store has been using environment friendly production techniques that is benefitting the planet without dropping on the fashion scale."
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <VuiBox py={3}>
        <VuiBox mb={3}>
          
        </VuiBox>
        <Card>
          <VuiBox display="flex" justifyContent="space-between" alignItems="center">
            <VuiTypography variant="lg" color="white">
              User's Stocks
            </VuiTypography>
          </VuiBox>
          <VuiBox
            sx={{
              "& th": {
                borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                  `${borderWidth[1]} solid ${grey[700]}`,
              },
              "& .MuiTableRow-root:not(:last-child)": {
                "& td": {
                  borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                    `${borderWidth[1]} solid ${grey[700]}`,
                },
              },
            }}
          >
            {/* <Table columns={prCols} rows={prRows} /> */}
            <table>
        <thead>
          <tr>
            <th>30 d % chng</th>
            <th>Holding</th>
            <th>Market</th>
            <th>Open</th>
            {/* <th>Sustainable</th> */}
            <th>Symbol</th>
          </tr>
        </thead>
        <tbody>
  {stocks.map((stockArray, index) => (
    stockArray
      .filter((stock) => stock["Holding"] > 0)
      .map((stock, innerIndex) => (
        <tr key={`${index}-${innerIndex}`}>
          <td>{stock["30 d % chng"]}</td>
          <td>{stock["Holding"]}</td>
          <td>{stock["Market"]}</td>
          <td>{stock["Open"]}</td>
          {/* <td>{stock["Sustainable"]}</td> */}
          <td>{stock["Symbol"]}</td>
        </tr>
      ))
  ))}
</tbody>

      </table>


            {
              console.log(stocks)
            }
          </VuiBox>
        </Card>
        <br></br>
        <Card>
          <VuiBox display="flex" justifyContent="space-between" alignItems="center">
            <VuiTypography variant="lg" color="white">
              Recommended Stocks
            </VuiTypography>
          </VuiBox>
          <VuiBox
            sx={{
              "& th": {
                borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                  `${borderWidth[1]} solid ${grey[700]}`,
              },
              "& .MuiTableRow-root:not(:last-child)": {
                "& td": {
                  borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                    `${borderWidth[1]} solid ${grey[700]}`,
                },
              },
            }}
          >
            {/* <Table columns={prCols} rows={prRows} /> */}
            <table>
        <thead>
          <tr>
            <th>30 d % chng</th>
            <th>Holding</th>
            <th>Market</th>
            <th>Open</th>
            {/* <th>Sustainable</th> */}
            <th>Symbol</th>
          </tr>
        </thead>
        <tbody>
  {stocks
    .filter((stockArray) => stockArray.some((stock) => stock["Sustainable"] === 1 && stock["Holding"] === ""))
    .slice(0, 5)
    .flatMap((stockArray, index) =>
      stockArray
        .filter((stock) => stock["Sustainable"] === 1 && stock["Holding"] === "")
        .slice(0, 5)
        .map((stock, innerIndex) => (
          <tr key={`${index}-${innerIndex}`}>
            <td>{stock["30 d % chng"]}</td>
            <td>{stock["Holding"]}</td>
            <td>{stock["Market"]}</td>
            <td>{stock["Open"]}</td>
            {/* <td>{stock["Sustainable"]}</td> */}
            <td onClick={() => setText(symbolTextMap[stock["Symbol"]])}>{stock["Symbol"]}</td>
          </tr>
        ))
    )}

</tbody>
      </table>
      <br></br>
      {text && <div>{text}</div>}


            {
              console.log(stocks)
            }
          </VuiBox>
        </Card>
      </VuiBox>
    </DashboardLayout>
  );
}

export default Stocks;
