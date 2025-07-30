import { useState } from "react";
import PageBreadcrumb from "@/Components/common/PageBreadCrumb";
import PageMeta from "@/Components/common/PageMeta";
import CredentialCard from "@/Components/Profile/CredentialCard";
import EditCredentialModal from "./Edit";

export default function Index({ user, baseUrl }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
  };

  return (
    <>
      <PageMeta title="Credential Settings" description="Credential Settings" />
      <PageBreadcrumb pageTitle="Credential Settings" />
      <CredentialCard 
        user={user} 
        baseUrl={baseUrl} 
        onEdit={handleEdit} 
      />
      
      {isEditModalOpen && (
        <EditCredentialModal
          onClose={handleCloseModal}
          user={user}
          baseUrl={baseUrl}
        />
      )}
    </>
  );
} 