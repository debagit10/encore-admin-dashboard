import { IoNotifications } from "react-icons/io5";
import Navbar from "../../components/Navbar";
import Pages from "../../container/Pages";
// import { Button } from "@mui/material";
import Create_Tool from "../../modals/tools/Create_Tool";
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
import Actions from "../../components/tools/Actions";

import { useNavigate } from "react-router-dom";

import chatgpt from "../../assets/chatgpt.png";

interface ToolState {
  name: string;
  short_desc: string;
  long_desc: string;
  category: string;
  logo: string;
  demo_link: string;
}

const dummyTools = [
  {
    id: "123",
    logo: chatgpt,
    name: "Chat gpt",
    short_desc: "This is the short description",
    long_desc: "This is the longer description",
    category: "AI chatbot",
    demo_link: "https://chatgpt.com",
  },
  {
    id: "123",
    logo: chatgpt,
    name: "Chat gpt",
    short_desc: "This is the short description",
    long_desc: "This is the longer description",
    category: "AI chatbot",
    demo_link: "https://chatgpt.com",
  },
  {
    id: "123",
    logo: chatgpt,
    name: "Chat gpt",
    short_desc: "This is the short description",
    long_desc: "This is the longer description",
    category: "AI chatbot",
    demo_link: "https://chatgpt.com",
  },
  {
    id: "123",
    logo: chatgpt,
    name: "Chat gpt",
    short_desc: "This is the short description",
    long_desc: "This is the longer description",
    category: "AI chatbot",
    demo_link: "https://chatgpt.com",
  },
  {
    id: "123",
    logo: chatgpt,
    name: "Chat gpt",
    short_desc: "This is the short description",
    long_desc: "This is the longer description",
    category: "AI chatbot",
    demo_link: "https://chatgpt.com",
  },
  {
    id: "123",
    logo: chatgpt,
    name: "Chat gpt",
    short_desc: "This is the short description",
    long_desc: "This is the longer description",
    category: "AI chatbot",
    demo_link: "https://chatgpt.com",
  },
];

const Manage = () => {
  const navigate = useNavigate();
  const [tools, setTools] = useState<ToolState[]>();
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
    if (!searchQuery.trim()) return dummyTools;
    return dummyTools?.filter((tool) =>
      `${tool.name} ${tool.category}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, dummyTools]);

  const paginatedTools = useMemo(() => {
    const start = page * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredTools?.slice(start, end);
  }, [filteredTools, page, rowsPerPage]);

  return (
    <Pages>
      <Navbar page="Tool Management">
        <div className="flex gap-[1rem] items-center">
          <IoNotifications color="#777777" size={20} />

          <Create_Tool />
        </div>
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
                    Tool Name
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography fontWeight={500} fontSize={12} color="#2B2B33">
                    Description
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography fontWeight={500} fontSize={12} color="#2B2B33">
                    Cateogory
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography fontWeight={500} fontSize={12} color="#2B2B33">
                    Demo Link
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
                    <TableCell onClick={() => navigate(`/tool/view/${row.id}`)}>
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
                      onClick={() => navigate(`/tool/view/${row.id}`)}
                    >
                      <Typography
                        color="#808084"
                        sx={{ fontFamily: "Open Sans, sans-serif" }}
                        fontWeight={400}
                        fontSize={14}
                      >
                        {row.short_desc}
                      </Typography>
                    </TableCell>
                    <TableCell
                      align="left"
                      onClick={() => navigate(`/tool/view/${row.id}`)}
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

                    <TableCell align="left">
                      <div className="bg-[#F0EEFF] rounded-[72px] py-[8px] pl-[12px] pr-[12px] w-[130px] overflow-hidden whitespace-nowrap text-ellipsis">
                        <a target="_blank" href={row.demo_link}>
                          <Typography
                            color="#755AE2"
                            sx={{ fontFamily: "Open Sans, sans-serif" }}
                            fontWeight={400}
                            fontSize={14}
                          >
                            {row.demo_link}
                          </Typography>
                        </a>
                      </div>
                    </TableCell>

                    <TableCell align="left">
                      <Actions toolDetails={row} refreshTools={getTools} />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6}>
                    <Box textAlign="center" py={4}>
                      <Typography variant="body1" color="textSecondary">
                        {searchQuery
                          ? "No matching tools found."
                          : "No tools found. Please create new tool."}
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
