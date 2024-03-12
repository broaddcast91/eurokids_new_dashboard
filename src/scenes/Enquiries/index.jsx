import { Box,
  //  Button
   } from "@mui/material";
import { tokens } from "../../theme";
import { useNavigate } from "react-router-dom";

import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";


import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";



const Enquiries = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const [col, setCol] = useState([]);
  // const [startDate, setStartDate] = useState(null);
  // const [endDate, setEndDate] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const token = localStorage.getItem("authToken");
        if (!token) {
           navigate("/login");
          return;
        }
        const res = await axios.get(
          "https://eurokids-1aci.onrender.com/getenquiries",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCol([
          { field: "id", headerName: "ID", flex: 0.5},
          {
            field: "name",
            headerName: "Name",
            flex: 2,
          },
          {
            field: "mobile",
            headerName: "Phone Number",
            flex: 1,
            cellClassName: "phone-column--cell",
          },
          {
            field: "email",
            headerName: "Email",
            flex: 2.5,
          },
          
          {
            field: "date",
            headerName: "Date",
            flex: 0.75,
          },
          {
            field: "time",
            headerName: "Time",
            flex: 0.75,
          },
        ]);
        setData(res.data.data);
      
        setLoading(false);
      } catch (err) {
        setError(err);
        window.alert("token expired")
        navigate("/login");
        setLoading(false);
      }
    }
    fetchData();
  }, [navigate]);

  let newData = data.map((item, index) => {
    return { ...item, id: index + 1 };
  });
  // const handleStartDateChange = (event) => {
  //   setStartDate(event.target.value);
  // };
  
  // const handleEndDateChange = (event) => {
  //   setEndDate(event.target.value);
  // };
  
  // useEffect(() => {
  // async function fetchUniqueValues() {
  //   try {
  //     setLoading(true);
  //     const token = localStorage.getItem("authToken");
  //     if (!token) {
  //        navigate("/login");
  //       return;
  //     }
  //     const res = await axios.post(
  //       "https://arena-backend-zj42.onrender.com/corporateRange",
  //       {
  //         startDate: startDate,
  //         endDate: endDate,
  //       },
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     );
  //     setCol([
  //       { field: "id", headerName: "ID", width:80},
  //       {
  //         field: "name",
  //         headerName: "Name",
  //         flex: 1,
  //       },
  //       {
  //         field: "phone",
  //         headerName: "Phone Number",
  //        width :150,
  //         cellClassName: "phone-column--cell",
  //       },
  //       {
  //         field: "email",
  //         headerName: "Email",
  //         flex: 1,
  //       },
  //       {
  //         field: "outlet",
  //         headerName: "Outlet",
  //         flex: 1,
  //       },
  //       {
  //         field: "allQuery",
  //         headerName: "All Query",
  //         width :270
  //       },
  //       {
  //         field: "error",
  //         headerName: "Error",
  //         width :200
  //       },
  //       {
  //         field: "date",
  //         headerName: "Date",
  //         width:130
  //       },
  //       {
  //         field: "time",
  //         headerName: "Time",
  //         width:130
  //       },
  //     ]);
  //     setData(res.data.data);
  //     setStartDate("")
  //       setEndDate("")
  //     setLoading(false);
  //   } catch (err) {
  //     setError(err);
  //     window.alert("token expired")
  //     navigate("/login");
  //     setLoading(false);
  //   }
  // }


  //   if (startDate && endDate) {
  //     fetchUniqueValues();
  //   }
  // }, [startDate, endDate, navigate]);

  // const handleReset = async () => {
  //   try {
  //     setLoading(true);
  //     const token = localStorage.getItem("authToken");
  //     if (!token) {
  //        navigate("/login");
  //       return;
  //     }
  //     const res = await axios.get(
  //       "https://arena-backend-zj42.onrender.com/getCorporate",
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     );
  //     setCol([
  //       { field: "id", headerName: "ID", width:80},
  //       {
  //         field: "name",
  //         headerName: "Name",
  //         flex: 1,
  //       },
  //       {
  //         field: "phone",
  //         headerName: "Phone Number",
  //        width :150,
  //         cellClassName: "phone-column--cell",
  //       },
  //       {
  //         field: "email",
  //         headerName: "Email",
  //         flex: 1,
  //       },
  //       {
  //         field: "outlet",
  //         headerName: "Outlet",
  //         flex: 1,
  //       },
  //       {
  //         field: "allQuery",
  //         headerName: "All Query",
  //         width :270
  //       },
  //       {
  //         field: "error",
  //         headerName: "Error",
  //         width :200
  //       },
  //       {
  //         field: "date",
  //         headerName: "Date",
  //         width:130
  //       },
  //       {
  //         field: "time",
  //         headerName: "Time",
  //         width:130
  //       },
  //     ]);
  //     setData(res.data.data);
  //     setStartDate("")
  //     setEndDate("")
  //     setLoading(false);
  //   } catch (err) {
  //     setError(err);
  //     window.alert("token expired")
  //     navigate("/login");
  //     setLoading(false);
  //   }
  // };

  // const handleDup = async () => {
  //   try {
  //     setLoading(true);
  //     const token = localStorage.getItem("authToken");
  //     if (!token) {
  //        navigate("/login");
  //       return;
  //     }
  //     const res = await axios.get(
  //       "https://arena-backend-zj42.onrender.com/dupesCorporate",
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //       }

  //     );
  //     setCol([
  //       { field: "id", headerName: "ID", flex: 0.5 },
  //       // {
  //       //   field: 'name',
  //       //   headerName: 'Name',
  //       //   flex: 1,
  //       //   cellClassName: 'name-column--cell',
  //       // },
  //       {
  //         field: "number",
  //         headerName: "Phone Number",
  //         flex: 1,
  //         cellClassName: "phone-column--cell",
  //       },
  //       {
  //         field: "count",
  //         headerName: "Count",
  //         flex: 1,
  //       },

  //       {
  //         field: "date",
  //         headerName: "Date",
  //         flex: 1,
  //       },
  //     ]);
  //     // Process the response data to include an 'id' field for each row
  //     const processedData = res.data.data.map((item, index) => ({
  //       ...item,
  //       id: index + 1,
  //     }));

  //     setData(processedData);
  //     setStartDate("")
  //       setEndDate("")
  //     setLoading(false);
  //   } catch (err) {
  //     setError(err);
  //     window.alert("token expired")
  //     navigate("/login");
  //     setLoading(false);
  //   }
  // };
  // const uniqueEntries = async () => {
  //   try {
  //     setLoading(true);
  //     const token = localStorage.getItem("authToken");
  //     if (!token) {
  //        navigate("/login");
  //       return;
  //     }
  //     const res = await axios.get(
  //       `https://arena-backend-zj42.onrender.com/corporateUniqueEntries`,
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     );
  //     setCol([
  //       { field: "id", headerName: "ID", width:80},
  //       {
  //         field: "name",
  //         headerName: "Name",
  //         flex: 1,
  //       },
  //       {
  //         field: "phone",
  //         headerName: "Phone Number",
  //        width :150,
  //         cellClassName: "phone-column--cell",
  //       },
  //       {
  //         field: "email",
  //         headerName: "Email",
  //         flex: 1,
  //       },
  //       {
  //         field: "outlet",
  //         headerName: "Outlet",
  //         flex: 1,
  //       },
  //       {
  //         field: "allQuery",
  //         headerName: "All Query",
  //         width :270
  //       },
  //       {
  //         field: "error",
  //         headerName: "Error",
  //         width :200
  //       },
  //       {
  //         field: "date",
  //         headerName: "Date",
  //         width:130
  //       },
  //       {
  //         field: "time",
  //         headerName: "Time",
  //         width:130
  //       },
  //     ]);
  //     setData(res.data.data);
  //     setStartDate("")
  //       setEndDate("")
  //     setLoading(false);
  //   } catch (error) {
  //     setError(error);
  //     window.alert("token expired")
  //     navigate("/login");
  //     setLoading(false);
  //   }
  // };
  // const handleDownloadCSV = () => {
  //   const csvData = [];
  //   const headers = col.map((column) => column.headerName);
  //   csvData.push(headers);

  //   newData.forEach((item) => {
  //     const row = col.map((column) => item[column.field]);
  //     csvData.push(row);
  //   });

  //   const csvContent = csvData.map((row) => row.join(",")).join("\n");

  //   const blob = new Blob([csvContent], { type: "text/csv" });
  //   const url = window.URL.createObjectURL(blob);
  //   const a = document.createElement("a");
  //   a.style.display = "none";
  //   a.href = url;
  //   a.download = "Enquiries.csv";
  //   document.body.appendChild(a);
  //   a.click();
  //   window.URL.revokeObjectURL(url);
  //   document.body.removeChild(a);
  // };

  // // Custom toolbar with the download button

  // const CustomToolbar = () => {
  //   return (
  //     <GridToolbarContainer>
  //       <GridToolbarColumnsButton />
  //       <GridToolbarFilterButton />
  //       <GridToolbarDensitySelector />
  //       <IconButton
  //         color="primary"
  //         onClick={handleDownloadCSV}
  //         sx={{
  //           marginLeft: "10px",
  //           backgroundColor: "white",
  //           fontSize: "14px",
  //           padding: "5px",
  //           minWidth: "auto",
  //           height: "25px",
  //           color: "#3e4396",
  //         }}
  //       >
  //         <DownloadIcon />
  //       </IconButton>
  //     </GridToolbarContainer>
  //   );
  // };
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
    a.download = "enquiries.csv";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

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
            color:"#3e4396",
            "&:hover": {
              color:"#fe1c1f" ,
            },
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
        <Header title="Enquiry" subtitle="List of enquiries requests" />
        <div style={{ display: "flex", alignItems: "center" }}>
        {/* <div style={{ marginRight: "10px" }}>
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
          </div> */}

          {/* <Button
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
          </Button> */}
        
        </div>
      </div>

      <Box
        // m="40px 0 0 0"
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
            backgroundColor: "#20409a" // Optional background color for headers
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
            color: `#20409a !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text ": {
            color: `#20409a !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text:hover ": {
            color: `#fe1c1f !important`,
          },
          "& .MuiDataGrid-sortIcon": {
            color: "white",
          },
         

          "& .css-196n7va-MuiSvgIcon-root": {
            color: "black",
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

export default Enquiries;
