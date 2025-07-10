import { useEffect, useState } from "react";
import Pages from "../../container/Pages";
import Navbar from "../../components/Navbar";
import {
  Button,
  Divider,
  Skeleton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { IoMdArrowBack } from "react-icons/io";
import { useParams, useNavigate } from "react-router-dom";
import Actions from "../../components/tools/Actions";
import api from "../../utils/axiosInstance";

interface Category {
  _id: string;
  name: string;
}

interface ToolDetails {
  name: string;
  description: string;
  category_id: Category;
  image: string;
  demo_url: string;
  _id: string;
}

const View = () => {
  const [toolData, setToolData] = useState<ToolDetails>({
    name: "",
    description: "",
    demo_url: "",
    image: "",
    _id: "",
    category_id: { _id: "", name: "" },
  });

  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const getTool = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/api/tool/${id}`);
      if (response.data.success) {
        setToolData(response.data.data);
      }
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTool();
  }, []);

  useEffect(() => {
    if (toolData.name) {
      document.title = `Encore AI - ${toolData.name}`;
    }
  }, [toolData.name]);

  return (
    <Pages>
      <Navbar page="Tool Management" component={`${toolData?.name}`} />

      <div className="px-[33.5px]">
        <div className="flex justify-start mt-[1rem]">
          <Tooltip title="Go back">
            <Button
              sx={{
                color: "#808084",
                borderColor: "#808084",
                borderRadius: "8px",
                width: "10px",
                height: "30px",
              }}
              onClick={() => navigate(-1)}
              variant="outlined"
            >
              <IoMdArrowBack className="w-[1.5rem] h-[1.5rem]" />
            </Button>
          </Tooltip>
        </div>

        <div className="flex justify-center">
          <div className="flex flex-col gap-[10px] w-[590px]">
            {loading ? (
              <Skeleton variant="circular" width={48} height={48} />
            ) : (
              <img src={toolData?.image} className="w-[48px] h-[48px]" />
            )}

            <div className="flex justify-between items-center">
              {loading ? (
                <Skeleton variant="text" width={200} height={32} />
              ) : (
                <Typography fontWeight={500} fontSize={24} color="#302F37">
                  {toolData?.name}
                </Typography>
              )}

              {!loading && <Actions toolDetails={toolData} />}
            </div>
          </div>
        </div>

        <div className="flex justify-center my-[1rem]">
          {loading ? (
            <Skeleton variant="rectangular" width={620} height={1} />
          ) : (
            <Divider sx={{ width: "620px" }} />
          )}
        </div>

        <div className="flex justify-center">
          <div className="w-[590px]">
            <div className="flex flex-col justify-center gap-[16px]">
              {/* Name */}
              <div>
                <Typography
                  fontWeight={600}
                  sx={{ color: "#00294E", fontFamily: "Open Sans, sans-serif" }}
                  fontSize={14}
                >
                  Name
                </Typography>
                {loading ? (
                  <Skeleton variant="rounded" height={40} />
                ) : (
                  <TextField
                    disabled
                    name="name"
                    value={toolData?.name}
                    type="text"
                    size="small"
                    fullWidth
                    sx={{
                      backgroundColor: "#F9F9FB",
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                      },
                    }}
                  />
                )}
              </div>

              {/* Description */}
              <div>
                <Typography
                  fontWeight={600}
                  sx={{ color: "#00294E", fontFamily: "Open Sans, sans-serif" }}
                  fontSize={14}
                >
                  Description
                </Typography>
                {loading ? (
                  <Skeleton variant="rounded" height={40} />
                ) : (
                  <TextField
                    disabled
                    name="short_desc"
                    value={toolData?.description}
                    type="text"
                    size="small"
                    fullWidth
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                      },
                    }}
                  />
                )}
              </div>

              {/* Category */}
              <div>
                <Typography
                  fontWeight={600}
                  sx={{ color: "#00294E", fontFamily: "Open Sans, sans-serif" }}
                  fontSize={14}
                >
                  Category
                </Typography>
                {loading ? (
                  <Skeleton variant="rounded" height={40} />
                ) : (
                  <TextField
                    disabled
                    name="category"
                    value={toolData?.category_id?.name}
                    type="text"
                    size="small"
                    fullWidth
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                      },
                    }}
                  />
                )}
              </div>

              {/* Demo URL */}
              <div>
                <Typography
                  fontWeight={600}
                  sx={{ color: "#00294E", fontFamily: "Open Sans, sans-serif" }}
                  fontSize={14}
                >
                  Demo URL
                </Typography>
                {loading ? (
                  <Skeleton variant="rounded" height={40} />
                ) : (
                  <TextField
                    disabled
                    name="demo_url"
                    value={toolData?.demo_url}
                    type="text"
                    size="small"
                    fullWidth
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                      },
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Pages>
  );
};

export default View;
