import { IoNotifications } from "react-icons/io5";
import Navbar from "../../components/Navbar";
import Pages from "../../container/Pages";
// import { Button } from "@mui/material";
import {
  Box,
  Chip,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { FiSearch } from "react-icons/fi";
import { useEffect, useMemo, useState } from "react";
import Actions from "../../components/reviews/Actions";

import { useNavigate } from "react-router-dom";

import chatgpt from "../../assets/chatgpt.png";
import DayAndTime from "../../utils/DayAndTime";
import Rating from "../../utils/Rating";

interface ReviewState {
  id: string;
  user_id: string;
  logo: string;
  name: string;
  comment: string;
  date: string;
  category: string;
  rating: 4;
  status: boolean;
}

const dummyTools = [
  {
    id: "123",
    user_id: "111",
    logo: chatgpt,
    name: "Chat gpt",
    comment: "This is the short description",
    date: "2025-05-29T16:21:35.385Z",
    category: "AI chatbot",
    rating: 4,
    status: true,
  },
  {
    id: "123",
    user_id: "111",
    logo: chatgpt,
    name: "Chat gpt",
    comment: "This is the short description",
    date: "2025-05-29T16:21:35.385Z",
    category: "AI chatbot",
    rating: 4,
    status: true,
  },
  {
    id: "123",
    user_id: "111",
    logo: chatgpt,
    name: "Chat gpt",
    comment: "This is the short description",
    date: "2025-05-29T16:21:35.385Z",
    category: "AI chatbot",
    rating: 4,
    status: false,
  },
  {
    id: "123",
    user_id: "111",
    logo: chatgpt,
    name: "Chat gpt",
    comment: "This is the short description",
    date: "2025-05-29T16:21:35.385Z",
    category: "AI chatbot",
    rating: 4,
    status: true,
  },
  {
    id: "123",
    user_id: "111",
    logo: chatgpt,
    name: "Chat gpt",
    comment: "This is the short description",
    date: "2025-05-29T16:21:35.385Z",
    category: "AI chatbot",
    rating: 4,
    status: false,
  },
  {
    id: "123",
    user_id: "111",
    logo: chatgpt,
    name: "Chat gpt",
    comment: "This is the short description",
    date: "2025-05-29T16:21:35.385Z",
    category: "AI chatbot",
    rating: 4,
    status: true,
  },
];

const Manage = () => {
  const navigate = useNavigate();
  const [tools, setTools] = useState<ReviewState[]>();
  const [loading, setLoading] = useState<boolean>(true);

  const [searchQuery, setSearchQuery] = useState<string>("");

  const [statusFilter, setStatusFilter] = useState<string>("all");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getTools = async () => {
    setLoading(true);
    try {
      // const response = await api.get("/api/admin/getAll");
      // if (response.data) {
      //   setAdmins(response.data.admins);
      //   return;
      // }
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTools();
  }, []);

  const filteredTools = useMemo(() => {
    let results = dummyTools;

    if (searchQuery.trim()) {
      results = results?.filter((review) =>
        `${review.name} ${review.category}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
    }

    if (statusFilter === "true") {
      results = results?.filter((review) => review.status);
    } else if (statusFilter === "false") {
      results = results?.filter((review) => !review.status);
    }

    return results;
  }, [searchQuery, statusFilter, dummyTools]);

  const paginatedTools = useMemo(() => {
    const start = page * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredTools?.slice(start, end);
  }, [filteredTools, page, rowsPerPage]);

  return (
    <Pages>
      <Navbar page="Review Management">
        <IoNotifications color="#777777" size={20} />
      </Navbar>

      <div className="px-[33.5px]">
        <div className="flex justify-between py-[1rem]">
          <TextField
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search A.I tools"
            size="small"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FiSearch />
                </InputAdornment>
              ),
            }}
          />

          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              label="Status"
              onChange={(e) => setStatusFilter(e.target.value)}
              sx={{
                borderRadius: "8px",
                backgroundColor: "#fff",
              }}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="true">Approved</MenuItem>
              <MenuItem value="false">Pending</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className="border-t-[1px] border-[#E5E5E6] ">
          <div className="flex justify-end">
            <TablePagination
              rowsPerPageOptions={[5, 10]}
              component="div"
              count={filteredTools?.length || 0}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
          <Table sx={{ minWidth: 650 }} aria-label="admin table" size="small">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#F0F2F5", height: "45px" }}>
                <TableCell>
                  <Typography fontWeight={500} fontSize={12} color="#2B2B33">
                    User ID
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography fontWeight={500} fontSize={12} color="#2B2B33">
                    Tool Name
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography fontWeight={500} fontSize={12} color="#2B2B33">
                    Cateogory
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography fontWeight={500} fontSize={12} color="#2B2B33">
                    Date
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography fontWeight={500} fontSize={12} color="#2B2B33">
                    Comment
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography fontWeight={500} fontSize={12} color="#2B2B33">
                    Rating
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography fontWeight={500} fontSize={12} color="#2B2B33">
                    Status
                  </Typography>
                </TableCell>
                <TableCell align="left" />
              </TableRow>
            </TableHead>

            <TableBody>
              {loading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <TableRow key={index}>
                    {Array.from({ length: 6 }).map((__, idx) => (
                      <TableCell key={idx}>
                        <Skeleton variant="text" width="100%" height={30} />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : paginatedTools && paginatedTools.length > 0 ? (
                paginatedTools.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{
                      cursor: "pointer",
                      height: "50px",
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell
                      align="left"
                      onClick={() => navigate(`/review/view/${row.id}`)}
                    >
                      <Typography
                        color="#808084"
                        sx={{ fontFamily: "Open Sans, sans-serif" }}
                        fontWeight={400}
                        fontSize={14}
                      >
                        {row.user_id}
                      </Typography>
                    </TableCell>
                    <TableCell
                      onClick={() => navigate(`/review/view/${row.id}`)}
                    >
                      <div className="flex gap-[12px] items-center">
                        <img
                          src={row.logo}
                          alt={`Logo for ${row.name}`}
                          height={25}
                          width={25}
                        />
                        <Typography
                          color="#808084"
                          sx={{ fontFamily: "Open Sans, sans-serif" }}
                          fontWeight={400}
                          fontSize={14}
                        >
                          {row.name}
                        </Typography>
                      </div>
                    </TableCell>
                    <TableCell
                      align="left"
                      onClick={() => navigate(`/review/view/${row.id}`)}
                    >
                      <Typography
                        color="#808084"
                        sx={{ fontFamily: "Open Sans, sans-serif" }}
                        fontWeight={400}
                        fontSize={14}
                      >
                        {row.category}
                      </Typography>
                    </TableCell>

                    <TableCell
                      align="left"
                      onClick={() => navigate(`/review/view/${row.id}`)}
                    >
                      <Typography
                        color="#808084"
                        sx={{ fontFamily: "Open Sans, sans-serif" }}
                        fontWeight={400}
                        fontSize={14}
                      >
                        <DayAndTime date={row.date} />
                      </Typography>
                    </TableCell>

                    <TableCell
                      align="left"
                      onClick={() => navigate(`/review/view/${row.id}`)}
                    >
                      <Typography
                        color="#808084"
                        sx={{ fontFamily: "Open Sans, sans-serif" }}
                        fontWeight={400}
                        fontSize={14}
                      >
                        {row.comment}
                      </Typography>
                    </TableCell>

                    <TableCell
                      align="left"
                      onClick={() => navigate(`/review/view/${row.id}`)}
                    >
                      <Typography
                        color="#808084"
                        sx={{ fontFamily: "Open Sans, sans-serif" }}
                        fontWeight={400}
                        fontSize={14}
                      >
                        <Rating value={row.rating} />
                      </Typography>
                    </TableCell>

                    <TableCell
                      align="left"
                      onClick={() => navigate(`/review/view/${row.id}`)}
                    >
                      <Chip
                        label={row.status ? "Approved" : "Pending"}
                        sx={{
                          fontFamily: "Open Sans, sans-serif",
                          fontWeight: 500,
                          fontSize: 14,
                          backgroundColor: row.status ? "#d0f0c0" : "#ffe5b4",
                          color: row.status ? "#2e7d32" : "#ff9800",
                        }}
                      />
                    </TableCell>
                    <TableCell align="left">
                      <Actions />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6}>
                    <Box textAlign="center" py={4}>
                      <Typography variant="body1" color="textSecondary">
                        {searchQuery
                          ? "No matching reviews found."
                          : "No reviews found."}
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </Pages>
  );
};

export default Manage;
