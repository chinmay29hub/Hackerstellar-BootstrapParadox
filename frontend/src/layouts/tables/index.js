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


function Tables() {
  const { columns, rows } = authorsTableData;
  const { columns: prCols, rows: prRows } = projectsTableData;

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const query = ref(db, "/transactions");
    return onValue(query, (snapshot) => {
      const data = snapshot.val();

      if (snapshot.exists()) {
        setProjects([data]);
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
            <th>Account Name</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Date</th>
            <th>Description</th>
            <th>Transaction Type</th>
          </tr>
        </thead>
        <tbody>
  {projects.map((projectArray, index) => (
    projectArray.map((project, innerIndex) => (
      <tr key={`${index}-${innerIndex}`}>
        <td>{project["Account Name"]}</td>
        <td>{project["Amount"]}</td>
        <td>{project["Category"]}</td>
        <td>{project["Date"]}</td>
        <td>{project["Description"]}</td>
        <td>{project["Transaction Type"]}</td>
      </tr>
    ))
  ))}
</tbody>

      </table>


            {
              console.log(projects)
            }
          </VuiBox>
        </Card>
      </VuiBox>
    </DashboardLayout>
  );
}

export default Tables;
