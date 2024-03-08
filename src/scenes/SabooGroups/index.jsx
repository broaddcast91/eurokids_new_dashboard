import { Box, Button } from "@mui/material";
// import { DataGrid,  } from '@mui/x-data-grid';
import { tokens } from "../../theme";
// import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";

//import date range picker files
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import { LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
// import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";

const SabooGroups = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);

  const [col, setCol] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await axios.get(
          "https://saboo-groups-backend.onrender.com/getcontactform"
        );
        setCol([
          { field: "id", headerName: "ID", flex: 0.25 },
          {
            field: "name",
            headerName: "Name",
            flex: 0.75,
          },
          {
            field: "email",
            headerName: "Email",
            flex: 1,
          },
          {
            field: "phone",
            headerName: "Phone Number",
            flex: 0.75,
            cellClassName: "Mobile-column--cell",
          },

          {
            field: "company",
            headerName: "Company",
            flex: 1,
          },
          {
            field: "subject",
            headerName: "Subject",
            flex: 0.80,
          },
          {
            field: "message",
            headerName: "Message",
            flex: 1,
          },
          {
            field: "date",
            headerName: "Date",
            flex: 0.5,
          },

          {
            field: "time",
            headerName: "Time",
            flex: 0.35,
          },
        ]);
        setData(res.data.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  let newData = data.map((item, index) => {
    return { ...item, id: index + 1 };
  });

//   date range unique function
    const handleStartDateChange = (event) => {
      setStartDate(event.target.value);
    };

    const handleEndDateChange = (event) => {
      setEndDate(event.target.value);
    };

    async function fetchUniqueValues(startDate, endDate) {
      try {

        const res = await axios.post(
          "https://saboo-groups-backend.onrender.com/SabooGroupsRange",
          {
            startDate: startDate,
            endDate: endDate,
          }
        );
        setCol([
            { field: "id", headerName: "ID", flex: 0.25 },
            {
              field: "name",
              headerName: "Name",
              flex: 0.75,
            },
            {
              field: "email",
              headerName: "Email",
              flex: 1,
            },
            {
              field: "phone",
              headerName: "Phone Number",
              flex: 0.75,
              cellClassName: "Mobile-column--cell",
            },
  
            {
              field: "company",
              headerName: "Company",
              flex: 1,
            },
            {
              field: "subject",
              headerName: "Subject",
              flex: 0.80,
            },
            {
              field: "message",
              headerName: "Message",
              flex: 1,
            },
            {
              field: "date",
              headerName: "Date",
              flex: 0.5,
            },
  
            {
              field: "time",
              headerName: "Time",
              flex: 0.35,
            },
          ]);
        setData(res.data.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    }

    useEffect(() => {
      if (startDate && endDate) {
        fetchUniqueValues(startDate, endDate);
      }
    }, [startDate, endDate]);

    const handleReset = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          "https://saboo-groups-backend.onrender.com/getcontactform"
        );
        setCol([
            { field: "id", headerName: "ID", flex: 0.25 },
            {
              field: "name",
              headerName: "Name",
              flex: 0.75,
            },
            {
              field: "email",
              headerName: "Email",
              flex: 1,
            },
            {
              field: "phone",
              headerName: "Phone Number",
              flex: 0.75,
              cellClassName: "Mobile-column--cell",
            },
  
            {
              field: "company",
              headerName: "Company",
              flex: 1,
            },
            {
              field: "subject",
              headerName: "Subject",
              flex: 0.80,
            },
            {
              field: "message",
              headerName: "Message",
              flex: 1,
            },
            {
              field: "date",
              headerName: "Date",
              flex: 0.5,
            },
  
            {
              field: "time",
              headerName: "Time",
              flex: 0.35,
            },
          ]);
        setData(res.data.data);

        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

  const handleDup = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "https://saboo-groups-backend.onrender.com/dupesSabooGroupsContactUs"
      );

      // Process the response data to create rows with phoneNumber, model, and count
      const processedData = [];
      let idCounter = 1;

      res.data.data.forEach((item) => {
        processedData.push({
          id: idCounter++,
          phoneNumber: item.number,

          count: item.count,
          date: item.date, // Adding the date field
        });
      });

      setCol([
        { field: "id", headerName: "ID", flex: 0.5 },
        {
          field: "phoneNumber",
          headerName: "Phone Number",
          flex: 1,
          cellClassName: "Mobile-column--cell",
        },
        // { field: "model", headerName: "Model", flex: 1 },
        { field: "count", headerName: "Count", flex: 1 },
        { field: "date", headerName: "Date", flex: 1 }, // Adding the date column
      ]);

      setData(processedData);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };
    const uniqueEntries = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://saboo-groups-backend.onrender.com/SabooGroupsUniqueEntries`
        );
        setCol([
            { field: "id", headerName: "ID", flex: 0.25 },
            {
              field: "name",
              headerName: "Name",
              flex: 0.75,
            },
            {
              field: "email",
              headerName: "Email",
              flex: 1,
            },
            {
              field: "phone",
              headerName: "Phone Number",
              flex: 0.75,
              cellClassName: "Mobile-column--cell",
            },
  
            {
              field: "company",
              headerName: "Company",
              flex: 1,
            },
            {
              field: "subject",
              headerName: "Subject",
              flex: 0.80,
            },
            {
              field: "message",
              headerName: "Message",
              flex: 1,
            },
            {
              field: "date",
              headerName: "Date",
              flex: 0.5,
            },
  
            {
              field: "time",
              headerName: "Time",
              flex: 0.35,
            },
          ]);
        setData(res.data.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
  const handleDownloadCSV = () => {
    const csvData = [];
    const headers = col.map((column) => column.headerName);
    csvData.push(headers);

    newData.forEach((item) => {
      const row = col.map((column) => item[column.field]);
      csvData.push(row);
    });

    const csvContent = csvData.map((row) => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "contactUs(sabooGroups).csv";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  // Custom toolbar with the download button

  const CustomToolbar = () => {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <IconButton
          color="primary"
          onClick={handleDownloadCSV}
          sx={{
            marginLeft: "10px",
            backgroundColor: "white",
            fontSize: "14px",
            padding: "5px",
            minWidth: "auto",
            height: "25px",
            color: "#3e4396",
          }}
        >
          <DownloadIcon />
        </IconButton>
      </GridToolbarContainer>
    );
  };
  return (
    <Box m="20px">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {" "}
        <Header
          title="Saboo Groups Contact us "
          subtitle="Data from Saboo Groups"
        />
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ marginRight: "10px" }}>
            <TextField
              id="start-date"
              label="Start Date"
              type="date"
              value={startDate}
              onChange={handleStartDateChange}
              InputLabelProps={{
                shrink: true,
              }}
              sx={{ margin: "10px" }}
            />

            <TextField
              id="end-date"
              label="End Date"
              type="date"
              value={endDate}
              onChange={handleEndDateChange}
              InputLabelProps={{
                shrink: true,
              }}
              sx={{ margin: "10px" }}
            />
          </div>

          <Button
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: "#3e4396",
              mr: 2,
              color: "white",
              "&:hover": {
                backgroundColor: "red",
              },
            }}
            onClick={handleDup}
          >
            Duplicates
          </Button>

            
          <Button
            variant="contained"
            color="primary"
            sx={{
              mr: 2,
              backgroundColor: "#3e4396",
              color: "white",
              "&:hover": {
                backgroundColor: "red",
              },
            }}
            onClick={uniqueEntries}
          >
            {" "}
            <LooksOneIcon />
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: "#3e4396",
              color: "white",
              "&:hover": {
                backgroundColor: "red",
              },
            }}
            onClick={handleReset}
          >
            Reset
          </Button>
        </div>
      </div>

      <Box
       
        height="83vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
            backgroundColor: "white",
            // border: "1px solid #ccc", // Add a border to the table
          },
          "& .phone-column--cell": {
            color: colors.sabooAutoColors[500],
          },
          "& .MuiDataGrid-columnHeader": {
            color: "white",
            backgroundColor: colors.blueAccent[700], // Optional background color for headers
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.sabooAutoColors[400],
          },
          // "& .MuiDataGrid-footerContainer": {
          //   borderTop: "none",
          //   backgroundColor: colors.blueAccent[700],
          //   "& .MuiTypography-root": {
          //     color: "white", // Change the footer text color to white
          //   },
          // },
          "& .MuiCheckbox-root": {
            color: `${colors.blueAccent[700]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text ": {
            color: `${colors.blueAccent[700]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text:hover ": {
            color: `${colors.blueAccent[700]}} !important`,
          },
          "& .MuiDataGrid-sortIcon": {
            color: "white",
          },
          // "& .MuiDataGrid-cell": {
          //   //borderBottom: "none",
          //   backgroundColor: "white",
          //   borderBottom: "1px solid #ccc", // Add a border to table cells
          // },

          "& .css-196n7va-MuiSvgIcon-root": {
            color: "white",
          },
        }}
      >
        {loading ? (
          <div style={{ fontSize: "14px" }}>Processing, please wait...</div>
        ) : error ? (
          "Error ~ Something went wrong :)"
        ) : (
          <DataGrid
            rows={newData}
            columns={col.map((column) => ({
              ...column,
              renderCell: (params) => (
                <div
                  style={{
                    whiteSpace: "pre-wrap", // Enable word wrapping
                    overflow: "hidden", // Hide overflow content
                    textOverflow: "ellipsis", // Show ellipsis for overflow
                  }}
                >
                  {params.value}
                </div>
              ),
            }))}
            components={{ Toolbar: CustomToolbar }}
            sx={{
              backgroundColor: "white", // Set the background color to white
              fontSize:15
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default SabooGroups;
