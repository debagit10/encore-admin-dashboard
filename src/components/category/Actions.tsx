import React from "react";

import Edit from "../../modals/categories/Edit";
import Delete from "../../modals/categories/Delete";

interface CategoryDetails {
  _id: string;
  name: string;
  description: string;
}

interface ActionsProps {
  categoryDetails: CategoryDetails;
  refreshCategories: () => void;
}

const Actions: React.FC<ActionsProps> = ({
  categoryDetails,
  refreshCategories,
}) => {
  return (
    <>
      <div className="flex gap-[24px]">
        <Edit
          categoryData={categoryDetails}
          refreshCategory={refreshCategories}
        />
        <Delete
          categoryData={categoryDetails}
          refreshCategories={refreshCategories}
        />
      </div>
    </>
  );
};

export default Actions;
