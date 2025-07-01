import React from "react";

import Edit from "../../modals/categories/Edit";
import Delete from "../../modals/categories/Delete";

interface AdminsState {
  name: string;
  email: string;
  role: string;
  suspended: string;
  id: string;
}

interface ActionsProps {
  adminDetails?: AdminsState;
  refreshAdmins?: () => void;
}

const Actions: React.FC<ActionsProps> = () => {
  return (
    <>
      <div className="flex gap-[24px]">
        <Edit />
        <Delete />
      </div>
    </>
  );
};

export default Actions;
