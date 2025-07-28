import { useState } from "react";
import PageBreadcrumb from "@/Components/common/PageBreadCrumb";
import PageMeta from "@/Components/common/PageMeta";
import ProfileCard from "@/Components/Profile/ProfileCard";
import EditProfileModal from "./Edit";

export default function Index({ profile, role, baseUrl }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
  };

  return (
    <>
      <PageMeta title="Vendor Information" description="Vendor Information" />
      <PageBreadcrumb pageTitle="Vendor Information" />
      <ProfileCard 
        profile={profile} 
        baseUrl={baseUrl} 
        onEdit={handleEdit} 
      />
      
      {isEditModalOpen && (
        <EditProfileModal
          onClose={handleCloseModal}
          profile={profile}
          role={role}
          baseUrl={baseUrl}
        />
      )}
    </>
  );
}
