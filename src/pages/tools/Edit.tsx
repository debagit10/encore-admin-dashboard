import React, { useEffect, useState } from "react";
import Pages from "../../container/Pages";
import Navbar from "../../components/Navbar";
import { Button, Divider, TextField, Tooltip, Typography } from "@mui/material";
import { IoMdArrowBack } from "react-icons/io";

import chat_gpt from "../../assets/chatgpt.png";

import { useNavigate, useParams } from "react-router-dom";
import api from "../../utils/axiosInstance";
import Toast from "../../utils/Toast";

interface ToolDetails {
  name: string;
  description: string;
  category: string;
  image: string;
  demo_url: string;
  _id: string;
}

interface ToastState {
  open: boolean;
  message: string;
  severity: "success" | "info" | "error" | "warning";
}

const Edit = () => {
  const { id } = useParams();

  const [toolData, setToolData] = useState<ToolDetails>({
    name: "",
    description: "",
    category: "",
    demo_url: "",
    image: "",
    _id: "",
  });

  const [originalData, setOriginalData] = useState<ToolDetails>({
    name: "",
    description: "",
    category: "",
    demo_url: "",
    image: "",
    _id: "",
  });

  const [loading, setLoading] = useState<boolean>(false);

  const [focusedFields, setFocusedFields] = useState({
    name: false,
    description: false,
    demo_url: false,
    category: false,
  });

  const handleFocus = (field: string) => {
    setFocusedFields((prev) => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field: string) => {
    setFocusedFields((prev) => ({ ...prev, [field]: false }));
  };

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setToolData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [toast, setToast] = useState<ToastState>({
    open: false,
    message: "",
    severity: "info",
  });

  const showToast = (message: string, severity: ToastState["severity"]) => {
    setToast({ open: true, message, severity });
  };

  const handleCloseToast = () => {
    setToast((prev) => ({ ...prev, open: false }));
    setLoading(false);
  };

  const submit = async () => {
    setLoading(true);

    try {
      const response = await api.put(
        `/api/tool/edit/${toolData._id}`,
        toolData
      );

      if (response.data.success) {
        showToast(response.data.message, "success");

        setTimeout(() => {
          navigate(`/tool/view/${id}`);
        }, 2000);
      }
    } catch (error: any) {
      if (error.response.data.error) {
        console.log(error);
        setLoading(false);
        showToast(error.response.data.error, "error");
        return;
      }
    }
  };

  const getTool = async () => {
    setLoading(true);

    try {
      const response = await api.get(`/api/tool/${id}`);
      if (response.data.success) {
        setToolData(response.data.data);
        setOriginalData(response.data.data);
        return;
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

  const isDataChanged = () => {
    return (
      toolData.name !== originalData.name ||
      toolData.description !== originalData.description ||
      toolData.category !== originalData.category ||
      toolData.demo_url !== originalData.demo_url
    );
  };

  return (
    <Pages>
      <Navbar page="Tool Management" component={`${originalData.name}`} edit />

      <div className="px-[33.5px]">
        <Toast
          open={toast.open}
          message={toast.message}
          severity={toast.severity}
          onClose={handleCloseToast}
        />

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
              <IoMdArrowBack className="w-[1.5rem] h-[1.5rem] " />
            </Button>
          </Tooltip>
        </div>

        <div className="flex justify-center ">
          <div className="flex flex-col gap-[10px] w-[590px]">
            <img src={originalData.image} className="w-[48px] h-[48px]" />

            <Typography fontWeight={500} fontSize={24} color="#302F37">
              {originalData.name}
            </Typography>
          </div>
        </div>

        <div className="flex justify-center my-[1rem]">
          <Divider sx={{ width: "620px" }} />
        </div>

        <div className="flex justify-center ">
          <div className="w-[590px]">
            <div className="flex flex-col justify-center gap-[16px] ">
              <div>
                <Typography
                  fontWeight={600}
                  sx={{
                    color: focusedFields.name ? "#0167C4" : "#00294E",
                    fontFamily: "Open Sans, sans-serif",
                  }}
                  fontSize={14}
                >
                  Name
                </Typography>
                <TextField
                  onChange={handleChange}
                  onFocus={() => handleFocus("name")}
                  onBlur={() => handleBlur("name")}
                  focused={focusedFields.name}
                  name="name"
                  value={toolData?.name}
                  type="text"
                  size="small"
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                    },
                  }}
                />
              </div>

              <div>
                <Typography
                  fontWeight={600}
                  sx={{
                    color: focusedFields.description ? "#0167C4" : "#00294E",
                    fontFamily: "Open Sans, sans-serif",
                  }}
                  fontSize={14}
                >
                  Description
                </Typography>
                <TextField
                  onChange={handleChange}
                  onFocus={() => handleFocus("description")}
                  onBlur={() => handleBlur("description")}
                  focused={focusedFields.description}
                  name="description"
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
              </div>

              <div>
                <Typography
                  fontWeight={600}
                  sx={{
                    color: focusedFields.category ? "#0167C4" : "#00294E",
                    fontFamily: "Open Sans, sans-serif",
                  }}
                  fontSize={14}
                >
                  Category
                </Typography>
                <TextField
                  onChange={handleChange}
                  onFocus={() => handleFocus("category")}
                  onBlur={() => handleBlur("category")}
                  focused={focusedFields.category}
                  name="category"
                  value={toolData?.category}
                  type="text"
                  size="small"
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                    },
                  }}
                />
              </div>

              <div>
                <Typography
                  fontWeight={600}
                  sx={{
                    color: focusedFields.demo_url ? "#0167C4" : "#00294E",
                    fontFamily: "Open Sans, sans-serif",
                  }}
                  fontSize={14}
                >
                  Demo URL
                </Typography>
                <TextField
                  onChange={handleChange}
                  onFocus={() => handleFocus("demo_url")}
                  onBlur={() => handleBlur("demo_url")}
                  focused={focusedFields.demo_url}
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
              </div>

              <Button
                disabled={loading || !isDataChanged()}
                disableElevation
                variant="contained"
                sx={{
                  width: "165px",
                  padding: "10px",
                  borderRadius: "12px",
                  backgroundColor: "#0167C4",
                  textTransform: "capitalize",
                }}
                onClick={submit}
              >
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Pages>
  );
};

export default Edit;
