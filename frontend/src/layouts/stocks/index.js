// @mui material components
import Card from "@mui/material/Card";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

// Vision UI Dashboard React example components
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

  useEffect(() => {
    const query = ref(db, "/stocks");
    return onValue(query, (snapshot) => {
      const data = snapshot.val();

      if (snapshot.exists()) {
        setStocks([data]);
      }
    });
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <VuiBox py={3}>
        <VuiBox mb={3}>
          
        </VuiBox>
        <Card>
          <VuiBox display="flex" justifyContent="space-between" alignItems="center">
            <VuiTypography variant="lg" color="white">
              Projects table
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
            <th>Sustainable</th>
            <th>Symbol</th>
          </tr>
        </thead>
        <tbody>
  {stocks.map((stockArray, index) => (
    stockArray.map((stock, innerIndex) => (
      <tr key={`${index}-${innerIndex}`}>
        <td>{stock["30 d % chng"]}</td>
        <td>{stock["Holding"]}</td>
        <td>{stock["Market"]}</td>
        <td>{stock["Open"]}</td>
        <td>{stock["Sustainable"]}</td>
        <td>{stock["Symbol Type"]}</td>
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
      </VuiBox>
    </DashboardLayout>
  );
}

export default Stocks;
