import { IoNotifications } from "react-icons/io5";
import Navbar from "../../components/Navbar";
import Pages from "../../container/Pages";

import {
  Box,
  InputAdornment,
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

import { useNavigate } from "react-router-dom";

import chatgpt from "../../assets/chatgpt.png";
import { formatDayAndTime } from "../../utils/DayAndTime";
import Rating from "../../utils/Rating";
import Delete_Review from "../../modals/review/Delete_Review";
import api from "../../utils/axiosInstance";

interface ReviewDetails {
  _id: string;
  message: string;
  createdAt: string;
  rating: number;
  toolId: ToolDetails;
}

interface ToolDetails {
  name: string;
  demo_url: string;
  image: string;
  category_id: Category;
}

interface Category {
  name: string;
  _id: string;
}

const Manage = () => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState<ReviewDetails[]>();
  const [loading, setLoading] = useState<boolean>(true);

  const [searchQuery, setSearchQuery] = useState<string>("");

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

  const getReviews = async () => {
    setLoading(true);
    try {
      const response = await api.get("/api/review/get");
      if (response.data) {
        setReviews(response.data.data);
        return;
      }
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getReviews();
  }, []);

  const filteredTools = useMemo(() => {
    let results = reviews;

    if (searchQuery.trim()) {
      results = results?.filter((review) =>
        `${review.toolId.name} ${review.toolId.category_id}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
    }

    return results;
  }, [searchQuery, reviews]);

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
            placeholder="Search reviews"
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
                    key={row._id}
                    sx={{
                      cursor: "pointer",
                      height: "50px",
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell
                      onClick={() => navigate(`/review/view/${row._id}`)}
                    >
                      <div className="flex gap-[12px] items-center">
                        <img
                          src={row.toolId.image}
                          alt={`Logo for ${row.toolId.name}`}
                          height={25}
                          width={25}
                        />
                        <Typography
                          color="#808084"
                          sx={{ fontFamily: "Open Sans, sans-serif" }}
                          fontWeight={400}
                          fontSize={14}
                        >
                          {row.toolId.name}
                        </Typography>
                      </div>
                    </TableCell>
                    <TableCell
                      align="left"
                      onClick={() => navigate(`/review/view/${row._id}`)}
                    >
                      <Typography
                        color="#808084"
                        sx={{ fontFamily: "Open Sans, sans-serif" }}
                        fontWeight={400}
                        fontSize={14}
                      >
                        {row.toolId.category_id.name}
                      </Typography>
                    </TableCell>

                    <TableCell
                      align="left"
                      onClick={() => navigate(`/review/view/${row._id}`)}
                    >
                      <Typography
                        color="#808084"
                        sx={{ fontFamily: "Open Sans, sans-serif" }}
                        fontWeight={400}
                        fontSize={14}
                      >
                        {formatDayAndTime(row.createdAt)}
                      </Typography>
                    </TableCell>

                    <TableCell
                      align="left"
                      onClick={() => navigate(`/review/view/${row._id}`)}
                    >
                      <Typography
                        color="#808084"
                        sx={{ fontFamily: "Open Sans, sans-serif" }}
                        fontWeight={400}
                        fontSize={14}
                      >
                        {row.message}
                      </Typography>
                    </TableCell>

                    <TableCell
                      align="left"
                      onClick={() => navigate(`/review/view/${row._id}`)}
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

                    <TableCell align="left">
                      <Delete_Review
                        _id={row._id}
                        refreshReviews={getReviews}
                      />
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
